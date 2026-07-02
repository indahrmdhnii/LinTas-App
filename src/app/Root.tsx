import { Outlet } from "react-router";
import { useAppContext } from "./context/AppContext";
import { Snackbar } from "./components/Snackbar";
import { NetworkStatusBanner } from "./components/NetworkStatusBanner";
import { OnboardingTutorial } from "./components/OnboardingTutorial";

export function Root() {
  const { snackbar } = useAppContext();

  return (
    // height: 100% inherits from #root which is 100dvh via CSS
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F7F5",
        fontFamily: "'Poppins', sans-serif",
        overflowX: "hidden",
      }}
    >
      <NetworkStatusBanner />

      {/* Page content — fills remaining height; screens use h-full against this */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Outlet />
        <OnboardingTutorial />
      </div>

      {/* Global Snackbar */}
      <Snackbar
        visible={!!snackbar}
        message={snackbar?.message ?? ""}
        type={snackbar?.type ?? "default"}
      />
    </div>
  );
}