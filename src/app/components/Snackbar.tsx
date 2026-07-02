import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

interface SnackbarProps {
  message: string;
  type?: "default" | "success" | "error";
  visible: boolean;
}

const configs = {
  default: { bg: "#1C1C1E", color: "#FFFFFF", Icon: Info },
  success: { bg: "#2A9D6F", color: "#FFFFFF", Icon: CheckCircle },
  error: { bg: "#C9423A", color: "#FFFFFF", Icon: AlertCircle },
};

export function Snackbar({ message, type = "default", visible }: SnackbarProps) {
  const { bg, color, Icon } = configs[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: 152,
            left: 20,
            right: 20,
            height: 48,
            borderRadius: 100,
            backgroundColor: bg,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 20px",
            zIndex: 60,
            boxShadow: "0 4px 16px rgba(28,28,30,0.2)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Icon size={16} color={color} strokeWidth={1.5} style={{ flexShrink: 0 }} />
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
