import { Home, Navigation, Layers, Bookmark, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const tabs = [
  { label: "Beranda", icon: Home, path: "/home" },
  { label: "Rute", icon: Navigation, path: "/route-search" },
  { label: "Peta Jalur", icon: Layers, path: "/peta-jalur" },
  { label: "Tersimpan", icon: Bookmark, path: "/tersimpan" },
  { label: "Profil", icon: User, path: "/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white flex items-start justify-around px-1"
      style={{
        height: 72,
        borderTop: "1px solid #EEEEED",
        paddingTop: 8,
        paddingBottom: "max(20px, env(safe-area-inset-bottom))",
        zIndex: 1200,
      }}
    >
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-1 flex-1"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <Icon
              size={20}
              strokeWidth={1.5}
              color={active ? "#1A6FBF" : "#8E8E93"}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 400,
                color: active ? "#1A6FBF" : "#8E8E93",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.4,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}