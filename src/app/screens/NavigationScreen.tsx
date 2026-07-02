import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { X, MoreHorizontal, Train, MapPin, Users, AlertTriangle, Footprints } from "lucide-react";
import { TransitBadge, StatusChip } from "../components/TransitBadge";
import { AlertBanner } from "../components/AlertBanner";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { BottomSheet } from "../components/BottomSheet";
import { useAppContext } from "../context/AppContext";
import { ROUTE_DATABASE } from "../data/routeData";
import { motion } from "motion/react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Koordinat per rute (lat, lng) ────────────────────────────────────────────
const ROUTE_COORDS: Record<number, [number, number][]> = {
  // Blok M → Bundaran HI (MRT)
  1: [[-6.2441,106.7986],[-6.2280,106.8000],[-6.2190,106.8070],[-6.2100,106.8160],[-6.2015,106.8231],[-6.1960,106.8230]],
  // Blok M → Bundaran HI (TransJakarta)
  2: [[-6.2441,106.7986],[-6.2350,106.8000],[-6.2200,106.8100],[-6.2050,106.8200],[-6.1960,106.8230]],
  // Depok → Gambir (KRL)
  3: [[-6.3901,106.8186],[-6.3500,106.8100],[-6.3000,106.8200],[-6.2700,106.8300],[-6.2500,106.8350],[-6.2106,106.8504],[-6.1762,106.8305]],
  // Kalideres → Harmoni (TransJakarta)
  4: [[-6.1495,106.7010],[-6.1540,106.7350],[-6.1580,106.7650],[-6.1620,106.7900],[-6.1650,106.8170]],
  // Sudirman → Lebak Bulus (MRT)
  5: [[-6.2007,106.8228],[-6.2100,106.8160],[-6.2190,106.8070],[-6.2280,106.8000],[-6.2441,106.7986],[-6.2600,106.7960],[-6.2720,106.7900],[-6.2894,106.7742]],
  // Manggarai → Bogor (KRL)
  6: [[-6.2106,106.8504],[-6.2500,106.8350],[-6.2700,106.8300],[-6.3000,106.8200],[-6.3500,106.8100],[-6.4000,106.8000],[-6.4500,106.7950],[-6.5000,106.7900],[-6.5920,106.7890]],
  // Dukuh Atas → Cawang (LRT)
  7: [[-6.2015,106.8231],[-6.2080,106.8400],[-6.2150,106.8600],[-6.2250,106.8700],[-6.2350,106.8800]],
  // Bundaran HI → Lebak Bulus (MRT)
  8: [[-6.1960,106.8230],[-6.2015,106.8231],[-6.2100,106.8160],[-6.2190,106.8070],[-6.2280,106.8000],[-6.2441,106.7986],[-6.2600,106.7960],[-6.2720,106.7900],[-6.2894,106.7742]],
  // Generic fallback MRT (pusat Jakarta → MRT south)
  101: [[-6.2088,106.8456],[-6.2100,106.8300],[-6.2200,106.8200],[-6.2350,106.8100],[-6.2441,106.7986],[-6.2600,106.7900],[-6.2894,106.7742]],
  // Generic fallback TransJakarta (pusat Jakarta → barat)
  102: [[-6.2088,106.8456],[-6.2000,106.8300],[-6.1900,106.8100],[-6.1700,106.7800],[-6.1495,106.7400]],
};

const TRANSIT_COLORS: Record<string, string> = {
  MRT: "#0070C0",
  KRL: "#FF6600",
  TransJakarta: "#E2001A",
  LRT: "#E4002B",
  Transcity: "#6A5ACD",
  JakLingko: "#00923F",
};

// ─── Animasi marker bergerak di peta ─────────────────────────────────────────
function AnimatedMarker({
  coords,
  color,
  animDuration = 12000, // ms total animasi
  onProgress,
}: {
  coords: [number, number][];
  color: string;
  animDuration?: number;
  onProgress?: (pct: number) => void;
}) {
  const map = useMap();
  const markerRef = useRef<L.CircleMarker | null>(null);
  const pulseRef = useRef<L.CircleMarker | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (coords.length < 2) return;

    // Hitung total panjang path
    const distances: number[] = [0];
    for (let i = 1; i < coords.length; i++) {
      const d = map.distance(coords[i - 1], coords[i]);
      distances.push(distances[i - 1] + d);
    }
    const totalDist = distances[distances.length - 1];

    // Buat marker utama (titik bergerak)
    const marker = L.circleMarker(coords[0], {
      radius: 10, fillColor: color, fillOpacity: 1,
      color: "#FFFFFF", weight: 3,
    }).addTo(map);
    markerRef.current = marker;

    // Buat pulse ring
    const pulse = L.circleMarker(coords[0], {
      radius: 18, fillColor: color, fillOpacity: 0.2,
      color: color, weight: 1, opacity: 0.4,
    }).addTo(map);
    pulseRef.current = pulse;

    // Fit bounds
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });

    // Animasi loop
    function interpolate(t: number): [number, number] {
      const dist = t * totalDist;
      // Cari segment
      let seg = 0;
      for (let i = 1; i < distances.length; i++) {
        if (distances[i] >= dist) { seg = i - 1; break; }
        seg = i - 1;
      }
      seg = Math.min(seg, coords.length - 2);
      const segDist = distances[seg + 1] - distances[seg];
      const segT = segDist === 0 ? 0 : (dist - distances[seg]) / segDist;
      const lat = coords[seg][0] + segT * (coords[seg + 1][0] - coords[seg][0]);
      const lng = coords[seg][1] + segT * (coords[seg + 1][1] - coords[seg][1]);
      return [lat, lng];
    }

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / animDuration, 1);

      const pos = interpolate(t);
      marker.setLatLng(pos);
      pulse.setLatLng(pos);

      // Pan peta sedikit mengikuti marker
      if (t < 0.98) map.panTo(pos, { animate: true, duration: 0.5 });

      onProgress?.(Math.round(t * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      marker.remove();
      pulse.remove();
    };
  }, [coords, color, animDuration, map, onProgress]);

  return null;
}

// ─── Parse durasi & waktu ─────────────────────────────────────────────────────

// Derive ETA (minutes) from route duration string e.g. "28 mnt" → 28
function parseDuration(dur: string): number {
  const match = dur.match(/\d+/);
  return match ? parseInt(match[0]) : 20;
}

// Format minutes as "HH.MM"
function addMinutes(base: string, mins: number): string {
  const [h, m] = base.split(":").map(Number);
  const total = h * 60 + m + mins;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}.${String(mm).padStart(2, "0")}`;
}

const densityConfig = {
  rendah: { color: "#2A9D6F", label: "Rendah", fill: 1 },
  sedang: { color: "#D97B2A", label: "Sedang", fill: 2 },
  tinggi: { color: "#C9423A", label: "Tinggi", fill: 3 },
  penuh:  { color: "#C9423A", label: "Penuh ⚠️", fill: 3 },
};

// Fallback route
const DEFAULT_ROUTE = ROUTE_DATABASE[7]; // Bundaran HI → Lebak Bulus

export function NavigationScreen() {
  const navigate = useNavigate();
  const { selectedRoute } = useAppContext();
  const route = selectedRoute ?? DEFAULT_ROUTE;

  const totalMins = parseDuration(route.duration);
  const startTime = route.steps[0]?.time ?? "07:30";
  const arrivalTime = addMinutes(startTime, totalMins);

  // Countdown: starts at totalMins, ticks down each second
  const [etaMins, setEtaMins] = useState(totalMins);
  const [etaSecs, setEtaSecs] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setEtaMins(totalMins);
    setEtaSecs(0);
    tickRef.current = setInterval(() => {
      setEtaSecs((s) => {
        if (s > 0) return s - 1;
        setEtaMins((m) => Math.max(0, m - 1));
        return 59;
      });
    }, 1000);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [route.id, totalMins]);

  // Active step index (first transit step by default)
  const [activeStepIdx, setActiveStepIdx] = useState(
    () => Math.max(0, route.steps.findIndex((s) => s.type === "transit"))
  );

  const [showAlert, setShowAlert] = useState(false);
  const [showStopDialog, setShowStopDialog] = useState(false);
  const [showArrivalSheet, setShowArrivalSheet] = useState(false);
  const [showDisruptionSheet, setShowDisruptionSheet] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);

  // Ambil koordinat rute
  const routeCoords = ROUTE_COORDS[route.id] ?? [];
  const transitColor = TRANSIT_COLORS[route.transit] ?? "#1A6FBF";

  // Ref untuk scroll ke step aktif (scroll di dalam container, bukan window)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);

  // Sinkronkan activeStepIdx dengan progress animasi peta
  useEffect(() => {
    if (route.steps.length < 2) return;
    const stepsCount = route.steps.length;
    const stepSize = 95 / (stepsCount - 1);
    const newIdx = Math.min(
      Math.floor(animProgress / stepSize),
      stepsCount - 1
    );
    setActiveStepIdx(newIdx);
  }, [animProgress, route.steps.length]);

  // Scroll otomatis ke step aktif — scroll di dalam container scrollable
  useEffect(() => {
    const el = stepRefs.current[activeStepIdx];
    const container = stepsContainerRef.current;
    if (el && container) {
      // Cari parent scrollable (flex-1 overflow-y-auto)
      const scrollParent = container.closest(".overflow-y-auto") as HTMLElement | null;
      if (scrollParent) {
        const elTop = el.offsetTop - container.offsetTop;
        const elBottom = elTop + el.offsetHeight;
        const viewTop = scrollParent.scrollTop;
        const viewBottom = viewTop + scrollParent.clientHeight;
        // Hanya scroll jika step tidak terlihat di layar
        if (elTop < viewTop || elBottom > viewBottom) {
          scrollParent.scrollTo({
            top: elTop - 80,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeStepIdx]);

  const handleStopNavigation = () => {
    setShowStopDialog(false);
    navigate("/home", { replace: true });
  };

  const handleArrival = () => {
    setShowArrivalSheet(false);
    navigate("/ringkasan-perjalanan");
  };

  const destination = route.steps[route.steps.length - 1]?.title ?? route.to;
  const transitBadge = route.transit;

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#FFFFFF", padding: "12px 20px",
        boxShadow: "0 1px 4px rgba(28,28,30,0.04)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <button
          onClick={() => setShowStopDialog(true)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
        >
          <X size={24} color="#1C1C1E" strokeWidth={1.5} />
        </button>
        <h2 style={{ fontSize: 17, fontWeight: 500, color: "#1C1C1E", margin: 0, letterSpacing: -0.1, textAlign: "center", flex: 1 }}>
          {route.from} → {route.to}
        </h2>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <MoreHorizontal size={24} color="#8E8E93" strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-safe-scroll">
        {/* ETA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: "#FFFFFF", borderRadius: 20,
            margin: "16px 20px 0", padding: 24,
            boxShadow: "0 4px 16px rgba(28,28,30,0.10)", textAlign: "center",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>
            ESTIMASI TIBA
          </p>
          <p style={{ fontSize: 32, fontWeight: 600, color: "#1C1C1E", margin: "4px 0 4px", letterSpacing: -0.3, fontVariantNumeric: "tabular-nums" }}>
            {etaMins} menit
          </p>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: "0 0 2px", fontVariantNumeric: "tabular-nums" }}>
            {String(etaSecs).padStart(2, "0")} detik
          </p>
          <p style={{ fontSize: 15, fontWeight: 400, color: "#3C3C43", margin: "0 0 12px" }}>
            Tiba sekitar pukul {arrivalTime} WIB
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <TransitBadge type={transitBadge} />
            <StatusChip status="on-time" />
          </div>
        </motion.div>

        {/* ── Peta Animasi Navigasi ── */}
        {routeCoords.length >= 2 && (
          <div style={{
            margin: "16px 20px 0", borderRadius: 16, overflow: "hidden",
            height: 220, position: "relative",
            boxShadow: "0 4px 16px rgba(28,28,30,0.10)",
            isolation: "isolate",   // isolasi stacking context agar dialog tidak masuk ke sini
          }}>
            <MapContainer
              center={routeCoords[0]}
              zoom={13}
              zoomControl={false}
              scrollWheelZoom={false}
              dragging={false}
              doubleClickZoom={false}
              style={{ width: "100%", height: "100%" }}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
              {/* Garis rute */}
              <Polyline
                positions={routeCoords}
                pathOptions={{ color: transitColor, weight: 5, opacity: 0.35, lineCap: "round", lineJoin: "round" }}
              />
              {/* Titik awal */}
              <Polyline
                positions={[routeCoords[0]]}
                pathOptions={{ color: "#2A9D6F", weight: 0 }}
              />
              {/* Marker bergerak */}
              <AnimatedMarker
                coords={routeCoords}
                color={transitColor}
                animDuration={12000}
                onProgress={setAnimProgress}
              />
            </MapContainer>

            {/* Label dari - ke */}
            <div style={{
              position: "absolute", top: 10, left: 10, right: 10,
              display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 500, pointerEvents: "none",
            }}>
              <div style={{ backgroundColor: "#2A9D6F", borderRadius: 8, padding: "3px 10px" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}>
                  {route.from}
                </span>
              </div>
              <div style={{ backgroundColor: "#C9423A", borderRadius: 8, padding: "3px 10px" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}>
                  {route.to}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
              backgroundColor: "rgba(255,255,255,0.4)", zIndex: 500,
            }}>
              <div style={{
                height: "100%", backgroundColor: transitColor,
                width: `${animProgress}%`,
                transition: "width 0.3s ease",
                borderRadius: "0 2px 2px 0",
              }} />
            </div>
          </div>
        )}

        {/* Disruption alert */}
        {showAlert && (          <div style={{ padding: "12px 20px 0" }}>
            <AlertBanner
              severity="error"
              message="Keterlambatan terdeteksi."
              subMessage="Rute alternatif tersedia."
              actionLabel="Lihat Alternatif"
              onAction={() => navigate("/detail-gangguan")}
            />
          </div>
        )}

        {/* Journey Steps */}
        <div style={{ padding: "16px 20px 0" }}>
          <h2 style={{ fontSize: 17, fontWeight: 500, color: "#1C1C1E", margin: "0 0 16px", letterSpacing: -0.1 }}>
            Langkah Perjalanan
          </h2>

          <div ref={stepsContainerRef} style={{ position: "relative" }}>
            {route.steps.map((step, i) => {
              const isLast = i === route.steps.length - 1;
              const isActive = i === activeStepIdx;
              const isPassed = i < activeStepIdx;
              const isDestination = step.type === "arrive";
              const isTransfer = step.type === "transfer";
              const isWalk = step.isWalk || step.type === "walk";

              const dotColor = isActive ? transitColor
                : isPassed ? "#C7C7CC"
                : isDestination ? "#C9423A"
                : isTransfer ? "#D97B2A"
                : "#EEEEED";

              return (
                <motion.div
                  key={step.id}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  animate={{
                    opacity: isPassed ? 0.45 : 1,
                    x: isActive ? 4 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    display: "flex", gap: 16, position: "relative",
                    paddingBottom: isLast ? 0 : 20,
                    backgroundColor: isActive ? `${transitColor}12` : "transparent",
                    borderRadius: isActive ? 12 : 0,
                    padding: isActive ? "8px 10px 8px 8px" : `0 0 ${isLast ? 0 : 20}px 0`,
                    marginBottom: isActive ? 4 : 0,
                  }}
                >
                  {/* Timeline dot + line */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <motion.div
                      animate={{
                        width: isActive ? 16 : isPassed ? 10 : 12,
                        height: isActive ? 16 : isPassed ? 10 : 12,
                        boxShadow: isActive ? `0 0 0 4px ${transitColor}33` : "none",
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        borderRadius: "50%",
                        backgroundColor: dotColor,
                        border: !isActive && !isPassed && !isDestination ? "2px solid #EEEEED" : "none",
                        zIndex: 1, flexShrink: 0, marginTop: 4,
                      }}
                    />
                    {!isLast && (
                      <div style={{
                        width: 2, flex: 1, marginTop: 4, minHeight: 24,
                        background: isWalk
                          ? "repeating-linear-gradient(180deg, #C7C7CC 0, #C7C7CC 4px, transparent 4px, transparent 8px)"
                          : isPassed ? transitColor : isActive ? `linear-gradient(${transitColor}, #EEEEED)` : "#EEEEED",
                        transition: "background 0.4s ease",
                      }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: 4, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      {isWalk && <Footprints size={14} color="#8E8E93" strokeWidth={1.5} />}
                      {isTransfer && <span style={{ fontSize: 12 }}>🔄</span>}
                      {!isWalk && !isTransfer && step.type === "transit" && (
                        <Train size={14} color={isActive ? transitColor : (step.iconColor ?? "#1A6FBF")} strokeWidth={1.5} />
                      )}
                      {(step.type === "depart" || step.type === "arrive") && (
                        <MapPin size={14} color={step.iconColor ?? "#2A9D6F"} strokeWidth={1.5} />
                      )}
                      <p style={{
                        fontSize: isActive ? 16 : 14,
                        fontWeight: isActive ? 600 : isDestination ? 600 : 400,
                        color: isPassed ? "#8E8E93" : "#1C1C1E",
                        margin: 0, letterSpacing: -0.1,
                        transition: "font-size 0.3s ease",
                      }}>
                        {step.title}
                      </p>
                    </div>
                    <p style={{ fontSize: 12, color: isPassed ? "#C7C7CC" : "#3C3C43", margin: "0 0 4px" }}>
                      {step.subtitle}
                    </p>
                    {step.badge && !isPassed && (
                      <div style={{ marginBottom: 4 }}>
                        <TransitBadge type={step.badge} />
                      </div>
                    )}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          backgroundColor: transitColor, color: "#FFFFFF",
                          fontSize: 11, fontWeight: 600, padding: "3px 10px",
                          borderRadius: 100, display: "inline-block",
                        }}
                      >
                        Sekarang
                      </motion.span>
                    )}
                    {isPassed && (
                      <span style={{ color: "#2A9D6F", fontSize: 11, fontWeight: 500 }}>
                        ✓ Selesai
                      </span>
                    )}
                  </div>

                  {/* Time */}
                  <span style={{
                    fontSize: 12, fontWeight: 500,
                    color: isActive ? transitColor : isPassed ? "#C7C7CC" : "#8E8E93",
                    flexShrink: 0, marginTop: 4, fontVariantNumeric: "tabular-nums",
                    transition: "color 0.3s ease",
                  }}>
                    {step.time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Density card */}
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{
            backgroundColor: "#FFFFFF", borderRadius: 12, padding: "12px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={16} color="#8E8E93" strokeWidth={1.5} />
              <span style={{ fontSize: 15, fontWeight: 400, color: "#1C1C1E" }}>Kepadatan</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3].map((seg) => (
                  <div key={seg} style={{
                    width: 20, height: 6, borderRadius: 3,
                    backgroundColor: seg <= densityConfig[route.density].fill
                      ? densityConfig[route.density].color : "#EEEEED",
                  }} />
                ))}
              </div>
              <span style={{ fontSize: 11, fontWeight: 400, color: densityConfig[route.density].color }}>
                {densityConfig[route.density].label}
              </span>
            </div>
          </div>
        </div>

        {/* Demo controls */}
        <div style={{ padding: "16px 20px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setShowAlert(!showAlert)}
            style={{
              padding: "6px 12px", backgroundColor: "transparent",
              border: "1px solid #EEEEED", borderRadius: 8,
              fontSize: 11, color: "#8E8E93", fontFamily: "'Poppins', sans-serif", cursor: "pointer",
            }}
          >
            {showAlert ? "Sembunyikan" : "Simulasi"} gangguan
          </button>
          <button
            onClick={() => activeStepIdx < route.steps.length - 1 && setActiveStepIdx((i) => i + 1)}
            style={{
              padding: "6px 12px", backgroundColor: "transparent",
              border: "1px solid #EEEEED", borderRadius: 8,
              fontSize: 11, color: "#8E8E93", fontFamily: "'Poppins', sans-serif", cursor: "pointer",
            }}
          >
            Langkah berikutnya →
          </button>
          <button
            onClick={() => setShowArrivalSheet(true)}
            style={{
              padding: "6px 12px", backgroundColor: "transparent",
              border: "1px solid #EEEEED", borderRadius: 8,
              fontSize: 11, color: "#8E8E93", fontFamily: "'Poppins', sans-serif", cursor: "pointer",
            }}
          >
            Simulasi tiba
          </button>
          <button
            onClick={() => setShowDisruptionSheet(true)}
            style={{
              padding: "6px 12px", backgroundColor: "transparent",
              border: "1px solid #EEEEED", borderRadius: 8,
              fontSize: 11, color: "#8E8E93", fontFamily: "'Poppins', sans-serif", cursor: "pointer",
            }}
          >
            Simulasi reroute
          </button>
        </div>
      </div>

      {/* Stop Navigation Button */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px 20px", backgroundColor: "#F7F7F5" }}>
        <button
          onClick={() => setShowStopDialog(true)}
          style={{
            width: "100%", height: 52, backgroundColor: "#C9423A", color: "#FFFFFF",
            fontSize: 15, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
            borderRadius: 16, border: "none", cursor: "pointer",
          }}
        >
          Hentikan Navigasi
        </button>
      </div>

      {/* Stop confirmation */}
      <ConfirmationDialog
        visible={showStopDialog}
        title="Hentikan Navigasi?"
        description="Navigasi yang sedang berjalan akan dihentikan. Kamu bisa memulai rute baru kapan saja."
        confirmLabel="Hentikan"
        cancelLabel="Lanjutkan"
        variant="destructive"
        onConfirm={handleStopNavigation}
        onCancel={() => setShowStopDialog(false)}
      />

      {/* Arrival sheet */}
      <BottomSheet visible={showArrivalSheet} height="small" onDismiss={() => setShowArrivalSheet(false)}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1C1E", margin: "0 0 4px", letterSpacing: -0.1 }}>
            Bersiap turun di {destination}
          </h2>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: "0 0 16px" }}>
            Estimasi {etaMins <= 2 ? etaMins : 2} menit lagi
          </p>
          <button
            onClick={handleArrival}
            style={{
              width: "100%", height: 48, backgroundColor: "#2A9D6F", color: "white",
              fontSize: 15, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
              borderRadius: 12, border: "none", cursor: "pointer",
            }}
          >
            Saya sudah tiba
          </button>
        </div>
      </BottomSheet>

      {/* Disruption sheet */}
      <BottomSheet visible={showDisruptionSheet} height="medium" onDismiss={() => setShowDisruptionSheet(false)}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <AlertTriangle size={16} color="#C9423A" strokeWidth={1.5} />
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1C1C1E", margin: 0 }}>Gangguan Terdeteksi</h3>
          </div>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#3C3C43", margin: "0 0 20px", lineHeight: 1.5 }}>
            Keterlambatan terdeteksi pada rute {route.from} → {route.to}. Rute alternatif tersedia.
          </p>
          <button
            onClick={() => { setShowDisruptionSheet(false); navigate("/detail-gangguan"); }}
            style={{
              width: "100%", height: 48, backgroundColor: "#1A6FBF", color: "white",
              fontSize: 15, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
              borderRadius: 12, border: "none", cursor: "pointer", marginBottom: 10,
            }}
          >
            Terima Rute Baru
          </button>
          <button
            onClick={() => setShowDisruptionSheet(false)}
            style={{
              width: "100%", height: 44, backgroundColor: "transparent", color: "#3C3C43",
              fontSize: 15, fontWeight: 400, fontFamily: "'Poppins', sans-serif",
              border: "none", cursor: "pointer",
            }}
          >
            Pertahankan Rute Lama
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
