import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, AlertTriangle, Clock, Navigation, Bell } from "lucide-react";
import { TransitBadge } from "../components/TransitBadge";
import { motion } from "motion/react";

export function DetailGangguanScreen() {
  const navigate = useNavigate();
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  const severity = "kritis"; // "kritis" | "sedang"
  const isCritical = severity === "kritis";

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
          boxShadow: "0 1px 4px rgba(28,28,30,0.04)",
        }}
      >
        <button
          onClick={() => navigate(-1 as any)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}
        >
          <ChevronLeft size={24} color="#1C1C1E" strokeWidth={1.5} />
        </button>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#1C1C1E",
            margin: 0,
            flex: 1,
            letterSpacing: -0.1,
          }}
        >
          Gangguan Aktif
        </h2>
        {/* Status chip */}
        <span
          style={{
            padding: "4px 12px",
            borderRadius: 100,
            backgroundColor: isCritical ? "#FFEBEA" : "#FFF3E0",
            color: isCritical ? "#C9423A" : "#D97B2A",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {isCritical ? "Kritis" : "Sedang"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-safe-scroll">
        {/* Main disruption card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            margin: "16px 20px 0",
            padding: 16,
            boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
            borderLeft: `4px solid ${isCritical ? "#C9423A" : "#D97B2A"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <TransitBadge type="KRL" />
            <AlertTriangle
              size={16}
              color={isCritical ? "#C9423A" : "#D97B2A"}
              strokeWidth={1.5}
            />
          </div>

          <h3
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#1C1C1E",
              margin: "0 0 4px",
              letterSpacing: -0.1,
            }}
          >
            KRL Bogor Line — Keterlambatan
          </h3>
          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: "#3C3C43",
              margin: "0 0 12px",
              lineHeight: 1.5,
            }}
          >
            Keterlambatan signifikan akibat masalah teknis di Stasiun Cawang. Semua kereta arah Bogor terdampak.
          </p>

          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={14} color="#8E8E93" strokeWidth={1.5} />
              <span style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93" }}>~15 mnt</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={14} color="#8E8E93" strokeWidth={1.5} />
              <span style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93" }}>Mulai 07:23 WIB</span>
            </div>
          </div>
        </motion.div>

        {/* Moda terdampak */}
        <div style={{ padding: "20px 20px 0" }}>
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
            MODA TERDAMPAK
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["KRL"].map((mode) => (
              <div
                key={mode}
                style={{
                  padding: "6px 14px",
                  borderRadius: 100,
                  backgroundColor: "#FFEBEA",
                  border: "1px solid #C9423A",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: "#C9423A" }}>{mode}</span>
              </div>
            ))}
            {["MRT", "TransJakarta"].map((mode) => (
              <div
                key={mode}
                style={{
                  padding: "6px 14px",
                  borderRadius: 100,
                  backgroundColor: "#F7F7F5",
                  border: "1px solid #EEEEED",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 400, color: "#3C3C43" }}>{mode} (normal)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rute alternatif */}
        <div style={{ padding: "20px 20px 0" }}>
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
            RUTE ALTERNATIF
          </p>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              border: "3px solid #2A9D6F",
              boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <TransitBadge type="MRT" />
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 100,
                      backgroundColor: "#E8F8F2",
                      color: "#2A9D6F",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    +8 mnt
                  </span>
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
                  Via MRT Lebak Bulus Line
                </p>
                <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: 0 }}>
                  Manggarai → Sudirman → Blok M · 36 mnt
                </p>
              </div>
              <Navigation size={18} color="#2A9D6F" strokeWidth={1.5} style={{ marginLeft: 8, marginTop: 2 }} />
            </div>
          </div>
        </div>

        {/* Minor disruption note */}
        <div style={{ padding: "16px 20px 0" }}>
          <div
            style={{
              backgroundColor: "#FFF3E0",
              borderRadius: 12,
              padding: 12,
              display: "flex",
              gap: 10,
            }}
          >
            <AlertTriangle size={16} color="#D97B2A" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13, fontWeight: 400, color: "#3C3C43", margin: 0, lineHeight: 1.5 }}>
              Gangguan kecil juga terdeteksi di Transjakarta Koridor 1 — keterlambatan 5 menit.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #EEEEED",
          padding: "12px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <button
          onClick={() => navigate("/route-search")}
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
          Terima Rute Alternatif
        </button>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => navigate(-1 as any)}
            style={{
              flex: 1,
              height: 44,
              backgroundColor: "#F7F7F5",
              color: "#3C3C43",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
            }}
          >
            Pertahankan Rute Lama
          </button>

          <button
            onClick={() => {
              setPreferencesSaved(true);
              setTimeout(() => navigate(-1 as any), 1500);
            }}
            style={{
              flex: 1,
              height: 44,
              backgroundColor: "transparent",
              color: preferencesSaved ? "#2A9D6F" : "#1A6FBF",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
              border: `1.5px solid ${preferencesSaved ? "#2A9D6F" : "#1A6FBF"}`,
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Bell size={14} strokeWidth={1.5} />
            {preferencesSaved ? "Tersimpan" : "Ingatkan"}
          </button>
        </div>
      </div>
    </div>
  );
}
