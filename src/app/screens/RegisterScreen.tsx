import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, User, Mail, Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

type FieldErrors = {
  nama?: string;
  email?: string;
  pwd?: string;
  confirm?: string;
};

function validateNama(v: string) {
  if (!v.trim()) return "Nama lengkap wajib diisi";
  if (v.trim().length < 3) return "Nama minimal 3 karakter";
}
function validateEmail(v: string) {
  if (!v) return "Email wajib diisi";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Format email tidak valid";
}
function validatePwd(v: string) {
  if (!v) return "Kata sandi wajib diisi";
  if (v.length < 8) return "Kata sandi minimal 8 karakter";
}
function validateConfirm(v: string, pwd: string) {
  if (!v) return "Konfirmasi kata sandi wajib diisi";
  if (v !== pwd) return "Kata sandi tidak cocok";
}

function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  if (!pwd) return { score: 0, label: "", color: "#EEEEED" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const levels = [
    { score: 1, label: "Lemah", color: "#C9423A" },
    { score: 2, label: "Cukup", color: "#D97B2A" },
    { score: 3, label: "Kuat", color: "#1A6FBF" },
    { score: 4, label: "Sangat Kuat", color: "#1B7A3E" },
  ];
  return levels[Math.min(score, 4) - 1] ?? { score: 0, label: "", color: "#EEEEED" };
}

const pwdRequirements = [
  { label: "Minimal 8 karakter", test: (v: string) => v.length >= 8 },
  { label: "Huruf kapital (A-Z)", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Angka (0-9)", test: (v: string) => /[0-9]/.test(v) },
  { label: "Karakter khusus (!@#...)", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export function RegisterScreen() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [method, setMethod] = useState("Email");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const methods = ["Email", "Google", "Nomor HP"];
  const strength = getPasswordStrength(pwd);
  const showStrength = touched.pwd && pwd.length > 0;

  const getFieldBorder = (field: string, hasError: boolean) => {
    if (hasError && touched[field]) return "2px solid #C9423A";
    if (focusedField === field) return "2px solid #1A6FBF";
    return "1px solid #EEEEED";
  };

  const handleBlur = (field: keyof FieldErrors) => {
    setFocusedField(null);
    setTouched((t) => ({ ...t, [field]: true }));
    const validators: Record<keyof FieldErrors, () => string | undefined> = {
      nama: () => validateNama(nama),
      email: () => validateEmail(email),
      pwd: () => validatePwd(pwd),
      confirm: () => validateConfirm(confirm, pwd),
    };
    setErrors((e) => ({ ...e, [field]: validators[field]() }));
  };

  const handleRegister = () => {
    const newErrors: FieldErrors = {
      nama: validateNama(nama),
      email: validateEmail(email),
      pwd: validatePwd(pwd),
      confirm: validateConfirm(confirm, pwd),
    };
    setErrors(newErrors);
    setTouched({ nama: true, email: true, pwd: true, confirm: true });
    if (Object.values(newErrors).some(Boolean)) return;
    navigate("/verifikasi-email");
  };

  const fieldIcon = (field: string, hasError: boolean, isValid: boolean) => {
    if (!touched[field]) return null;
    if (hasError) return <XCircle size={16} color="#C9423A" strokeWidth={2} />;
    if (isValid) return <CheckCircle2 size={16} color="#1B7A3E" strokeWidth={2} />;
    return null;
  };

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", gap: 8 }}>
        <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <ChevronLeft size={24} color="#1C1C1E" strokeWidth={1.5} />
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1C1C1E", margin: 0, letterSpacing: -0.2, flex: 1, textAlign: "center", paddingRight: 24 }}>
          Buat Akun Baru
        </h1>
      </div>

      <div style={{ padding: "8px 20px 40px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Nama Lengkap */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>
            Nama Lengkap
          </label>
          <div style={{
            display: "flex", alignItems: "center", backgroundColor: "#FFFFFF",
            border: getFieldBorder("nama", !!errors.nama), borderRadius: 12, height: 52, padding: "0 16px", gap: 10,
          }}>
            <User size={16} color={touched.nama && errors.nama ? "#C9423A" : "#8E8E93"} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                if (touched.nama) setErrors((er) => ({ ...er, nama: validateNama(e.target.value) }));
              }}
              onFocus={() => setFocusedField("nama")}
              onBlur={() => handleBlur("nama")}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 15, fontFamily: "'Poppins', sans-serif", color: "#1C1C1E", backgroundColor: "transparent" }}
            />
            {fieldIcon("nama", !!errors.nama, !!nama && !errors.nama)}
          </div>
          {touched.nama && errors.nama && (
            <p style={{ fontSize: 12, color: "#C9423A", margin: "4px 0 0 4px", fontFamily: "'Poppins', sans-serif" }}>{errors.nama}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>
            Email
          </label>
          <div style={{
            display: "flex", alignItems: "center", backgroundColor: "#FFFFFF",
            border: getFieldBorder("email", !!errors.email), borderRadius: 12, height: 52, padding: "0 16px", gap: 10,
          }}>
            <Mail size={16} color={touched.email && errors.email ? "#C9423A" : "#8E8E93"} strokeWidth={1.5} />
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) setErrors((er) => ({ ...er, email: validateEmail(e.target.value) }));
              }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => handleBlur("email")}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 15, fontFamily: "'Poppins', sans-serif", color: "#1C1C1E", backgroundColor: "transparent" }}
            />
            {fieldIcon("email", !!errors.email, !!email && !errors.email)}
          </div>
          {touched.email && errors.email && (
            <p style={{ fontSize: 12, color: "#C9423A", margin: "4px 0 0 4px", fontFamily: "'Poppins', sans-serif" }}>{errors.email}</p>
          )}
        </div>

        {/* Kata Sandi */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>
            Kata Sandi
          </label>
          <div style={{
            display: "flex", alignItems: "center", backgroundColor: "#FFFFFF",
            border: getFieldBorder("pwd", !!errors.pwd), borderRadius: 12, height: 52, padding: "0 16px", gap: 10,
          }}>
            <Lock size={16} color={touched.pwd && errors.pwd ? "#C9423A" : "#8E8E93"} strokeWidth={1.5} />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Min. 8 karakter"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                if (touched.pwd) setErrors((er) => ({ ...er, pwd: validatePwd(e.target.value) }));
                if (touched.confirm) setErrors((er) => ({ ...er, confirm: validateConfirm(confirm, e.target.value) }));
              }}
              onFocus={() => setFocusedField("pwd")}
              onBlur={() => handleBlur("pwd")}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 15, fontFamily: "'Poppins', sans-serif", color: "#1C1C1E", backgroundColor: "transparent" }}
            />
            <button onClick={() => setShowPwd(!showPwd)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              {showPwd ? <EyeOff size={16} color="#8E8E93" strokeWidth={1.5} /> : <Eye size={16} color="#8E8E93" strokeWidth={1.5} />}
            </button>
          </div>
          {touched.pwd && errors.pwd && (
            <p style={{ fontSize: 12, color: "#C9423A", margin: "4px 0 0 4px", fontFamily: "'Poppins', sans-serif" }}>{errors.pwd}</p>
          )}

          {/* Password strength meter */}
          {showStrength && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: i <= strength.score ? strength.color : "#EEEEED",
                      transition: "background-color 0.2s",
                    }}
                  />
                ))}
              </div>
              {strength.label && (
                <p style={{ fontSize: 12, color: strength.color, margin: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
                  Kekuatan kata sandi: {strength.label}
                </p>
              )}
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                {pwdRequirements.map((req) => (
                  <div key={req.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {req.test(pwd) ? (
                      <CheckCircle2 size={13} color="#1B7A3E" strokeWidth={2} />
                    ) : (
                      <XCircle size={13} color="#EEEEED" strokeWidth={2} />
                    )}
                    <span style={{ fontSize: 11, color: req.test(pwd) ? "#1B7A3E" : "#8E8E93", fontFamily: "'Poppins', sans-serif" }}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Konfirmasi Kata Sandi */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}>
            Konfirmasi Kata Sandi
          </label>
          <div style={{
            display: "flex", alignItems: "center", backgroundColor: "#FFFFFF",
            border: getFieldBorder("confirm", !!errors.confirm), borderRadius: 12, height: 52, padding: "0 16px", gap: 10,
          }}>
            <Lock size={16} color={touched.confirm && errors.confirm ? "#C9423A" : "#8E8E93"} strokeWidth={1.5} />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Ulangi kata sandi"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (touched.confirm) setErrors((er) => ({ ...er, confirm: validateConfirm(e.target.value, pwd) }));
              }}
              onFocus={() => setFocusedField("confirm")}
              onBlur={() => handleBlur("confirm")}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 15, fontFamily: "'Poppins', sans-serif", color: "#1C1C1E", backgroundColor: "transparent" }}
            />
            <button onClick={() => setShowConfirm(!showConfirm)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              {showConfirm ? <EyeOff size={16} color="#8E8E93" strokeWidth={1.5} /> : <Eye size={16} color="#8E8E93" strokeWidth={1.5} />}
            </button>
            {fieldIcon("confirm", !!errors.confirm, !!confirm && !errors.confirm)}
          </div>
          {touched.confirm && errors.confirm && (
            <p style={{ fontSize: 12, color: "#C9423A", margin: "4px 0 0 4px", fontFamily: "'Poppins', sans-serif" }}>{errors.confirm}</p>
          )}
        </div>

        {/* Method selection */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 10 }}>
            Pilih metode daftar
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {methods.map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 100,
                  border: method === m ? "2px solid #1A6FBF" : "1.5px solid #EEEEED",
                  backgroundColor: method === m ? "#EAF4FF" : "transparent",
                  fontSize: 13,
                  fontWeight: 500,
                  color: method === m ? "#1A6FBF" : "#3C3C43",
                  fontFamily: "'Poppins', sans-serif",
                  cursor: "pointer",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Register button */}
        <button
          onClick={handleRegister}
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
            marginTop: 8,
          }}
        >
          Daftar
        </button>

        <p style={{ fontSize: 11, fontWeight: 400, color: "#8E8E93", fontFamily: "'Poppins', sans-serif", textAlign: "center", margin: 0 }}>
          Dengan mendaftar, kamu menyetujui Syarat & Ketentuan LinTas
        </p>
      </div>
    </div>
  );
}
