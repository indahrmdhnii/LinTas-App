import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Phone, CheckCircle2 } from "lucide-react";
import { AlertBanner } from "../components/AlertBanner";
import { useAppContext } from "../context/AppContext";

type FieldErrors = { email?: string; password?: string };

function validateEmail(email: string): string | undefined {
  if (!email) return "Email wajib diisi";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Format email tidak valid";
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Kata sandi wajib diisi";
  if (password.length < 6) return "Kata sandi minimal 6 karakter";
}

export function LoginScreen() {
  const navigate = useNavigate();
  const { setIsGuest } = useAppContext();
  const [activeTab, setActiveTab] = useState<"masuk" | "daftar">("masuk");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [credentialError, setCredentialError] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getFieldBorder = (field: string, hasError: boolean) => {
    if (hasError && touched[field]) return "2px solid #C9423A";
    if (focusedField === field) return "2px solid #1A6FBF";
    return "1px solid #EEEEED";
  };

  const handleBlur = (field: "email" | "password") => {
    setFocusedField(null);
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === "email") {
      setErrors((e) => ({ ...e, email: validateEmail(email) }));
    } else {
      setErrors((e) => ({ ...e, password: validatePassword(password) }));
    }
  };

  const handleLogin = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const newErrors = { email: emailErr, password: passwordErr };
    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (emailErr || passwordErr) return;

    // Simulate wrong credentials (demo: only indah@gmail.com / password123)
    const valid = email.toLowerCase() === "indah@gmail.com" && password === "password123";
    if (!valid) {
      setCredentialError(true);
      setAttempts((a) => Math.max(0, a - 1));
      return;
    }

    setIsGuest(false);
    navigate("/home", { replace: true });
  };

  const handleTabChange = (tab: "masuk" | "daftar") => {
    if (tab === "daftar") {
      navigate("/register");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ backgroundColor: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}
    >
      <div style={{ padding: "24px 20px 40px" }}>
        {/* Header */}
        <div style={{ paddingTop: 16 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#1C1C1E",
              margin: 0,
              letterSpacing: -0.2,
            }}
          >
            Masuk ke LinTas
          </h1>
          <p style={{ fontSize: 15, fontWeight: 400, color: "#3C3C43", margin: "4px 0 0" }}>
            Masukkan email dan kata sandi kamu
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginTop: 32,
            borderBottom: "1px solid #EEEEED",
          }}
        >
          {(["masuk", "daftar"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              style={{
                flex: 1,
                height: 40,
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #1A6FBF" : "2px solid transparent",
                fontSize: 15,
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#1C1C1E" : "#8E8E93",
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
                marginBottom: -1,
              }}
            >
              {tab === "masuk" ? "Masuk" : "Daftar"}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Email */}
          <div>
            <label
              style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}
            >
              Email
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                border: getFieldBorder("email", !!errors.email),
                borderRadius: 12,
                height: 52,
                padding: "0 16px",
                gap: 10,
              }}
            >
              <Mail size={16} color={touched.email && errors.email ? "#C9423A" : "#8E8E93"} strokeWidth={1.5} />
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setCredentialError(false);
                  if (touched.email) setErrors((err) => ({ ...err, email: validateEmail(e.target.value) }));
                }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => handleBlur("email")}
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
              {touched.email && !errors.email && email && (
                <CheckCircle2 size={16} color="#1B7A3E" strokeWidth={2} />
              )}
            </div>
            {touched.email && errors.email && (
              <p style={{ fontSize: 12, color: "#C9423A", margin: "4px 0 0 4px", fontFamily: "'Poppins', sans-serif" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              style={{ fontSize: 13, fontWeight: 500, color: "#3C3C43", display: "block", marginBottom: 6 }}
            >
              Kata Sandi
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                border: getFieldBorder("password", !!errors.password),
                borderRadius: 12,
                height: 52,
                padding: "0 16px",
                gap: 10,
              }}
            >
              <Lock size={16} color={touched.password && errors.password ? "#C9423A" : "#8E8E93"} strokeWidth={1.5} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setCredentialError(false);
                  if (touched.password) setErrors((err) => ({ ...err, password: validatePassword(e.target.value) }));
                }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => handleBlur("password")}
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
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                {showPassword ? (
                  <EyeOff size={16} color="#8E8E93" strokeWidth={1.5} />
                ) : (
                  <Eye size={16} color="#8E8E93" strokeWidth={1.5} />
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <p style={{ fontSize: 12, color: "#C9423A", margin: "4px 0 0 4px", fontFamily: "'Poppins', sans-serif" }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div style={{ textAlign: "right" }}>
            <button
              onClick={() => navigate("/reset-password")}
              style={{
                background: "none",
                border: "none",
                fontSize: 13,
                fontWeight: 500,
                color: "#1A6FBF",
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Lupa kata sandi?
            </button>
          </div>

          {/* Demo hint */}
          <div
            style={{
              backgroundColor: "#EAF4FF",
              borderRadius: 10,
              padding: "10px 14px",
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: 16 }}>💡</span>
            <p style={{ fontSize: 12, color: "#1A6FBF", fontFamily: "'Poppins', sans-serif", margin: 0, lineHeight: 1.5 }}>
              Demo: gunakan <strong>indah@gmail.com</strong> dan password <strong>password123</strong>
            </p>
          </div>

          {/* Credential Error Banner */}
          {credentialError && attempts > 0 && (
            <AlertBanner
              severity="error"
              message={`Email atau kata sandi salah. Sisa ${attempts} percobaan.`}
            />
          )}
          {credentialError && attempts === 0 && (
            <AlertBanner
              severity="error"
              message="Akun dikunci sementara. Coba lagi dalam 30 menit atau reset kata sandi."
              actionLabel="Reset Kata Sandi"
              onAction={() => navigate("/reset-password")}
            />
          )}

          {/* Login button */}
          <button
            onClick={handleLogin}
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
            }}
          >
            Masuk
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, backgroundColor: "#EEEEED" }} />
            <span style={{ fontSize: 15, fontWeight: 400, color: "#8E8E93" }}>atau</span>
            <div style={{ flex: 1, height: 1, backgroundColor: "#EEEEED" }} />
          </div>

          {/* Google login */}
          <button
            onClick={() => { setIsGuest(false); navigate("/home", { replace: true }); }}
            style={{
              width: "100%",
              height: 52,
              backgroundColor: "#FFFFFF",
              color: "#1A6FBF",
              fontSize: 15,
              fontWeight: 400,
              fontFamily: "'Poppins', sans-serif",
              borderRadius: 16,
              border: "1.5px solid #1A6FBF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Masuk dengan Google
          </button>

          {/* Phone login */}
          <button
            onClick={() => { setIsGuest(false); navigate("/home", { replace: true }); }}
            style={{
              width: "100%",
              height: 52,
              backgroundColor: "#FFFFFF",
              color: "#1A6FBF",
              fontSize: 15,
              fontWeight: 400,
              fontFamily: "'Poppins', sans-serif",
              borderRadius: 16,
              border: "1.5px solid #1A6FBF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Phone size={20} strokeWidth={1.5} color="#1A6FBF" />
            Masuk dengan Nomor HP
          </button>
        </div>
      </div>
    </div>
  );
}
