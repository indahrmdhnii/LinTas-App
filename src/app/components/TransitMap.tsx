/**
 * TransitMap.tsx
 * Real interactive map using OpenStreetMap (via Leaflet + react-leaflet)
 * with transit route overlays, stop markers, zoom in/out, and locate user.
 */

import { useEffect, useRef, useCallback, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LatLngStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  info: string;
}

export interface LatLngRoute {
  id: string;
  code: string;
  name: string;
  stops: number;
  direction: string;
  path: [number, number][]; // [lat, lng]
  stopPoints: LatLngStop[];
}

export interface TransitMapProps {
  viewState: "pilih-moda" | "daftar-jalur" | "jalur-aktif" | "cari-halte" | "jak-lingko";
  selectedModa: string | null;
  selectedRoute: LatLngRoute | null;
  selectedStop: LatLngStop | null;
  onStopSelect: (stop: LatLngStop) => void;
  modaColor: string;
  jakLingkoZones?: JakLingkoLatLngZone[];
  bottomOffset?: number; // height of bottom navbar, default 80
}

export interface JakLingkoLatLngZone {
  id: string;
  name: string;
  polygon: [number, number][];
  shelters: LatLngStop[];
}

// ─── Fix Leaflet default icon bug in Vite ─────────────────────────────────────

// Leaflet's default marker icons use relative paths that break in Vite.
// We override with inline SVG data URIs so no extra files are needed.
const createCustomIcon = (color: string, selected: boolean) =>
  L.divIcon({
    html: `
      <div style="
        width: ${selected ? 22 : 14}px;
        height: ${selected ? 22 : 14}px;
        border-radius: 50%;
        background: ${color};
        border: ${selected ? "3.5px" : "2.5px"} solid #FFFFFF;
        box-shadow: 0 2px 8px rgba(0,0,0,0.30);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        ${selected ? `box-shadow: 0 0 0 5px ${color}33, 0 2px 8px rgba(0,0,0,0.30);` : ""}
      "></div>
    `,
    className: "",
    iconSize: [selected ? 22 : 14, selected ? 22 : 14],
    iconAnchor: [selected ? 11 : 7, selected ? 11 : 7],
  });

// ─── User location icon ────────────────────────────────────────────────────────

const userLocationIcon = L.divIcon({
  html: `
    <div style="
      width: 18px;
      height: 18px;
      background: #007AFF;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 0 5px rgba(0,122,255,0.25), 0 2px 8px rgba(0,0,0,0.4);
    "></div>
  `,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// ─── Map Controls Component ───────────────────────────────────────────────────

function MapZoomControls({
  color,
  onZoomIn,
  onZoomOut,
  onLocate,
  bottomOffset = 80,
}: {
  color: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
  bottomOffset?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        right: 16,
        bottom: bottomOffset + 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 500,
      }}
    >
      {[
        { label: "+", action: onZoomIn, bg: "#FFFFFF", fg: "#1C1C1E", title: "Zoom In" },
        { label: "−", action: onZoomOut, bg: "#FFFFFF", fg: "#1C1C1E", title: "Zoom Out" },
        { label: "⊕", action: onLocate, bg: color, fg: "#FFFFFF", title: "Lokasi Saya" },
      ].map(({ label, action, bg, fg, title }) => (
        <button
          key={title}
          title={title}
          onClick={action}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "none",
            backgroundColor: bg,
            color: fg,
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: label === "⊕" ? 22 : 26,
            fontWeight: "bold",
            fontFamily: "system-ui",
            lineHeight: 1,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.92)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Inner map controller (must be inside MapContainer) ──────────────────────

function MapController({
  selectedRoute,
  selectedStop,
  zoomInRef,
  zoomOutRef,
  locateRef,
}: {
  selectedRoute: LatLngRoute | null;
  selectedStop: LatLngStop | null;
  zoomInRef: React.MutableRefObject<(() => void) | null>;
  zoomOutRef: React.MutableRefObject<(() => void) | null>;
  locateRef: React.MutableRefObject<(() => void) | null>;
}) {
  const map = useMap();

  // Wire up zoom/locate callbacks
  useEffect(() => {
    zoomInRef.current = () => map.zoomIn(1);
    zoomOutRef.current = () => map.zoomOut(1);

    // Fix: listen to locationfound so the button actually flies to real GPS position
    const onLocationFound = (e: L.LocationEvent) => {
      map.flyTo(e.latlng, 16, { duration: 0.8 });
    };

    map.on("locationfound", onLocationFound);

    locateRef.current = () => {
      map.locate({
        setView: false,         // we handle flyTo manually in locationfound
        maxZoom: 16,
        timeout: 20000,         // 20s — mobile GPS can be slow
        enableHighAccuracy: true,
      });
    };

    return () => {
      map.off("locationfound", onLocationFound);
    };
  }, [map, zoomInRef, zoomOutRef, locateRef]);

  // Fly to selected route bounds
  useEffect(() => {
    if (selectedRoute && selectedRoute.path.length > 0) {
      try {
        const bounds = L.latLngBounds(selectedRoute.path.map(([lat, lng]) => [lat, lng]));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      } catch {
        // ignore
      }
    }
  }, [selectedRoute, map]);

  // Fly to selected stop
  useEffect(() => {
    if (selectedStop) {
      map.flyTo([selectedStop.lat, selectedStop.lng], 15, { duration: 0.6 });
    }
  }, [selectedStop, map]);

  return null;
}

// ─── User Location Marker ──────────────────────────────────────────────────────

/**
 * Fix summary:
 * 1. No longer pre-places marker at Jakarta center (-6.2088, 106.8456)
 * 2. Uses Leaflet's map.locate() with watch:true for continuous live tracking
 * 3. Marker only appears after real GPS position is received (locationfound event)
 * 4. Properly cleans up watchPosition via map.stopLocate() on unmount
 */
function UserLocationMarker() {
  const map = useMap();
  const [userLatLng, setUserLatLng] = useState<L.LatLng | null>(null);

  useEffect(() => {
    const onLocationFound = (e: L.LocationEvent) => {
      setUserLatLng(e.latlng);
    };

    // Start watching GPS — updates continuously as user moves
    map.locate({
      watch: true,              // continuous tracking (like watchPosition)
      enableHighAccuracy: true, // use GPS chip on mobile, not IP fallback
      timeout: 20000,           // 20s timeout for slow mobile GPS
      maximumAge: 5000,         // accept cached position up to 5s old
    });

    map.on("locationfound", onLocationFound);
    // locationerror: silently ignore — marker just won't show if denied

    return () => {
      map.stopLocate();           // clean up watchPosition on unmount
      map.off("locationfound", onLocationFound);
    };
  }, [map]);

  // Only render marker when we have a real GPS fix
  if (!userLatLng) return null;

  return <Marker position={userLatLng} icon={userLocationIcon} />;
}

// ─── Main TransitMap Component ────────────────────────────────────────────────

export function TransitMap({
  viewState,
  selectedRoute,
  selectedStop,
  onStopSelect,
  modaColor,
  jakLingkoZones,
  bottomOffset = 80,
}: TransitMapProps) {
  const zoomInRef = useRef<(() => void) | null>(null);
  const zoomOutRef = useRef<(() => void) | null>(null);
  const locateRef = useRef<(() => void) | null>(null);

  const handleZoomIn = useCallback(() => zoomInRef.current?.(), []);
  const handleZoomOut = useCallback(() => zoomOutRef.current?.(), []);
  const handleLocate = useCallback(() => locateRef.current?.(), []);

  // Jakarta center
  const center: [number, number] = [-6.2088, 106.8456];

  // suppress unused variable warning — createCustomIcon kept for future use
  void createCustomIcon;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <MapContainer
        center={center}
        zoom={12}
        zoomControl={false}          // we use custom controls
        scrollWheelZoom={true}
        doubleClickZoom={true}
        style={{ width: "100%", height: "100%" }}
        attributionControl={true}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        <MapController
          selectedRoute={selectedRoute}
          selectedStop={selectedStop}
          zoomInRef={zoomInRef}
          zoomOutRef={zoomOutRef}
          locateRef={locateRef}
        />

        {/* ── Transit Route Polyline ── */}
        {selectedRoute && selectedRoute.path.length > 0 && (
          <>
            {/* Glow layer */}
            <Polyline
              positions={selectedRoute.path}
              pathOptions={{
                color: modaColor,
                weight: 14,
                opacity: 0.15,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
            {/* Main route line */}
            <Polyline
              positions={selectedRoute.path}
              pathOptions={{
                color: modaColor,
                weight: 5,
                opacity: 1,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </>
        )}

        {/* ── Stop Markers ── */}
        {selectedRoute &&
          selectedRoute.stopPoints.map((stop) => {
            const isSelected = selectedStop?.id === stop.id;
            return (
              <CircleMarker
                key={stop.id}
                center={[stop.lat, stop.lng]}
                radius={isSelected ? 11 : 7}
                pathOptions={{
                  color: "#FFFFFF",
                  weight: isSelected ? 3.5 : 2.5,
                  fillColor: modaColor,
                  fillOpacity: 1,
                  opacity: 1,
                }}
                eventHandlers={{
                  click: () => onStopSelect(stop),
                }}
              >
                <Tooltip
                  permanent={false}
                  direction="top"
                  offset={[0, isSelected ? -14 : -10]}
                  className="transit-stop-tooltip"
                >
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#1C1C1E",
                  }}>
                    {stop.name}
                  </span>
                </Tooltip>
              </CircleMarker>
            );
          })}

        {/* ── Jak Lingko Zone Shelters ── */}
        {viewState === "jak-lingko" &&
          jakLingkoZones?.map((zone) =>
            zone.shelters.map((shelter) => {
              const isSelected = selectedStop?.id === shelter.id;
              return (
                <CircleMarker
                  key={shelter.id}
                  center={[shelter.lat, shelter.lng]}
                  radius={isSelected ? 11 : 7}
                  pathOptions={{
                    color: "#FFFFFF",
                    weight: 2.5,
                    fillColor: "#00923F",
                    fillOpacity: 1,
                    opacity: 1,
                  }}
                  eventHandlers={{
                    click: () => onStopSelect(shelter),
                  }}
                >
                  <Tooltip
                    permanent={false}
                    direction="top"
                    offset={[0, -10]}
                    className="transit-stop-tooltip"
                  >
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#1C1C1E",
                    }}>
                      {shelter.name}
                    </span>
                  </Tooltip>
                </CircleMarker>
              );
            })
          )}

        {/* ── User Location Marker (only shows after real GPS fix) ── */}
        <UserLocationMarker />
      </MapContainer>

      {/* ── Custom Zoom Controls (outside MapContainer to avoid z-index issues) ── */}
      <MapZoomControls
        color={modaColor}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onLocate={handleLocate}
        bottomOffset={bottomOffset}
      />

      {/* ── OSM Attribution tweak ── */}
      <style>{`
        .leaflet-control-attribution {
          font-size: 9px !important;
          opacity: 0.7;
        }
        .transit-stop-tooltip {
          background: white !important;
          border: 1px solid #EEEEED !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.14) !important;
          padding: 4px 8px !important;
        }
        .transit-stop-tooltip::before {
          display: none !important;
        }
        .leaflet-tooltip {
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
