import { useNavigate } from "react-router";
import { CheckCircle, Clock, Train, MapPin, Bookmark } from "lucide-react";
import { motion } from "motion/react";
import { TransitBadge } from "../components/TransitBadge";

export function RingkasanPerjalananScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex-1 overflow-y-auto pb-safe-scroll">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: "#FFFFFF",
            padding: "40px 20px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Check icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#2A9D6F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <CheckCircle size={44} color="white" strokeWidth={2} />
          </motion.div>

          <h1
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#1C1C1E",
              margin: "0 0 4px",
              letterSpacing: -0.3,
            }}
          >
            Kamu sudah tiba!
          </h1>
          <h2
            style={{
              fontSize: 17,
              fontWeight: 400,
              color: "#3C3C43",
              margin: "0 0 28px",
              letterSpacing: -0.1,
            }}
          >
            Lebak Bulus
          </h2>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              width: "100%",
              backgroundColor: "#F7F7F5",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {[
              { icon: Clock, label: "Durasi", value: "28 mnt", color: "#1A6FBF" },
              { icon: Train, label: "Moda", value: "MRT", color: "#0070C0" },
              { icon: MapPin, label: "Jarak", value: "12.4 km", color: "#C9423A" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    padding: "16px 8px",
                    textAlign: "center",
                    borderRight: i < 2 ? "1px solid #EEEEED" : "none",
                  }}
                >
                  <Icon
                    size={18}
                    color={stat.color}
                    strokeWidth={1.5}
                    style={{ marginBottom: 6 }}
                  />
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1C1C1E",
                      margin: "0 0 2px",
                      letterSpacing: -0.1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", margin: 0 }}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Saved trip card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            margin: "16px 20px 0",
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Bookmark size={16} color="#2A9D6F" strokeWidth={1.5} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#2A9D6F" }}>
              Rute tersimpan otomatis
            </span>
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", margin: "0 0 4px", letterSpacing: -0.1 }}>
            Bundaran HI → Lebak Bulus
          </p>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: 0 }}>
            MRT Jakarta · 28 mnt · Rp 4.000
          </p>
        </motion.div>

        {/* Transit info */}
        <div style={{ margin: "12px 20px 0" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <TransitBadge type="MRT" />
            <span style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93" }}>
              Senin, 20 April 2026 · 07:30 — 07:58
            </span>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div
        style={{
          padding: "16px 20px 24px",
          backgroundColor: "#F7F7F5",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate("/home", { replace: true })}
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
          Kembali ke Beranda
        </button>
        <button
          onClick={() => navigate("/tersimpan")}
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
          }}
        >
          Lihat Riwayat
        </button>
      </div>
    </div>
  );
}
