import { useNavigate } from "react-router";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

export function LocationScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#F7F7F5" }}>
      {/* Top area with icon */}
      <div
        className="flex items-center justify-center flex-1"
        style={{ position: "relative" }}
      >
        <div className="flex flex-col items-center justify-center">
          {/* Concentric circles */}
          {[80, 112, 144].map((size, i) => (
            <motion.div
              key={size}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                border: `1.5px solid #1A6FBF`,
                opacity: 0.15 + i * 0.08,
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.1 + i * 0.07, 0.22 + i * 0.05, 0.1 + i * 0.07] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
          <div
            style={{
              width: 72,
              height: 72,
              backgroundColor: "#EAF4FF",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <MapPin size={32} color="#1A6FBF" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Bottom panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          padding: "32px 20px 40px",
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#1C1C1E",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.3,
            letterSpacing: -0.2,
            margin: 0,
          }}
        >
          Izinkan Akses Lokasi
        </h1>
        <p
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: "#3C3C43",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.5,
            margin: "8px 0 32px",
          }}
        >
          LinTas membutuhkan lokasi kamu untuk menampilkan rute transit terdekat dan estimasi waktu secara akurat.
        </p>

        <button
          onClick={() => navigate("/login")}
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
            marginBottom: 12,
          }}
        >
          Izinkan Akses
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            height: 44,
            backgroundColor: "transparent",
            color: "#1A6FBF",
            fontSize: 15,
            fontWeight: 400,
            fontFamily: "'Poppins', sans-serif",
            borderRadius: 16,
            border: "none",
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          Nanti Saja
        </button>

        <p
          style={{
            fontSize: 11,
            fontWeight: 400,
            color: "#8E8E93",
            fontFamily: "'Poppins', sans-serif",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Lokasi hanya aktif saat aplikasi digunakan
        </p>
      </motion.div>
    </div>
  );
}
