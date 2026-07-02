import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft, MapPin, Train, Navigation, Clock, DollarSign,
  Users, ChevronDown, ChevronUp, Footprints,
} from "lucide-react";
import { TransitBadge } from "../components/TransitBadge";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { ROUTE_DATABASE } from "../data/routeData";
import type { RouteData } from "../context/AppContext";

// ─── Mock per-coach density data ──────────────────────────────────────────────
function generateCoachDensity(overallDensity: string) {
  const base = overallDensity === "rendah" ? 0 : overallDensity === "sedang" ? 1 : 2;
  const levels: Array<"rendah" | "sedang" | "tinggi" | "penuh"> = ["rendah", "sedang", "tinggi", "penuh"];
  const numCoaches = 6;
  return Array.from({ length: numCoaches }, (_, i) => {
    const jitter = Math.floor(Math.random() * 2) - 1; // -1, 0, or +1
    const idx = Math.max(0, Math.min(3, base + jitter + (i === 2 ? 1 : 0))); // coach 3 is busier
    return {
      id: i + 1,
      label: `K${i + 1}`,
      density: levels[idx],
    };
  });
}

const densityConfig = {
  rendah: { color: "#2A9D6F", bg: "#E8F8F2", label: "Rendah", fill: 1 },
  sedang: { color: "#D97B2A", bg: "#FFF3E0", label: "Sedang", fill: 2 },
  tinggi: { color: "#C9423A", bg: "#FFEBEA", label: "Tinggi", fill: 3 },
  penuh: { color: "#C9423A", bg: "#FFEBEA", label: "Penuh ⚠️", fill: 3 },
};

// ─── Multi-modal map node types ────────────────────────────────────────────────
type MapNodeType = "start" | "station" | "transfer" | "walk" | "end";
interface MapNode {
  id: number;
  label: string;
  type: MapNodeType;
  badge?: "MRT" | "KRL" | "TransJakarta" | "LRT" | "JakLingko";
  isTransfer?: boolean;
  walkMin?: number;
}

function buildMapNodes(route: RouteData): MapNode[] {
  return route.steps.map((step, i) => ({
    id: step.id,
    label: step.title,
    type: i === 0 ? "start" : step.type === "arrive" ? "end"
      : step.type === "transfer" ? "transfer"
      : step.isWalk ? "walk" : "station",
    badge: step.badge,
    isTransfer: step.type === "transfer",
    walkMin: step.isWalk ? 3 : undefined,
  }));
}

const nodeColors: Record<MapNodeType, string> = {
  start: "#2A9D6F",
  station: "#1A6FBF",
  transfer: "#D97B2A",
  walk: "#8E8E93",
  end: "#C9423A",
};

// ─── Fallback default route ─────────────────────────────────────────────────────
const DEFAULT_ROUTE: RouteData = ROUTE_DATABASE[7]; // Bundaran HI → Lebak Bulus

export function DetailRouteScreen() {
  const navigate = useNavigate();
  const { selectedRoute, setSelectedRoute } = useAppContext();
  const route = selectedRoute ?? DEFAULT_ROUTE;

  const [showDensity, setShowDensity] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [showTimeline, setShowTimeline] = useState(true);

  // Stable per-coach density (regenerate only when route changes)
  const coaches = useMemo(
    () => generateCoachDensity(route.density),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [route.id]
  );
  const mapNodes = useMemo(() => buildMapNodes(route), [route.id]);
  const overallConfig = densityConfig[route.density];

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#FFFFFF", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: 12,
        flexShrink: 0, boxShadow: "0 1px 4px rgba(28,28,30,0.04)",
      }}>
        <button
          onClick={() => navigate("/route-search")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}
        >
          <ChevronLeft size={24} color="#1C1C1E" strokeWidth={1.5} />
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1C1C1E", margin: 0, letterSpacing: -0.1 }}>
            {route.from} → {route.to}
          </h2>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: "2px 0 0" }}>
            Via {route.via}
          </p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 96 }}>
        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: "#FFFFFF", borderRadius: 16,
            margin: "16px 20px 0", padding: 16,
            boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
            display: "flex", gap: 16,
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
              <Clock size={16} color="#1A6FBF" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 22, fontWeight: 600, color: "#1C1C1E", margin: "0 0 2px", letterSpacing: -0.2, fontVariantNumeric: "tabular-nums" }}>
              {route.duration}
            </p>
            <p style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", margin: 0 }}>Durasi</p>
          </div>
          <div style={{ width: 1, backgroundColor: "#EEEEED" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
              <TransitBadge type={route.transit} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", margin: "4px 0 0" }}>
              {route.transfers > 0 ? `${route.transfers} transfer` : "Langsung"}
            </p>
          </div>
          <div style={{ width: 1, backgroundColor: "#EEEEED" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
              <DollarSign size={16} color="#2A9D6F" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 17, fontWeight: 600, color: "#1C1C1E", margin: "0 0 2px", letterSpacing: -0.1 }}>
              {route.price}
            </p>
            <p style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", margin: 0 }}>Biaya</p>
          </div>
        </motion.div>

        {/* ── Feature 1: Per-coach density ──────────────────────────────── */}
        <div style={{ margin: "12px 20px 0" }}>
          <button
            onClick={() => setShowDensity((v) => !v)}
            style={{
              width: "100%", display: "flex", justifyContent: "space-between",
              alignItems: "center", background: "none", border: "none", cursor: "pointer",
              padding: "0 0 8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Users size={14} color="#8E8E93" strokeWidth={1.5} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1 }}>
                KEPADATAN PER GERBONG
              </span>
            </div>
            {showDensity
              ? <ChevronUp size={16} color="#8E8E93" strokeWidth={1.5} />
              : <ChevronDown size={16} color="#8E8E93" strokeWidth={1.5} />
            }
          </button>

          <AnimatePresence>
            {showDensity && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{
                  backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16,
                  boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
                }}>
                  {/* Overall density badge */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #EEEEED",
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 400, color: "#3C3C43" }}>
                      Kepadatan keseluruhan
                    </span>
                    <span style={{
                      fontSize: 12, fontWeight: 600, color: overallConfig.color,
                      backgroundColor: overallConfig.bg, padding: "4px 12px", borderRadius: 100,
                    }}>
                      {overallConfig.label}
                    </span>
                  </div>

                  {/* Per-coach grid */}
                  <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                    {coaches.map((coach) => {
                      const cfg = densityConfig[coach.density];
                      return (
                        <div
                          key={coach.id}
                          style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            gap: 6, minWidth: 44, flexShrink: 0,
                          }}
                        >
                          {/* Coach icon */}
                          <div style={{
                            width: 44, height: 28, borderRadius: 8,
                            backgroundColor: cfg.bg,
                            border: `1.5px solid ${cfg.color}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            position: "relative",
                          }}>
                            <Train size={14} color={cfg.color} strokeWidth={1.5} />
                            {coach.density === "penuh" && (
                              <span style={{
                                position: "absolute", top: -6, right: -4,
                                fontSize: 10, lineHeight: 1,
                              }}>⚠️</span>
                            )}
                          </div>
                          {/* Density bar */}
                          <div style={{ display: "flex", gap: 2, flexDirection: "column", alignItems: "center" }}>
                            {[3, 2, 1].map((seg) => (
                              <div
                                key={seg}
                                style={{
                                  width: 20, height: 4, borderRadius: 2,
                                  backgroundColor: seg <= cfg.fill ? cfg.color : "#EEEEED",
                                }}
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 600, color: "#8E8E93" }}>
                            {coach.label}
                          </span>
                          <span style={{ fontSize: 9, fontWeight: 400, color: cfg.color, textAlign: "center" }}>
                            {cfg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tip */}
                  <p style={{ fontSize: 11, color: "#8E8E93", margin: "10px 0 0", textAlign: "center" }}>
                    💡 Gerbong K4–K6 biasanya lebih lengang
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Feature 2: Multi-modal map ─────────────────────────────────── */}
        <div style={{ margin: "12px 20px 0" }}>
          <button
            onClick={() => setShowMap((v) => !v)}
            style={{
              width: "100%", display: "flex", justifyContent: "space-between",
              alignItems: "center", background: "none", border: "none", cursor: "pointer",
              padding: "0 0 8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={14} color="#8E8E93" strokeWidth={1.5} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1 }}>
                PETA RUTE MULTI-MODA
              </span>
            </div>
            {showMap
              ? <ChevronUp size={16} color="#8E8E93" strokeWidth={1.5} />
              : <ChevronDown size={16} color="#8E8E93" strokeWidth={1.5} />
            }
          </button>

          <AnimatePresence>
            {showMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{
                  backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16,
                  boxShadow: "0 2px 8px rgba(28,28,30,0.06)", overflowX: "auto",
                }}>
                  {/* Horizontal multi-modal map */}
                  <div style={{ display: "flex", alignItems: "center", minWidth: mapNodes.length * 90, padding: "8px 0 16px" }}>
                    {mapNodes.map((node, i) => {
                      const isLast = i === mapNodes.length - 1;
                      const color = nodeColors[node.type];
                      return (
                        <div key={node.id} style={{ display: "flex", alignItems: "center", flex: isLast ? 0 : 1 }}>
                          {/* Node */}
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 72 }}>
                            {/* Icon */}
                            <div style={{
                              width: 36, height: 36, borderRadius: "50%",
                              backgroundColor: `${color}20`,
                              border: `2px solid ${color}`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                              boxShadow: node.type === "transfer" ? `0 0 0 3px ${color}30` : "none",
                            }}>
                              {node.type === "walk" || node.isWalk ? (
                                <Footprints size={16} color={color} strokeWidth={1.5} />
                              ) : node.type === "start" || node.type === "end" ? (
                                <MapPin size={16} color={color} strokeWidth={1.5} />
                              ) : node.type === "transfer" ? (
                                <span style={{ fontSize: 14 }}>🔄</span>
                              ) : (
                                <Train size={16} color={color} strokeWidth={1.5} />
                              )}
                            </div>

                            {/* Badge */}
                            {node.badge && (
                              <TransitBadge type={node.badge} />
                            )}
                            {node.type === "walk" && node.walkMin && (
                              <span style={{
                                fontSize: 9, fontWeight: 500, color: "#8E8E93",
                                backgroundColor: "#F7F7F5", padding: "2px 6px", borderRadius: 100,
                              }}>
                                {node.walkMin} mnt 🚶
                              </span>
                            )}
                            {node.type === "transfer" && (
                              <span style={{
                                fontSize: 9, fontWeight: 600, color: "#D97B2A",
                                backgroundColor: "#FFF3E0", padding: "2px 6px", borderRadius: 100,
                              }}>
                                Transfer
                              </span>
                            )}

                            {/* Label */}
                            <span style={{
                              fontSize: 10, fontWeight: 500, color: "#1C1C1E",
                              textAlign: "center", maxWidth: 68, lineHeight: 1.3,
                              overflow: "hidden", display: "-webkit-box",
                              WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any,
                            }}>
                              {node.label}
                            </span>
                          </div>

                          {/* Connector line */}
                          {!isLast && (
                            <div style={{
                              flex: 1, height: 2, minWidth: 16,
                              backgroundColor: mapNodes[i + 1].type === "walk" ? "#C7C7CC" : "#1A6FBF",
                              background: mapNodes[i + 1].type === "walk"
                                ? "repeating-linear-gradient(90deg, #C7C7CC 0, #C7C7CC 6px, transparent 6px, transparent 12px)"
                                : "#1A6FBF",
                              marginBottom: 38,
                            }} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", borderTop: "1px solid #EEEEED", paddingTop: 10 }}>
                    {[
                      { color: "#1A6FBF", label: "Transit", line: false },
                      { color: "#D97B2A", label: "Transfer", line: false },
                      { color: "#8E8E93", label: "Jalan kaki", line: true },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {item.line ? (
                          <div style={{ width: 16, height: 2, background: "repeating-linear-gradient(90deg, #8E8E93 0, #8E8E93 4px, transparent 4px, transparent 8px)" }} />
                        ) : (
                          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color }} />
                        )}
                        <span style={{ fontSize: 11, color: "#8E8E93" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Feature 3: Dynamic Timeline ───────────────────────────────── */}
        <div style={{ margin: "12px 20px 0" }}>
          <button
            onClick={() => setShowTimeline((v) => !v)}
            style={{
              width: "100%", display: "flex", justifyContent: "space-between",
              alignItems: "center", background: "none", border: "none", cursor: "pointer",
              padding: "0 0 8px",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1 }}>
              RENCANA PERJALANAN
            </span>
            {showTimeline
              ? <ChevronUp size={16} color="#8E8E93" strokeWidth={1.5} />
              : <ChevronDown size={16} color="#8E8E93" strokeWidth={1.5} />
            }
          </button>

          <AnimatePresence>
            {showTimeline && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ position: "relative" }}>
                  {route.steps.map((step, i) => {
                    const isLast = i === route.steps.length - 1;
                    const isActive = step.type === "transit";
                    const isDestination = step.type === "arrive";
                    const isTransfer = step.type === "transfer";
                    const isWalk = step.isWalk || step.type === "walk";

                    const dotColor = isDestination ? "#C9423A"
                      : isTransfer ? "#D97B2A"
                      : isActive ? "#1A6FBF"
                      : isWalk ? "#8E8E93"
                      : "#2A9D6F";

                    const lineColor = isActive ? "#1A6FBF" : isTransfer ? "#D97B2A" : "#EEEEED";

                    return (
                      <div key={step.id} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: isLast ? 0 : 20 }}>
                        {/* Timeline */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 16 }}>
                          <div style={{
                            width: isActive || isTransfer ? 14 : 12,
                            height: isActive || isTransfer ? 14 : 12,
                            borderRadius: "50%",
                            backgroundColor: dotColor,
                            flexShrink: 0, marginTop: 3,
                            border: isActive ? "2px solid #EAF4FF" : "none",
                            boxShadow: isActive ? "0 0 0 2px #1A6FBF" : isTransfer ? `0 0 0 2px ${dotColor}40` : "none",
                          }} />
                          {!isLast && (
                            <div style={{
                              width: 2, flex: 1,
                              backgroundColor: lineColor,
                              marginTop: 4, minHeight: 28,
                              background: isWalk
                                ? "repeating-linear-gradient(180deg, #C7C7CC 0, #C7C7CC 4px, transparent 4px, transparent 8px)"
                                : lineColor,
                            }} />
                          )}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, paddingBottom: 4 }}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                {isTransfer && <span style={{ fontSize: 14 }}>🔄</span>}
                                {isWalk && <Footprints size={14} color="#8E8E93" strokeWidth={1.5} />}
                                {!isTransfer && !isWalk && step.type !== "depart" && step.type !== "arrive" && (
                                  <Train size={14} color={step.iconColor ?? "#1A6FBF"} strokeWidth={1.5} />
                                )}
                                {(step.type === "depart" || step.type === "arrive") && (
                                  <MapPin size={14} color={step.iconColor ?? "#1A6FBF"} strokeWidth={1.5} />
                                )}
                                <p style={{
                                  fontSize: isActive ? 16 : 15,
                                  fontWeight: isActive || isDestination ? 600 : isTransfer ? 500 : 400,
                                  color: "#1C1C1E", margin: 0, letterSpacing: -0.1,
                                }}>
                                  {step.title}
                                </p>
                              </div>
                              <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: 0 }}>
                                {step.subtitle}
                              </p>
                              {step.badge && (
                                <div style={{ marginTop: 6 }}>
                                  <TransitBadge type={step.badge} />
                                </div>
                              )}
                            </div>
                            <span style={{
                              fontSize: 13, fontWeight: 500,
                              color: isActive ? "#1A6FBF" : isTransfer ? "#D97B2A" : "#3C3C43",
                              fontVariantNumeric: "tabular-nums",
                              marginLeft: 8, flexShrink: 0,
                            }}>
                              {step.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Alternative routes */}
        {(() => {
          const alternatives = ROUTE_DATABASE.filter(
            (r) => r.from === route.from && r.to === route.to && r.id !== route.id
          );
          if (alternatives.length === 0) return null;
          return (
            <div style={{ margin: "16px 20px 0" }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>
                RUTE ALTERNATIF
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {alternatives.map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => setSelectedRoute(alt)}
                    style={{
                      backgroundColor: "#FFFFFF", borderRadius: 12, padding: "12px 16px",
                      border: "1px solid #EEEEED", cursor: "pointer", textAlign: "left",
                      display: "flex", alignItems: "center", gap: 12,
                    }}
                  >
                    <TransitBadge type={alt.transit} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>{alt.duration}</span>
                      <span style={{ fontSize: 13, color: "#8E8E93", marginLeft: 8 }}>via {alt.transit}</span>
                    </div>
                    <span style={{ fontSize: 13, color: "#1A6FBF", fontWeight: 500 }}>{alt.price}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Bottom actions */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "12px 20px 20px", backgroundColor: "#FFFFFF",
        borderTop: "1px solid #EEEEED", display: "flex", flexDirection: "column", gap: 10,
      }}>
        <button
          onClick={() => navigate("/navigation")}
          style={{
            width: "100%", height: 52, backgroundColor: "#1A6FBF", color: "#FFFFFF",
            fontSize: 15, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
            borderRadius: 16, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <Navigation size={18} strokeWidth={1.5} />
          Mulai Navigasi
        </button>
        <button
          onClick={() => navigate("/route-search")}
          style={{
            width: "100%", height: 44, backgroundColor: "transparent", color: "#1A6FBF",
            fontSize: 15, fontWeight: 400, fontFamily: "'Poppins', sans-serif",
            border: "none", cursor: "pointer",
          }}
        >
          Pilih Rute Lain
        </button>
      </div>
    </div>
  );
}
