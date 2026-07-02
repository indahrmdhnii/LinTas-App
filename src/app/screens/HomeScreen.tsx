import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Bell, Search, Home, Building2, MapPin, Plus, RefreshCw } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { TransitBadge } from "../components/TransitBadge";
import { AlertBanner } from "../components/AlertBanner";
import { VoiceButton } from "../components/VoiceButton";
import { GuestModeBanner } from "../components/GuestModeBanner";
import { useAppContext } from "../context/AppContext";
import { ROUTE_DATABASE } from "../data/routeData";
import { motion } from "motion/react";
import type { SavedLocation } from "../context/AppContext";

const recentTrips = [
  { id: 1, transit: "MRT" as const, from: "Blok M", to: "Bundaran HI", info: "Kemarin  ·  28 mnt" },
  { id: 2, transit: "KRL" as const, from: "Depok", to: "Gambir", info: "2 hari lalu  ·  45 mnt" },
  { id: 3, transit: "TransJakarta" as const, from: "Kalideres", to: "Harmoni", info: "3 hari lalu  ·  55 mnt" },
];

function LocationIcon({ iconKey, color, size = 20 }: { iconKey: SavedLocation["iconKey"]; color: string; size?: number }) {
  const map = { home: Home, work: Building2, other: MapPin };
  const Icon = map[iconKey] ?? MapPin;
  return <Icon size={size} color={color} strokeWidth={1.5} />;
}

export function HomeScreen() {
  const navigate = useNavigate();
  const { isGuest, triggerTutorial, setSelectedRoute, savedLocations } = useAppContext();
  const [showDisruption, setShowDisruption] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => triggerTutorial(), 600);
    return () => clearTimeout(timer);
  }, [triggerTutorial]);

  const greeting = isGuest ? "Mau ke mana?" : "Mau ke mana, Indah?";

  const handleTripClick = (trip: typeof recentTrips[0]) => {
    const found = ROUTE_DATABASE.find(
      (r) => r.from === trip.from && r.to === trip.to
    );
    if (found) {
      setSelectedRoute(found);
      navigate("/detail-route");
    } else {
      navigate("/route-search");
    }
  };

  const handleSavedLocClick = (loc: { label: string; address: string }) => {
    // Pre-fill destination and search — for now navigate to route search
    navigate("/route-search");
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Guest Mode Banner — full width at top */}
      {isGuest && <GuestModeBanner />}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 120 }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93" }}>
              Senin, 21 April 2026
            </span>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                padding: 4,
              }}
            >
              <Bell size={24} color="#3C3C43" strokeWidth={1.5} />
              {!isGuest && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    width: 8,
                    height: 8,
                    backgroundColor: "#C9423A",
                    borderRadius: "50%",
                    border: "1.5px solid #F7F7F5",
                  }}
                />
              )}
            </button>
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#1C1C1E",
              margin: "4px 0 0",
              letterSpacing: -0.2,
            }}
          >
            {greeting}
          </h1>
        </div>

        {/* Search Bar */}
        <div style={{ padding: "16px 20px 0" }}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/route-search")}
            style={{
              width: "100%",
              height: 52,
              backgroundColor: "#FFFFFF",
              borderRadius: 100,
              border: "none",
              boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <Search size={20} color="#8E8E93" strokeWidth={1.5} />
            <span style={{ fontSize: 15, fontWeight: 400, color: "#8E8E93" }}>
              {isGuest ? "Masukkan lokasi asal secara manual" : "Cari tujuan perjalanan..."}
            </span>
          </motion.button>
        </div>

        {/* Alert Gangguan (dismissible) */}
        {showDisruption && (
          <div style={{ padding: "16px 20px 0" }}>
            <AlertBanner
              severity="warning"
              message="KRL Bogor Line"
              subMessage="Keterlambatan estimasi 15 menit di Cawang"
              actionLabel="Lihat alternatif"
              onAction={() => navigate("/detail-gangguan")}
            />
          </div>
        )}

        {/* Saved Locations */}
        <div style={{ padding: "24px 20px 0" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#8E8E93",
              textTransform: "uppercase",
              letterSpacing: 1,
              margin: "0 0 10px",
            }}
          >
            TERSIMPAN
          </p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {!isGuest ? (
              <>
                {savedLocations.map((loc) => (
                  <motion.div
                    key={loc.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleSavedLocClick(loc)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 12,
                      padding: "12px 16px",
                      boxShadow: "0 1px 4px rgba(28,28,30,0.04)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      minWidth: 110,
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  >
                    <LocationIcon iconKey={loc.iconKey} color={loc.color} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{loc.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93" }}>{loc.address.split(",")[0]}</span>
                  </motion.div>
                ))}
              </>
            ) : (
              <div
                style={{
                  backgroundColor: "#FFF3E0",
                  borderRadius: 12,
                  padding: "12px 16px",
                  flexShrink: 0,
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: 0 }}>
                  Fitur tidak tersedia di mode tamu
                </p>
              </div>
            )}
            <div
              style={{
                backgroundColor: "transparent",
                borderRadius: 12,
                padding: "12px 16px",
                border: "1.5px dashed #EEEEED",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 90,
                flexShrink: 0,
                alignItems: "center",
                justifyContent: "center",
                cursor: isGuest ? "not-allowed" : "pointer",
                opacity: isGuest ? 0.4 : 1,
              }}
              onClick={() => !isGuest && navigate("/tersimpan")}
            >
              <Plus size={20} color="#8E8E93" strokeWidth={1.5} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93" }}>Tambah</span>
            </div>
          </div>
        </div>

        {/* Recent Trips */}
        <div style={{ padding: "24px 20px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#8E8E93",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              PERJALANAN TERAKHIR
            </span>
            {!isGuest && (
              <button
                onClick={() => navigate("/tersimpan")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#1A6FBF",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Lihat semua
              </button>
            )}
          </div>

          {isGuest ? (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 400, color: "#8E8E93", margin: 0 }}>
                Login untuk melihat riwayat perjalanan
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentTrips.map((trip) => (
                <motion.div
                  key={trip.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTripClick(trip)}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 16,
                    padding: 16,
                    boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <TransitBadge type={trip.transit} />
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1C1C1E",
                      margin: "0 0 4px",
                      letterSpacing: -0.1,
                    }}
                  >
                    {trip.from} → {trip.to}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 400, color: "#3C3C43", margin: 0 }}>
                    {trip.info}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Last updated */}
        <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 6 }}>
          <RefreshCw size={12} color="#8E8E93" strokeWidth={1.5} />
          <span style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93" }}>Diperbarui 30 dtk lalu</span>
        </div>
      </div>

      <VoiceButton />
      <BottomNav />
    </div>
  );
}