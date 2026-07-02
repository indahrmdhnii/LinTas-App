import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Pencil, Bell, Globe, Train, MapPin, User, Lock, Flag, Info, LogOut, ChevronRight,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

export function ProfileScreen() {
  const navigate = useNavigate();
  const { setIsGuest } = useAppContext();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setIsGuest(false);
    setShowLogoutDialog(false);
    navigate("/login", { replace: true });
  };

  const sections = [
    {
      label: "PREFERENSI",
      items: [
        {
          icon: Bell,
          label: "Notifikasi Gangguan",
          type: "toggle" as const,
          value: notifEnabled,
          onToggle: () => setNotifEnabled(!notifEnabled),
        },
        { icon: Globe, label: "Bahasa", type: "nav" as const, value: "Indonesia" },
        { icon: Train, label: "Moda Favorit", type: "nav" as const, value: "MRT, KRL" },
        { icon: MapPin, label: "Izin Lokasi", type: "nav" as const, value: "Aktif" },
      ],
    },
    {
      label: "AKUN",
      items: [
        {
          icon: User,
          label: "Ubah Nama & Nomor HP",
          type: "nav" as const,
          onPress: () => navigate("/edit-profile"),
        },
        {
          icon: Lock,
          label: "Ubah Kata Sandi",
          type: "nav" as const,
          onPress: () => navigate("/edit-profile"),
        },
      ],
    },
    {
      label: "LAINNYA",
      items: [
        {
          icon: Flag,
          label: "Beri Masukan",
          type: "nav" as const,
          onPress: () => navigate("/report"),
        },
        { icon: Info, label: "Tentang LinTas", type: "nav" as const, value: "v1.0.0" },
      ],
    },
  ];

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 120 }}>
        {/* Profile header */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "24px 20px",
            boxShadow: "0 1px 4px rgba(28,28,30,0.04)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#EAF4FF",
              border: "2px solid #1A6FBF",
              boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <User size={36} color="#1A6FBF" strokeWidth={1.5} />
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1C1C1E", margin: "0 0 4px", letterSpacing: -0.2 }}>
            Indah Ramadhani
          </h1>
          <p style={{ fontSize: 15, fontWeight: 400, color: "#3C3C43", margin: "0 0 16px" }}>
            Indah@gmail.com
          </p>

          <button
            onClick={() => navigate("/edit-profile")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              fontSize: 13,
              fontWeight: 500,
              color: "#1A6FBF",
              fontFamily: "'Poppins', sans-serif",
              cursor: "pointer",
              padding: "6px 16px",
            }}
          >
            <Pencil size={16} strokeWidth={1.5} />
            Edit Profil
          </button>
        </div>

        {/* Settings sections */}
        <div style={{ padding: "16px 20px 0" }}>
          {sections.map((section, si) => (
            <div key={si} style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#8E8E93",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  margin: "0 0 8px",
                }}
              >
                {section.label}
              </p>
              <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden" }}>
                {section.items.map((item, ii) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={ii}
                      whileTap={{ backgroundColor: "#F7F7F5" }}
                      onClick={item.type === "nav" ? (item as any).onPress : undefined}
                      style={{
                        width: "100%",
                        height: 52,
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "none",
                        border: "none",
                        borderBottom: ii < section.items.length - 1 ? "1px solid #EEEEED" : "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <Icon size={20} color="#8E8E93" strokeWidth={1.5} />
                      <span style={{ flex: 1, fontSize: 15, fontWeight: 400, color: "#1C1C1E" }}>
                        {item.label}
                      </span>
                      {item.type === "toggle" ? (
                        <div
                          onClick={(e) => { e.stopPropagation(); (item as any).onToggle(); }}
                          style={{
                            width: 51,
                            height: 31,
                            borderRadius: 100,
                            backgroundColor: (item as any).value ? "#2A9D6F" : "#E5E5EA",
                            position: "relative",
                            cursor: "pointer",
                            transition: "background-color 200ms ease",
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 2,
                              left: (item as any).value ? 22 : 2,
                              width: 27,
                              height: 27,
                              borderRadius: "50%",
                              backgroundColor: "#FFFFFF",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                              transition: "left 200ms ease",
                            }}
                          />
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {(item as any).value && (
                            <span style={{ fontSize: 15, fontWeight: 400, color: "#8E8E93" }}>
                              {(item as any).value}
                            </span>
                          )}
                          <ChevronRight size={16} color="#8E8E93" strokeWidth={1.5} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Logout */}
          <button
            onClick={() => setShowLogoutDialog(true)}
            style={{
              width: "100%",
              height: 52,
              backgroundColor: "#C9423A",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              borderRadius: 16,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 8,
              marginBottom: 16,
            }}
          >
            <LogOut size={20} strokeWidth={1.5} />
            Keluar dari Akun
          </button>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      <ConfirmationDialog
        visible={showLogoutDialog}
        title="Keluar dari Akun?"
        description="Kamu harus login kembali untuk mengakses fitur lengkap LinTas."
        confirmLabel="Keluar"
        cancelLabel="Batal"
        variant="destructive"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
      />

      <BottomNav />
    </div>
  );
}