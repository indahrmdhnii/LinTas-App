import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft, Bookmark, DoorOpen, Train, RefreshCw, Users,
  Navigation, Flag, Info,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { TransitBadge, StatusChip } from "../components/TransitBadge";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const departures = [
  { id: 1, direction: "Arah Lebak Bulus", eta: 3, status: "on-time" as const, density: "penuh" as const },
  { id: 2, direction: "Arah Bundaran HI", eta: 8, status: "on-time" as const, density: "sedang" as const },
  { id: 3, direction: "Arah Lebak Bulus", eta: 14, status: "on-time" as const, density: "rendah" as const },
  { id: 4, direction: "Arah Bundaran HI", eta: 19, status: "on-time" as const, density: "rendah" as const },
];

// Per-coach density for each departure
const coachDensityData: Record<number, Array<{ id: number; label: string; density: "rendah" | "sedang" | "tinggi" | "penuh" }>> = {
  1: [
    { id: 1, label: "K1", density: "penuh" },
    { id: 2, label: "K2", density: "penuh" },
    { id: 3, label: "K3", density: "tinggi" },
    { id: 4, label: "K4", density: "sedang" },
    { id: 5, label: "K5", density: "rendah" },
    { id: 6, label: "K6", density: "rendah" },
  ],
  2: [
    { id: 1, label: "K1", density: "sedang" },
    { id: 2, label: "K2", density: "sedang" },
    { id: 3, label: "K3", density: "tinggi" },
    { id: 4, label: "K4", density: "rendah" },
    { id: 5, label: "K5", density: "rendah" },
    { id: 6, label: "K6", density: "rendah" },
  ],
  3: [
    { id: 1, label: "K1", density: "rendah" },
    { id: 2, label: "K2", density: "rendah" },
    { id: 3, label: "K3", density: "sedang" },
    { id: 4, label: "K4", density: "rendah" },
    { id: 5, label: "K5", density: "rendah" },
    { id: 6, label: "K6", density: "rendah" },
  ],
  4: [
    { id: 1, label: "K1", density: "rendah" },
    { id: 2, label: "K2", density: "rendah" },
    { id: 3, label: "K3", density: "rendah" },
    { id: 4, label: "K4", density: "rendah" },
    { id: 5, label: "K5", density: "rendah" },
    { id: 6, label: "K6", density: "rendah" },
  ],
};

const densityConfig = {
  rendah: { color: "#2A9D6F", bg: "#E8F8F2", label: "Rendah", fill: 1 },
  sedang: { color: "#D97B2A", bg: "#FFF3E0", label: "Sedang", fill: 2 },
  tinggi: { color: "#C9423A", bg: "#FFEBEA", label: "Tinggi", fill: 3 },
  penuh: { color: "#C9423A", bg: "#FFEBEA", label: "Penuh ⚠️", fill: 3 },
};

export function StationScreen() {
  const navigate = useNavigate();
  const { showSnackbar } = useAppContext();
  const [expandedDep, setExpandedDep] = useState<number | null>(1); // first one open by default
  const [etaCountdown, setEtaCountdown] = useState<Record<number, number>>(
    Object.fromEntries(departures.map((d) => [d.id, d.eta]))
  );
  const [lastRefresh, setLastRefresh] = useState(0);

  // Simulate countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLastRefresh((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    showSnackbar("Data diperbarui", "success");
    setLastRefresh(0);
  };

  const expandedCoaches = expandedDep ? coachDensityData[expandedDep] : null;

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Blue header */}
      <div style={{ backgroundColor: "#1A6FBF", padding: "12px 20px 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => navigate("/home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <ChevronLeft size={24} color="white" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => showSnackbar("Stasiun Sudirman disimpan", "success")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
          >
            <Bookmark size={24} color="white" strokeWidth={1.5} />
          </button>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 600, color: "white", margin: "0 0 4px", letterSpacing: -0.2 }}>
          Stasiun Sudirman
        </h1>
        <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.7)", margin: "0 0 16px" }}>
          MRT Jakarta · Lebak Bulus Line
        </p>

        {/* Info chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { icon: DoorOpen, label: "Pintu 2A" },
            { icon: Train, label: "Peron 2" },
          ].map((chip, i) => {
            const Icon = chip.icon;
            return (
              <div key={i} style={{
                backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 100,
                padding: "6px 12px", display: "flex", alignItems: "center", gap: 6,
              }}>
                <Icon size={14} color="white" strokeWidth={1.5} />
                <span style={{ fontSize: 13, fontWeight: 500, color: "white" }}>{chip.label}</span>
              </div>
            );
          })}
          <div style={{
            backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 100,
            padding: "6px 12px", display: "flex", alignItems: "center", gap: 6,
          }}>
            <Users size={14} color="white" strokeWidth={1.5} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "white" }}>Akses ada</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-safe-scroll" style={{ backgroundColor: "#F7F7F5" }}>
        {/* Header row */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1 }}>
              KEBERANGKATAN BERIKUTNYA
            </span>
            <button
              onClick={handleRefresh}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
            >
              <RefreshCw size={12} color="#1A6FBF" strokeWidth={1.5} />
              <span style={{ fontSize: 11, color: "#1A6FBF", fontFamily: "'Poppins', sans-serif" }}>{lastRefresh}s lalu</span>
            </button>
          </div>

          {/* Density legend */}
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            {Object.entries(densityConfig).slice(0, 3).map(([key, cfg]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: cfg.color }} />
                <span style={{ fontSize: 10, color: "#8E8E93", fontFamily: "'Poppins', sans-serif" }}>{cfg.label}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
              <Info size={12} color="#8E8E93" strokeWidth={1.5} />
              <span style={{ fontSize: 10, color: "#8E8E93" }}>Ketuk untuk detail gerbong</span>
            </div>
          </div>
        </div>

        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          {departures.map((dep, i) => {
            const cfg = densityConfig[dep.density];
            const isExpanded = expandedDep === dep.id;
            const coaches = coachDensityData[dep.id];

            return (
              <motion.div
                key={dep.id}
                layout
                style={{
                  backgroundColor: "#FFFFFF", borderRadius: 16,
                  boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
                  opacity: i > 1 ? 0.72 : 1,
                  overflow: "hidden",
                  border: isExpanded ? `1.5px solid ${cfg.color}30` : "1.5px solid transparent",
                }}
              >
                {/* Main row — tappable */}
                <button
                  onClick={() => setExpandedDep(isExpanded ? null : dep.id)}
                  style={{
                    width: "100%", padding: "14px 16px", background: "none", border: "none",
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <TransitBadge type="MRT" />
                      <span style={{ fontSize: 15, fontWeight: 400, color: "#1C1C1E" }}>{dep.direction}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{
                        fontSize: 22, fontWeight: 600, color: "#1C1C1E",
                        margin: "0 0 4px", letterSpacing: -0.2, fontVariantNumeric: "tabular-nums",
                      }}>
                        {dep.eta} mnt
                      </p>
                      <StatusChip status={dep.status} />
                    </div>
                  </div>

                  {/* Overall density bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                    <Users size={12} color="#8E8E93" strokeWidth={1.5} />
                    <div style={{ display: "flex", gap: 3 }}>
                      {[1, 2, 3].map((seg) => (
                        <div key={seg} style={{
                          width: 20, height: 5, borderRadius: 3,
                          backgroundColor: seg <= cfg.fill ? cfg.color : "#EEEEED",
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 500, color: cfg.color }}>{cfg.label}</span>
                    <span style={{ fontSize: 11, color: "#8E8E93", marginLeft: "auto" }}>
                      {isExpanded ? "▲ Sembunyikan" : "▼ Detail gerbong"}
                    </span>
                  </div>
                </button>

                {/* Per-coach breakdown */}
                <AnimatePresence>
                  {isExpanded && coaches && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{
                        borderTop: "1px solid #EEEEED",
                        padding: "12px 16px 14px",
                        backgroundColor: "#FAFAFA",
                      }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#8E8E93", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 0.5 }}>
                          KEPADATAN PER GERBONG
                        </p>

                        {/* Train visualization */}
                        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", overflowX: "auto", paddingBottom: 4 }}>
                          {coaches.map((coach) => {
                            const c = densityConfig[coach.density];
                            return (
                              <div
                                key={coach.id}
                                style={{
                                  display: "flex", flexDirection: "column", alignItems: "center",
                                  gap: 4, minWidth: 48,
                                }}
                              >
                                {/* Coach car */}
                                <div style={{
                                  width: 46, height: 32, borderRadius: 8,
                                  backgroundColor: c.bg,
                                  border: `2px solid ${c.color}`,
                                  display: "flex", flexDirection: "column",
                                  alignItems: "center", justifyContent: "center",
                                  gap: 2, position: "relative",
                                }}>
                                  {/* Density fill */}
                                  <div style={{
                                    position: "absolute", bottom: 0, left: 0, right: 0,
                                    height: `${(c.fill / 3) * 100}%`,
                                    backgroundColor: c.color, opacity: 0.18,
                                    borderRadius: "0 0 6px 6px",
                                  }} />
                                  <Train size={12} color={c.color} strokeWidth={1.5} />
                                  {coach.density === "penuh" && (
                                    <span style={{ fontSize: 8, position: "absolute", top: -7, right: -4 }}>⚠️</span>
                                  )}
                                </div>

                                {/* Coach number */}
                                <span style={{ fontSize: 10, fontWeight: 700, color: "#3C3C43" }}>
                                  {coach.label}
                                </span>

                                {/* Density dots */}
                                <div style={{ display: "flex", gap: 2 }}>
                                  {[1, 2, 3].map((seg) => (
                                    <div key={seg} style={{
                                      width: 6, height: 6, borderRadius: "50%",
                                      backgroundColor: seg <= c.fill ? c.color : "#EEEEED",
                                    }} />
                                  ))}
                                </div>

                                {/* Label */}
                                <span style={{ fontSize: 9, color: c.color, fontWeight: 500, textAlign: "center" }}>
                                  {c.label.replace(" ⚠️", "")}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Recommendation */}
                        {dep.density === "penuh" && (
                          <div style={{
                            marginTop: 10, padding: "8px 12px",
                            backgroundColor: "#EAF4FF", borderRadius: 10,
                            display: "flex", alignItems: "center", gap: 6,
                          }}>
                            <Info size={14} color="#1A6FBF" strokeWidth={1.5} />
                            <p style={{ fontSize: 12, color: "#1A6FBF", margin: 0, fontWeight: 500 }}>
                              Gerbong K4–K6 lebih lengang. Disarankan pindah ke belakang.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, margin: "24px 20px 0" }}>
          <button
            onClick={() => showSnackbar("Stasiun Sudirman disimpan", "success")}
            style={{
              flex: 1, height: 52, backgroundColor: "#FFFFFF", color: "#1A6FBF",
              fontSize: 15, fontWeight: 400, fontFamily: "'Poppins', sans-serif",
              borderRadius: 16, border: "1.5px solid #1A6FBF", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <Bookmark size={20} strokeWidth={1.5} />
            Simpan
          </button>
          <button
            onClick={() => navigate("/route-search")}
            style={{
              flex: 1, height: 52, backgroundColor: "#1A6FBF", color: "#FFFFFF",
              fontSize: 15, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
              borderRadius: 16, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <Navigation size={20} strokeWidth={1.5} />
            Buat Rute
          </button>
        </div>

        {/* Report */}
        <div style={{ textAlign: "center", margin: "16px 0 24px" }}>
          <button
            onClick={() => navigate("/report")}
            style={{
              background: "none", border: "none", fontSize: 13, fontWeight: 500,
              color: "#8E8E93", fontFamily: "'Poppins', sans-serif", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, margin: "0 auto",
            }}
          >
            <Flag size={14} strokeWidth={1.5} />
            Laporkan Masalah
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
