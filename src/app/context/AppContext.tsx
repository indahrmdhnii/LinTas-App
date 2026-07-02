import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SnackbarData {
  message: string;
  type: "default" | "success" | "error";
}

export interface RouteStep {
  id: number;
  type: "depart" | "transit" | "walk" | "transfer" | "arrive";
  title: string;
  subtitle: string;
  time: string;
  badge?: "MRT" | "KRL" | "TransJakarta" | "LRT" | "JakLingko";
  iconColor?: string;
  isWalk?: boolean;
}

export interface RouteData {
  id: number;
  from: string;
  to: string;
  duration: string;
  via: string;
  transit: "MRT" | "KRL" | "TransJakarta" | "LRT" | "JakLingko";
  walk?: string;
  density: "rendah" | "sedang" | "tinggi" | "penuh";
  price: string;
  label?: string;
  labelColor?: string;
  steps: RouteStep[];
  transfers: number;
  modes: Array<"MRT" | "KRL" | "TransJakarta" | "LRT" | "JakLingko" | "Jalan">;
}

export interface SavedLocation {
  id: number;
  label: string;
  address: string;
  iconKey: "home" | "work" | "other";
  color: string;
}

interface AppContextType {
  isGuest: boolean;
  setIsGuest: (v: boolean) => void;
  snackbar: SnackbarData | null;
  showSnackbar: (message: string, type?: "default" | "success" | "error") => void;
  clearSnackbar: () => void;
  hasSeenTutorial: boolean;
  showTutorial: boolean;
  triggerTutorial: () => void;
  dismissTutorial: () => void;
  selectedRoute: RouteData | null;
  setSelectedRoute: (r: RouteData | null) => void;
  savedLocations: SavedLocation[];
  addSavedLocation: (loc: Omit<SavedLocation, "id">) => void;
  updateSavedLocation: (loc: SavedLocation) => void;
  deleteSavedLocation: (id: number) => void;
}

const defaultSavedLocations: SavedLocation[] = [
  { id: 1, label: "Rumah", address: "Kemang Raya No. 12", iconKey: "home", color: "#1A6FBF" },
  { id: 2, label: "Kantor", address: "Sudirman Tower, Lantai 8", iconKey: "work", color: "#1A6FBF" },
];

const AppContext = createContext<AppContextType>({
  isGuest: false,
  setIsGuest: () => {},
  snackbar: null,
  showSnackbar: () => {},
  clearSnackbar: () => {},
  hasSeenTutorial: false,
  showTutorial: false,
  triggerTutorial: () => {},
  dismissTutorial: () => {},
  selectedRoute: null,
  setSelectedRoute: () => {},
  savedLocations: defaultSavedLocations,
  addSavedLocation: () => {},
  updateSavedLocation: () => {},
  deleteSavedLocation: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [isGuest, setIsGuest] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(defaultSavedLocations);

  const showSnackbar = useCallback(
    (message: string, type: "default" | "success" | "error" = "default") => {
      setSnackbar({ message, type });
      setTimeout(() => setSnackbar(null), 3000);
    },
    []
  );

  const clearSnackbar = useCallback(() => setSnackbar(null), []);

  const triggerTutorial = useCallback(() => {
    if (!hasSeenTutorial) setShowTutorial(true);
  }, [hasSeenTutorial]);

  const dismissTutorial = useCallback(() => {
    setShowTutorial(false);
    setHasSeenTutorial(true);
  }, []);

  const addSavedLocation = useCallback((loc: Omit<SavedLocation, "id">) => {
    setSavedLocations((prev) => [...prev, { ...loc, id: Date.now() }]);
  }, []);

  const updateSavedLocation = useCallback((loc: SavedLocation) => {
    setSavedLocations((prev) => prev.map((l) => (l.id === loc.id ? loc : l)));
  }, []);

  const deleteSavedLocation = useCallback((id: number) => {
    setSavedLocations((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        isGuest, setIsGuest,
        snackbar, showSnackbar, clearSnackbar,
        hasSeenTutorial, showTutorial, triggerTutorial, dismissTutorial,
        selectedRoute, setSelectedRoute,
        savedLocations, addSavedLocation, updateSavedLocation, deleteSavedLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
