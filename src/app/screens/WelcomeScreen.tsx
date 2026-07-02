import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";

export function WelcomeScreen() {
  const navigate = useNavigate();
  const { setIsGuest } = useAppContext();

  const handleGuestMode = () => {
    setIsGuest(true);
    navigate("/home");
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#F7F7F5" }}>
      {/* Top illustration area */}
      <div className="flex items-center justify-center flex-1" style={{ minHeight: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%", padding: "24px 20px 0" }}
        >
          {/* Transit map illustration */}
          <svg
            viewBox="0 0 350 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "auto" }}
          >
            <rect width="350" height="280" rx="16" fill="#EAF4FF" />
            {/* MRT Line - horizontal */}
            <line x1="40" y1="100" x2="310" y2="100" stroke="#0070C0" strokeWidth="6" strokeLinecap="round" />
            <circle cx="80" cy="100" r="10" fill="white" stroke="#0070C0" strokeWidth="3" />
            <circle cx="140" cy="100" r="10" fill="white" stroke="#0070C0" strokeWidth="3" />
            <circle cx="200" cy="100" r="10" fill="white" stroke="#0070C0" strokeWidth="3" />
            <circle cx="260" cy="100" r="10" fill="white" stroke="#0070C0" strokeWidth="3" />
            {/* KRL Line */}
            <line x1="60" y1="40" x2="290" y2="200" stroke="#FF6600" strokeWidth="5" strokeLinecap="round" />
            <circle cx="100" cy="67" r="9" fill="white" stroke="#FF6600" strokeWidth="3" />
            <circle cx="175" cy="120" r="9" fill="white" stroke="#FF6600" strokeWidth="3" />
            <circle cx="250" cy="173" r="9" fill="white" stroke="#FF6600" strokeWidth="3" />
            {/* TransJakarta Line */}
            <line x1="175" y1="40" x2="175" y2="240" stroke="#E2001A" strokeWidth="4" strokeLinecap="round" />
            <circle cx="175" cy="60" r="8" fill="white" stroke="#E2001A" strokeWidth="2.5" />
            <circle cx="175" cy="160" r="8" fill="white" stroke="#E2001A" strokeWidth="2.5" />
            <circle cx="175" cy="220" r="8" fill="white" stroke="#E2001A" strokeWidth="2.5" />
            {/* LRT */}
            <path d="M 80 200 Q 130 180 175 160" stroke="#E4002B" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="80" cy="200" r="8" fill="white" stroke="#E4002B" strokeWidth="2.5" />
            {/* JakLingko */}
            <path d="M 260 100 Q 280 150 260 200" stroke="#00923F" strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="8 4" />
            <circle cx="260" cy="200" r="8" fill="white" stroke="#00923F" strokeWidth="2.5" />
            {/* Labels */}
            <text x="80" y="125" textAnchor="middle" fontSize="9" fill="#3C3C43" fontFamily="Poppins, sans-serif" fontWeight="500">Lebak Bulus</text>
            <text x="140" y="125" textAnchor="middle" fontSize="9" fill="#3C3C43" fontFamily="Poppins, sans-serif" fontWeight="500">Blok M</text>
            <text x="200" y="125" textAnchor="middle" fontSize="9" fill="#3C3C43" fontFamily="Poppins, sans-serif" fontWeight="500">Senayan</text>
            <text x="260" y="125" textAnchor="middle" fontSize="9" fill="#3C3C43" fontFamily="Poppins, sans-serif" fontWeight="500">Sudirman</text>
            {/* User location */}
            <circle cx="200" cy="100" r="16" fill="#1A6FBF" opacity="0.15" />
            <circle cx="200" cy="100" r="5" fill="#1A6FBF" />
            {/* Legend */}
            <rect x="20" y="248" width="8" height="4" rx="2" fill="#0070C0" />
            <text x="32" y="254" fontSize="8" fill="#8E8E93" fontFamily="Poppins, sans-serif">MRT</text>
            <rect x="60" y="248" width="8" height="4" rx="2" fill="#FF6600" />
            <text x="72" y="254" fontSize="8" fill="#8E8E93" fontFamily="Poppins, sans-serif">KRL</text>
            <rect x="100" y="248" width="8" height="4" rx="2" fill="#E2001A" />
            <text x="112" y="254" fontSize="8" fill="#8E8E93" fontFamily="Poppins, sans-serif">TransJakarta</text>
            <rect x="170" y="248" width="8" height="4" rx="2" fill="#E4002B" />
            <text x="182" y="254" fontSize="8" fill="#8E8E93" fontFamily="Poppins, sans-serif">LRT</text>
            <rect x="205" y="248" width="8" height="4" rx="2" fill="#00923F" />
            <text x="217" y="254" fontSize="8" fill="#8E8E93" fontFamily="Poppins, sans-serif">Jak Lingko</text>
          </svg>
        </motion.div>
      </div>

      {/* Bottom content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
          Selamat datang di LinTas
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
          Temukan rute tercepat dengan MRT, KRL, TransJakarta, dan lebih banyak moda lainnya.
        </p>

        {/* Mulai Sekarang */}
        <button
          onClick={() => navigate("/location")}
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
          Mulai Sekarang
        </button>

        {/* Masuk sebagai Tamu */}
        <button
          onClick={handleGuestMode}
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
          }}
        >
          Masuk sebagai Tamu
        </button>
      </motion.div>
    </div>
  );
}
