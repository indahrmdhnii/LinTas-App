import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

type SheetHeight = "small" | "medium" | "large" | "full";

const heights: Record<SheetHeight, number> = {
  small: 180,
  medium: 320,
  large: 520,
  full: 800,
};

interface BottomSheetProps {
  visible: boolean;
  height?: SheetHeight;
  onDismiss?: () => void;
  children: ReactNode;
}

export function BottomSheet({
  visible,
  height = "medium",
  onDismiss,
  children,
}: BottomSheetProps) {
  const sheetHeight = heights[height];

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onDismiss}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(28,28,30,0.3)",
              zIndex: 50,
            }}
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: sheetHeight }}
            animate={{ y: 0 }}
            exit={{ y: sheetHeight }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: sheetHeight,
              backgroundColor: "#FFFFFF",
              borderRadius: "20px 20px 0 0",
              zIndex: 51,
              boxShadow: "0 -4px 24px rgba(28,28,30,0.12)",
              display: "flex",
              flexDirection: "column",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {/* Handle */}
            <div
              style={{
                width: 40,
                height: 4,
                backgroundColor: "#EEEEED",
                borderRadius: 100,
                margin: "12px auto 0",
                flexShrink: 0,
              }}
            />
            {/* Content */}
            <div style={{ flex: 1, overflow: "hidden", padding: "16px 20px 20px" }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
