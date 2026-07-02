import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Plus, Trash2, Navigation, ChevronLeft, Home, Building2,
  Bookmark, Clock, Pencil, X, Check, MapPin,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { TransitBadge } from "../components/TransitBadge";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { useAppContext } from "../context/AppContext";
import { ROUTE_DATABASE } from "../data/routeData";
import { motion, AnimatePresence } from "motion/react";
import type { SavedLocation } from "../context/AppContext";

const recentTrips = [
  { id: 1, transit: "MRT" as const, from: "Blok M", to: "Bundaran HI", date: "Kemarin", duration: "28 mnt" },
  { id: 2, transit: "KRL" as const, from: "Depok", to: "Gambir", date: "2 hari lalu", duration: "45 mnt" },
  { id: 3, transit: "TransJakarta" as const, from: "Kalideres", to: "Harmoni", date: "3 hari lalu", duration: "55 mnt" },
  { id: 4, transit: "MRT" as const, from: "Sudirman", to: "Lebak Bulus", date: "5 hari lalu", duration: "22 mnt" },
  { id: 5, transit: "KRL" as const, from: "Manggarai", to: "Bogor", date: "6 hari lalu", duration: "75 mnt" },
  { id: 6, transit: "LRT" as const, from: "Dukuh Atas", to: "Cawang", date: "1 minggu lalu", duration: "18 mnt" },
  { id: 7, transit: "TransJakarta" as const, from: "Blok M", to: "Senen", date: "1 minggu lalu", duration: "40 mnt" },
];

const iconOptions: Array<{ key: SavedLocation["iconKey"]; label: string; icon: typeof Home }> = [
  { key: "home", label: "Rumah", icon: Home },
  { key: "work", label: "Kantor", icon: Building2 },
  { key: "other", label: "Lainnya", icon: MapPin },
];

function LocationIcon({ iconKey, color, size = 18 }: { iconKey: SavedLocation["iconKey"]; color: string; size?: number }) {
  const map = { home: Home, work: Building2, other: MapPin };
  const Icon = map[iconKey] ?? MapPin;
  return <Icon size={size} color={color} strokeWidth={1.5} />;
}

interface LocationFormProps {
  initial?: Partial<SavedLocation>;
  onSave: (data: Omit<SavedLocation, "id">) => void;
  onCancel: () => void;
}

function LocationForm({ initial, onSave, onCancel }: LocationFormProps) {
  const [label, setLabel] = useState(initial?.label ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [iconKey, setIconKey] = useState<SavedLocation["iconKey"]>(initial?.iconKey ?? "other");
  const isValid = label.trim().length > 0 && address.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        backgroundColor: "#FFFFFF", borderRadius: 20,
        padding: 20, margin: "0 20px",
        boxShadow: "0 4px 24px rgba(28,28,30,0.12)",
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1C1C1E", margin: "0 0 16px" }}>
        {initial?.label ? "Edit Lokasi" : "Tambah Lokasi Baru"}
      </h3>

      {/* Icon type */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {iconOptions.map((opt) => {
          const selected = iconKey === opt.key;
          const Icon = opt.icon;
          return (
            <button
              key={opt.key}
              onClick={() => setIconKey(opt.key)}
              style={{
                flex: 1, padding: "10px 8px", borderRadius: 12, cursor: "pointer",
                border: selected ? "2px solid #1A6FBF" : "1.5px solid #EEEEED",
                backgroundColor: selected ? "#EAF4FF" : "#F7F7F5",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}
            >
              <Icon size={18} color={selected ? "#1A6FBF" : "#8E8E93"} strokeWidth={1.5} />
              <span style={{ fontSize: 11, fontWeight: 500, color: selected ? "#1A6FBF" : "#8E8E93" }}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Label */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>
          Nama Lokasi *
        </label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="cth. Rumah, Kantor, Gym..."
          style={{
            width: "100%", height: 48, border: "1.5px solid #EEEEED",
            borderRadius: 12, padding: "0 14px", fontSize: 15,
            fontFamily: "'Poppins', sans-serif", color: "#1C1C1E",
            backgroundColor: "#FFFFFF", outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Address */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>
          Alamat *
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="cth. Jl. Sudirman No. 1, Jakarta"
          style={{
            width: "100%", height: 48, border: "1.5px solid #EEEEED",
            borderRadius: 12, padding: "0 14px", fontSize: 15,
            fontFamily: "'Poppins', sans-serif", color: "#1C1C1E",
            backgroundColor: "#FFFFFF", outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1, height: 48, border: "1.5px solid #EEEEED", borderRadius: 12,
            backgroundColor: "transparent", color: "#3C3C43", fontSize: 15,
            fontFamily: "'Poppins', sans-serif", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <X size={16} strokeWidth={1.5} />
          Batal
        </button>
        <button
          onClick={() => isValid && onSave({ label: label.trim(), address: address.trim(), iconKey, color: "#1A6FBF" })}
          disabled={!isValid}
          style={{
            flex: 1, height: 48, borderRadius: 12, border: "none",
            backgroundColor: isValid ? "#1A6FBF" : "#EEEEED",
            color: isValid ? "#FFFFFF" : "#8E8E93",
            fontSize: 15, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
            cursor: isValid ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <Check size={16} strokeWidth={1.5} />
          Simpan
        </button>
      </div>
    </motion.div>
  );
}

export function TersimpanScreen() {
  const navigate = useNavigate();
  const { showSnackbar, savedLocations, addSavedLocation, updateSavedLocation, deleteSavedLocation, setSelectedRoute } = useAppContext();
  const [trips, setTrips] = useState(recentTrips);
  const [deleteTripTarget, setDeleteTripTarget] = useState<number | null>(null);
  const [deleteLocTarget, setDeleteLocTarget] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLoc, setEditingLoc] = useState<SavedLocation | null>(null);

  const handleDeleteTrip = () => {
    if (deleteTripTarget !== null) {
      setTrips((prev) => prev.filter((t) => t.id !== deleteTripTarget));
      setDeleteTripTarget(null);
      showSnackbar("Riwayat dihapus", "default");
    }
  };

  const handleDeleteLoc = () => {
    if (deleteLocTarget !== null) {
      deleteSavedLocation(deleteLocTarget);
      setDeleteLocTarget(null);
      showSnackbar("Lokasi dihapus", "default");
    }
  };

  const handleAddLoc = (data: Omit<SavedLocation, "id">) => {
    addSavedLocation(data);
    setShowAddForm(false);
    showSnackbar("Lokasi berhasil ditambahkan", "success");
  };

  const handleUpdateLoc = (data: Omit<SavedLocation, "id">) => {
    if (editingLoc) {
      updateSavedLocation({ ...data, id: editingLoc.id });
      setEditingLoc(null);
      showSnackbar("Lokasi berhasil diperbarui", "success");
    }
  };

  const handleUseTripRoute = (trip: typeof recentTrips[0]) => {
    const found = ROUTE_DATABASE.find(
      (r) => r.from === trip.from && r.to === trip.to
    );
    if (found) {
      setSelectedRoute(found);
      navigate("/detail-route");
    } else {
      navigate("/route-search");
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: "#F7F7F5", fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#FFFFFF", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: 12,
        flexShrink: 0, boxShadow: "0 1px 4px rgba(28,28,30,0.04)",
      }}>
        <button
          onClick={() => navigate("/home")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
        >
          <ChevronLeft size={24} color="#1C1C1E" strokeWidth={1.5} />
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", margin: 0, letterSpacing: -0.1 }}>
          Tersimpan & Riwayat
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 120 }}>

        {/* ── Add / Edit form ───────────────────────────────────────────── */}
        <AnimatePresence>
          {(showAddForm || editingLoc) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ paddingTop: 16 }}
            >
              <LocationForm
                initial={editingLoc ?? undefined}
                onSave={editingLoc ? handleUpdateLoc : handleAddLoc}
                onCancel={() => { setShowAddForm(false); setEditingLoc(null); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Kartu Cepat ────────────────────────────────────────────────── */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
              KARTU CEPAT
            </p>
            <span style={{ fontSize: 11, color: "#8E8E93" }}>{savedLocations.length} lokasi</span>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(28,28,30,0.06)" }}>
            <AnimatePresence>
              {savedLocations.map((loc, i) => (
                <motion.div
                  key={loc.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  style={{
                    display: "flex", alignItems: "center", padding: "14px 16px",
                    borderBottom: i < savedLocations.length - 1 ? "1px solid #EEEEED" : "none",
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    backgroundColor: "#EAF4FF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginRight: 12, flexShrink: 0,
                  }}>
                    <LocationIcon iconKey={loc.iconKey} color={loc.color} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, cursor: "pointer" }} onClick={() => navigate("/route-search")}>
                    <p style={{ fontSize: 15, fontWeight: 500, color: "#1C1C1E", margin: 0 }}>{loc.label}</p>
                    <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: "2px 0 0" }}>{loc.address}</p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
                    <button
                      onClick={() => { setEditingLoc(loc); setShowAddForm(false); }}
                      style={{
                        width: 32, height: 32, borderRadius: "50%",
                        backgroundColor: "#F7F7F5", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                      title="Edit"
                    >
                      <Pencil size={14} color="#3C3C43" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => setDeleteLocTarget(loc.id)}
                      style={{
                        width: 32, height: 32, borderRadius: "50%",
                        backgroundColor: "#FFEBEA", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                      title="Hapus"
                    >
                      <Trash2 size={14} color="#C9423A" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => navigate("/route-search")}
                      style={{
                        width: 32, height: 32, borderRadius: "50%",
                        backgroundColor: "#EAF4FF", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                      title="Navigasi"
                    >
                      <Navigation size={14} color="#1A6FBF" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add new */}
            <button
              onClick={() => { setShowAddForm(true); setEditingLoc(null); }}
              style={{
                width: "100%", padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 12,
                background: "none", border: "none",
                borderTop: savedLocations.length > 0 ? "1px solid #EEEEED" : "none",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                backgroundColor: "#F7F7F5", border: "1.5px dashed #EEEEED",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Plus size={18} color="#8E8E93" strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 400, color: "#8E8E93" }}>
                Tambah Lokasi Baru
              </span>
            </button>
          </div>
        </div>

        {/* ── Riwayat Perjalanan ─────────────────────────────────────────── */}
        <div style={{ padding: "24px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
              RIWAYAT PERJALANAN
            </p>
            <span style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93" }}>{trips.length} terakhir</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <AnimatePresence>
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, height: 0 }}
                  style={{
                    backgroundColor: "#FFFFFF", borderRadius: 16, padding: "14px 16px",
                    boxShadow: "0 2px 8px rgba(28,28,30,0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ flex: 1, cursor: "pointer" }} onClick={() => handleUseTripRoute(trip)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <TransitBadge type={trip.transit} />
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={12} color="#8E8E93" strokeWidth={1.5} />
                          <span style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93" }}>{trip.duration}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", margin: "0 0 2px", letterSpacing: -0.1 }}>
                        {trip.from} → {trip.to}
                      </p>
                      <p style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", margin: 0 }}>{trip.date}</p>
                    </div>

                    <div style={{ display: "flex", gap: 8, marginLeft: 12 }}>
                      <button
                        onClick={() => handleUseTripRoute(trip)}
                        style={{
                          width: 36, height: 36, borderRadius: "50%",
                          backgroundColor: "#EAF4FF", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                        title="Gunakan rute ini"
                      >
                        <Navigation size={16} color="#1A6FBF" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => setDeleteTripTarget(trip.id)}
                        style={{
                          width: 36, height: 36, borderRadius: "50%",
                          backgroundColor: "#FFEBEA", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                        title="Hapus"
                      >
                        <Trash2 size={16} color="#C9423A" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {trips.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <Bookmark size={40} color="#EEEEED" strokeWidth={1.5} style={{ margin: "0 auto 12px" }} />
                <p style={{ fontSize: 15, fontWeight: 400, color: "#8E8E93" }}>Belum ada riwayat perjalanan</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete trip dialog */}
      <ConfirmationDialog
        visible={deleteTripTarget !== null}
        title="Hapus Riwayat?"
        description="Riwayat perjalanan ini akan dihapus permanen."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        variant="destructive"
        onConfirm={handleDeleteTrip}
        onCancel={() => setDeleteTripTarget(null)}
      />

      {/* Delete location dialog */}
      <ConfirmationDialog
        visible={deleteLocTarget !== null}
        title="Hapus Lokasi?"
        description="Lokasi tersimpan ini akan dihapus permanen."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        variant="destructive"
        onConfirm={handleDeleteLoc}
        onCancel={() => setDeleteLocTarget(null)}
      />

      <BottomNav />
    </div>
  );
}
