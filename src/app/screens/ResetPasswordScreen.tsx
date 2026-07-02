import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ResetPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) setSubmitted(true);
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 20px",
          gap: 8,
          flexShrink: 0,
          borderBottom: "1px solid #EEEEED",
        }}
      >
        <button
          onClick={() => navigate("/login")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
        >
          <ChevronLeft size={24} color="#1C1C1E" strokeWidth={1.5} />
        </button>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#1C1C1E",
            margin: 0,
            letterSpacing: -0.1,
          }}
        >
          Reset Kata Sandi
        </h2>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ padding: "32px 20px 40px", display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#1C1C1E",
                    margin: "0 0 8px",
                    letterSpacing: -0.2,
                  }}
                >
                  Lupa Kata Sandi?
                </h1>
                <p style={{ fontSize: 15, fontWeight: 400, color: "#3C3C43", margin: 0, lineHeight: 1.5 }}>
                  Masukkan email akun kamu. Kami akan kirim link untuk mengatur ulang kata sandi.
                </p>
              </div>

              {/* Email input */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#3C3C43",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Email
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    border: focused ? "2px solid #1A6FBF" : "1px solid #EEEEED",
                    borderRadius: 12,
                    height: 52,
                    padding: "0 16px",
                    gap: 10,
                  }}
                >
                  <Mail size={16} color="#8E8E93" strokeWidth={1.5} />
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: 15,
                      fontFamily: "'Poppins', sans-serif",
                      color: "#1C1C1E",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={!email}
                style={{
                  width: "100%",
                  height: 52,
                  backgroundColor: email ? "#1A6FBF" : "#EEEEED",
                  color: email ? "#FFFFFF" : "#8E8E93",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  borderRadius: 16,
                  border: "none",
                  cursor: email ? "pointer" : "not-allowed",
                  transition: "all 200ms ease",
                }}
              >
                Kirim Link Reset
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px 40px",
                textAlign: "center",
              }}
            >
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
                Link reset kata sandi telah dikirim ke
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1C1C1E",
                  margin: "0 0 32px",
                }}
              >
                {email}
              </p>

              <p
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: "#8E8E93",
                  margin: "0 0 32px",
                  lineHeight: 1.5,
                }}
              >
                Cek kotak masuk atau folder spam kamu. Link akan kedaluwarsa dalam 24 jam.
              </p>

              <button
                onClick={() => navigate("/login")}
                style={{
                  width: "100%",
                  height: 44,
                  backgroundColor: "transparent",
                  color: "#1A6FBF",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'Poppins', sans-serif",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Kembali ke Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
