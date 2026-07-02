import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft, Wrench, MessageSquare, Loader,
  Users, Shield, Star, AlertTriangle, Train, Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ─── Report type definitions ───────────────────────────────────────────────────
const REPORT_TYPES = [
  {
    id: "cleanliness",
    icon: Star,
    label: "Kebersihan",
    desc: "Sampah, toilet kotor, dll.",
    color: "#2A9D6F",
    bg: "#E8F8F2",
  },
  {
    id: "safety",
    icon: Shield,
    label: "Keamanan",
    desc: "Tindak kriminal, ancaman",
    color: "#C9423A",
    bg: "#FFEBEA",
  },
  {
    id: "facility",
    icon: Wrench,
    label: "Kerusakan Fasilitas",
    desc: "Eskalator, lift, kursi rusak",
    color: "#D97B2A",
    bg: "#FFF3E0",
  },
  {
    id: "crowding",
    icon: Users,
    label: "Kepadatan",
    desc: "Gerbong atau halte penuh",
    color: "#1A6FBF",
    bg: "#EAF4FF",
  },
  {
    id: "staff",
    icon: MessageSquare,
    label: "Perilaku Petugas",
    desc: "Keluhan terhadap staf",
    color: "#7B5EA7",
    bg: "#F3EFFE",
  },
  {
    id: "disruption",
    icon: AlertTriangle,
    label: "Gangguan Layanan",
    desc: "Keterlambatan, pembatalan",
    color: "#D97B2A",
    bg: "#FFF3E0",
  },
] as const;

type ReportTypeId = typeof REPORT_TYPES[number]["id"];

const modaOptions = ["MRT", "KRL", "TransJakarta", "LRT", "JakLingko"];
const severityOptions = ["Ringan", "Sedang", "Parah"];
const locationOptions = [
  "Gerbong 1", "Gerbong 2", "Gerbong 3", "Gerbong 4", "Gerbong 5", "Gerbong 6",
  "Stasiun / Halte", "Area Parkir", "Toilet", "Eskalator / Lift",
];
const staffBehaviorOptions = ["Tidak ramah", "Tidak membantu", "Meminta uang", "Diskriminasi", "Lainnya"];
const facilityTypeOptions = ["Eskalator", "Lift", "AC", "Kursi", "Pintu", "Toilet", "Layar Informasi", "Lainnya"];

// ─── Type-specific form fields ─────────────────────────────────────────────────
function CleanlinessForm({ state, setState }: any) {
  return (
    <>
      <SelectField label="Moda Transit" value={state.moda} onChange={(v: string) => setState({ ...state, moda: v })} options={modaOptions} />
      <InputField label="Rute / Jalur" value={state.route} onChange={(v: string) => setState({ ...state, route: v })} placeholder="cth. Lebak Bulus Line" />
      <SelectField label="Lokasi Spesifik" value={state.location} onChange={(v: string) => setState({ ...state, location: v })} options={locationOptions} />
      <ChipsField label="Tingkat Keparahan" options={severityOptions} value={state.severity} onChange={(v: string) => setState({ ...state, severity: v })} />
      <PhotoField label="Foto (opsional)" value={state.hasPhoto} onChange={(v: boolean) => setState({ ...state, hasPhoto: v })} />
      <NotesField value={state.notes} onChange={(v: string) => setState({ ...state, notes: v })} />
    </>
  );
}

function SafetyForm({ state, setState }: any) {
  return (
    <>
      <SelectField label="Moda Transit" value={state.moda} onChange={(v: string) => setState({ ...state, moda: v })} options={modaOptions} />
      <SelectField label="Lokasi Kejadian" value={state.location} onChange={(v: string) => setState({ ...state, location: v })} options={locationOptions} />
      <ChipsField label="Tingkat Urgensi" options={["Rendah", "Menengah", "Darurat"]} value={state.severity} onChange={(v: string) => setState({ ...state, severity: v })} />
      <div style={{ padding: "10px 12px", backgroundColor: "#FFEBEA", borderRadius: 10, marginTop: 4 }}>
        <p style={{ fontSize: 12, color: "#C9423A", margin: 0, fontWeight: 500 }}>
          ⚠️ Jika situasi darurat, segera hubungi petugas atau nomor darurat 119.
        </p>
      </div>
      <NotesField value={state.notes} onChange={(v: string) => setState({ ...state, notes: v })} label="Deskripsi Kejadian *" />
    </>
  );
}

function FacilityForm({ state, setState }: any) {
  return (
    <>
      <SelectField label="Moda Transit" value={state.moda} onChange={(v: string) => setState({ ...state, moda: v })} options={modaOptions} />
      <InputField label="Nama Stasiun / Halte" value={state.stationName} onChange={(v: string) => setState({ ...state, stationName: v })} placeholder="cth. Stasiun Sudirman" />
      <ChipsField label="Jenis Fasilitas" options={facilityTypeOptions} value={state.facilityType} onChange={(v: string) => setState({ ...state, facilityType: v })} wrap />
      <ChipsField label="Tingkat Kerusakan" options={severityOptions} value={state.severity} onChange={(v: string) => setState({ ...state, severity: v })} />
      <PhotoField label="Foto Kerusakan (opsional)" value={state.hasPhoto} onChange={(v: boolean) => setState({ ...state, hasPhoto: v })} />
      <NotesField value={state.notes} onChange={(v: string) => setState({ ...state, notes: v })} />
    </>
  );
}

function CrowdingForm({ state, setState }: any) {
  return (
    <>
      <SelectField label="Moda Transit" value={state.moda} onChange={(v: string) => setState({ ...state, moda: v })} options={modaOptions} />
      <InputField label="Rute / Jalur" value={state.route} onChange={(v: string) => setState({ ...state, route: v })} placeholder="cth. Lebak Bulus Line" />
      <ChipsField label="Nomor Gerbong" options={["G1", "G2", "G3", "G4", "G5", "G6", "Semua"]} value={state.coachNumber} onChange={(v: string) => setState({ ...state, coachNumber: v })} />
      <ChipsField label="Tingkat Kepadatan" options={["Padat", "Sangat Padat", "Tidak Bisa Masuk"]} value={state.severity} onChange={(v: string) => setState({ ...state, severity: v })} />
      <TimeField label="Waktu Kejadian" value={state.time} onChange={(v: string) => setState({ ...state, time: v })} />
      <NotesField value={state.notes} onChange={(v: string) => setState({ ...state, notes: v })} />
    </>
  );
}

function StaffForm({ state, setState }: any) {
  return (
    <>
      <SelectField label="Moda Transit" value={state.moda} onChange={(v: string) => setState({ ...state, moda: v })} options={modaOptions} />
      <InputField label="Nama / ID Petugas (jika diketahui)" value={state.staffId} onChange={(v: string) => setState({ ...state, staffId: v })} placeholder="Opsional" />
      <SelectField label="Lokasi" value={state.location} onChange={(v: string) => setState({ ...state, location: v })} options={locationOptions} />
      <ChipsField label="Jenis Pelanggaran" options={staffBehaviorOptions} value={state.behaviorType} onChange={(v: string) => setState({ ...state, behaviorType: v })} wrap />
      <NotesField value={state.notes} onChange={(v: string) => setState({ ...state, notes: v })} label="Deskripsi Kejadian *" />
    </>
  );
}

function DisruptionForm({ state, setState }: any) {
  return (
    <>
      <SelectField label="Moda Transit" value={state.moda} onChange={(v: string) => setState({ ...state, moda: v })} options={modaOptions} />
      <InputField label="Rute / Jalur" value={state.route} onChange={(v: string) => setState({ ...state, route: v })} placeholder="cth. Lebak Bulus Line" />
      <ChipsField label="Jenis Gangguan" options={["Terlambat", "Dibatalkan", "Salah Info", "Tidak Beroperasi"]} value={state.issueType} onChange={(v: string) => setState({ ...state, issueType: v })} />
      <TimeField label="Waktu Gangguan" value={state.time} onChange={(v: string) => setState({ ...state, time: v })} />
      <NotesField value={state.notes} onChange={(v: string) => setState({ ...state, notes: v })} />
    </>
  );
}

// ─── Reusable sub-field components ────────────────────────────────────────────
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", height: 48, border: "1.5px solid #EEEEED", borderRadius: 12,
          padding: "0 14px", fontSize: 15, fontFamily: "'Poppins', sans-serif",
          color: "#1C1C1E", backgroundColor: "#FFFFFF", outline: "none", appearance: "none",
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", height: 48, border: "1.5px solid #EEEEED", borderRadius: 12,
          padding: "0 14px", fontSize: 15, fontFamily: "'Poppins', sans-serif",
          color: "#1C1C1E", backgroundColor: "#FFFFFF", outline: "none", boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>{label}</label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", height: 48, border: "1.5px solid #EEEEED", borderRadius: 12,
          padding: "0 14px", fontSize: 15, fontFamily: "'Poppins', sans-serif",
          color: "#1C1C1E", backgroundColor: "#FFFFFF", outline: "none", boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function ChipsField({ label, options, value, onChange, wrap }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void; wrap?: boolean }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 8 }}>{label}</label>
      <div style={{ display: "flex", gap: 8, flexWrap: wrap ? "wrap" : "nowrap", overflowX: wrap ? "visible" : "auto" }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              padding: "6px 14px", borderRadius: 100, cursor: "pointer",
              border: value === opt ? "2px solid #1A6FBF" : "1.5px solid #EEEEED",
              backgroundColor: value === opt ? "#EAF4FF" : "transparent",
              color: value === opt ? "#1A6FBF" : "#3C3C43",
              fontSize: 13, fontWeight: 500, fontFamily: "'Poppins', sans-serif",
              whiteSpace: "nowrap", flexShrink: 0,
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function PhotoField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 8 }}>{label}</label>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: "100%", height: 80, borderRadius: 12, cursor: "pointer",
          border: value ? "2px solid #1A6FBF" : "1.5px dashed #D1D1D0",
          backgroundColor: value ? "#EAF4FF" : "#F7F7F5",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        <Camera size={20} color={value ? "#1A6FBF" : "#8E8E93"} strokeWidth={1.5} />
        <span style={{ fontSize: 13, color: value ? "#1A6FBF" : "#8E8E93", fontFamily: "'Poppins', sans-serif" }}>
          {value ? "✓ Foto ditambahkan (simulasi)" : "Tambah Foto"}
        </span>
      </button>
    </div>
  );
}

function NotesField({ value, onChange, label = "Catatan Tambahan (opsional)" }: { value: string; onChange: (v: string) => void; label?: string }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 8 }}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 500))}
        placeholder="Tulis catatan di sini..."
        rows={3}
        style={{
          width: "100%", border: "1.5px solid #EEEEED", borderRadius: 12, padding: 14,
          fontSize: 15, fontFamily: "'Poppins', sans-serif", color: "#1C1C1E",
          backgroundColor: "#FFFFFF", outline: "none", resize: "none", boxSizing: "border-box",
        }}
      />
      <p style={{ fontSize: 11, color: "#8E8E93", textAlign: "right", margin: "4px 0 0" }}>
        {value.length} / 500
      </p>
    </div>
  );
}

// ─── Default form states per type ─────────────────────────────────────────────
const defaultStates: Record<ReportTypeId, any> = {
  cleanliness: { moda: "MRT", route: "Lebak Bulus Line", location: "Gerbong 1", severity: "Sedang", hasPhoto: false, notes: "" },
  safety: { moda: "MRT", location: "Stasiun / Halte", severity: "Menengah", notes: "" },
  facility: { moda: "MRT", stationName: "", facilityType: "Eskalator", severity: "Sedang", hasPhoto: false, notes: "" },
  crowding: { moda: "MRT", route: "Lebak Bulus Line", coachNumber: "G1", severity: "Padat", time: "", notes: "" },
  staff: { moda: "MRT", staffId: "", location: "Stasiun / Halte", behaviorType: "Tidak ramah", notes: "" },
  disruption: { moda: "MRT", route: "Lebak Bulus Line", issueType: "Terlambat", time: "", notes: "" },
};

// ─── Summary builder ───────────────────────────────────────────────────────────
function buildSummary(typeId: ReportTypeId, state: any): Array<{ label: string; value: string }> {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Kategori", value: REPORT_TYPES.find((t) => t.id === typeId)?.label ?? "" },
    { label: "Moda", value: state.moda ?? "" },
  ];
  if (state.route) rows.push({ label: "Rute", value: state.route });
  if (state.location) rows.push({ label: "Lokasi", value: state.location });
  if (state.facilityType) rows.push({ label: "Fasilitas", value: state.facilityType });
  if (state.coachNumber) rows.push({ label: "Gerbong", value: state.coachNumber });
  if (state.issueType) rows.push({ label: "Gangguan", value: state.issueType });
  if (state.behaviorType) rows.push({ label: "Pelanggaran", value: state.behaviorType });
  if (state.severity) rows.push({ label: "Keparahan", value: state.severity });
  if (state.time) rows.push({ label: "Waktu", value: state.time });
  return rows;
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export function ReportScreen() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<ReportTypeId | null>(null);
  const [formStates, setFormStates] = useState<Record<string, any>>({ ...defaultStates });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/sukses-laporan");
    }, 1200);
  };

  const currentState = selectedType ? formStates[selectedType] : null;
  const setCurrentState = (v: any) => {
    if (selectedType) setFormStates((prev) => ({ ...prev, [selectedType]: v }));
  };

  const selectedTypeMeta = REPORT_TYPES.find((t) => t.id === selectedType);

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#FFFFFF", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: 8,
        flexShrink: 0, boxShadow: "0 1px 4px rgba(28,28,30,0.04)",
      }}>
        <button onClick={() => navigate(-1 as any)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
          <ChevronLeft size={24} color="#1C1C1E" strokeWidth={1.5} />
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", margin: 0, letterSpacing: -0.1 }}>
          Laporkan Masalah
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "#F7F7F5", padding: "20px 20px 40px" }}>

        {/* Report type grid */}
        <p style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>
          KATEGORI LAPORAN
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {REPORT_TYPES.map((type) => {
            const Icon = type.icon;
            const selected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                style={{
                  padding: "14px 12px", borderRadius: 16,
                  backgroundColor: selected ? type.bg : "#FFFFFF",
                  border: selected ? `2px solid ${type.color}` : "1px solid #EEEEED",
                  boxShadow: "0 1px 4px rgba(28,28,30,0.04)",
                  cursor: "pointer", textAlign: "left",
                  display: "flex", flexDirection: "column", gap: 8,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  backgroundColor: selected ? type.color : "#F7F7F5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={20} color={selected ? "#FFFFFF" : "#8E8E93"} strokeWidth={1.5} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: selected ? type.color : "#1C1C1E", margin: 0 }}>
                  {type.label}
                </p>
                <p style={{ fontSize: 11, fontWeight: 400, color: selected ? type.color : "#8E8E93", margin: 0, lineHeight: 1.4 }}>
                  {type.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic form per type */}
        <AnimatePresence mode="wait">
          {selectedType && currentState && selectedTypeMeta && (
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{ marginTop: 20 }}
            >
              {/* Section header with type color */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                marginBottom: 12, padding: "10px 14px", borderRadius: 12,
                backgroundColor: selectedTypeMeta.bg,
              }}>
                <Train size={16} color={selectedTypeMeta.color} strokeWidth={1.5} />
                <span style={{ fontSize: 13, fontWeight: 600, color: selectedTypeMeta.color }}>
                  Detail — {selectedTypeMeta.label}
                </span>
              </div>

              <div style={{
                backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16,
                display: "flex", flexDirection: "column", gap: 14,
              }}>
                {selectedType === "cleanliness" && <CleanlinessForm state={currentState} setState={setCurrentState} />}
                {selectedType === "safety" && <SafetyForm state={currentState} setState={setCurrentState} />}
                {selectedType === "facility" && <FacilityForm state={currentState} setState={setCurrentState} />}
                {selectedType === "crowding" && <CrowdingForm state={currentState} setState={setCurrentState} />}
                {selectedType === "staff" && <StaffForm state={currentState} setState={setCurrentState} />}
                {selectedType === "disruption" && <DisruptionForm state={currentState} setState={setCurrentState} />}
              </div>

              {/* Summary */}
              <div style={{ backgroundColor: "#EAF4FF", borderRadius: 12, padding: 16, marginTop: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1A6FBF", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 8px" }}>
                  RINGKASAN LAPORAN
                </p>
                {buildSummary(selectedType, currentState).map((row) => (
                  <div key={row.label} style={{ display: "flex", gap: 12, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93", minWidth: 80 }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 400, color: "#1C1C1E" }}>{row.value || "—"}</span>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: "100%", height: 52,
                  backgroundColor: submitting ? "#8E8E93" : "#1A6FBF",
                  color: "#FFFFFF", fontSize: 15, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif", borderRadius: 16,
                  border: "none", cursor: submitting ? "not-allowed" : "pointer",
                  marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                {submitting ? (
                  <>
                    <Loader size={18} strokeWidth={1.5} style={{ animation: "spin 1s linear infinite" }} />
                    Mengirim...
                  </>
                ) : "Kirim Laporan"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
