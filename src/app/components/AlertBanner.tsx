import { Info, AlertTriangle } from "lucide-react";

type Severity = "info" | "warning" | "error";

interface AlertBannerProps {
  severity: Severity;
  message: string;
  subMessage?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const configs = {
  info: {
    bg: "#EAF4FF",
    borderColor: "#1A6FBF",
    iconColor: "#1A6FBF",
    Icon: Info,
  },
  warning: {
    bg: "#FFF3E0",
    borderColor: "#D97B2A",
    iconColor: "#D97B2A",
    Icon: AlertTriangle,
  },
  error: {
    bg: "#FFEBEA",
    borderColor: "#C9423A",
    iconColor: "#C9423A",
    Icon: AlertTriangle,
  },
};

export function AlertBanner({
  severity,
  message,
  subMessage,
  actionLabel,
  onAction,
}: AlertBannerProps) {
  const { bg, borderColor, iconColor, Icon } = configs[severity];

  return (
    <div
      style={{
        backgroundColor: bg,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
      }}
    >
      <Icon size={16} color={iconColor} strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: "#1C1C1E",
            fontFamily: "'Poppins', sans-serif",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>
        {subMessage && (
          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: "#3C3C43",
              fontFamily: "'Poppins', sans-serif",
              margin: "2px 0 0 0",
              lineHeight: 1.5,
            }}
          >
            {subMessage}
          </p>
        )}
        {actionLabel && (
          <button
            onClick={onAction}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#1A6FBF",
              fontFamily: "'Poppins', sans-serif",
              background: "none",
              border: "none",
              padding: 0,
              marginTop: 4,
              cursor: "pointer",
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
