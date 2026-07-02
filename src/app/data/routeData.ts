import type { RouteData } from "../context/AppContext";

// ─── Mock route database ───────────────────────────────────────────────────
// Each entry has full step-by-step detail + multi-modal info.
// keyed by "from|to" for dynamic lookup.

export const ROUTE_DATABASE: RouteData[] = [
  // ── Blok M → Bundaran HI ────────────────────────────────────────────────
  {
    id: 1,
    from: "Blok M",
    to: "Bundaran HI",
    duration: "28 mnt",
    via: "MRT  →  Jalan Kaki",
    transit: "MRT",
    walk: "3 mnt jalan",
    density: "rendah",
    price: "Rp 4.000",
    label: "Tercepat",
    labelColor: "#1A6FBF",
    transfers: 0,
    modes: ["MRT", "Jalan"],
    steps: [
      { id: 1, type: "depart", title: "Blok M", subtitle: "Stasiun MRT Blok M BCA", time: "07:30", iconColor: "#2A9D6F" },
      { id: 2, type: "transit", title: "Naik MRT — Arah Bundaran HI", subtitle: "Masuk Pintu 1A, Peron 1 · 4 stasiun", time: "07:32", badge: "MRT", iconColor: "#1A6FBF" },
      { id: 3, type: "walk", title: "Turun di Senayan", subtitle: "Lewati Stasiun Istora, Bendungan Hilir, Setiabudi", time: "07:45", isWalk: true, iconColor: "#8E8E93" },
      { id: 4, type: "transit", title: "Lanjut ke Bundaran HI", subtitle: "1 stasiun lagi", time: "07:47", badge: "MRT", iconColor: "#1A6FBF" },
      { id: 5, type: "walk", title: "Keluar Stasiun", subtitle: "Jalan kaki 3 menit ke tujuan", time: "07:55", isWalk: true, iconColor: "#8E8E93" },
      { id: 6, type: "arrive", title: "Bundaran HI", subtitle: "Estimasi tiba", time: "07:58", iconColor: "#C9423A" },
    ],
  },
  // ── Blok M → Bundaran HI (TransJakarta) ─────────────────────────────────
  {
    id: 2,
    from: "Blok M",
    to: "Bundaran HI",
    duration: "35 mnt",
    via: "TransJakarta Langsung",
    transit: "TransJakarta",
    density: "sedang",
    price: "Rp 3.500",
    label: "Termudah",
    labelColor: "#2A9D6F",
    transfers: 0,
    modes: ["TransJakarta"],
    steps: [
      { id: 1, type: "depart", title: "Halte Blok M", subtitle: "Koridor 1 — arah Kota", time: "07:30", iconColor: "#2A9D6F" },
      { id: 2, type: "transit", title: "Naik TransJakarta Koridor 1", subtitle: "Langsung tanpa transfer · 12 halte", time: "07:33", badge: "TransJakarta", iconColor: "#E2001A" },
      { id: 3, type: "arrive", title: "Bundaran HI", subtitle: "Estimasi tiba", time: "08:05", iconColor: "#C9423A" },
    ],
  },
  // ── Depok → Gambir ──────────────────────────────────────────────────────
  {
    id: 3,
    from: "Depok",
    to: "Gambir",
    duration: "45 mnt",
    via: "KRL  →  Jalan Kaki",
    transit: "KRL",
    density: "tinggi",
    price: "Rp 5.000",
    label: "Tercepat",
    labelColor: "#1A6FBF",
    transfers: 1,
    modes: ["KRL", "Jalan"],
    steps: [
      { id: 1, type: "depart", title: "Stasiun Depok", subtitle: "KRL Commuter Line — Peron 2", time: "06:45", iconColor: "#2A9D6F" },
      { id: 2, type: "transit", title: "Naik KRL Bogor Line", subtitle: "Arah Kota · 8 stasiun", time: "06:48", badge: "KRL", iconColor: "#FF6600" },
      { id: 3, type: "transfer", title: "Transfer di Manggarai", subtitle: "Ganti ke jalur Tanjung Priok — Peron 4", time: "07:15", iconColor: "#D97B2A" },
      { id: 4, type: "transit", title: "Lanjut KRL ke Gambir", subtitle: "3 stasiun", time: "07:18", badge: "KRL", iconColor: "#FF6600" },
      { id: 5, type: "walk", title: "Keluar di Stasiun Gambir", subtitle: "Jalan kaki 2 menit ke tujuan", time: "07:28", isWalk: true, iconColor: "#8E8E93" },
      { id: 6, type: "arrive", title: "Gambir", subtitle: "Estimasi tiba", time: "07:30", iconColor: "#C9423A" },
    ],
  },
  // ── Kalideres → Harmoni ─────────────────────────────────────────────────
  {
    id: 4,
    from: "Kalideres",
    to: "Harmoni",
    duration: "55 mnt",
    via: "TransJakarta  →  Jalan Kaki",
    transit: "TransJakarta",
    density: "sedang",
    price: "Rp 3.500",
    label: "Termudah",
    labelColor: "#2A9D6F",
    transfers: 0,
    modes: ["TransJakarta", "Jalan"],
    steps: [
      { id: 1, type: "depart", title: "Terminal Kalideres", subtitle: "Koridor 3 — arah Harmoni", time: "07:00", iconColor: "#2A9D6F" },
      { id: 2, type: "transit", title: "Naik TransJakarta Koridor 3", subtitle: "15 halte langsung", time: "07:05", badge: "TransJakarta", iconColor: "#E2001A" },
      { id: 3, type: "arrive", title: "Halte Harmoni", subtitle: "Estimasi tiba", time: "07:55", iconColor: "#C9423A" },
    ],
  },
  // ── Sudirman → Lebak Bulus ──────────────────────────────────────────────
  {
    id: 5,
    from: "Sudirman",
    to: "Lebak Bulus",
    duration: "22 mnt",
    via: "MRT Langsung",
    transit: "MRT",
    density: "rendah",
    price: "Rp 4.000",
    label: "Tercepat",
    labelColor: "#1A6FBF",
    transfers: 0,
    modes: ["MRT"],
    steps: [
      { id: 1, type: "depart", title: "Stasiun Sudirman", subtitle: "MRT Jakarta — Peron 2", time: "07:30", iconColor: "#2A9D6F" },
      { id: 2, type: "transit", title: "Naik MRT — Arah Lebak Bulus", subtitle: "Masuk Pintu 2A · 5 stasiun", time: "07:32", badge: "MRT", iconColor: "#1A6FBF" },
      { id: 3, type: "arrive", title: "Lebak Bulus", subtitle: "Estimasi tiba", time: "07:52", iconColor: "#C9423A" },
    ],
  },
  // ── Manggarai → Bogor ───────────────────────────────────────────────────
  {
    id: 6,
    from: "Manggarai",
    to: "Bogor",
    duration: "75 mnt",
    via: "KRL Langsung",
    transit: "KRL",
    density: "tinggi",
    price: "Rp 5.000",
    label: "Tercepat",
    labelColor: "#1A6FBF",
    transfers: 0,
    modes: ["KRL"],
    steps: [
      { id: 1, type: "depart", title: "Stasiun Manggarai", subtitle: "KRL Commuter Line Bogor — Peron 3", time: "07:00", iconColor: "#2A9D6F" },
      { id: 2, type: "transit", title: "Naik KRL Bogor Line", subtitle: "Ekspres arah Bogor · 14 stasiun", time: "07:03", badge: "KRL", iconColor: "#FF6600" },
      { id: 3, type: "arrive", title: "Bogor", subtitle: "Estimasi tiba", time: "08:15", iconColor: "#C9423A" },
    ],
  },
  // ── Dukuh Atas → Cawang ─────────────────────────────────────────────────
  {
    id: 7,
    from: "Dukuh Atas",
    to: "Cawang",
    duration: "18 mnt",
    via: "LRT Jabodebek",
    transit: "LRT",
    density: "rendah",
    price: "Rp 5.000",
    label: "Tercepat",
    labelColor: "#1A6FBF",
    transfers: 0,
    modes: ["LRT"],
    steps: [
      { id: 1, type: "depart", title: "Stasiun Dukuh Atas 2", subtitle: "LRT Jabodebek — Peron 1", time: "08:00", iconColor: "#2A9D6F" },
      { id: 2, type: "transit", title: "Naik LRT — Arah Bekasi Timur", subtitle: "3 stasiun · Kuningan, Rasuna Said, Cawang", time: "08:02", badge: "LRT", iconColor: "#E4002B" },
      { id: 3, type: "arrive", title: "Cawang", subtitle: "Estimasi tiba", time: "08:18", iconColor: "#C9423A" },
    ],
  },
  // ── Bundaran HI → Lebak Bulus ────────────────────────────────────────────
  {
    id: 8,
    from: "Bundaran HI",
    to: "Lebak Bulus",
    duration: "28 mnt",
    via: "MRT  →  Jalan Kaki",
    transit: "MRT",
    walk: "3 mnt jalan",
    density: "rendah",
    price: "Rp 4.000",
    label: "Tercepat",
    labelColor: "#1A6FBF",
    transfers: 0,
    modes: ["MRT", "Jalan"],
    steps: [
      { id: 1, type: "depart", title: "Bundaran HI", subtitle: "Stasiun MRT — Pintu 2, Peron 2", time: "07:30", iconColor: "#2A9D6F" },
      { id: 2, type: "transit", title: "Naik MRT — Arah Lebak Bulus", subtitle: "Masuk Pintu 2A · 4 stasiun", time: "07:32", badge: "MRT", iconColor: "#1A6FBF" },
      { id: 3, type: "walk", title: "Turun di Blok M", subtitle: "Jalan kaki 3 menit ke halte", time: "07:48", isWalk: true, iconColor: "#8E8E93" },
      { id: 4, type: "arrive", title: "Lebak Bulus", subtitle: "Estimasi tiba", time: "07:54", iconColor: "#C9423A" },
    ],
  },
];

// Fallback generic route builder if no exact match
export function buildGenericRoute(from: string, to: string): RouteData[] {
  return [
    {
      id: 101,
      from, to,
      duration: "30 mnt",
      via: "MRT  →  Jalan Kaki",
      transit: "MRT",
      walk: "5 mnt jalan",
      density: "sedang",
      price: "Rp 4.000",
      label: "Tercepat",
      labelColor: "#1A6FBF",
      transfers: 0,
      modes: ["MRT", "Jalan"],
      steps: [
        { id: 1, type: "depart", title: from, subtitle: "Titik keberangkatan", time: "07:30", iconColor: "#2A9D6F" },
        { id: 2, type: "transit", title: "Naik MRT", subtitle: "Masuk dari pintu terdekat", time: "07:33", badge: "MRT", iconColor: "#1A6FBF" },
        { id: 3, type: "walk", title: "Keluar stasiun", subtitle: "Jalan kaki 5 menit", time: "07:55", isWalk: true, iconColor: "#8E8E93" },
        { id: 4, type: "arrive", title: to, subtitle: "Estimasi tiba", time: "08:00", iconColor: "#C9423A" },
      ],
    },
    {
      id: 102,
      from, to,
      duration: "40 mnt",
      via: "TransJakarta Langsung",
      transit: "TransJakarta",
      density: "sedang",
      price: "Rp 3.500",
      label: "Termudah",
      labelColor: "#2A9D6F",
      transfers: 0,
      modes: ["TransJakarta"],
      steps: [
        { id: 1, type: "depart", title: from, subtitle: "Halte TransJakarta terdekat", time: "07:30", iconColor: "#2A9D6F" },
        { id: 2, type: "transit", title: "Naik TransJakarta", subtitle: "Koridor langsung", time: "07:35", badge: "TransJakarta", iconColor: "#E2001A" },
        { id: 3, type: "arrive", title: to, subtitle: "Estimasi tiba", time: "08:10", iconColor: "#C9423A" },
      ],
    },
  ];
}

// Find all routes for a from→to pair
export function findRoutes(from: string, to: string): RouteData[] {
  const key = `${from.toLowerCase()}|${to.toLowerCase()}`;
  const matches = ROUTE_DATABASE.filter(
    (r) => `${r.from.toLowerCase()}|${r.to.toLowerCase()}` === key
  );
  return matches.length > 0 ? matches : buildGenericRoute(from, to);
}

// Find a single route by id
export function findRouteById(id: number): RouteData | undefined {
  return ROUTE_DATABASE.find((r) => r.id === id);
}
