type TransitType = "MRT" | "LRT" | "KRL" | "TransJakarta" | "JakLingko" | "Transcity";
type StatusType = "on-time" | "terlambat" | "delay";

const transitColors: Record<TransitType, string> = {
  MRT: "#0070C0",
  LRT: "#E4002B",
  KRL: "#FF6600",
  TransJakarta: "#E2001A",
  JakLingko: "#00923F",
  Transcity: "#6A5ACD",
};

const transitLabels: Record<TransitType, string> = {
  MRT: "MRT",
  LRT: "LRT",
  KRL: "KRL",
  TransJakarta: "TransJakarta",
  JakLingko: "Jak Lingko",
  Transcity: "Transcity",
};

export function TransitBadge({ type }: { type: TransitType }) {
  return (
    <span
      style={{
        backgroundColor: transitColors[type],
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: 500,
        fontFamily: "'Poppins', sans-serif",
        padding: "3px 10px",
        borderRadius: 100,
        display: "inline-block",
        lineHeight: 1.5,
        letterSpacing: 0.1,
      }}
    >
      {transitLabels[type]}
    </span>
  );
}

export function StatusChip({ status }: { status: StatusType | string }) {
  let bg = "#2A9D6F";
  let label = "On time";
  if (status === "terlambat") {
    bg = "#C9423A";
    label = "Terlambat";
  } else if (status === "delay") {
    bg = "#D97B2A";
    label = "+5 mnt";
  } else if (status === "on-time") {
    bg = "#2A9D6F";
    label = "On time";
  } else {
    label = status;
    bg = "#D97B2A";
  }

  return (
    <span
      style={{
        backgroundColor: bg,
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: 500,
        fontFamily: "'Poppins', sans-serif",
        padding: "3px 10px",
        borderRadius: 100,
        display: "inline-block",
        lineHeight: 1.5,
      }}
    >
      {label}
    </span>
  );
}

export function LabelChip({
  label,
  bg = "#EAF4FF",
  color = "#1A6FBF",
}: {
  label: string;
  bg?: string;
  color?: string;
}) {
  return (
    <span
      style={{
        backgroundColor: bg,
        color,
        fontSize: 11,
        fontWeight: 500,
        fontFamily: "'Poppins', sans-serif",
        padding: "3px 10px",
        borderRadius: 100,
        display: "inline-block",
        lineHeight: 1.5,
      }}
    >
      {label}
    </span>
  );
}