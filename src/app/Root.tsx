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

      {/* Page content — fills remaining height; screens use h-full against this.
          NOTE: overflow must NOT be "hidden" here or touch-scroll on child
          flex-1 overflow-y-auto containers will be blocked on iOS Safari. */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflowX: "hidden",
          // overflowY intentionally left unset (visible) so that each screen's
          // own overflow-y-auto scroll container handles scrolling correctly
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