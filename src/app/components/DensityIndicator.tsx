interface DensityIndicatorProps {
  level: "rendah" | "sedang" | "tinggi" | "penuh";
  showLabel?: boolean;
}

const configs = {
  rendah: { fill: 1, color: "#2A9D6F", label: "Rendah" },
  sedang: { fill: 2, color: "#D97B2A", label: "Sedang" },
  tinggi: { fill: 3, color: "#C9423A", label: "Tinggi" },
  penuh: { fill: 3, color: "#C9423A", label: "Penuh" },
};

export function DensityIndicator({ level, showLabel = true }: DensityIndicatorProps) {
  const { fill, color, label } = configs[level];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3].map((seg) => (
          <div
            key={seg}
            style={{
              width: 20,
              height: 6,
              borderRadius: 100,
              backgroundColor: seg <= fill ? color : "#EEEEED",
            }}
          />
        ))}
      </div>
      {showLabel && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 400,
            color,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {label}
          {level === "penuh" && " ⚠️"}
        </span>
      )}
    </div>
  );
}
