import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WifiOff, Wifi } from "lucide-react";

type StatusState = "online" | "offline" | "restored";

export function NetworkStatusBanner() {
  const [status, setStatus] = useState<StatusState>(
    navigator.onLine ? "online" : "offline"
  );

  useEffect(() => {
    let restoreTimer: ReturnType<typeof setTimeout>;

    const handleOffline = () => {
      clearTimeout(restoreTimer);
      setStatus("offline");
    };

    const handleOnline = () => {
      setStatus("restored");
      restoreTimer = setTimeout(() => setStatus("online"), 2500);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      clearTimeout(restoreTimer);
    };
  }, []);

  const isVisible = status === "offline" || status === "restored";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={status}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 36, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            overflow: "hidden",
            flexShrink: 0,
            backgroundColor: status === "restored" ? "#1B7A3E" : "#C9423A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {status === "restored" ? (
            <Wifi size={13} color="#FFFFFF" strokeWidth={2} />
          ) : (
            <WifiOff size={13} color="#FFFFFF" strokeWidth={2} />
          )}
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#FFFFFF",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {status === "restored"
              ? "Koneksi internet pulih"
              : "Tidak ada koneksi internet"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
