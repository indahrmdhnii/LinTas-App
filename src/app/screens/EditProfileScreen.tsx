import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Camera, User, Eye, EyeOff, Lock } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const transitModes = ["MRT", "KRL", "TransJakarta", "LRT", "JakLingko"];
const transitColors: Record<string, string> = {
  MRT: "#0070C0",
  KRL: "#FF6600",
  TransJakarta: "#E2001A",
  LRT: "#E4002B",
  JakLingko: "#00923F",
};

export function EditProfileScreen() {
  const navigate = useNavigate();
  const { showSnackbar } = useAppContext();
  const [selectedModes, setSelectedModes] = useState(["MRT", "KRL"]);
  const [language, setLanguage] = useState("Indonesia");
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const toggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          backgroundColor: "#F7F7F5",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate("/profile")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
        >
          <ChevronLeft size={24} color="#1C1C1E" strokeWidth={1.5} />
          <span style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E" }}>Edit Profil</span>
        </button>
        <button
          onClick={() => {
            showSnackbar("Profil berhasil diperbarui", "success");
            setTimeout(() => navigate("/profile"), 300);
          }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#1A6FBF", fontFamily: "'Poppins', sans-serif" }}
        >
          Simpan
        </button>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 20 }}>
        {/* Avatar */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#EAF4FF",
                border: "2px solid #1A6FBF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={36} color="#1A6FBF" strokeWidth={1.5} />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#1A6FBF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Camera size={14} color="white" strokeWidth={1.5} />
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#1A6FBF", cursor: "pointer" }}>
            Ganti Foto
          </span>
        </div>

        {/* Personal Info */}
        <div style={{ margin: "16px 20px 0" }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>
            INFORMASI PRIBADI
          </p>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              { label: "Nama Lengkap", value: "Indah Ramadhani", id: "nama", icon: User },
              { label: "Nomor HP", value: "+62 812 3456 7890", id: "phone", icon: null },
            ].map((field) => (
              <div key={field.id}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>
                  {field.label}
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: focusedField === field.id ? "2px solid #1A6FBF" : "1px solid #EEEEED",
                    borderRadius: 12,
                    height: 52,
                    padding: "0 16px",
                    gap: 10,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <input
                    defaultValue={field.id === "nama" ? "Indah Ramadhani" : field.value}
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
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
            ))}
          </div>
        </div>

        {/* Security */}
        <div style={{ margin: "16px 20px 0" }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>
            KEAMANAN AKUN
          </p>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              { label: "Kata Sandi Lama", show: showOldPwd, setShow: setShowOldPwd, id: "old" },
              { label: "Kata Sandi Baru", show: showNewPwd, setShow: setShowNewPwd, id: "new" },
              { label: "Konfirmasi Kata Sandi Baru", show: showConfirmPwd, setShow: setShowConfirmPwd, id: "confirm" },
            ].map((field) => (
              <div key={field.id}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>
                  {field.label}
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: focusedField === field.id ? "2px solid #1A6FBF" : "1px solid #EEEEED",
                    borderRadius: 12,
                    height: 52,
                    padding: "0 16px",
                    gap: 10,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Lock size={16} color="#8E8E93" strokeWidth={1.5} />
                  <input
                    type={field.show ? "text" : "password"}
                    placeholder="••••••••"
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
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
                  <button
                    onClick={() => field.setShow(!field.show)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    {field.show ? (
                      <Eye size={16} color="#8E8E93" strokeWidth={1.5} />
                    ) : (
                      <Eye size={16} color="#8E8E93" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transit Preferences */}
        <div style={{ margin: "16px 20px 0" }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>
            PREFERENSI TRANSIT
          </p>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 400, color: "#1C1C1E", margin: "0 0 12px" }}>
              Moda Favorit
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {transitModes.map((mode) => {
                const selected = selectedModes.includes(mode);
                return (
                  <button
                    key={mode}
                    onClick={() => toggleMode(mode)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 100,
                      border: "none",
                      backgroundColor: selected ? transitColors[mode] : "#EEEEED",
                      color: selected ? "#FFFFFF" : "#3C3C43",
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>

            <p style={{ fontSize: 15, fontWeight: 400, color: "#1C1C1E", margin: "0 0 10px" }}>
              Bahasa
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["Indonesia", "English"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 100,
                    border: "none",
                    backgroundColor: language === lang ? "#1A6FBF" : "#EEEEED",
                    color: language === lang ? "#FFFFFF" : "#3C3C43",
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}