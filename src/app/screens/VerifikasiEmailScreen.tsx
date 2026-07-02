import { useNavigate } from "react-router";
import { Mail } from "lucide-react";
import { motion } from "motion/react";

export function VerifikasiEmailScreen() {
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%" }}
      >
        {/* Icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#EAF4FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Mail size={40} color="#1A6FBF" strokeWidth={1.5} />
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#1C1C1E",
            margin: "0 0 8px",
            letterSpacing: -0.2,
          }}
        >
          Email Terkirim
        </h2>
        <p
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: "#3C3C43",
            margin: "0 0 4px",
            lineHeight: 1.5,
          }}
        >
          Kami mengirim link verifikasi ke
        </p>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1C1C1E",
            margin: "0 0 16px",
          }}
        >
          Indah@gmail.com
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: "#8E8E93",
            margin: "0 0 40px",
            lineHeight: 1.5,
          }}
        >
          Klik link di email untuk mengaktifkan akun kamu. Cek folder spam jika tidak menemukan email.
        </p>

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
            marginBottom: 12,
          }}
        >
          Buka Aplikasi
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{
            background: "none",
            border: "none",
            fontSize: 15,
            fontWeight: 400,
            color: "#1A6FBF",
            fontFamily: "'Poppins', sans-serif",
            cursor: "pointer",
          }}
        >
          Kembali ke Login
        </button>
      </motion.div>
    </div>
  );
}