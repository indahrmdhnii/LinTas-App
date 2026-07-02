import { useNavigate } from "react-router";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export function SuksesLaporanScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "0 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#2A9D6F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <CheckCircle size={44} color="white" strokeWidth={2} />
        </motion.div>

        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#1C1C1E",
            margin: "0 0 8px",
            letterSpacing: -0.3,
          }}
        >
          Laporan Diterima
        </h1>

        <p
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: "#3C3C43",
            margin: "0 0 4px",
            lineHeight: 1.5,
          }}
        >
          ID Laporan:{" "}
          <span style={{ fontWeight: 600, color: "#1C1C1E" }}>#LT-20260420-001</span>
        </p>

        <p
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: "#8E8E93",
            margin: "0 0 48px",
            lineHeight: 1.5,
          }}
        >
          Laporan kamu akan diverifikasi tim dalam 24 jam.
          Terima kasih telah membantu meningkatkan layanan!
        </p>

        {/* Actions */}
        <button
          onClick={() => navigate(-1 as any)}
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
            marginBottom: 10,
          }}
        >
          Kembali
        </button>

        {/* Disabled button with tooltip */}
        <div style={{ position: "relative", width: "100%" }}>
          <button
            disabled
            style={{
              width: "100%",
              height: 44,
              backgroundColor: "transparent",
              color: "#EEEEED",
              fontSize: 15,
              fontWeight: 400,
              fontFamily: "'Poppins', sans-serif",
              border: "none",
              cursor: "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            Lihat Laporan Saya
            <span
              style={{
                fontSize: 11,
                fontWeight: 400,
                color: "#EEEEED",
                backgroundColor: "#3C3C43",
                padding: "2px 8px",
                borderRadius: 100,
              }}
            >
              Segera hadir
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
