import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import linTasLogo from "../../imports/WhatsApp_Image_2026-04-28_at_9.13.30_PM.jpeg";

type SplashVariant = "firstInstall" | "tokenExpired" | "autoLogin";

const variantConfig: Record<SplashVariant, { destination: string; label: string; delay: number }> = {
  firstInstall: { destination: "/welcome", label: "Pertama kali", delay: 2000 },
  tokenExpired: { destination: "/login", label: "Sesi berakhir", delay: 2000 },
  autoLogin: { destination: "/home", label: "Auto login", delay: 2000 },
};

export function SplashScreen() {
  const navigate = useNavigate();
  const [variant, setVariant] = useState<SplashVariant>("firstInstall");

  useEffect(() => {
    const config = variantConfig[variant];
    const timer = setTimeout(() => {
      navigate(config.destination, { replace: true });
    }, config.delay);
    return () => clearTimeout(timer);
  }, [navigate, variant]);

  return (
    <div
      className="flex flex-col items-center justify-between h-full"
      style={{ backgroundColor: "#1A6FBF", padding: "0 20px" }}
    >
      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-2"
        >
          {/* Logo LinTas */}
          <img
            src={linTasLogo}
            alt="LinTas"
            style={{
              width: 220,
              height: 220,
              objectFit: "contain",
              borderRadius: 32,
              marginBottom: 4,
            }}
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Navigasi transit Jakarta
          </span>

          {/* Variant label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: 8,
              fontSize: 11,
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Poppins', sans-serif",
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: "3px 12px",
              borderRadius: 100,
            }}
          >
            {variantConfig[variant].label}
          </motion.span>
        </motion.div>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center gap-2" style={{ marginBottom: 60 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Demo variant switcher */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 20,
          right: 20,
          display: "flex",
          gap: 6,
          justifyContent: "center",
        }}
      >
        {(Object.keys(variantConfig) as SplashVariant[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            style={{
              padding: "4px 10px",
              borderRadius: 100,
              backgroundColor: variant === v ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              fontSize: 10,
              fontFamily: "'Poppins', sans-serif",
              cursor: "pointer",
            }}
          >
            {variantConfig[v].label}
          </button>
        ))}
      </div>
    </div>
  );
}
