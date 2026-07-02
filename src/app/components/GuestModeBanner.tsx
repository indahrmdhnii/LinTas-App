import { UserX } from "lucide-react";
import { useNavigate } from "react-router";

export function GuestModeBanner() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: 48,
        backgroundColor: "#FFF3E0",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <UserX size={16} color="#D97B2A" strokeWidth={1.5} style={{ flexShrink: 0 }} />
      <span
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: "#1C1C1E",
          flex: 1,
        }}
      >
        Mode tamu aktif — riwayat dan simpan tidak tersedia
      </span>
      <button
        onClick={() => navigate("/register")}
        style={{
          background: "none",
          border: "none",
          fontSize: 13,
          fontWeight: 500,
          color: "#1A6FBF",
          fontFamily: "'Poppins', sans-serif",
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
        }}
      >
        Daftar
      </button>
    </div>
  );
}
