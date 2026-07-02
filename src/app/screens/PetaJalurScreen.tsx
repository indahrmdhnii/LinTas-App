import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Bus, Train, Truck, ChevronLeft, ChevronRight, X, Layers,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { TransitBadge } from "../components/TransitBadge";
import { TransitMap, type LatLngStop, type LatLngRoute, type JakLingkoLatLngZone } from "../components/TransitMap";

// ─── Types ────────────────────────────────────────────────────────────────────

type ModaType = "JakLingko" | "TransJakarta" | "KRL" | "MRT" | "LRT" | "Transcity";
type ViewState = "pilih-moda" | "daftar-jalur" | "jalur-aktif" | "jak-lingko";
type MapStop = LatLngStop;
type TransitRoute = LatLngRoute;

type JakLingkoZone = {
  id: string;
  name: string;
  shelterCount: number;
  routes: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const MODA_COLORS: Record<ModaType, string> = {
  JakLingko: "#00923F",
  TransJakarta: "#E2001A",
  KRL: "#FF6600",
  MRT: "#0070C0",
  LRT: "#E4002B",
  Transcity: "#6A5ACD",
};

const MODA_LABELS: Record<ModaType, string> = {
  JakLingko: "Jak Lingko",
  TransJakarta: "Transjakarta",
  KRL: "KRL",
  MRT: "MRT",
  LRT: "LRT",
  Transcity: "Transcity",
};

const MODA_LIST: ModaType[] = ["JakLingko", "TransJakarta", "KRL", "MRT", "LRT", "Transcity"];

// ─── Route Data ───────────────────────────────────────────────────────────────

const ROUTE_DATA: Record<Exclude<ModaType, "JakLingko">, TransitRoute[]> = {
  TransJakarta: [
    {
      id: "tj-1", code: "1", name: "Blok M → Kota", stops: 24, direction: "Kota",
      path: [[-6.2441,106.7986],[-6.2290,106.8020],[-6.2100,106.8250],[-6.1950,106.8200],[-6.1830,106.8150],[-6.1650,106.8170],[-6.1370,106.8120]],
      stopPoints: [
        { id: "tj1-blokm", name: "Halte Blok M", lat: -6.2441, lng: 106.7986, info: "Sisi kanan jalan · Arah Kota" },
        { id: "tj1-da", name: "Halte Dukuh Atas", lat: -6.2015, lng: 106.8231, info: "Sisi kanan jalan · Arah Kota" },
        { id: "tj1-harmoni", name: "Halte Harmoni Central", lat: -6.1650, lng: 106.8170, info: "Sisi kanan jalan · Arah Kota" },
        { id: "tj1-kota", name: "Halte Kota", lat: -6.1370, lng: 106.8120, info: "Sisi kiri jalan · Terminus" },
      ],
    },
    {
      id: "tj-2a", code: "2A", name: "Pulo Gadung → Rawa Buaya", stops: 32, direction: "Rawa Buaya",
      path: [[-6.1870,106.8970],[-6.1600,106.8750],[-6.1500,106.8450],[-6.1600,106.8000],[-6.1650,106.7870],[-6.1700,106.7700],[-6.1680,106.7550]],
      stopPoints: [
        { id: "tj2a-pg", name: "Halte Pulo Gadung", lat: -6.1870, lng: 106.8970, info: "Sisi kanan jalan · Arah Rawa Buaya" },
        { id: "tj2a-harmoni", name: "Halte Harmoni", lat: -6.1650, lng: 106.8170, info: "Sisi kanan jalan · Arah Rawa Buaya" },
        { id: "tj2a-jembatan", name: "Halte Jembatan Besi", lat: -6.1680, lng: 106.7700, info: "Sisi kanan jalan · Arah Rawa Buaya" },
        { id: "tj2a-rawab", name: "Halte Rawa Buaya", lat: -6.1680, lng: 106.7550, info: "Sisi kiri jalan · Terminus" },
      ],
    },
    {
      id: "tj-3", code: "3", name: "Kalideres → Pasar Baru", stops: 21, direction: "Pasar Baru",
      path: [[-6.1495,106.7010],[-6.1580,106.7650],[-6.1650,106.8170],[-6.1450,106.8200],[-6.1380,106.8150]],
      stopPoints: [
        { id: "tj3-kal", name: "Halte Kalideres", lat: -6.1495, lng: 106.7010, info: "Sisi kanan jalan · Arah Pasar Baru" },
        { id: "tj3-harmoni", name: "Halte Harmoni", lat: -6.1650, lng: 106.8170, info: "Sisi kanan jalan · Arah Pasar Baru" },
        { id: "tj3-pb", name: "Halte Pasar Baru", lat: -6.1380, lng: 106.8150, info: "Sisi kiri jalan · Terminus" },
      ],
    },
    {
      id: "tj-4", code: "4", name: "Pulo Gadung → Dukuh Atas", stops: 18, direction: "Dukuh Atas",
      path: [[-6.1870,106.8970],[-6.1950,106.8750],[-6.2000,106.8550],[-6.2015,106.8231]],
      stopPoints: [
        { id: "tj4-pg", name: "Halte Pulo Gadung", lat: -6.1870, lng: 106.8970, info: "Sisi kanan jalan · Arah Dukuh Atas" },
        { id: "tj4-da", name: "Halte Dukuh Atas", lat: -6.2015, lng: 106.8231, info: "Sisi kiri jalan · Terminus" },
      ],
    },
    {
      id: "tj-6", code: "6", name: "Ragunan → Dukuh Atas", stops: 20, direction: "Dukuh Atas",
      path: [[-6.3120,106.8250],[-6.2750,106.8230],[-6.2350,106.8230],[-6.2015,106.8231]],
      stopPoints: [
        { id: "tj6-rag", name: "Halte Ragunan", lat: -6.3120, lng: 106.8250, info: "Sisi kanan jalan · Arah Dukuh Atas" },
        { id: "tj6-semanggi", name: "Halte Semanggi", lat: -6.2270, lng: 106.8230, info: "Sisi kanan jalan · Arah Dukuh Atas" },
        { id: "tj6-da", name: "Halte Dukuh Atas", lat: -6.2015, lng: 106.8231, info: "Sisi kiri jalan · Terminus" },
      ],
    },
  ],
  KRL: [
    {
      id: "krl-bogor", code: "Bogor Line", name: "Jakarta Kota → Bogor", stops: 40, direction: "Bogor",
      path: [[-6.1370,106.8120],[-6.1700,106.8240],[-6.2100,106.8400],[-6.2700,106.8300],[-6.3500,106.8100],[-6.4500,106.7950],[-6.5920,106.7890]],
      stopPoints: [
        { id: "krl-kota", name: "Stasiun Jakarta Kota", lat: -6.1370, lng: 106.8120, info: "Peron 4 · Pintu Selatan" },
        { id: "krl-gambir", name: "Stasiun Gambir", lat: -6.1762, lng: 106.8305, info: "Peron 2 · Pintu Barat" },
        { id: "krl-manggarai", name: "Stasiun Manggarai", lat: -6.2106, lng: 106.8504, info: "Peron 3 · Pintu Timur" },
        { id: "krl-depok", name: "Stasiun Depok", lat: -6.3901, lng: 106.8186, info: "Peron 1 · Pintu Utara" },
        { id: "krl-bogorst", name: "Stasiun Bogor", lat: -6.5920, lng: 106.7890, info: "Peron 3 · Pintu Selatan" },
      ],
    },
    {
      id: "krl-bekasi", code: "Bekasi Line", name: "Jakarta Kota → Bekasi", stops: 28, direction: "Bekasi",
      path: [[-6.1370,106.8120],[-6.1600,106.8600],[-6.2000,106.9100],[-6.2400,106.9500],[-6.2950,106.9950]],
      stopPoints: [
        { id: "krl-kota2", name: "Stasiun Jakarta Kota", lat: -6.1370, lng: 106.8120, info: "Peron 4 · Pintu Selatan" },
        { id: "krl-jatinegara", name: "Stasiun Jatinegara", lat: -6.2140, lng: 106.8700, info: "Peron 2 · Pintu Timur" },
        { id: "krl-bekasi", name: "Stasiun Bekasi", lat: -6.2950, lng: 106.9950, info: "Peron 1 · Pintu Selatan" },
      ],
    },
    {
      id: "krl-rkb", code: "Rangkasbitung", name: "Tanah Abang → Rangkasbitung", stops: 35, direction: "Rangkasbitung",
      path: [[-6.1990,106.8140],[-6.2300,106.7600],[-6.2900,106.6800],[-6.3700,106.5700],[-6.3900,106.5000]],
      stopPoints: [
        { id: "krl-ta", name: "Stasiun Tanah Abang", lat: -6.1990, lng: 106.8140, info: "Peron 3 · Pintu Utara" },
        { id: "krl-rkb", name: "Stasiun Rangkasbitung", lat: -6.3900, lng: 106.5000, info: "Peron 1 · Terminus" },
      ],
    },
    {
      id: "krl-priok", code: "Tanjung Priok", name: "Jakarta Kota → Tanjung Priok", stops: 12, direction: "Tanjung Priok",
      path: [[-6.1370,106.8120],[-6.1050,106.8600],[-6.0900,106.8800]],
      stopPoints: [
        { id: "krl-kota3", name: "Stasiun Jakarta Kota", lat: -6.1370, lng: 106.8120, info: "Peron 4 · Pintu Selatan" },
        { id: "krl-priokst", name: "Stasiun Tanjung Priok", lat: -6.0900, lng: 106.8800, info: "Peron 2 · Pintu Utara" },
      ],
    },
  ],
  MRT: [
    {
      id: "mrt-ns", code: "North-South", name: "Lebak Bulus → Bundaran HI", stops: 13, direction: "Bundaran HI",
      path: [[-6.2894,106.7742],[-6.2720,106.7900],[-6.2441,106.7986],[-6.2190,106.8070],[-6.2015,106.8231],[-6.1960,106.8230]],
      stopPoints: [
        { id: "mrt-lb", name: "Stasiun Lebak Bulus Grab", lat: -6.2894, lng: 106.7742, info: "Peron 1 · Pintu Utara" },
        { id: "mrt-blokm", name: "Stasiun Blok M BCA", lat: -6.2441, lng: 106.7986, info: "Peron 2 · Pintu Selatan" },
        { id: "mrt-senayan", name: "Stasiun Senayan DPR", lat: -6.2190, lng: 106.8000, info: "Peron 1 · Pintu Barat" },
        { id: "mrt-da", name: "Stasiun Dukuh Atas BNI", lat: -6.2015, lng: 106.8231, info: "Peron 2 · Pintu Selatan" },
        { id: "mrt-bhi", name: "Stasiun Bundaran HI", lat: -6.1950, lng: 106.8230, info: "Peron 1 · Pintu Barat" },
      ],
    },
    {
      id: "mrt-ns2", code: "North-South Ext.", name: "Bundaran HI → Kota", stops: 8, direction: "Kota",
      path: [[-6.1950,106.8230],[-6.1650,106.8170],[-6.1370,106.8120]],
      stopPoints: [
        { id: "mrt-bhi2", name: "Stasiun Bundaran HI", lat: -6.1950, lng: 106.8230, info: "Peron 1 · Pintu Selatan" },
        { id: "mrt-kota", name: "Stasiun Kota", lat: -6.1370, lng: 106.8120, info: "Peron 2 · Pintu Utara" },
      ],
    },
  ],
  LRT: [
    {
      id: "lrt-kg", code: "Kelapa Gading", name: "Kelapa Gading → Velodrome", stops: 6, direction: "Velodrome",
      path: [[-6.1600,106.9000],[-6.1900,106.8800],[-6.2100,106.8750],[-6.2150,106.8800]],
      stopPoints: [
        { id: "lrt-kg", name: "Stasiun Kelapa Gading", lat: -6.1600, lng: 106.9000, info: "Peron 1 · Pintu Selatan" },
        { id: "lrt-rawamangun", name: "Stasiun Rawamangun", lat: -6.1950, lng: 106.8830, info: "Peron 2 · Pintu Barat" },
        { id: "lrt-velo", name: "Stasiun Velodrome", lat: -6.2150, lng: 106.8800, info: "Peron 2 · Pintu Barat" },
      ],
    },
    {
      id: "lrt-jkt", code: "Jabodebek", name: "Dukuh Atas → Cibubur", stops: 18, direction: "Cibubur",
      path: [[-6.2015,106.8231],[-6.2250,106.8700],[-6.2700,106.8950],[-6.3100,106.9050],[-6.3250,106.9100]],
      stopPoints: [
        { id: "lrt-da", name: "Stasiun Dukuh Atas", lat: -6.2015, lng: 106.8231, info: "Peron 2 · Pintu Barat" },
        { id: "lrt-jatinegara2", name: "Stasiun Jatinegara", lat: -6.2140, lng: 106.8700, info: "Peron 1 · Pintu Utara" },
        { id: "lrt-halim", name: "Stasiun Halim", lat: -6.2700, lng: 106.8950, info: "Peron 1 · Pintu Barat" },
        { id: "lrt-cibubur", name: "Stasiun Cibubur", lat: -6.3250, lng: 106.9100, info: "Peron 1 · Terminus" },
      ],
    },
    {
      id: "lrt-jkt2", code: "Jabodebek 2", name: "Dukuh Atas → Bekasi Timur", stops: 14, direction: "Bekasi Timur",
      path: [[-6.2015,106.8231],[-6.2400,106.8900],[-6.2700,106.9200],[-6.2900,106.9700],[-6.3000,107.0000]],
      stopPoints: [
        { id: "lrt-da2", name: "Stasiun Dukuh Atas", lat: -6.2015, lng: 106.8231, info: "Peron 1 · Pintu Barat" },
        { id: "lrt-halim2", name: "Stasiun Halim", lat: -6.2700, lng: 106.9200, info: "Peron 2 · Pintu Barat" },
        { id: "lrt-bekasitimur", name: "Stasiun Bekasi Timur", lat: -6.3000, lng: 107.0000, info: "Peron 1 · Terminus" },
      ],
    },
  ],
  Transcity: [
    {
      id: "tc-01", code: "TC-01", name: "Tangerang → Blok M", stops: 22, direction: "Blok M",
      path: [[-6.1780,106.6300],[-6.2000,106.6900],[-6.2200,106.7500],[-6.2441,106.7986]],
      stopPoints: [
        { id: "tc01-tng", name: "Halte Tangerang Terminal", lat: -6.1780, lng: 106.6300, info: "Sisi kanan jalan · Arah Blok M" },
        { id: "tc01-kbn", name: "Halte Kebun Nanas", lat: -6.2100, lng: 106.7200, info: "Sisi kiri jalan · Arah Blok M" },
        { id: "tc01-blokm", name: "Halte Blok M", lat: -6.2441, lng: 106.7986, info: "Sisi kiri jalan · Terminus" },
      ],
    },
    {
      id: "tc-02", code: "TC-02", name: "Serpong → Lebak Bulus", stops: 18, direction: "Lebak Bulus",
      path: [[-6.3020,106.6630],[-6.2950,106.7200],[-6.2920,106.7500],[-6.2894,106.7742]],
      stopPoints: [
        { id: "tc02-spg", name: "Halte Serpong", lat: -6.3020, lng: 106.6630, info: "Sisi kanan jalan · Arah Lebak Bulus" },
        { id: "tc02-cs", name: "Halte Ciputat Selatan", lat: -6.2950, lng: 106.7200, info: "Sisi kiri jalan · Arah Lebak Bulus" },
        { id: "tc02-lb", name: "Halte Lebak Bulus", lat: -6.2894, lng: 106.7742, info: "Sisi kiri jalan · Terminus" },
      ],
    },
    {
      id: "tc-03", code: "TC-03", name: "BSD → Dukuh Atas", stops: 15, direction: "Dukuh Atas",
      path: [[-6.3010,106.6540],[-6.2800,106.6900],[-6.2600,106.7400],[-6.2400,106.7800],[-6.2015,106.8231]],
      stopPoints: [
        { id: "tc03-bsd", name: "Halte BSD City", lat: -6.3010, lng: 106.6540, info: "Sisi kanan jalan · Arah Dukuh Atas" },
        { id: "tc03-ciledug", name: "Halte Ciledug", lat: -6.2600, lng: 106.7400, info: "Sisi kiri jalan · Arah Dukuh Atas" },
        { id: "tc03-da", name: "Halte Dukuh Atas", lat: -6.2015, lng: 106.8231, info: "Sisi kiri jalan · Terminus" },
      ],
    },
  ],
};

const JAK_LINGKO_ZONES: JakLingkoLatLngZone[] = [
  {
    id: "jl-jakut", name: "Jakarta Utara — Penjaringan",
    polygon: [[-6.1100,106.7700],[-6.1100,106.9100],[-6.1500,106.8500],[-6.1400,106.7700]],
    shelters: [
      { id: "sh-pluit", name: "Shelter Jak Lingko Pluit", lat: -6.1250, lng: 106.7980, info: "Rute 1A, 1B tersedia di sini" },
      { id: "sh-priok", name: "Shelter Jak Lingko Tanjung Priok", lat: -6.1100, lng: 106.8800, info: "Rute 2C tersedia di sini" },
    ],
  },
  {
    id: "jl-jaksel", name: "Jakarta Selatan — Pasar Minggu",
    polygon: [[-6.2441,106.7986],[-6.2700,106.8700],[-6.3100,106.8300],[-6.2700,106.7700],[-6.2441,106.7986]],
    shelters: [
      { id: "sh-pm", name: "Shelter Jak Lingko Pasar Minggu", lat: -6.2900, lng: 106.8500, info: "Rute 5A, 5B tersedia di sini" },
      { id: "sh-mampang", name: "Shelter Jak Lingko Mampang", lat: -6.2600, lng: 106.8350, info: "Rute 5A tersedia di sini" },
    ],
  },
  {
    id: "jl-jakbar", name: "Jakarta Barat — Cengkareng",
    polygon: [[-6.1100,106.7700],[-6.1600,106.7800],[-6.1900,106.7800],[-6.1700,106.7200],[-6.1100,106.6800]],
    shelters: [
      { id: "sh-cengkareng", name: "Shelter Jak Lingko Cengkareng", lat: -6.1495, lng: 106.7200, info: "Rute 3A, 3B tersedia di sini" },
      { id: "sh-kalideres", name: "Shelter Jak Lingko Kalideres", lat: -6.1495, lng: 106.7010, info: "Rute 3A tersedia di sini" },
    ],
  },
  {
    id: "jl-jaktim", name: "Jakarta Timur — Cakung",
    polygon: [[-6.1500,106.8900],[-6.1500,106.9500],[-6.2500,106.9600],[-6.2300,106.8800],[-6.1500,106.8900]],
    shelters: [
      { id: "sh-cakung", name: "Shelter Jak Lingko Cakung", lat: -6.2200, lng: 106.9500, info: "Rute 7A, 8C tersedia di sini" },
      { id: "sh-cempaka", name: "Shelter Jak Lingko Cempaka Mas", lat: -6.1870, lng: 106.9000, info: "Rute 3B, 4A, 7C tersedia di sini" },
    ],
  },
];

const JAK_LINGKO_ZONE_CARDS: JakLingkoZone[] = [
  { id: "jl-jakut", name: "Jakarta Utara — Penjaringan", shelterCount: 3, routes: "1A, 1B, 2C" },
  { id: "jl-jaksel", name: "Jakarta Selatan — Pasar Minggu", shelterCount: 2, routes: "5A, 5B" },
  { id: "jl-jakbar", name: "Jakarta Barat — Cengkareng", shelterCount: 2, routes: "3A, 3B" },
  { id: "jl-jaktim", name: "Jakarta Timur — Cakung", shelterCount: 2, routes: "3B, 4A, 7A, 7C, 8C" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModaChip({ moda, active, onClick }: { moda: ModaType; active: boolean; onClick: () => void }) {
  const color = MODA_COLORS[moda];
  const label = MODA_LABELS[moda];
  const IconComp = moda === "JakLingko" || moda === "Transcity" ? Truck : moda === "TransJakarta" ? Bus : Train;
  return (
    <button onClick={onClick} style={{
      height: 36, paddingLeft: 14, paddingRight: 14, borderRadius: 100,
      border: active ? "none" : "1px solid #EEEEED",
      backgroundColor: active ? color : "#FFFFFF",
      color: active ? "#FFFFFF" : "#3C3C43",
      display: "flex", alignItems: "center", gap: 6,
      cursor: "pointer", flexShrink: 0,
      boxShadow: active ? `0 3px 10px ${color}55` : "0 1px 3px rgba(0,0,0,0.07)",
      fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 500,
      transition: "all 0.18s ease",
    }}>
      <IconComp size={16} color={active ? "#FFFFFF" : "#8E8E93"} strokeWidth={1.5} />
      {label}
    </button>
  );
}

function RouteCard({ route, color, onClick }: { route: TransitRoute; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", backgroundColor: "#FFFFFF", borderRadius: 12,
      padding: "0 16px 0 0", display: "flex", alignItems: "stretch",
      cursor: "pointer", border: "none",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)", textAlign: "left",
      overflow: "hidden", minHeight: 58,
    }}>
      <div style={{ width: 4, backgroundColor: color, borderRadius: "6px 0 0 6px", flexShrink: 0 }} />
      <div style={{ width: 12, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0, padding: "12px 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", fontFamily: "'Poppins', sans-serif" }}>{route.code}</div>
        <div style={{ fontSize: 11, color: "#8E8E93", fontFamily: "'Poppins', sans-serif", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {route.name} · {route.stops} halte · Arah {route.direction}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", paddingLeft: 8 }}>
        <ChevronRight size={16} color="#C7C7CC" strokeWidth={1.5} />
      </div>
    </button>
  );
}

function ZoneCard({ zone, onClick }: { zone: JakLingkoZone; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", backgroundColor: "#FFFFFF", borderRadius: 12,
      padding: "0 16px 0 0", display: "flex", alignItems: "stretch",
      cursor: "pointer", border: "none",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)", textAlign: "left",
      overflow: "hidden", minHeight: 58,
    }}>
      <div style={{ width: 4, backgroundColor: "#00923F", borderRadius: "6px 0 0 6px", flexShrink: 0 }} />
      <div style={{ width: 12, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0, padding: "12px 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", fontFamily: "'Poppins', sans-serif" }}>{zone.name}</div>
        <div style={{ fontSize: 11, color: "#8E8E93", fontFamily: "'Poppins', sans-serif", marginTop: 2 }}>
          {zone.shelterCount} shelter · Rute {zone.routes}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", paddingLeft: 8 }}>
        <ChevronRight size={16} color="#C7C7CC" strokeWidth={1.5} />
      </div>
    </button>
  );
}

function StopPopup({ stop, moda, isJakLingko, onClose }: {
  stop: MapStop; moda: ModaType | null; isJakLingko: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      style={{
        position: "fixed", bottom: 72, left: 0, right: 0,
        backgroundColor: "#FFFFFF", borderRadius: "20px 20px 0 0",
        padding: "16px 20px 24px", boxShadow: "0 -6px 28px rgba(0,0,0,0.13)",
        zIndex: 1400, fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div style={{ width: 40, height: 4, backgroundColor: "#EEEEED", borderRadius: 100, margin: "0 auto 16px" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
          {moda && <TransitBadge type={moda as "MRT" | "LRT" | "KRL" | "TransJakarta" | "JakLingko" | "Transcity"} />}
          <span style={{ fontSize: 16, fontWeight: 600, color: "#1C1C1E" }}>{stop.name}</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
          <X size={20} color="#8E8E93" strokeWidth={1.5} />
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#3C3C43", margin: "0 0 16px", lineHeight: 1.5 }}>{stop.info}</p>
    </motion.div>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export function PetaJalurScreen() {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>("pilih-moda");
  const [selectedModa, setSelectedModa] = useState<ModaType | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<TransitRoute | null>(null);
  const [selectedStop, setSelectedStop] = useState<MapStop | null>(null);

  const modaColor = selectedModa ? MODA_COLORS[selectedModa] : "#1A6FBF";
  const modaLabel = selectedModa ? MODA_LABELS[selectedModa] : "";

  const routes = selectedModa && selectedModa !== "JakLingko"
    ? (ROUTE_DATA[selectedModa as Exclude<ModaType, "JakLingko">] ?? [])
    : [];

  const handleModaSelect = (moda: ModaType) => {
    setSelectedModa(moda);
    setSelectedRoute(null);
    setSelectedStop(null);
    setViewState(moda === "JakLingko" ? "jak-lingko" : "daftar-jalur");
  };

  const handleRouteSelect = (route: TransitRoute) => {
    setSelectedRoute(route);
    setSelectedStop(null);
    setViewState("jalur-aktif");
  };

  const handleBackToList = () => {
    setSelectedRoute(null);
    setSelectedStop(null);
    setViewState("daftar-jalur");
  };

  const handleBackToModaSelect = () => {
    setSelectedModa(null);
    setSelectedRoute(null);
    setSelectedStop(null);
    setViewState("pilih-moda");
  };

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      fontFamily: "'Poppins', sans-serif", backgroundColor: "#FFFFFF", position: "relative",
    }}>

      {/* ── Header ── */}
      <div style={{
        height: 56, backgroundColor: "#FFFFFF", borderBottom: "1px solid #EEEEED",
        display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}>
        {viewState === "jalur-aktif" && selectedRoute ? (
          <>
            <button onClick={handleBackToList} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", flexShrink: 0 }}>
              <ChevronLeft size={22} color="#3C3C43" strokeWidth={1.5} />
            </button>
            <TransitBadge type={selectedModa as "MRT" | "LRT" | "KRL" | "TransJakarta" | "JakLingko" | "Transcity"} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", marginLeft: 8, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {selectedRoute.code} — {selectedRoute.name}
            </span>
          </>
        ) : (
          <>
            <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
              <ChevronLeft size={22} color="#3C3C43" strokeWidth={1.5} />
            </button>
            <span style={{ fontSize: 17, fontWeight: 600, color: "#1C1C1E" }}>Peta Jalur</span>
          </>
        )}
      </div>

      {/* ── Chip Moda Row ── */}
      <div style={{
        height: 56, backgroundColor: "#FFFFFF", borderBottom: "1px solid #EEEEED",
        display: "flex", alignItems: "center", gap: 8, padding: "0 16px",
        overflowX: "auto", flexShrink: 0,
        // hide scrollbar
        msOverflowStyle: "none",
      }}>
        {MODA_LIST.map((moda) => (
          <ModaChip key={moda} moda={moda} active={selectedModa === moda} onClick={() => handleModaSelect(moda)} />
        ))}
      </div>

      {/* ── Main Area: Peta + Overlays ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* Peta selalu tampil sebagai background */}
        <div style={{ position: "absolute", inset: 0 }}>
          <TransitMap
            viewState={viewState}
            selectedModa={selectedModa}
            selectedRoute={selectedRoute}
            selectedStop={selectedStop}
            onStopSelect={setSelectedStop}
            modaColor={modaColor}
            jakLingkoZones={JAK_LINGKO_ZONES}
            bottomOffset={
              viewState === "jalur-aktif" && selectedRoute && !selectedStop
                ? 72 + 52          // BottomNav + strip "Ganti jalur"
                : viewState === "daftar-jalur" || viewState === "jak-lingko"
                ? 72 + 320         // BottomNav + tinggi sheet
                : 72               // BottomNav saja
            }
          />
        </div>

        {/* ── Overlay: Pilih Moda (belum pilih apapun) ── */}
        <AnimatePresence>
          {viewState === "pilih-moda" && (
            <motion.div
              key="pilih-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center", zIndex: 10, pointerEvents: "none",
              }}
            >
              <div style={{
                backgroundColor: "#FFFFFF", borderRadius: 16, padding: "20px 24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)", display: "flex",
                flexDirection: "column", alignItems: "center", gap: 10,
                textAlign: "center", width: "65%", maxWidth: 260, pointerEvents: "auto",
              }}>
                <Layers size={28} color="#8E8E93" strokeWidth={1.5} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#3C3C43", margin: 0, lineHeight: 1.5 }}>
                    Pilih moda transportasi
                  </p>
                  <p style={{ fontSize: 12, color: "#8E8E93", margin: "4px 0 0", lineHeight: 1.5 }}>
                    untuk melihat daftar jalur dan petanya
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom Sheet: Daftar Jalur ── */}
        <AnimatePresence>
          {viewState === "daftar-jalur" && selectedModa && (
            <motion.div
              key="daftar-sheet"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              style={{
                position: "fixed", bottom: 72, left: 0, right: 0,
                height: 320, maxHeight: "50vh",
                backgroundColor: "#FFFFFF", borderRadius: "20px 20px 0 0",
                boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
                zIndex: 1300, display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ flexShrink: 0, padding: "12px 20px 0" }}>
                <div style={{ width: 40, height: 4, backgroundColor: "#EEEEED", borderRadius: 100, margin: "0 auto 14px" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: modaColor, flexShrink: 0 }} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E" }}>
                      Jalur {modaLabel}
                    </span>
                    <span style={{ fontSize: 12, color: "#8E8E93" }}>({routes.length} rute)</span>
                  </div>
                  <button onClick={handleBackToModaSelect} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                    <X size={18} color="#8E8E93" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              {/* List rute */}
              <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                {routes.length === 0 ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 80, color: "#8E8E93", fontSize: 13 }}>
                    Tidak ada data jalur
                  </div>
                ) : (
                  routes.map((route) => (
                    <RouteCard key={route.id} route={route} color={modaColor} onClick={() => handleRouteSelect(route)} />
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom Sheet: Jak Lingko ── */}
        <AnimatePresence>
          {viewState === "jak-lingko" && (
            <motion.div
              key="jaklingko-sheet"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              style={{
                position: "fixed", bottom: 72, left: 0, right: 0,
                height: 320, maxHeight: "50vh",
                backgroundColor: "#FFFFFF", borderRadius: "20px 20px 0 0",
                boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
                zIndex: 1300, display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ flexShrink: 0, padding: "12px 20px 0" }}>
                <div style={{ width: 40, height: 4, backgroundColor: "#EEEEED", borderRadius: 100, margin: "0 auto 14px" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#00923F", flexShrink: 0 }} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E" }}>Area Layanan Jak Lingko</span>
                  </div>
                  <button onClick={handleBackToModaSelect} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                    <X size={18} color="#8E8E93" strokeWidth={1.5} />
                  </button>
                </div>
                <p style={{ fontSize: 12, color: "#8E8E93", margin: "0 0 12px" }}>Pilih zona atau ketuk marker shelter di peta</p>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                {JAK_LINGKO_ZONE_CARDS.map((zone) => (
                  <ZoneCard key={zone.id} zone={zone} onClick={() => {}} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Strip bawah saat jalur aktif & belum pilih halte ── */}
        <AnimatePresence>
          {viewState === "jalur-aktif" && selectedRoute && !selectedStop && (
            <motion.div
              key="jalur-aktif-strip"
              initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              style={{
                position: "fixed", bottom: 72, left: 0, right: 0, height: 52,
                backgroundColor: "#FFFFFF", borderTop: "1px solid #EEEEED",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 20px", zIndex: 1300,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: modaColor, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#3C3C43", fontFamily: "'Poppins', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {selectedRoute.code} · {selectedRoute.stops} halte
                </span>
              </div>
              <button onClick={handleBackToList} style={{
                background: "none", border: "none", cursor: "pointer", flexShrink: 0,
                fontSize: 13, color: "#1A6FBF", fontFamily: "'Poppins', sans-serif", fontWeight: 500,
              }}>
                Ganti jalur
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stop Popup ── */}
        <AnimatePresence>
          {selectedStop && (
            <StopPopup
              key={selectedStop.id}
              stop={selectedStop}
              moda={selectedModa}
              isJakLingko={viewState === "jak-lingko"}
              onClose={() => setSelectedStop(null)}
            />
          )}
        </AnimatePresence>

      </div>

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </div>
  );
}
