import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { SplashScreen } from "./screens/SplashScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { LocationScreen } from "./screens/LocationScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { RouteSearchScreen } from "./screens/RouteSearchScreen";
import { NavigationScreen } from "./screens/NavigationScreen";
import { StationScreen } from "./screens/StationScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { EditProfileScreen } from "./screens/EditProfileScreen";
import { ReportScreen } from "./screens/ReportScreen";
// New screens
import { ResetPasswordScreen } from "./screens/ResetPasswordScreen";
import { VerifikasiEmailScreen } from "./screens/VerifikasiEmailScreen";
import { DetailRouteScreen } from "./screens/DetailRouteScreen";
import { RingkasanPerjalananScreen } from "./screens/RingkasanPerjalananScreen";
import { VoiceCommandScreen } from "./screens/VoiceCommandScreen";
import { DetailGangguanScreen } from "./screens/DetailGangguanScreen";
import { TersimpanScreen } from "./screens/TersimpanScreen";
import { SuksesLaporanScreen } from "./screens/SuksesLaporanScreen";
import { PetaJalurScreen } from "./screens/PetaJalurScreen";
import { FiturUnggulanScreen } from "./screens/FiturUnggulanScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: SplashScreen },
      { path: "welcome", Component: WelcomeScreen },
      { path: "location", Component: LocationScreen },
      { path: "login", Component: LoginScreen },
      { path: "register", Component: RegisterScreen },
      { path: "reset-password", Component: ResetPasswordScreen },
      { path: "verifikasi-email", Component: VerifikasiEmailScreen },
      { path: "home", Component: HomeScreen },
      { path: "route-search", Component: RouteSearchScreen },
      { path: "detail-route", Component: DetailRouteScreen },
      { path: "navigation", Component: NavigationScreen },
      { path: "ringkasan-perjalanan", Component: RingkasanPerjalananScreen },
      { path: "voice-command", Component: VoiceCommandScreen },
      { path: "station", Component: StationScreen },
      { path: "detail-gangguan", Component: DetailGangguanScreen },
      { path: "tersimpan", Component: TersimpanScreen },
      { path: "peta-jalur", Component: PetaJalurScreen },
      { path: "profile", Component: ProfileScreen },
      { path: "edit-profile", Component: EditProfileScreen },
      { path: "report", Component: ReportScreen },
      { path: "sukses-laporan", Component: SuksesLaporanScreen },
      { path: "fitur-unggulan", Component: FiturUnggulanScreen },
    ],
  },
]);