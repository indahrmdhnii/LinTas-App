import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, MapPin, ArrowUpDown, Clock, RefreshCw, Users, Navigation } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { TransitBadge, StatusChip, LabelChip } from "../components/TransitBadge";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { findRoutes } from "../data/routeData";
import type { RouteData } from "../context/AppContext";

const suggestions = [
  { type: "history", name: "Stasiun Sudirman", sub: "MRT Jakarta  ·  1.2 km" },
  { type: "history", name: "Stasiun Blok M", sub: "MRT Jakarta  ·  2.4 km" },
  { type: "location", name: "Bundaran HI", sub: "MRT Jakarta  ·  1.8 km" },
  { type: "location", name: "Stasiun Gambir", sub: "KRL Commuter  ·  3.1 km" },
  { type: "location", name: "Lebak Bulus", sub: "MRT Jakarta  ·  5.2 km" },
  { type: "location", name: "Depok", sub: "KRL Commuter  ·  18 km" },
  { type: "location", name: "Cawang", sub: "LRT Jabodebek  ·  6.1 km" },
];

const densityColorMap: Record<string, string> = {
  rendah: "#2A9D6F",
  sedang: "#D97B2A",
  tinggi: "#C9423A",
  penuh: "#C9423A",
};
const densityLabelMap: Record<string, string> = {
  rendah: "Rendah",
  sedang: "Sedang",
  tinggi: "Tinggi",
  penuh: "Penuh",
};

export function RouteSearchScreen() {
  const navigate = useNavigate();
  const { setSelectedRoute } = useAppContext();
  const [origin] = useState("Lokasi saat ini (GPS)");
  const [destination, setDestination] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSearch = (name: string) => {
    setDestination(name);
    setShowSuggestions(false);
    // Derive from-name: use "Blok M" as stand-in for current GPS
    const fromName = "Blok M";
    const found = findRoutes(fromName, name);
    setRoutes(found);
    setShowResults(true);
    setSelectedId(found[0]?.id ?? null);
  };

  const handleSelectRoute = (route: RouteData) => {
    setSelectedId(route.id);
    setSelectedRoute(route);
  };

  const handleNavigate = () => {
    const picked = routes.find((r) => r.id === selectedId) ?? routes[0];
    if (picked) {
      setSelectedRoute(picked);
      navigate("/detail-route");
    }
  };

  const filteredSuggestions = destination.length > 0
    ? suggestions.filter((s) => s.name.toLowerCase().includes(destination.toLowerCase()))
    : suggestions;

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Blue header */}
      <div style={{ backgroundColor: "#1A6FBF", padding: "16px 20px 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => navigate("/home")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
          >
            <ChevronLeft size={24} color="white" strokeWidth={1.5} />
          </button>
          <h2 style={{ fontSize: 18, fontWeight: 500, color: "white", margin: 0, letterSpacing: -0.1 }}>
            Cari Rute
          </h2>
        </div>

        {/* Input fields */}
        <div style={{ position: "relative" }}>
          {/* From */}
          <div style={{
            backgroundColor: "#FFFFFF", borderRadius: 12, padding: "12px 16px",
            boxShadow: "0 2px 8px rgba(28,28,30,0.06)", display: "flex",
            alignItems: "flex-start", gap: 12, marginBottom: 6,
          }}>
            <MapPin size={16} color="#2A9D6F" strokeWidth={1.5} style={{ marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 15, fontWeight: 400, color: "#1C1C1E", margin: 0 }}>{origin}</p>
              <p style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", margin: "2px 0 0" }}>Dideteksi otomatis</p>
            </div>
          </div>

          {/* Connector */}
          <div style={{
            position: "absolute", left: 23, top: 52,
            width: 2, height: 10, borderLeft: "2px dashed #EEEEED",
          }} />

          {/* To */}
          <div style={{
            backgroundColor: "#FFFFFF", borderRadius: 12, padding: "12px 16px",
            boxShadow: "0 2px 8px rgba(28,28,30,0.06)", display: "flex",
            alignItems: "center", gap: 12,
            border: showSuggestions ? "2px solid #1A6FBF" : "1px solid transparent",
          }}>
            <MapPin size={16} color="#C9423A" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Tujuan..."
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowSuggestions(true);
                setShowResults(false);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              style={{
                flex: 1, border: "none", outline: "none", fontSize: 15,
                fontFamily: "'Poppins', sans-serif",
                color: destination ? "#1C1C1E" : "#8E8E93", backgroundColor: "transparent",
              }}
            />
          </div>

          {/* Swap */}
          <button style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
            width: 32, height: 32, backgroundColor: "#F7F7F5", borderRadius: "50%",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ArrowUpDown size={16} color="#3C3C43" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "#F7F7F5", paddingBottom: 80 }}>
        {/* Autocomplete */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                backgroundColor: "#FFFFFF", margin: "12px 16px 0",
                borderRadius: 12, boxShadow: "0 4px 16px rgba(28,28,30,0.10)", overflow: "hidden",
              }}
            >
              {filteredSuggestions.map((s, i) => (
                <button
                  key={i}
                  onMouseDown={() => handleSearch(s.name)}
                  style={{
                    width: "100%", height: 52, padding: "0 16px",
                    display: "flex", alignItems: "center", gap: 12,
                    backgroundColor: "transparent", border: "none",
                    borderBottom: i < filteredSuggestions.length - 1 ? "1px solid #EEEEED" : "none",
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  {s.type === "history"
                    ? <Clock size={16} color="#8E8E93" strokeWidth={1.5} />
                    : <MapPin size={16} color="#8E8E93" strokeWidth={1.5} />
                  }
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 400, color: "#1C1C1E", margin: 0, fontFamily: "'Poppins', sans-serif" }}>{s.name}</p>
                    <p style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", margin: 0, fontFamily: "'Poppins', sans-serif" }}>{s.sub}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Route results */}
        <AnimatePresence>
          {showResults && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "20px 20px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", margin: 0, letterSpacing: -0.1 }}>
                    {routes.length} Rute Ditemukan
                  </h2>
                  <p style={{ fontSize: 13, color: "#8E8E93", margin: "2px 0 0" }}>
                    Blok M → {destination}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <RefreshCw size={12} color="#8E8E93" strokeWidth={1.5} />
                    <span style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93" }}>Diperbarui 30 dtk lalu</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {routes.map((route) => {
                  const isSelected = selectedId === route.id;
                  const dColor = densityColorMap[route.density];
                  const dLabel = densityLabelMap[route.density];
                  return (
                    <motion.div
                      key={route.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectRoute(route)}
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 16,
                        padding: 16,
                        boxShadow: isSelected
                          ? "0 4px 16px rgba(26,111,191,0.18)"
                          : "0 2px 8px rgba(28,28,30,0.06)",
                        cursor: "pointer",
                        borderLeft: isSelected ? "3px solid #1A6FBF" : "none",
                        outline: isSelected ? "1.5px solid #1A6FBF" : "none",
                        transition: "box-shadow 0.2s",
                      }}
                    >
                      {/* Top row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <TransitBadge type={route.transit} />
                          {route.walk && (
                            <span style={{
                              backgroundColor: "#F7F7F5", color: "#3C3C43", fontSize: 11,
                              fontWeight: 500, fontFamily: "'Poppins', sans-serif",
                              padding: "3px 10px", borderRadius: 100,
                            }}>
                              {route.walk}
                            </span>
                          )}
                          {route.transfers > 0 && (
                            <span style={{
                              backgroundColor: "#FFF3E0", color: "#D97B2A", fontSize: 11,
                              fontWeight: 500, fontFamily: "'Poppins', sans-serif",
                              padding: "3px 10px", borderRadius: 100,
                            }}>
                              {route.transfers} transfer
                            </span>
                          )}
                        </div>
                        {route.label && (
                          <LabelChip
                            label={route.label}
                            bg={route.labelColor === "#1A6FBF" ? "#EAF4FF" : "#E8F8F2"}
                            color={route.labelColor ?? "#1A6FBF"}
                          />
                        )}
                      </div>

                      {/* Duration */}
                      <p style={{ fontSize: 28, fontWeight: 600, color: "#1C1C1E", margin: "0 0 4px", letterSpacing: -0.3, fontVariantNumeric: "tabular-nums" }}>
                        {route.duration}
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 400, color: "#3C3C43", margin: "0 0 12px" }}>
                        {route.via}
                      </p>

                      {/* Moda icons */}
                      {route.modes.length > 1 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                          {route.modes.map((m, i) => (
                            <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              {m === "Jalan" ? (
                                <span style={{ fontSize: 11, color: "#8E8E93", fontWeight: 500 }}>🚶</span>
                              ) : (
                                <TransitBadge type={m as any} />
                              )}
                              {i < route.modes.length - 1 && (
                                <span style={{ fontSize: 11, color: "#C7C7CC" }}>→</span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ height: 1, backgroundColor: "#EEEEED", margin: "0 0 10px" }} />

                      {/* Density */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Users size={12} color="#8E8E93" strokeWidth={1.5} />
                        <span style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93" }}>Kepadatan: </span>
                        <div style={{ display: "flex", gap: 3 }}>
                          {[1, 2, 3].map((seg) => {
                            const fill = route.density === "rendah" ? 1 : route.density === "sedang" ? 2 : 3;
                            return (
                              <div key={seg} style={{
                                width: 14, height: 5, borderRadius: 3,
                                backgroundColor: seg <= fill ? dColor : "#EEEEED",
                              }} />
                            );
                          })}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 500, color: dColor }}>{dLabel}</span>
                        <span style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", marginLeft: "auto" }}>{route.price}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Start Navigation */}
              <button
                onClick={handleNavigate}
                style={{
                  width: "100%", height: 52, backgroundColor: "#1A6FBF", color: "#FFFFFF",
                  fontSize: 15, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
                  borderRadius: 16, border: "none", cursor: "pointer", marginTop: 20,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                Lihat Detail Rute
                <Navigation size={20} strokeWidth={1.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!showResults && !showSuggestions && (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <MapPin size={40} color="#EEEEED" strokeWidth={1.5} style={{ margin: "0 auto 16px" }} />
            <p style={{ fontSize: 15, fontWeight: 400, color: "#8E8E93" }}>
              Masukkan tujuan untuk mencari rute
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
