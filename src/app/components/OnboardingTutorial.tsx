import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Navigation, MapPin, AlertTriangle, User, ChevronRight, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const steps = [
  {
    icon: Search,
    iconBg: "#EAF4FF",
    iconColor: "#1A6FBF",
    title: "Cari Rute Terbaik",
    desc: "Ketuk ikon pencarian di beranda untuk menemukan rute tercepat menggunakan MRT, KRL, TransJakarta, dan moda lainnya.",
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" style={{ width: "100%", height: "auto" }}>
        <rect width="200" height="140" rx="16" fill="#EAF4FF" />
        <rect x="24" y="24" width="152" height="48" rx="12" fill="white" stroke="#EEEEED" strokeWidth="1" />
        <circle cx="44" cy="48" r="8" fill="#1A6FBF" opacity="0.15" />
        <circle cx="44" cy="48" r="4" fill="#1A6FBF" />
        <rect x="58" y="44" width="60" height="8" rx="4" fill="#EEEEED" />
        <rect x="24" y="84" width="72" height="40" rx="10" fill="white" stroke="#EEEEED" strokeWidth="1" />
        <rect x="104" y="84" width="72" height="40" rx="10" fill="white" stroke="#EEEEED" strokeWidth="1" />
        <rect x="32" y="96" width="40" height="6" rx="3" fill="#1A6FBF" opacity="0.5" />
        <rect x="32" y="107" width="56" height="5" rx="2.5" fill="#EEEEED" />
        <rect x="112" y="96" width="40" height="6" rx="3" fill="#FF6600" opacity="0.5" />
        <rect x="112" y="107" width="50" height="5" rx="2.5" fill="#EEEEED" />
      </svg>
    ),
  },
  {
    icon: Navigation,
    iconBg: "#E8F5E9",
    iconColor: "#1B7A3E",
    title: "Navigasi Real-time",
    desc: "Ikuti panduan langkah demi langkah saat bepergian. LinTas akan memberitahumu kapan harus turun dan transit.",
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" style={{ width: "100%", height: "auto" }}>
        <rect width="200" height="140" rx="16" fill="#E8F5E9" />
        <line x1="30" y1="70" x2="170" y2="70" stroke="#1B7A3E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="70" r="8" fill="white" stroke="#1B7A3E" strokeWidth="2.5" />
        <circle cx="100" cy="70" r="8" fill="white" stroke="#1B7A3E" strokeWidth="2.5" />
        <circle cx="150" cy="70" r="8" fill="white" stroke="#1B7A3E" strokeWidth="2.5" />
        <circle cx="100" cy="70" r="16" fill="#1B7A3E" opacity="0.1" />
        <circle cx="100" cy="70" r="5" fill="#1B7A3E" />
        <rect x="78" y="84" width="44" height="18" rx="6" fill="white" />
        <rect x="83" y="90" width="34" height="5" rx="2.5" fill="#1B7A3E" opacity="0.4" />
        <rect x="83" y="99" width="22" height="4" rx="2" fill="#EEEEED" />
        <path d="M 30 30 L 50 20 L 70 30" stroke="#1B7A3E" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      </svg>
    ),
  },
  {
    icon: MapPin,
    iconBg: "#FFF3E0",
    iconColor: "#D97B2A",
    title: "Peta Jalur Lengkap",
    desc: "Lihat semua jalur transportasi Jakarta dalam satu tampilan. Pilih moda dan temukan halte terdekat dari lokasimu.",
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" style={{ width: "100%", height: "auto" }}>
        <rect width="200" height="140" rx="16" fill="#FFF3E0" />
        <line x1="20" y1="50" x2="180" y2="50" stroke="#0070C0" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="20" x2="140" y2="120" stroke="#FF6600" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="100" y1="20" x2="100" y2="130" stroke="#E2001A" strokeWidth="3" strokeLinecap="round" />
        <path d="M 40 100 Q 80 80 100 70" stroke="#E4002B" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 140 50 Q 160 80 140 110" stroke="#00923F" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="6 3" />
        <circle cx="100" cy="50" r="10" fill="#D97B2A" opacity="0.9" />
        <path d="M 100 45 L 100 58 M 96 50 L 100 45 L 104 50" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    icon: AlertTriangle,
    iconBg: "#FFEBEA",
    iconColor: "#C9423A",
    title: "Status Gangguan",
    desc: "Ketahui gangguan transportasi secara real-time. LinTas memberikan peringatan dini agar perjalananmu tidak terganggu.",
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" style={{ width: "100%", height: "auto" }}>
        <rect width="200" height="140" rx="16" fill="#FFEBEA" />
        <rect x="24" y="20" width="152" height="40" rx="10" fill="white" stroke="#C9423A" strokeWidth="1.5" />
        <path d="M 42 40 L 48 30 L 54 40 Z" fill="#C9423A" />
        <rect x="62" y="32" width="70" height="6" rx="3" fill="#1C1C1E" opacity="0.5" />
        <rect x="62" y="42" width="50" height="5" rx="2.5" fill="#EEEEED" />
        <rect x="24" y="70" width="152" height="40" rx="10" fill="white" stroke="#D97B2A" strokeWidth="1.5" />
        <path d="M 42 90 L 48 80 L 54 90 Z" fill="#D97B2A" />
        <rect x="62" y="82" width="60" height="6" rx="3" fill="#1C1C1E" opacity="0.4" />
        <rect x="62" y="92" width="80" height="5" rx="2.5" fill="#EEEEED" />
      </svg>
    ),
  },
  {
    icon: User,
    iconBg: "#F3EEFF",
    iconColor: "#7B5EA7",
    title: "Profil & Laporan",
    desc: "Kelola akun, lihat riwayat perjalanan, dan laporkan masalah transportasi langsung dari aplikasi LinTas.",
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" style={{ width: "100%", height: "auto" }}>
        <rect width="200" height="140" rx="16" fill="#F3EEFF" />
        <circle cx="100" cy="42" r="24" fill="#7B5EA7" opacity="0.12" />
        <circle cx="100" cy="38" r="14" fill="#7B5EA7" opacity="0.5" />
        <path d="M 70 80 Q 100 68 130 80" stroke="#7B5EA7" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
        <rect x="32" y="90" width="136" height="36" rx="10" fill="white" />
        <rect x="44" y="100" width="50" height="6" rx="3" fill="#7B5EA7" opacity="0.5" />
        <rect x="44" y="111" width="70" height="5" rx="2.5" fill="#EEEEED" />
        <rect x="148" y="100" width="12" height="12" rx="3" fill="#7B5EA7" opacity="0.25" />
      </svg>
    ),
  },
];

export function OnboardingTutorial() {
  const { showTutorial, dismissTutorial } = useAppContext();
  const [step, setStep] = useState(0);

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      dismissTutorial();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <AnimatePresence>
      {showTutorial && (
        <motion.div
          key="tutorial-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 1500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
          onClick={dismissTutorial}
        >
          <motion.div
            key={step}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px 24px 0 0",
              padding: "24px 24px 0",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Top row: step counter + skip */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <span style={{
                fontSize: 12, fontWeight: 500, color: "#8E8E93",
                fontFamily: "'Poppins', sans-serif",
              }}>
                {step + 1} / {steps.length}
              </span>
              <button
                onClick={dismissTutorial}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 500, color: "#8E8E93",
                  fontFamily: "'Poppins', sans-serif", padding: "4px 0",
                }}
              >
                <X size={14} color="#8E8E93" strokeWidth={2} />
                Lewati
              </button>
            </div>

            {/* Illustration */}
            <div style={{ borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
              {current.illustration}
            </div>

            {/* Icon badge + title */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                backgroundColor: current.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <current.icon size={20} color={current.iconColor} strokeWidth={1.8} />
              </div>
              <h2 style={{
                fontSize: 18, fontWeight: 600, color: "#1C1C1E",
                fontFamily: "'Poppins', sans-serif", margin: 0, letterSpacing: -0.2,
              }}>
                {current.title}
              </h2>
            </div>

            {/* Description */}
            <p style={{
              fontSize: 14, fontWeight: 400, color: "#3C3C43",
              fontFamily: "'Poppins', sans-serif", margin: 0, lineHeight: 1.6,
              flexShrink: 0,
            }}>
              {current.desc}
            </p>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexShrink: 0 }}>
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === step ? 24 : 8,
                    backgroundColor: i === step ? "#1A6FBF" : "#EEEEED",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ height: 8, borderRadius: 4 }}
                />
              ))}
            </div>

            {/* CTA Button + safe area bottom padding */}
            <div style={{
              flexShrink: 0,
              paddingBottom: "max(24px, env(safe-area-inset-bottom))",
            }}>
              <button
                onClick={handleNext}
                style={{
                  width: "100%", height: 52,
                  backgroundColor: "#1A6FBF", color: "#FFFFFF",
                  fontSize: 15, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  borderRadius: 16, border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}
              >
                {isLast ? "Mulai Jelajahi" : "Lanjut"}
                {!isLast && <ChevronRight size={18} color="#FFFFFF" strokeWidth={2} />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
