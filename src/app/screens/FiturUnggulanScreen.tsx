import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft, Bell, Train, Navigation, Clock, Map, WifiOff,
  Wifi, AlertTriangle, CheckCircle, ArrowRight, RefreshCw,
  Download, Zap, TrendingUp, Users, Activity, ChevronRight,
} from "lucide-react";

// ─── 1. PUSH NOTIFICATION ──────────────────────────────────────────────────

const NOTIF_DATA = [
  {
    id: 1,
    icon: "⚠️",
    type: "Gangguan",
    typeColor: "#C9423A",
    title: "KRL Bogor Line terganggu",
    body: "Keterlambatan 18 menit di Stasiun Cawang. Rute alternatif tersedia.",
    time: "Baru saja",
    action: "Lihat Alternatif",
  },
  {
    id: 2,
    icon: "🕐",
    type: "Pengingat ETA",
    typeColor: "#1A6FBF",
    title: "MRT tiba dalam 3 menit",
    body: "Kereta menuju Bundaran HI akan tiba di Blok M. Segera menuju peron.",
    time: "1 mnt lalu",
    action: "Lihat Detail",
  },
  {
    id: 3,
    icon: "🚌",
    type: "Kepadatan",
    typeColor: "#D97B2A",
    title: "Bus 6B sangat penuh",
    body: "Kepadatan tinggi di koridor Blok M–Harmoni. Pertimbangkan armada berikutnya.",
    time: "2 mnt lalu",
    action: "Armada Berikutnya",
  },
];

function PushNotifDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = () => {
    setVisible(false);
    setTimeout(() => {
      setActiveIdx((i) => (i + 1) % NOTIF_DATA.length);
      setProgress(0);
      setVisible(true);
    }, 350);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { advance(); return 0; }
        return p + 2;
      });
    }, 60);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const n = NOTIF_DATA[activeIdx];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Bell icon with ripple */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative", width: 40, height: 40 }}>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              backgroundColor: "#1A6FBF",
            }}
          />
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            backgroundColor: "#EAF4FF",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Bell size={18} color="#1A6FBF" strokeWidth={1.8} />
          </div>
          <div style={{
            position: "absolute", top: 1, right: 1, width: 10, height: 10,
            borderRadius: "50%", backgroundColor: "#C9423A",
            border: "2px solid white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 6, color: "white", fontWeight: 700 }}>3</span>
          </div>
        </div>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E" }}>Notifikasi Proaktif</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#1B7A3E" }}
            />
            <span style={{ fontSize: 10, color: "#1B7A3E", fontWeight: 500 }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* Notification card */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={n.id}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              padding: "12px 14px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              border: `1.5px solid ${n.typeColor}22`,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22 }}>{n.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 600, color: n.typeColor,
                    backgroundColor: `${n.typeColor}15`, borderRadius: 100,
                    padding: "1px 8px",
                  }}>{n.type}</span>
                  <span style={{ fontSize: 10, color: "#8E8E93" }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E", margin: "4px 0 2px" }}>{n.title}</p>
                <p style={{ fontSize: 11, color: "#3C3C43", margin: 0, lineHeight: 1.5 }}>{n.body}</p>
                <button style={{
                  marginTop: 8, padding: "4px 12px", borderRadius: 8,
                  backgroundColor: n.typeColor, border: "none",
                  fontSize: 10, fontWeight: 600, color: "white", cursor: "pointer",
                }}>{n.action}</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress + dots */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {NOTIF_DATA.map((_, i) => (
          <div key={i} style={{
            flex: i === activeIdx ? 3 : 1,
            height: 3, borderRadius: 2,
            backgroundColor: i === activeIdx ? "#1A6FBF" : "#EEEEED",
            overflow: "hidden",
            transition: "flex 0.3s",
          }}>
            {i === activeIdx && (
              <motion.div
                style={{ height: "100%", width: `${progress}%`, backgroundColor: "#1A6FBF" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 2. DENSITY INDICATOR ─────────────────────────────────────────────────

const CAR_COUNT = 8;

type DensityLevel = "Kosong" | "Rendah" | "Sedang" | "Penuh";

function randomDensity(): { pct: number; level: DensityLevel; color: string } {
  const pct = 20 + Math.floor(Math.random() * 75);
  if (pct < 35) return { pct, level: "Kosong", color: "#2A9D6F" };
  if (pct < 60) return { pct, level: "Rendah", color: "#1B7A3E" };
  if (pct < 80) return { pct, level: "Sedang", color: "#D97B2A" };
  return { pct, level: "Penuh", color: "#C9423A" };
}

function DensityDemo() {
  const [cars, setCars] = useState(() => Array.from({ length: CAR_COUNT }, randomDensity));
  const [tick, setTick] = useState(0);
  const [updateLabel, setUpdateLabel] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCars(Array.from({ length: CAR_COUNT }, randomDensity));
      setTick((t) => t + 1);
      setUpdateLabel(true);
      setTimeout(() => setUpdateLabel(false), 800);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const avgPct = Math.round(cars.reduce((s, c) => s + c.pct, 0) / CAR_COUNT);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Train size={14} color="#1A6FBF" strokeWidth={2} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#1C1C1E" }}>MRT J1 → Lebak Bulus</span>
        </div>
        <AnimatePresence>
          {updateLabel && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 9, color: "#1B7A3E", fontWeight: 600 }}
            >
              ↻ Diperbarui
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Train visual */}
      <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
        {/* Engine */}
        <div style={{
          width: 22, height: 44, borderRadius: "6px 2px 2px 6px",
          backgroundColor: "#0070C0", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.7)" }} />
        </div>

        {/* Cars */}
        {cars.map((car, i) => (
          <motion.div
            key={i}
            animate={{ backgroundColor: car.color + "22" }}
            transition={{ duration: 0.6 }}
            style={{
              flex: 1, height: 44, borderRadius: 4,
              border: `1.5px solid ${car.color}55`,
              position: "relative", overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ height: `${car.pct}%` }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                backgroundColor: car.color,
                opacity: 0.6,
              }}
            />
            {/* People icons */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: car.pct > 70 ? 12 : 10 }}>
                {car.pct > 80 ? "👥" : car.pct > 50 ? "🧍" : "·"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Car numbers */}
      <div style={{ display: "flex", gap: 3, paddingLeft: 25 }}>
        {cars.map((_, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <span style={{ fontSize: 8, color: "#8E8E93" }}>{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div style={{
        backgroundColor: "#F7F7F5", borderRadius: 10, padding: "8px 12px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <span style={{ fontSize: 10, color: "#8E8E93" }}>Rata-rata kepadatan</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 1 }}>
            <span style={{
              fontSize: 20, fontWeight: 700,
              color: avgPct > 80 ? "#C9423A" : avgPct > 60 ? "#D97B2A" : "#1B7A3E",
            }}>{avgPct}%</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { label: "Kosong", color: "#2A9D6F" },
            { label: "Sedang", color: "#D97B2A" },
            { label: "Penuh", color: "#C9423A" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: l.color }} />
              <span style={{ fontSize: 8, color: "#8E8E93" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#1B7A3E" }}
        />
        <span style={{ fontSize: 9, color: "#8E8E93" }}>Data diperbarui setiap 2,5 detik · Update ke-{tick}</span>
      </div>
    </div>
  );
}

// ─── 3. AUTOMATED REROUTING ───────────────────────────────────────────────

const REROUTE_STEPS = [
  { icon: Activity, label: "Memantau Rute", desc: "Mengawasi kondisi KRL Bogor Line", color: "#1A6FBF" },
  { icon: AlertTriangle, label: "Gangguan Terdeteksi", desc: "Keterlambatan 22 mnt di Cawang", color: "#C9423A" },
  { icon: RefreshCw, label: "Menghitung Alternatif", desc: "Mencari 3 rute pengganti...", color: "#D97B2A" },
  { icon: CheckCircle, label: "Rute Siap", desc: "TransJakarta 6B via Harmoni ditemukan", color: "#1B7A3E" },
];

function ReroutingDemo() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState<null | boolean>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    if (step >= REROUTE_STEPS.length - 1) { setRunning(false); return; }
    const delay = step === 0 ? 1200 : step === 1 ? 1000 : 1500;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, running]);

  const restart = () => {
    setStep(0);
    setAccepted(null);
    setRunning(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {REROUTE_STEPS.map((s, i) => {
          const isDone = i < step;
          const isActive = i === step;
          const Icon = s.icon;
          return (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <motion.div
                  animate={{
                    backgroundColor: isDone ? s.color : isActive ? `${s.color}22` : "#F7F7F5",
                    scale: isActive ? [1, 1.08, 1] : 1,
                  }}
                  transition={{ scale: { duration: 0.6, repeat: isActive ? Infinity : 0 } }}
                  style={{
                    width: 30, height: 30, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `2px solid ${isDone || isActive ? s.color : "#EEEEED"}`,
                  }}
                >
                  {isDone ? (
                    <CheckCircle size={14} color={s.color} strokeWidth={2.5} />
                  ) : (
                    <Icon size={12} color={isActive ? s.color : "#8E8E93"} strokeWidth={2} />
                  )}
                </motion.div>
                {i < REROUTE_STEPS.length - 1 && (
                  <motion.div
                    animate={{ backgroundColor: isDone ? s.color : "#EEEEED" }}
                    style={{ width: 2, height: 20 }}
                  />
                )}
              </div>
              <div style={{ paddingTop: 4, paddingBottom: i < REROUTE_STEPS.length - 1 ? 16 : 0 }}>
                <p style={{
                  fontSize: 12, fontWeight: isActive ? 600 : 500,
                  color: isDone || isActive ? "#1C1C1E" : "#8E8E93",
                  margin: 0,
                }}>{s.label}</p>
                <AnimatePresence>
                  {(isActive || isDone) && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      style={{ fontSize: 10, color: s.color, margin: "1px 0 0", fontWeight: 500 }}
                    >
                      {s.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action */}
      <AnimatePresence>
        {step === REROUTE_STEPS.length - 1 && accepted === null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: "#EAF4FF", borderRadius: 12, padding: "10px 12px",
            }}
          >
            <p style={{ fontSize: 11, color: "#1C1C1E", margin: "0 0 6px", fontWeight: 600 }}>
              🔁 Rute alternatif ditemukan
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: "#C9423A", textDecoration: "line-through" }}>KRL Bogor → Cawang</span>
              <ArrowRight size={10} color="#8E8E93" />
              <span style={{ fontSize: 10, color: "#1B7A3E", fontWeight: 600 }}>TJ 6B → Harmoni</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setAccepted(true)} style={{
                flex: 1, height: 30, borderRadius: 8, border: "none",
                backgroundColor: "#1B7A3E", color: "white",
                fontSize: 11, fontWeight: 600, cursor: "pointer",
              }}>Terima Rute</button>
              <button onClick={() => setAccepted(false)} style={{
                flex: 1, height: 30, borderRadius: 8,
                border: "1.5px solid #EEEEED", backgroundColor: "white",
                fontSize: 11, fontWeight: 500, color: "#3C3C43", cursor: "pointer",
              }}>Pertahankan</button>
            </div>
          </motion.div>
        )}
        {accepted !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              backgroundColor: accepted ? "#E8F5E9" : "#FFF3E0",
              borderRadius: 10, padding: "8px 12px", textAlign: "center",
            }}
          >
            <p style={{ fontSize: 11, color: accepted ? "#1B7A3E" : "#D97B2A", margin: "0 0 6px", fontWeight: 600 }}>
              {accepted ? "✓ Navigasi diperbarui ke rute baru" : "Melanjutkan rute semula"}
            </p>
            <button onClick={restart} style={{
              fontSize: 10, color: "#1A6FBF", background: "none", border: "none",
              cursor: "pointer", fontWeight: 500, textDecoration: "underline",
            }}>Ulangi demo</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 4. TRUE-ETA ENGINE ───────────────────────────────────────────────────

function ETADemo() {
  const [seconds, setSeconds] = useState(742); // ~12 mnt 22 dtk
  const [delay, setDelay] = useState(0);
  const [factors, setFactors] = useState({ traffic: 62, speed: 54, accuracy: 94 });
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
      setLastUpdate((u) => {
        const next = u + 1;
        if (next % 8 === 0) {
          const delta = Math.floor(Math.random() * 60) - 20;
          setDelay((d) => Math.max(-60, Math.min(180, d + delta)));
          setFactors({
            traffic: Math.min(100, Math.max(20, 62 + Math.floor(Math.random() * 20) - 10)),
            speed: Math.min(100, Math.max(20, 54 + Math.floor(Math.random() * 20) - 10)),
            accuracy: Math.min(99, Math.max(80, 94 + Math.floor(Math.random() * 8) - 4)),
          });
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const totalSecs = seconds + delay;
  const mins = Math.floor(Math.max(0, totalSecs) / 60);
  const secs = Math.max(0, totalSecs) % 60;
  const arrivalHour = 7;
  const arrivalMin = 41 + Math.floor(Math.max(0, totalSecs) / 60);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Live ETA */}
      <div style={{
        backgroundColor: "#1A6FBF", borderRadius: 14, padding: "16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", margin: "0 0 2px" }}>ESTIMASI TIBA</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <motion.span
              key={mins}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ fontSize: 36, fontWeight: 700, color: "white" }}
            >
              {mins}
            </motion.span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>mnt</span>
            <motion.span
              key={secs}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}
            >
              {String(secs).padStart(2, "0")}dtk
            </motion.span>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", margin: "2px 0 0" }}>
            Tiba ~{arrivalHour}:{String(arrivalMin % 60).padStart(2, "0")} WIB
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          {delay !== 0 && (
            <motion.div
              key={delay}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                backgroundColor: delay > 0 ? "#C9423A" : "#1B7A3E",
                borderRadius: 8, padding: "3px 8px", marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 10, color: "white", fontWeight: 600 }}>
                {delay > 0 ? `+${Math.floor(delay / 60)}mnt` : `-${Math.abs(Math.floor(delay / 60))}mnt`}
              </span>
            </motion.div>
          )}
          <p style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", margin: 0 }}>
            Akurasi {factors.accuracy}%
          </p>
        </div>
      </div>

      {/* Faktor ETA */}
      <p style={{ fontSize: 10, fontWeight: 600, color: "#8E8E93", margin: 0 }}>FAKTOR KALKULASI</p>
      {[
        { label: "Kepadatan lalu lintas", value: factors.traffic, icon: "🚦", invert: true },
        { label: "Kecepatan kendaraan", value: factors.speed, icon: "⚡", invert: false },
        { label: "Akurasi prediksi", value: factors.accuracy, icon: "🎯", invert: false },
      ].map((f) => {
        const color = f.invert
          ? f.value > 70 ? "#C9423A" : f.value > 40 ? "#D97B2A" : "#1B7A3E"
          : f.value > 70 ? "#1B7A3E" : f.value > 40 ? "#D97B2A" : "#C9423A";
        return (
          <div key={f.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: "#3C3C43" }}>{f.icon} {f.label}</span>
              <motion.span key={f.value} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ fontSize: 10, color, fontWeight: 600 }}>
                {f.value}%
              </motion.span>
            </div>
            <div style={{ height: 5, backgroundColor: "#EEEEED", borderRadius: 3, overflow: "hidden" }}>
              <motion.div
                animate={{ width: `${f.value}%`, backgroundColor: color }}
                transition={{ duration: 0.5 }}
                style={{ height: "100%", borderRadius: 3 }}
              />
            </div>
          </div>
        );
      })}

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#1B7A3E" }}
        />
        <span style={{ fontSize: 9, color: "#8E8E93" }}>Kalkulasi diperbarui real-time · {lastUpdate}s</span>
      </div>
    </div>
  );
}

// ─── 5. MULTI-MODA MAP ────────────────────────────────────────────────────

const LINES = [
  {
    id: "mrt", color: "#0070C0", label: "MRT",
    points: [[40, 120], [70, 110], [105, 100], [130, 95], [160, 90], [190, 85]] as [number, number][],
  },
  {
    id: "krl", color: "#FF6600", label: "KRL",
    points: [[30, 50], [65, 75], [105, 100], [140, 130], [170, 155], [195, 170]] as [number, number][],
  },
  {
    id: "tj", color: "#E2001A", label: "TJ",
    points: [[105, 30], [105, 65], [105, 100], [105, 135], [105, 165]] as [number, number][],
  },
  {
    id: "lrt", color: "#E4002B", label: "LRT",
    points: [[40, 165], [70, 148], [105, 135], [130, 115]] as [number, number][],
    dashed: true,
  },
  {
    id: "jaklingko", color: "#00923F", label: "JakLingko",
    points: [[130, 95], [160, 120], [175, 155], [160, 175]] as [number, number][],
    dashed: true,
  },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function useVehiclePosition(points: [number, number][], speed: number) {
  const [t, setT] = useState(Math.random());
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setT((prev) => {
        const next = prev + dir * speed;
        if (next >= 1) { setDir(-1); return 1; }
        if (next <= 0) { setDir(1); return 0; }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [dir, speed]);

  if (points.length < 2) return points[0];
  const segCount = points.length - 1;
  const segIdx = Math.min(Math.floor(t * segCount), segCount - 1);
  const segT = (t * segCount) - segIdx;
  const [x1, y1] = points[segIdx];
  const [x2, y2] = points[segIdx + 1];
  return [lerp(x1, x2, segT), lerp(y1, y2, segT)] as [number, number];
}

function VehicleDot({ line }: { line: typeof LINES[0] }) {
  const [x, y] = useVehiclePosition(line.points, 0.003 + Math.random() * 0.003);
  return (
    <>
      <motion.circle cx={x} cy={y} r={6} fill={line.color} opacity={0.2} animate={{ r: [5, 8, 5] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <circle cx={x} cy={y} r={4} fill={line.color} stroke="white" strokeWidth={1.5} />
    </>
  );
}

function MultiModaMapDemo() {
  const [activeLine, setActiveLine] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Map size={13} color="#1A6FBF" strokeWidth={2} />
        <span style={{ fontSize: 11, fontWeight: 600, color: "#1C1C1E" }}>Jakarta Transit Network</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#1B7A3E" }} />
          <span style={{ fontSize: 9, color: "#1B7A3E", fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      {/* Map SVG */}
      <div style={{ borderRadius: 12, overflow: "hidden", backgroundColor: "#EAF4FF" }}>
        <svg viewBox="0 0 230 200" style={{ width: "100%", height: "auto", display: "block" }}>
          {/* Background */}
          <rect width="230" height="200" fill="#EAF4FF" />
          {/* Grid */}
          {[40, 80, 120, 160].map((v) => (
            <g key={v}>
              <line x1={v} y1={0} x2={v} y2={200} stroke="#D6E9F8" strokeWidth={0.5} />
              <line x1={0} y1={v} x2={230} y2={v} stroke="#D6E9F8" strokeWidth={0.5} />
            </g>
          ))}

          {/* Lines */}
          {LINES.map((line) => {
            const isActive = activeLine === null || activeLine === line.id;
            const d = line.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
            return (
              <g key={line.id} opacity={isActive ? 1 : 0.2} style={{ transition: "opacity 0.3s" }}>
                <path
                  d={d}
                  stroke={line.color}
                  strokeWidth={line.dashed ? 3 : 4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={line.dashed ? "6 4" : undefined}
                  fill="none"
                />
                {line.points.map(([px, py], i) => (
                  <circle key={i} cx={px} cy={py} r={i === 0 || i === line.points.length - 1 ? 5 : 3.5}
                    fill="white" stroke={line.color} strokeWidth={i === 0 || i === line.points.length - 1 ? 2 : 1.5} />
                ))}
              </g>
            );
          })}

          {/* Animated vehicles */}
          {LINES.map((line) => {
            const isActive = activeLine === null || activeLine === line.id;
            return isActive ? <VehicleDot key={line.id} line={line} /> : null;
          })}

          {/* User location */}
          <circle cx={105} cy={100} r={10} fill="#1A6FBF" opacity={0.15} />
          <circle cx={105} cy={100} r={5} fill="#1A6FBF" />
          <circle cx={105} cy={100} r={2.5} fill="white" />

          {/* Labels */}
          <text x="105" y="115" textAnchor="middle" fontSize="7" fill="#1A6FBF" fontWeight="600">Anda</text>
        </svg>
      </div>

      {/* Moda chips */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {LINES.map((line) => (
          <button
            key={line.id}
            onClick={() => setActiveLine(activeLine === line.id ? null : line.id)}
            style={{
              padding: "3px 10px", borderRadius: 100, border: "none", cursor: "pointer",
              backgroundColor: activeLine === line.id ? line.color : `${line.color}20`,
              color: activeLine === line.id ? "white" : line.color,
              fontSize: 10, fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            {line.label}
          </button>
        ))}
        {activeLine && (
          <button onClick={() => setActiveLine(null)} style={{
            padding: "3px 10px", borderRadius: 100, border: "1px solid #EEEEED",
            backgroundColor: "white", fontSize: 10, color: "#8E8E93", cursor: "pointer",
          }}>Semua</button>
        )}
      </div>

      <span style={{ fontSize: 9, color: "#8E8E93" }}>
        Titik bergerak = posisi kendaraan simulasi real-time
      </span>
    </div>
  );
}

// ─── 6. OFFLINE MODE ──────────────────────────────────────────────────────

const CACHE_ITEMS = [
  { label: "Data rute & halte", size: "4,2 MB", color: "#1A6FBF" },
  { label: "Peta dasar Jakarta", size: "11,7 MB", color: "#0070C0" },
  { label: "Jadwal hari ini", size: "0,8 MB", color: "#1B7A3E" },
  { label: "Info tarif & zona", size: "0,3 MB", color: "#D97B2A" },
];

const FEATURES_ONLINE = ["Navigasi real-time", "Pengecekan gangguan", "ETA dinamis", "Notifikasi push", "Rute alternatif", "Pembaruan jadwal"];
const FEATURES_OFFLINE = ["Rute tersimpan", "Peta dasar", "Info halte cached", "Jadwal hari ini"];

function OfflineDemo() {
  const [isOnline, setIsOnline] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    CACHE_ITEMS.forEach((_, i) => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = [...prev];
          next[i] = Math.min(100, next[i] + (3 + Math.random() * 5));
          return next;
        });
      }, 80 + i * 40);
      setTimeout(() => {
        clearInterval(interval);
        setProgress((prev) => { const next = [...prev]; next[i] = 100; return next; });
        if (i === CACHE_ITEMS.length - 1) {
          setTimeout(() => { setDownloading(false); setDownloaded(true); }, 300);
        }
      }, 2000 + i * 600);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Toggle */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backgroundColor: isOnline ? "#E8F5E9" : "#FFEBEA",
        borderRadius: 12, padding: "10px 14px",
        transition: "background-color 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div animate={{ rotate: isOnline ? 0 : 180 }}>
            {isOnline
              ? <Wifi size={18} color="#1B7A3E" strokeWidth={2} />
              : <WifiOff size={18} color="#C9423A" strokeWidth={2} />}
          </motion.div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: isOnline ? "#1B7A3E" : "#C9423A", margin: 0 }}>
              {isOnline ? "Online" : "Offline"}
            </p>
            <p style={{ fontSize: 10, color: "#8E8E93", margin: 0 }}>
              {isOnline ? "Semua fitur tersedia" : "Mode terbatas aktif"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOnline((v) => !v)}
          style={{
            width: 44, height: 24, borderRadius: 12, border: "none",
            backgroundColor: isOnline ? "#1B7A3E" : "#C9423A",
            position: "relative", cursor: "pointer", transition: "background-color 0.3s",
          }}
        >
          <motion.div
            animate={{ x: isOnline ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "absolute", top: 2, width: 20, height: 20,
              borderRadius: "50%", backgroundColor: "white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          />
        </button>
      </div>

      {/* Feature availability */}
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, backgroundColor: "#F7F7F5", borderRadius: 10, padding: "10px 12px" }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: "#1B7A3E", margin: "0 0 6px" }}>✅ Tersedia offline</p>
          {FEATURES_OFFLINE.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#1B7A3E" }} />
              <span style={{ fontSize: 9, color: "#3C3C43" }}>{f}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, backgroundColor: "#F7F7F5", borderRadius: 10, padding: "10px 12px" }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: isOnline ? "#1B7A3E" : "#C9423A", margin: "0 0 6px" }}>
            {isOnline ? "🌐 Online saja" : "🔒 Tidak tersedia"}
          </p>
          {FEATURES_ONLINE.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: isOnline ? "#1A6FBF" : "#8E8E93" }} />
              <span style={{ fontSize: 9, color: isOnline ? "#3C3C43" : "#8E8E93" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cache download */}
      {!downloaded ? (
        <div>
          {downloading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
              {CACHE_ITEMS.map((item, i) => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontSize: 9, color: "#3C3C43" }}>{item.label}</span>
                    <span style={{ fontSize: 9, color: progress[i] === 100 ? "#1B7A3E" : "#8E8E93" }}>
                      {progress[i] === 100 ? "✓" : `${Math.floor(progress[i])}%`} · {item.size}
                    </span>
                  </div>
                  <div style={{ height: 4, backgroundColor: "#EEEEED", borderRadius: 2, overflow: "hidden" }}>
                    <motion.div
                      animate={{ width: `${progress[i]}%` }}
                      style={{ height: "100%", backgroundColor: item.color, borderRadius: 2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              width: "100%", height: 36, borderRadius: 10,
              backgroundColor: downloading ? "#F7F7F5" : "#1A6FBF",
              color: downloading ? "#8E8E93" : "white",
              border: "none", cursor: downloading ? "not-allowed" : "pointer",
              fontSize: 11, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <Download size={13} strokeWidth={2} />
            {downloading ? "Mengunduh data offline..." : "Unduh untuk offline (16,8 MB)"}
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            backgroundColor: "#E8F5E9", borderRadius: 10, padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          <CheckCircle size={16} color="#1B7A3E" strokeWidth={2} />
          <div>
            <p style={{ fontSize: 11, color: "#1B7A3E", fontWeight: 600, margin: 0 }}>Data offline siap!</p>
            <p style={{ fontSize: 9, color: "#8E8E93", margin: 0 }}>Navigasi tersedia tanpa internet</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "notif",
    num: "01",
    title: "Proactive Push Notification",
    subtitle: "Notifikasi cerdas sebelum kamu butuh",
    icon: Bell,
    iconColor: "#1A6FBF",
    iconBg: "#EAF4FF",
    demo: <PushNotifDemo />,
  },
  {
    id: "density",
    num: "02",
    title: "Real-time Coach Density",
    subtitle: "Lihat kepadatan tiap gerbong secara live",
    icon: Users,
    iconColor: "#D97B2A",
    iconBg: "#FFF3E0",
    demo: <DensityDemo />,
  },
  {
    id: "reroute",
    num: "03",
    title: "Automated Rerouting System",
    subtitle: "Re-routing otomatis saat gangguan terdeteksi",
    icon: RefreshCw,
    iconColor: "#C9423A",
    iconBg: "#FFEBEA",
    demo: <ReroutingDemo />,
  },
  {
    id: "eta",
    num: "04",
    title: "True-ETA Engine",
    subtitle: "ETA dinamis berbasis kondisi aktual",
    icon: Clock,
    iconColor: "#1B7A3E",
    iconBg: "#E8F5E9",
    demo: <ETADemo />,
  },
  {
    id: "map",
    num: "05",
    title: "Multi-moda Integration Map",
    subtitle: "Semua moda dalam satu peta interaktif",
    icon: Map,
    iconColor: "#7B5EA7",
    iconBg: "#F3EEFF",
    demo: <MultiModaMapDemo />,
  },
  {
    id: "offline",
    num: "06",
    title: "Offline Navigation Mode",
    subtitle: "Navigasi tetap jalan tanpa internet",
    icon: WifiOff,
    iconColor: "#3C3C43",
    iconBg: "#F7F7F5",
    demo: <OfflineDemo />,
  },
];

export function FiturUnggulanScreen() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>("notif");

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#1A6FBF", padding: "16px 20px 20px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
          >
            <ChevronLeft size={24} color="white" strokeWidth={1.5} />
          </button>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: "white", margin: 0 }}>
            Fitur Unggulan
          </h1>
        </div>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Zap size={14} color="rgba(255,255,255,0.8)" strokeWidth={2} />
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.4 }}>
            Visualisasi interaktif 6 fitur inti LinTas. Ketuk tiap kartu untuk melihat simulasi live.
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "16px 16px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const isOpen = expanded === f.id;
            return (
              <div
                key={f.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* Card header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : f.id)}
                  style={{
                    width: "100%", background: "none", border: "none",
                    padding: "14px 16px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12,
                    textAlign: "left",
                  }}
                >
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: "#8E8E93",
                    minWidth: 22, flexShrink: 0,
                  }}>{f.num}</span>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    backgroundColor: f.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={17} color={f.iconColor} strokeWidth={1.8} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E", margin: 0, lineHeight: 1.3 }}>
                      {f.title}
                    </p>
                    <p style={{ fontSize: 10, color: "#8E8E93", margin: "2px 0 0", lineHeight: 1.3 }}>
                      {f.subtitle}
                    </p>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight size={16} color="#8E8E93" strokeWidth={1.5} />
                  </motion.div>
                </button>

                {/* Demo content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="demo"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{
                        borderTop: "1px solid #F7F7F5",
                        padding: "14px 16px 16px",
                      }}>
                        {f.demo}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: 20, backgroundColor: "#EAF4FF", borderRadius: 12,
          padding: "12px 14px", display: "flex", gap: 8,
        }}>
          <TrendingUp size={14} color="#1A6FBF" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 11, color: "#1A6FBF", margin: 0, lineHeight: 1.5 }}>
            Semua simulasi di atas menggunakan data mock. Implementasi penuh memerlukan integrasi API backend TransJakarta, KAI, dan MRT Jakarta.
          </p>
        </div>
      </div>
    </div>
  );
}
