import { motion, AnimatePresence } from "motion/react";

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: "destructive" | "confirmation" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  visible,
  title,
  description,
  confirmLabel,
  cancelLabel = "Batal",
  variant = "confirmation",
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const confirmColor =
    variant === "destructive"
      ? "#C9423A"
      : variant === "info"
      ? "#3C3C43"
      : "#1A6FBF";

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(28,28,30,0.4)",
              zIndex: 2000,
            }}
          />

          {/* Centering container */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2001,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 20px",
              pointerEvents: "none",
            }}
          >
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 320,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 8px 32px rgba(28,28,30,0.2)",
                fontFamily: "'Poppins', sans-serif",
                pointerEvents: "all",
              }}
            >
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#1C1C1E",
                  margin: "0 0 8px",
                  letterSpacing: -0.1,
                }}
              >
                {title}
              </h3>
              {description && (
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#3C3C43",
                    margin: "0 0 24px",
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: description ? 0 : 24,
                }}
              >
                <button
                  onClick={onCancel}
                  style={{
                    flex: 1,
                    height: 44,
                    backgroundColor: "#F7F7F5",
                    color: "#3C3C43",
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  style={{
                    flex: 1,
                    height: 44,
                    backgroundColor: confirmColor,
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}