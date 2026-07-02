import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Mic, X, Navigation, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TransitBadge, StatusChip } from "../components/TransitBadge";
import { AlertBanner } from "../components/AlertBanner";

type VoiceState = "listening" | "processing" | "result_nav" | "result_info" | "result_gangguan" | "error";

const intents = [
  { key: "result_nav", label: "Navigasi: ke Sudirman via MRT" },
  { key: "result_info", label: "Info halte: Stasiun Sudirman" },
  { key: "result_gangguan", label: "Status gangguan hari ini" },
];

export function VoiceCommandScreen() {
  const navigate = useNavigate();
  const [state, setState] = useState<VoiceState>("listening");
  const [errorCount, setErrorCount] = useState(0);
  const [intentIndex, setIntentIndex] = useState(0);

  useEffect(() => {
    // Simulate processing after listening
    const t1 = setTimeout(() => {
      setState("processing");
      const t2 = setTimeout(() => {
        setState(intents[intentIndex].key as VoiceState);
      }, 1200);
      return () => clearTimeout(t2);
    }, 2500);
    return () => clearTimeout(t1);
  }, [intentIndex]);

  const handleClose = () => navigate("/home");

  const handleError = () => {
    const next = errorCount + 1;
    setErrorCount(next);
    if (next >= 3) {
      setState("error");
      setTimeout(() => navigate("/home"), 3000);
    } else {
      setState("listening");
      setIntentIndex(0);
    }
  };

  const isDark = state === "listening" || state === "processing";

  return (
    <div
      className="h-full flex flex-col"
      style={{
        backgroundColor: isDark ? "rgba(28,28,30,0.95)" : "#FFFFFF",
        fontFamily: "'Poppins', sans-serif",
        transition: "background-color 300ms ease",
      }}
    >
      {/* Error state (3 attempts) */}
      <AnimatePresence>
        {state === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 20px",
            }}
          >
            <div style={{ width: "100%", marginBottom: 16 }}>
              <AlertBanner
                severity="error"
                message="Perintah tidak dikenali setelah 3 percobaan."
                subMessage="Kembali ke beranda otomatis..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listening / Processing states */}
      {(state === "listening" || state === "processing") && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
          }}
        >
          {/* Pulse waves */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: i * 48 + 40,
                  height: i * 48 + 40,
                  borderRadius: "50%",
                  border: "1.5px solid #1A6FBF",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: state === "processing" ? "#1A6FBF" : "rgba(26,111,191,0.2)",
                border: "2px solid #1A6FBF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              {state === "processing" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Mic size={32} color="white" strokeWidth={1.5} />
                </motion.div>
              ) : (
                <Mic size={32} color="#1A6FBF" strokeWidth={1.5} />
              )}
            </div>
          </div>

          <h2
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "white",
              margin: "0 0 8px",
              letterSpacing: -0.2,
              textAlign: "center",
            }}
          >
            {state === "listening" ? "Mendengarkan..." : "Memproses..."}
          </h2>
          {state === "listening" && (
            <p
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Coba ucap: "LinTas, bawa aku ke Sudirman"
            </p>
          )}

          {/* Demo intent switcher */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {intents.map((intent, i) => (
              <button
                key={intent.key}
                onClick={() => setIntentIndex(i)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 100,
                  backgroundColor: intentIndex === i ? "#1A6FBF" : "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "white",
                  fontSize: 11,
                  fontFamily: "'Poppins', sans-serif",
                  cursor: "pointer",
                }}
              >
                {intent.label.split(":")[0]}
              </button>
            ))}
          </div>

          <button
            onClick={handleClose}
            style={{
              marginTop: 40,
              width: 52,
              height: 52,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={24} color="white" strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Result: Navigation */}
      <AnimatePresence>
        {state === "result_nav" && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "24px 20px 40px",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* Handle & close */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#8E8E93",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  margin: 0,
                }}
              >
                HASIL PERINTAH SUARA
              </p>
              <button
                onClick={handleClose}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                <X size={20} color="#8E8E93" strokeWidth={1.5} />
              </button>
            </div>

            <h2
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "#1C1C1E",
                margin: "0 0 4px",
                letterSpacing: -0.1,
              }}
            >
              Rute ke Sudirman
            </h2>
            <p
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: "#1C1C1E",
                margin: "0 0 8px",
                letterSpacing: -0.3,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              22 menit via MRT
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
              <TransitBadge type="MRT" />
              <StatusChip status="on-time" />
            </div>

            <button
              onClick={() => navigate("/navigation")}
              style={{
                width: "100%",
                height: 52,
                backgroundColor: "#1A6FBF",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                borderRadius: 16,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <Navigation size={20} strokeWidth={1.5} />
              Mulai Navigasi
            </button>

            <button
              onClick={() => navigate("/route-search")}
              style={{
                width: "100%",
                height: 44,
                backgroundColor: "transparent",
                color: "#1A6FBF",
                fontSize: 15,
                fontWeight: 400,
                fontFamily: "'Poppins', sans-serif",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Search size={16} strokeWidth={1.5} />
              Cari Rute Lain
            </button>
          </motion.div>
        )}

        {/* Result: Info Halte */}
        {state === "result_info" && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "24px 20px 40px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#8E8E93",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  margin: 0,
                }}
              >
                INFO HALTE
              </p>
              <button
                onClick={handleClose}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                <X size={20} color="#8E8E93" strokeWidth={1.5} />
              </button>
            </div>

            <h2
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#1C1C1E",
                margin: "0 0 4px",
                letterSpacing: -0.2,
              }}
            >
              Stasiun Sudirman
            </h2>
            <p style={{ fontSize: 15, fontWeight: 400, color: "#8E8E93", margin: "0 0 24px" }}>
              MRT Jakarta · Lebak Bulus Line
            </p>

            <div
              style={{
                backgroundColor: "#F7F7F5",
                borderRadius: 12,
                padding: 16,
                marginBottom: 24,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", margin: "0 0 8px" }}>
                Keberangkatan berikutnya
              </p>
              {["3 mnt — Arah Lebak Bulus", "8 mnt — Arah Bundaran HI"].map((dep, i) => (
                <p
                  key={i}
                  style={{ fontSize: 15, fontWeight: 400, color: "#1C1C1E", margin: "4px 0" }}
                >
                  {dep}
                </p>
              ))}
            </div>

            <button
              onClick={() => navigate("/station")}
              style={{
                width: "100%",
                height: 52,
                backgroundColor: "#1A6FBF",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                borderRadius: 16,
                border: "none",
                cursor: "pointer",
              }}
            >
              Lihat Detail Halte
            </button>
          </motion.div>
        )}

        {/* Result: Gangguan */}
        {state === "result_gangguan" && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "24px 20px 40px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#8E8E93",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  margin: 0,
                }}
              >
                STATUS GANGGUAN
              </p>
              <button
                onClick={handleClose}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                <X size={20} color="#8E8E93" strokeWidth={1.5} />
              </button>
            </div>

            <AlertBanner
              severity="error"
              message="KRL Bogor Line"
              subMessage="Keterlambatan estimasi 15 menit di Cawang"
              actionLabel="Lihat Detail Gangguan"
              onAction={() => navigate("/detail-gangguan")}
            />

            <div style={{ marginTop: 16, padding: 12, backgroundColor: "#F7F7F5", borderRadius: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: 0 }}>
                MRT dan TransJakarta beroperasi normal
              </p>
            </div>

            <button
              onClick={() => navigate("/detail-gangguan")}
              style={{
                width: "100%",
                height: 52,
                backgroundColor: "#1A6FBF",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                borderRadius: 16,
                border: "none",
                cursor: "pointer",
                marginTop: 24,
              }}
            >
              Lihat Detail Gangguan
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint to trigger error for demo */}
      {(state === "result_nav" || state === "result_info" || state === "result_gangguan") && (
        <div style={{ padding: "0 20px 16px", backgroundColor: "#FFFFFF" }}>
          <button
            onClick={handleError}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "transparent",
              border: "1px dashed #EEEEED",
              borderRadius: 8,
              fontSize: 11,
              color: "#8E8E93",
              fontFamily: "'Poppins', sans-serif",
              cursor: "pointer",
            }}
          >
            Simulasi error ({errorCount}/3)
          </button>
        </div>
      )}
    </div>
  );
}
