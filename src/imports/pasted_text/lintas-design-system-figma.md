# PROMPT FIGMA — LinTas Design System & Aplikasi
> Panduan lengkap untuk membangun Design System dan UI Aplikasi LinTas di Figma.
> Font utama: Poppins. Gaya visual: Modern Mobile Apps — bersih, utilitarian, tanpa ornamen berlebihan.

---

## PRINSIP DESAIN UTAMA

**LARANGAN KERAS — JANGAN GUNAKAN EMOJI DI DALAM APLIKASI.**
Tidak ada emoji (contoh: tidak boleh ada 🔔, 📍, 🚇, ✏️, ⭐, dsb.) di mana pun dalam UI aplikasi — baik di label, menu item, tombol, card, header, maupun notifikasi. Semua ikon menggunakan **line icon SVG** (stroke weight 1.5px, rounded cap) dari library seperti Lucide Icons, Phosphor Icons, atau Heroicons. Ikon harus konsisten dalam satu library yang sama.

**Gaya Visual: Modern Mobile Apps**
- Tampilan bersih, ruang kosong (whitespace) digunakan secara strategis
- Hierarki informasi yang jelas melalui tipografi dan ukuran, bukan warna
- Card dengan shadow halus, bukan border tebal
- Tombol dengan radius besar (pill atau rounded-lg), terasa modern dan touchable
- Tidak ada gradien warna-warni — maksimal subtle gradient dari warna solid ke transparan
- Navigasi bawah dengan icon + label teks, tanpa latar belakang aktif yang mencolok
- Tidak ada dekorasi, pattern, atau tekstur latar belakang yang berlebihan

---

## BAGIAN 1 — DESIGN SYSTEM SETUP

### TIPOGRAFI (Font: Poppins)

Buat halaman "Typography" di Figma dengan struktur berikut:

```
Import Google Font: Poppins
Weights yang dipakai: 400 (Regular), 500 (Medium), 600 (SemiBold)
```

Daftarkan setiap style sebagai **Text Style** di panel Assets:

| Style Name        | Size | Weight       | Line Height | Letter Spacing | Kegunaan                             |
|-------------------|------|--------------|-------------|----------------|--------------------------------------|
| Display/Large     | 28px | SemiBold 600 | 1.2 (34px)  | -0.3px         | ETA besar, menit tersisa             |
| Heading/H1        | 22px | SemiBold 600 | 1.3 (28px)  | -0.2px         | Nama stasiun, halte, tujuan          |
| Heading/H2        | 18px | Medium 500   | 1.35 (24px) | -0.1px         | Nama rute, judul section             |
| Body/Default      | 15px | Regular 400  | 1.5 (22px)  | 0px            | Info jadwal, deskripsi umum          |
| Label/Caption     | 13px | Medium 500   | 1.4 (18px)  | +0.1px         | Badge moda, label chip, label form   |
| Micro/Hint        | 11px | Regular 400  | 1.4 (15px)  | +0.2px         | Timestamp, "Diperbarui X detik lalu" |

Aturan tipografi:
- Maksimal 2 weight aktif per layar: 600 untuk focal point, 400 untuk konten biasa
- Gunakan font-variant-numeric tabular-nums untuk semua angka real-time (ETA, menit, detik)
- Jangan gunakan lebih dari 3 ukuran font berbeda dalam satu card atau section
- Jangan bold semua elemen penting — hanya satu focal point per layar yang mendapat Display/Large

---

### COLOR PALETTE

Buat halaman "Colors" di Figma. Susun dalam 4 layer grup sebagai Color Styles:

#### LAYER 1 — FOUNDATION (60% penggunaan)

| Style Name                    | Hex       | Kegunaan                              |
|-------------------------------|-----------|---------------------------------------|
| Foundation/Background Primary | `#F7F7F5` | Base halaman utama, background app    |
| Foundation/Surface Card       | `#EEEEED` | Card, bottom sheet, panel             |
| Foundation/White Pure         | `#FFFFFF` | Input field, modal, overlay           |

#### LAYER 2 — TYPOGRAPHY (30% penggunaan)

| Style Name       | Hex       | Kegunaan                         |
|------------------|-----------|----------------------------------|
| Text/Primary     | `#1C1C1E` | Judul, informasi utama           |
| Text/Secondary   | `#3C3C43` | Subteks, label                   |
| Text/Tertiary    | `#8E8E93` | Placeholder, hint, disabled      |

#### LAYER 3 — ACCENT & ACTION (10% penggunaan)

| Style Name           | Hex       | Kegunaan                          |
|----------------------|-----------|-----------------------------------|
| Accent/Ocean Blue    | `#1A6FBF` | Primary CTA, tombol utama         |
| Accent/Amber Action  | `#D97B2A` | Warning, highlight penting        |
| Accent/Sage Success  | `#2A9D6F` | Status on-time, tersedia          |
| Accent/Coral Alert   | `#C9423A` | Error, delay, gangguan kritis     |

#### LAYER 4 — TRANSIT LINE CODING (Badge/Strip kecil saja)

| Style Name         | Hex       | Kegunaan            |
|--------------------|-----------|---------------------|
| Transit/MRT        | `#0070C0` | Badge MRT           |
| Transit/LRT        | `#E4002B` | Badge LRT           |
| Transit/KRL        | `#FF6600` | Badge KRL           |
| Transit/TransJakarta | `#E2001A` | Badge TransJakarta |
| Transit/JakLingko  | `#00923F` | Badge Jak Lingko    |

ATURAN WARNA TRANSIT: Warna ini HANYA muncul sebagai badge atau chip kecil (pill dengan padding 4px 10px). TIDAK BOLEH digunakan sebagai background halaman, header, atau elemen besar apapun.

---

### IKON

Gunakan satu library ikon yang konsisten di seluruh aplikasi. Library yang direkomendasikan: **Lucide Icons** (tersedia sebagai Figma plugin).

Spesifikasi ikon:
- Stroke weight: 1.5px
- Line cap: Round
- Line join: Round
- Ukuran default: 20x20px (untuk nav bar dan list item)
- Ukuran besar: 24x24px (untuk tombol dan header)
- Ukuran kecil: 16x16px (untuk inline label dan chip)
- Warna: mengikuti Text/Primary, Text/Tertiary, atau Accent/Ocean Blue sesuai konteks

DILARANG menggunakan emoji sebagai pengganti ikon di mana pun dalam aplikasi.

Daftar ikon yang digunakan:

| Fungsi               | Nama Ikon Lucide          |
|----------------------|---------------------------|
| Beranda / Home       | `Home`                    |
| Pencarian Rute       | `Navigation`              |
| Peta                 | `Map`                     |
| Profil               | `User`                    |
| Pencarian            | `Search`                  |
| Lokasi / Pin         | `MapPin`                  |
| Kembali              | `ChevronLeft`             |
| Lanjut               | `ChevronRight`            |
| Notifikasi           | `Bell`                    |
| Pengaturan           | `Settings`                |
| Edit                 | `Pencil`                  |
| Simpan               | `Bookmark`                |
| Hapus                | `Trash2`                  |
| Tutup / Batal        | `X`                       |
| Konfirmasi           | `Check`                   |
| Peringatan           | `AlertTriangle`           |
| Info                 | `Info`                    |
| Mikrofon             | `Mic`                     |
| Kamera               | `Camera`                  |
| Galeri               | `Image`                   |
| Jam / Waktu          | `Clock`                   |
| Riwayat              | `History`                 |
| Jadwal               | `CalendarDays`            |
| Kepadatan / Orang    | `Users`                   |
| Pintu masuk          | `DoorOpen`                |
| Gerbong / Kereta     | `Train`                   |
| Bus                  | `Bus`                     |
| Berjalan kaki        | `Footprints`              |
| Refresh              | `RefreshCw`               |
| Logout               | `LogOut`                  |
| Laporan              | `Flag`                    |
| Upload foto          | `Upload`                  |

---

### SPACING & GRID

Daftarkan sebagai **Variables** di Figma Variables Panel:

```
Spacing/4   = 4px    → Internal badge/chip
Spacing/8   = 8px    → Label ke konten dalam card
Spacing/12  = 12px   → Elemen dalam card kecil
Spacing/16  = 16px   → Antar card, antar item list
Spacing/20  = 20px   → Padding horizontal card dan screen
Spacing/24  = 24px   → Antar section dalam layar
Spacing/32  = 32px   → Section header ke konten pertama
Spacing/48  = 48px   → Antar section utama halaman
```

Grid Mobile (Frame 390px):
- Columns: 4
- Margin kiri-kanan: 20px
- Gutter: 12px

---

### CORNER RADIUS & SHADOW

Daftarkan sebagai Variables:

```
Radius/XSmall = 6px    → Indikator status kecil, progress bar
Radius/Small  = 8px    → Badge, chip, tag, input kecil
Radius/Medium = 12px   → Card info, list item, dropdown
Radius/Large  = 16px   → Card utama, bottom sheet, modal
Radius/XLarge = 20px   → Bottom sheet utama, floating panel
Radius/Full   = 100px  → Pill button, badge bulat penuh
```

Effect Style (Shadow):

```
Shadow/Subtle    → x:0, y:1, blur:4,  spread:0, color:#1C1C1E 04%
Shadow/Card      → x:0, y:2, blur:8,  spread:0, color:#1C1C1E 06%
Shadow/Elevated  → x:0, y:4, blur:16, spread:0, color:#1C1C1E 10%
Shadow/Modal     → x:0, y:8, blur:24, spread:0, color:#1C1C1E 14%
```

---

### KOMPONEN DASAR (Component Library)

Buat halaman "Components" dengan komponen-komponen berikut. Setiap komponen harus memiliki variant menggunakan Figma Component Properties.

#### A. Badge / Chip Moda Transit

```
Ukuran teks: Label/Caption (13px Medium)
Padding: 4px 10px
Radius: Radius/Full (100px)
Tidak ada ikon, tidak ada emoji — hanya teks label

Variants (Property: "Moda"):
  MRT          → bg: #0070C0, text: #FFFFFF
  LRT          → bg: #E4002B, text: #FFFFFF
  KRL          → bg: #FF6600, text: #FFFFFF
  TransJakarta → bg: #E2001A, text: #FFFFFF
  JakLingko    → bg: #00923F, text: #FFFFFF

Status Chip (Property: "Status"):
  On time      → bg: #2A9D6F, text: #FFFFFF
  Terlambat    → bg: #C9423A, text: #FFFFFF
  +X mnt       → bg: #D97B2A, text: #FFFFFF
```

#### B. Card Rute / Jadwal

```
Background: Foundation/White Pure (#FFFFFF)
Radius: Radius/Large (16px)
Padding: 16px
Shadow: Shadow/Card
Border: tidak ada (gunakan shadow saja)

Struktur layout vertikal:

  [Baris atas — chip row]
  Badge Moda + Status Chip + Chip tambahan waktu (misal "+4 mnt")
  Gap antar chip: 6px

  [Nama rute — Heading/H1]
  "Stasiun Sudirman → Lebak Bulus"

  [Info dasar — Body/Default, Text/Secondary]
  "Berangkat 07.42  ·  12 menit"

  [Divider tipis — 1px, #EEEEED]

  [Baris bawah — Micro/Hint, Text/Tertiary]
  Ikon Users (16px) + "Kepadatan: Sedang"
  Progress bar kepadatan (3 segmen, warna dinamis: hijau/amber/merah)

Variants:
  Default    → border: none
  Highlighted (Tercepat/Terpilih) → border-left: 3px solid #1A6FBF
  Disabled   → opacity: 40%
```

#### C. Tombol (Button)

```
Primary:
  Background: Accent/Ocean Blue (#1A6FBF)
  Text: #FFFFFF, Body/Default SemiBold
  Height: 52px
  Radius: Radius/Large (16px)
  Padding: 0 24px
  Hover/Pressed: background #155FA0 (10% lebih gelap)

Secondary:
  Background: Foundation/White Pure
  Text: Accent/Ocean Blue
  Border: 1.5px solid #1A6FBF
  Height: 52px
  Radius: Radius/Large (16px)

Ghost / Text:
  Background: transparent
  Text: Accent/Ocean Blue
  Height: 44px
  Tidak ada border

Destructive:
  Background: Accent/Coral Alert (#C9423A)
  Text: #FFFFFF
  Height: 52px
  Radius: Radius/Large (16px)
  Digunakan hanya untuk aksi hapus / keluar

Variants (Figma Property):
  Type: Primary | Secondary | Ghost | Destructive
  Size: Default (52px) | Small (40px)
  State: Default | Pressed | Disabled | Loading
  Icon: None | Icon Left | Icon Right | Icon Only
```

#### D. Input Field

```
Background: Foundation/White Pure (#FFFFFF)
Border default: 1px solid #EEEEED
Border focused: 2px solid #1A6FBF
Border error: 2px solid #C9423A
Radius: Radius/Medium (12px)
Height: 52px
Padding horizontal: 16px
Teks input: Text/Primary (#1C1C1E), Body/Default
Placeholder: Text/Tertiary (#8E8E93), Body/Default
Label di atas field: Label/Caption, Text/Secondary

Variants:
  State: Default | Focused | Filled | Error | Disabled
  Leading icon: Yes | No
  Trailing icon: Yes | No (contoh: ikon mata untuk password)
```

#### E. List Item (Row)

```
Height: 52px
Padding: 0 20px
Background: Foundation/White Pure
Divider bawah: 1px solid #EEEEED (kecuali item terakhir)

Struktur:
  Kiri: Ikon (20px, Text/Tertiary) + gap 12px + Label (Body/Default, Text/Primary)
  Kanan: Teks nilai (Body/Default, Text/Secondary) + Ikon ChevronRight (16px, Text/Tertiary)

Untuk item dengan toggle:
  Kanan: Komponen Toggle Switch (bukan chevron)

Variants:
  Type: Navigation | Toggle | Destructive | Info
```

#### F. Bottom Navigation Bar

```
Background: Foundation/White Pure (#FFFFFF)
Height: 56px (ditambah safe area iOS di bawah)
Top border: 1px solid #EEEEED
Padding atas: 8px

4 Tab Item:
  Ikon (20px) + Label teks (Micro/Hint, 11px)
  Gap ikon ke label: 4px

  Active state:
    Ikon warna: Accent/Ocean Blue
    Teks warna: Accent/Ocean Blue
    Background tab: tidak ada highlight — hanya perubahan warna ikon dan teks

  Inactive state:
    Ikon warna: Text/Tertiary (#8E8E93)
    Teks warna: Text/Tertiary

Tab: Beranda (Home) | Rute (Navigation) | Peta (Map) | Profil (User)
```

#### G. Alert Banner / Status Strip

```
Radius: Radius/Small (8px)
Padding: 12px 16px
Border kiri: 3px solid (warna dinamis)
Tidak ada ikon emoji — gunakan ikon SVG di sisi kiri

Tipe Info (Minor):
  Background: #EAF4FF
  Border kiri: Accent/Ocean Blue
  Ikon: Info (16px, Ocean Blue)
  Teks: Body/Default, Text/Primary

Tipe Warning (Sedang):
  Background: #FFF3E0
  Border kiri: Accent/Amber Action
  Ikon: AlertTriangle (16px, Amber Action)
  Teks: Body/Default, Text/Primary

Tipe Error (Kritis):
  Background: #FFEBEA
  Border kiri: Accent/Coral Alert
  Ikon: AlertTriangle (16px, Coral Alert)
  Teks: Body/Default, Text/Primary
  Tambahan: Link teks "Lihat alternatif" di bawah teks utama

Variants:
  Severity: Info | Warning | Error
  Action: None | With Link
```

#### H. Toggle Switch

```
Ukuran: 51px x 31px (mengikuti standar iOS)
Track ON: Accent/Sage Success (#2A9D6F)
Track OFF: #E5E5EA
Thumb: #FFFFFF, shadow halus
Animasi: slide 200ms ease
```

---

## BAGIAN 2 — SCREEN DESIGN (Berdasarkan Activity Diagram)

Buat halaman "Screens" dengan frame mobile **390 × 844px** (iPhone 14).
Background default setiap frame: Foundation/Background Primary (#F7F7F5).

ATURAN SCREEN:
- Tidak ada emoji di mana pun dalam screen
- Semua ikon menggunakan line icon SVG dari library yang sudah ditentukan
- Status bar iOS di bagian atas setiap frame (tinggi 44px)
- Safe area bawah (34px) untuk layar dengan rounded corner
- Gunakan Auto Layout di semua frame dan komponen

---

### SCREEN 1 — SPLASH SCREEN

```
Frame: 390 × 844px
Background: Accent/Ocean Blue (#1A6FBF)

Konten center (horizontal dan vertikal):
  Wordmark "LinTas" — Poppins SemiBold 32px, warna #FFFFFF
  Tagline: "Navigasi transit Jakarta" — Body/Default, #FFFFFF 70% opacity

Bawah layar (center, margin bawah 48px):
  Indikator loading — 3 titik animasi pulsating, warna #FFFFFF 50%

Prototype:
  Auto-navigate ke Welcome Screen setelah 2 detik (Delay interaction)
```

---

### SCREEN 2 — WELCOME / ONBOARDING

```
Frame: 390 × 844px
Background: Foundation/Background Primary (#F7F7F5)

Bagian atas (60% tinggi layar):
  Ilustrasi — gambar peta atau diagram rute transit Jakarta
  Gaya ilustrasi: flat, minimal, menggunakan warna dari palette (Ocean Blue, Sage, Amber)
  Tidak ada foto atau ilustrasi dengan gaya kartun berlebihan

Bagian bawah (40%):
  Background: Foundation/White Pure
  Radius atas: Radius/XLarge (20px)
  Padding: 32px 20px

  Heading/H1: "Selamat datang di LinTas"
  Gap: 8px
  Body/Default, Text/Secondary: "Temukan rute tercepat dengan MRT, KRL, TransJakarta, dan lebih banyak moda lainnya."
  Gap: 32px
  [Tombol Primary Full Width: "Mulai Sekarang"]
  Gap: 12px
  [Tombol Ghost Full Width: "Masuk sebagai Tamu"]
```

---

### SCREEN 3 — IZIN LOKASI

```
Frame: 390 × 844px

Bagian atas (55% tinggi):
  Background: Foundation/Background Primary
  Center: Ikon MapPin (Lucide, 64px, stroke 1.5px, warna Ocean Blue)
  Di bawah ikon — lingkaran konsentris sebagai efek "pulse" dekoratif (border saja, tanpa fill)

Bagian bawah (45%):
  Background: Foundation/White Pure
  Radius atas: 20px
  Padding: 32px 20px

  Heading/H1: "Izinkan Akses Lokasi"
  Gap: 8px
  Body/Default, Text/Secondary:
    "LinTas membutuhkan lokasi kamu untuk menampilkan rute transit terdekat dan estimasi waktu secara akurat."
  Gap: 32px
  [Tombol Primary Full Width: "Izinkan Akses"]
  Gap: 12px
  [Tombol Ghost Full Width: "Nanti Saja"]
  Gap: 20px
  Micro/Hint, Text/Tertiary, center: "Lokasi hanya aktif saat aplikasi digunakan"
```

---

### SCREEN 4 — LOGIN

```
Frame: 390 × 844px
Background: Foundation/White Pure

Header (padding top 60px, padding horizontal 20px):
  Heading/H1: "Masuk ke LinTas"
  Gap: 4px
  Body/Default, Text/Secondary: "Masukkan email dan kata sandi kamu"

Tab Switcher (margin top 32px):
  Dua tab: [Masuk] [Daftar]
  Tab aktif: teks Text/Primary SemiBold + underline 2px Ocean Blue
  Tab tidak aktif: Text/Tertiary
  Tidak ada background tab — hanya perubahan teks dan underline

Form (margin top 24px, gap 16px):
  Input Field: "Email" (leading ikon: Mail 16px)
  Input Field: "Kata Sandi" (leading ikon: Lock 16px, trailing ikon: Eye/EyeOff untuk toggle)

  Baris terpisah (align right):
    Label/Caption, Accent/Ocean Blue: "Lupa kata sandi?"

  Gap: 8px
  [Tombol Primary Full Width: "Masuk"]

  Divider dengan teks tengah (Body/Default, Text/Tertiary): "atau"

  [Tombol Secondary Full Width: Ikon Google (SVG logo, bukan emoji) + "Masuk dengan Google"]
  [Tombol Secondary Full Width: Ikon Phone (Lucide) + "Masuk dengan Nomor HP"]

Error State (Alert Banner, di atas tombol Masuk):
  Tipe Error: "Email atau kata sandi salah. Sisa 2 percobaan."
```

---

### SCREEN 5 — DAFTAR AKUN

```
Frame: 390 × 844px
Background: Foundation/White Pure

Header (padding top 60px):
  Tombol kembali (ChevronLeft, 24px) — align kiri
  Heading/H1 center: "Buat Akun Baru"

Form (margin top 24px, gap 16px, padding 20px):
  Input Field: "Nama Lengkap" (leading ikon: User)
  Input Field: "Email" (leading ikon: Mail)
  Input Field: "Kata Sandi" (leading ikon: Lock, trailing: Eye)
  Input Field: "Konfirmasi Kata Sandi" (leading ikon: Lock, trailing: Eye)

  Label/Caption, Text/Secondary: "Pilih metode daftar"
  Row chip selectable: [Email] [Google] [Nomor HP]
  Chip aktif: border 2px Ocean Blue, teks Ocean Blue

  [Tombol Primary Full Width: "Daftar"]

  Micro/Hint, Text/Tertiary, center:
    "Dengan mendaftar, kamu menyetujui Syarat & Ketentuan LinTas"

Setelah daftar — State Verifikasi Email:
  Ikon Mail (Lucide, 48px, Ocean Blue) center
  Heading/H2: "Cek Email Kamu"
  Body/Default: "Kami mengirim link verifikasi ke ardi@email.com"
  [Tombol Ghost: "Kirim ulang email"]
```

---

### SCREEN 6 — BERANDA

```
Frame: 390 × 844px
Background: Foundation/Background Primary (#F7F7F5)

── HEADER ──
Padding: 20px horizontal, 16px top (setelah status bar)
Baris atas:
  Kiri: Label/Caption, Text/Tertiary: "Senin, 20 April 2026"
  Kanan: Tombol ikon Bell (24px, Text/Secondary) — notifikasi
Gap: 4px
Heading/H1, Text/Primary: "Mau ke mana, Ardi?"

── SEARCH BAR ──
Margin top: 16px
Background: Foundation/White Pure
Radius: Radius/Full (100px)
Height: 52px
Padding: 0 20px
Shadow: Shadow/Card
Struktur:
  Ikon Search (20px, Text/Tertiary) di kiri
  Teks Body/Default, Text/Tertiary: "Cari tujuan perjalanan..."

── KARTU CEPAT ──
Margin top: 24px
Label/Caption, Text/Tertiary, uppercase, letter-spacing 1px: "TERSIMPAN"
Margin bottom label: 10px

Horizontal scroll row, gap 10px:
  Card Cepat (background: White Pure, radius 12px, padding 12px 16px, shadow: Shadow/Subtle):
    Ikon Home (20px, Ocean Blue)
    Gap: 6px
    Label/Caption, Text/Primary: "Rumah"
    Micro/Hint, Text/Tertiary: "Kemang Raya"

  Card Cepat:
    Ikon Building2 (20px, Ocean Blue)
    Label/Caption: "Kantor"
    Micro/Hint: "Sudirman"

  Card Cepat (dashed border, untuk tambah):
    Ikon Plus (20px, Text/Tertiary)
    Label/Caption, Text/Tertiary: "Tambah"

── GANGGUAN HARI INI ──
Margin top: 24px
Alert Banner Tipe Warning (jika ada gangguan):
  Ikon AlertTriangle (16px, Amber)
  Body/Default SemiBold: "KRL Bogor Line"
  Body/Default, Text/Secondary: "Keterlambatan estimasi 15 menit di Cawang"
  Label/Caption, Ocean Blue, align right: "Lihat alternatif"

── RIWAYAT PERJALANAN ──
Margin top: 24px
Baris header:
  Label/Caption, Text/Tertiary, uppercase: "PERJALANAN TERAKHIR"
  Label/Caption, Ocean Blue, align right: "Lihat semua"
Gap: 10px

Card Rute (3 item, list vertikal):
  [Badge MRT] Blok M → Bundaran HI
  Body/Default, Text/Secondary: "Kemarin  ·  28 mnt"

── BOTTOM NAVIGATION BAR ──
Tab aktif: Beranda
```

---

### SCREEN 7 — PENCARIAN RUTE

```
Frame: 390 × 844px

── HEADER DENGAN INPUT ──
Background: Accent/Ocean Blue (#1A6FBF)
Padding: 16px 20px
Padding top: 60px (termasuk status bar)

Baris 1:
  Ikon ChevronLeft (24px, putih) di kiri — tombol kembali
  Heading/H2, putih: "Cari Rute"

Baris 2 (margin top 16px):
  Dua input field vertikal, background White Pure, radius 12px, padding 12px 16px, shadow: Shadow/Card:

  Input Asal:
    Ikon MapPin (16px, Sage Success) + "Lokasi saat ini (GPS)"
    Micro/Hint, Text/Tertiary: "Dideteksi otomatis"

  Garis vertikal putus-putus (2px, #EEEEED) di sisi kiri sebagai koneksi visual antar input

  Input Tujuan:
    Ikon MapPin (16px, Coral Alert) + "Tujuan..."
    State aktif → border 2px Ocean Blue

  Tombol ikon swap (24px, ChevronUp + ChevronDown gabungan, atau ArrowUpDown) di sisi kanan, di antara dua input

── DROPDOWN AUTOCOMPLETE ──
Background: Foundation/White Pure
Radius: Radius/Medium (12px)
Shadow: Shadow/Elevated
Muncul di bawah input Tujuan

Row item (height 52px, padding 0 16px):
  Kiri: Ikon Clock (16px, Text/Tertiary) untuk riwayat, atau MapPin (16px) untuk lokasi baru
  Gap: 12px
  Body/Default, Text/Primary: "Stasiun Sudirman"
  Micro/Hint, Text/Tertiary: "MRT Jakarta  ·  1.2 km"

── HASIL RUTE (setelah konfirmasi asal & tujuan) ──
Background: Foundation/Background Primary
Padding: 20px horizontal

Baris header:
  Heading/H2: "3 Rute Ditemukan"
  Gap: 4px
  Micro/Hint, Text/Tertiary: Ikon RefreshCw (12px) + "Diperbarui 30 dtk lalu"

Gap: 16px

Card Rute — Opsi 1 (Tercepat, highlighted):
  Background: Foundation/White Pure
  Border kiri: 3px solid #1A6FBF
  Radius: 16px, padding 16px, shadow: Shadow/Card

  Chip kanan atas: "Tercepat" (bg Ocean Blue, teks putih, Label/Caption, radius Full)
  Display/Large: "28 mnt"
  Body/Default, Text/Secondary: "MRT  →  Jalan Kaki"
  Gap: 8px
  Chip row: [MRT] [Footprints (16px) + "3 mnt jalan"]
  Divider
  Micro/Hint, Text/Tertiary: Ikon Users (12px) + "Kepadatan: Rendah  ·  Rp 4.000"

Card Rute — Opsi 2 (Termudah):
  Display/Large: "35 mnt"
  Body/Default: "TransJakarta Langsung"
  Chip: [TransJakarta]

Card Rute — Opsi 3 (Termurah):
  Display/Large: "42 mnt"
  Chip kanan atas: "Termurah" (bg Sage Success)
  Body/Default: "KRL  →  Angkot"

[Tombol Primary Full Width: "Mulai Navigasi" + Ikon Navigation (20px kanan)]

── BOTTOM NAVIGATION BAR ──
Tab aktif: Rute
```

---

### SCREEN 8 — NAVIGASI AKTIF

```
Frame: 390 × 844px
Background: Foundation/Background Primary

── HEADER NAVIGASI ──
Background: Foundation/White Pure
Padding: 16px 20px
Shadow: Shadow/Subtle di bawah

Baris:
  Ikon X (24px, Text/Primary) — hentikan navigasi
  Teks center: Heading/H2 "Bundaran HI → Lebak Bulus"
  Ikon lebih (24px, Text/Tertiary) — opsi

── ETA CARD (focal utama) ──
Background: Foundation/White Pure
Radius: Radius/XLarge (20px)
Margin: 16px 20px
Padding: 24px
Shadow: Shadow/Elevated

Center:
  Micro/Hint, Text/Tertiary, uppercase: "ESTIMASI TIBA"
  Gap: 4px
  Display/Large: "12 menit"
  Gap: 8px
  Body/Default, Text/Secondary: "Tiba sekitar pukul 07.54"
  Gap: 12px
  Chip row center: [Badge MRT] [Chip On time]

── TIMELINE PERJALANAN ──
Padding: 0 20px, margin top: 16px
Heading/H2: "Langkah Perjalanan"

Vertical timeline component:
  Setiap item memiliki:
    Indikator kiri: lingkaran solid (aktif/sudah lewat) atau lingkaran outline (belum)
    Garis vertikal penghubung antar item (2px, #EEEEED)

  Item 1 (aktif — bold):
    Ikon Train (16px, Ocean Blue)
    Heading/H2: "Stasiun Sudirman"
    Label/Caption, Text/Secondary: "Masuk dari Pintu 2A — Peron 2"
    Chip: "Sekarang" (Ocean Blue bg)

  Item 2 (lewat):
    Body/Default, Text/Tertiary: "Stasiun Senayan"
    Label/Caption, Text/Tertiary: "Tidak turun"

  Item 3 (mendatang):
    Body/Default, Text/Secondary: "Stasiun Blok M"
    Label/Caption, Text/Tertiary: "Turun — jalan 3 mnt ke halte"

  Item 4 (tujuan akhir):
    Ikon MapPin (16px, Coral Alert)
    Body/Default SemiBold: "Lebak Bulus"
    Label/Caption, Text/Secondary: "Estimasi tiba: 07.54 WIB"

── INFO KEPADATAN ──
Card info kecil, padding 12px 16px, bg White Pure, radius 12px:
  Baris: Ikon Users (16px, Text/Tertiary) + "Kepadatan" di kiri
  Baris kanan: progress bar 3 segmen warna hijau (rendah)
  Teks: Micro/Hint, Sage Success: "Rendah"

── ALERT GANGGUAN (kondisional) ──
Alert Banner Tipe Error (muncul jika ada gangguan rute aktif):
  "Keterlambatan terdeteksi. Lihat rute alternatif."
  [Tombol teks: "Lihat Alternatif" — align kanan, Ocean Blue]

── BOTTOM AREA ──
Padding: 20px, padding bottom: 34px (safe area)
[Tombol Destructive Full Width: "Hentikan Navigasi"]
Warna: Coral Alert (#C9423A)
```

---

### SCREEN 9 — DETAIL HALTE / STASIUN

```
Frame: 390 × 844px

── HEADER ──
Background: Accent/Ocean Blue (#1A6FBF)
Padding: 16px 20px
Padding top: 60px

Baris:
  Ikon ChevronLeft (24px, putih) — kembali
  Ikon Bookmark (24px, putih) — simpan stasiun, align kanan

Margin top 8px:
  Heading/H1, putih: "Stasiun Sudirman"
  Body/Default, putih 70%: "MRT Jakarta  ·  Lebak Bulus Line"

  Gap 16px:
  Row 3 info chip (bg: putih 15% opacity, radius Full, padding 6px 12px):
    Chip 1: Ikon DoorOpen (14px, putih) + "Pintu 2A" (Label/Caption, putih)
    Chip 2: Ikon Train (14px, putih) + "Peron 2"
    Chip 3: Ikon Accessibility (14px, putih) + "Akses ada"

── JADWAL KEBERANGKATAN ──
Background: Foundation/Background Primary
Padding: 20px

Baris header:
  Label/Caption, Text/Tertiary, uppercase: "KEBERANGKATAN BERIKUTNYA"
  Baris kanan: Ikon RefreshCw (12px, Text/Tertiary) + Micro/Hint, Text/Tertiary: "30 dtk"

List 5 item jadwal (Card list, bg White Pure, radius 12px, divider dalam):

  Item 1 (highlight — paling dekat):
    Kiri: [Badge MRT] + Body/Default, Text/Primary: "Arah Lebak Bulus"
    Kanan: Display/Large: "3 mnt" + Chip "On time"
    Sub-baris: Progress bar kepadatan (merah penuh) + Micro/Hint "Penuh"

  Item 2:
    [Badge MRT] Arah Bundaran HI
    Kanan: Body/Default: "8 mnt" + Chip "On time" + Kepadatan: Sedang

  Item 3–5 (opacity lebih rendah, Text/Secondary):
    Format sama, waktu lebih jauh

── AKSI ──
Margin top: 24px, padding: 0 20px
Row 2 tombol, gap 12px:
  [Tombol Secondary: Ikon Bookmark (20px) + "Simpan Stasiun"]
  [Tombol Primary: Ikon Navigation (20px) + "Buat Rute"]

── BOTTOM NAVIGATION BAR ──
```

---

### SCREEN 10 — PROFIL & PENGATURAN

```
Frame: 390 × 844px
Background: Foundation/Background Primary

── HEADER PROFIL ──
Background: Foundation/White Pure
Padding: 24px 20px
Shadow: Shadow/Subtle di bawah

Center layout:
  Avatar foto (80px, circle, border 2px solid Ocean Blue, shadow: Shadow/Card)
  Gap: 12px
  Heading/H1: "Ardi Kusuma"
  Gap: 4px
  Body/Default, Text/Secondary: "ardi@email.com"
  Gap: 16px
  [Tombol Ghost kecil: Ikon Pencil (16px) + "Edit Profil"]

── MENU PENGATURAN ──
Margin top: 16px, padding: 0 20px

Section card 1 — PREFERENSI (bg: White Pure, radius 16px):
  List Item: Ikon Bell (20px) + "Notifikasi Gangguan"    | Toggle Switch ON
  Divider
  List Item: Ikon Globe (20px) + "Bahasa"                | "Indonesia" + ChevronRight
  Divider
  List Item: Ikon Train (20px) + "Moda Favorit"          | "MRT, KRL" + ChevronRight
  Divider
  List Item: Ikon MapPin (20px) + "Izin Lokasi"          | "Aktif" + ChevronRight

Margin top: 16px
Section card 2 — AKUN (bg: White Pure, radius 16px):
  List Item: Ikon User (20px) + "Ubah Nama & Nomor HP"   | ChevronRight
  Divider
  List Item: Ikon Lock (20px) + "Ubah Kata Sandi"        | ChevronRight

Margin top: 16px
Section card 3 — LAINNYA (bg: White Pure, radius 16px):
  List Item: Ikon Flag (20px) + "Beri Masukan"           | ChevronRight
  Divider
  List Item: Ikon Info (20px) + "Tentang LinTas"         | "v1.0.0" + ChevronRight

Margin top: 24px
[Tombol Destructive Full Width: Ikon LogOut (20px) + "Keluar dari Akun"]

── BOTTOM NAVIGATION BAR ──
Tab aktif: Profil
```

---

### SCREEN 11 — EDIT PROFIL

```
Frame: 390 × 844px
Background: Foundation/Background Primary

── HEADER ──
Padding: 16px 20px, padding top: 60px
Baris:
  Ikon ChevronLeft (24px) + Heading/H2: "Edit Profil"
  Tombol teks kanan: Label/Caption, Ocean Blue: "Simpan"

── FOTO PROFIL ──
Background: Foundation/White Pure, padding 24px
Center:
  Avatar foto (80px, circle, border 2px Ocean Blue)
  Di sudut kanan bawah avatar: tombol bulat kecil (32px, bg Ocean Blue):
    Ikon Camera (14px, putih)
  Gap: 12px
  Label/Caption, Ocean Blue: "Ganti Foto"

── FORM DATA DIRI ──
Margin top: 16px, padding: 20px
Card bg White Pure, radius 16px, padding 16px:
  Label/Caption, Text/Secondary: "INFORMASI PRIBADI"
  Gap: 16px

  Input Field: "Nama Lengkap" — diisi: "Ardi Kusuma"
  Input Field: "Nomor HP" — diisi: "+62 812 3456 7890"

── VERIFIKASI KATA SANDI ──
Margin top: 16px, padding: 0 20px
Card bg White Pure, radius 16px, padding 16px:
  Label/Caption, Text/Secondary: "KEAMANAN AKUN"
  Gap: 16px

  Input Field: "Kata Sandi Lama" (trailing ikon Eye)
  Input Field: "Kata Sandi Baru" (trailing ikon Eye)
  Input Field: "Konfirmasi Kata Sandi Baru" (trailing ikon Eye)

Error state:
  Border merah + Alert Banner Error di atas input: "Kata sandi lama tidak sesuai"

── PREFERENSI ──
Margin top: 16px, padding: 0 20px
Card bg White Pure, radius 16px, padding 16px:
  Label/Caption, Text/Secondary: "PREFERENSI TRANSIT"
  Gap: 12px

  Body/Default: "Moda Favorit"
  Row chip multi-select (dapat dipilih lebih dari satu):
    [MRT] [KRL] [TransJakarta] [LRT] [JakLingko]
    Chip terpilih: bg sesuai warna transit, teks putih
    Chip tidak terpilih: bg #EEEEED, teks Text/Secondary

  Gap: 12px
  Body/Default: "Bahasa"
  Row chip single-select: [Indonesia] [English]
```

---

### SCREEN 12 — LAPORAN MASALAH

```
Frame: 390 × 844px

── HEADER ──
Padding: 16px 20px, padding top: 60px, bg White Pure
Ikon ChevronLeft + Heading/H2: "Laporkan Masalah"

── PILIH TIPE LAPORAN ──
Padding: 20px
Label/Caption, Text/Tertiary, uppercase: "JENIS LAPORAN"
Gap: 12px

Grid 2x2, gap 12px:
  Card tipe (bg White Pure, radius 16px, padding 16px, shadow: Shadow/Subtle, border 1px #EEEEED):
    Ikon CalendarDays (24px, Text/Secondary)
    Gap: 8px
    Body/Default SemiBold: "Akurasi Jadwal"
    Micro/Hint, Text/Tertiary: "Jadwal tidak sesuai kenyataan"

  Card tipe:
    Ikon MapPin (24px)
    "Nama Tempat"
    "Nama salah atau berubah"

  Card tipe:
    Ikon Wrench (24px) — atau Tool icon
    "Kondisi Fisik"
    "Rusak, tutup, atau pindah"

  Card tipe:
    Ikon MessageSquare (24px)
    "Saran Umum"
    "Masukan bebas"

  Card aktif terpilih:
    Border 2px Ocean Blue
    Background #EAF4FF (biru muda)
    Ikon dan teks berubah ke Ocean Blue

── FORM (kondisional — muncul setelah tipe dipilih) ──
Contoh: Akurasi Jadwal

Padding: 0 20px, margin top: 20px
Card bg White Pure, radius 16px, padding 16px:
  Label/Caption, Text/Secondary: "DETAIL LAPORAN"
  Gap: 16px

  Dropdown: "Moda Transit" — pilihan: MRT | KRL | TransJakarta | LRT | JakLingko
  Input: "Rute atau Jalur"
  Label "Jenis Masalah"
  Row chip single-select: [Terlambat] [Dibatalkan] [Salah Info]
  Input number: "Selisih Waktu (menit)"
  Textarea: "Catatan Tambahan (opsional)"
  Micro/Hint align right: "0 / 500 karakter"

── PREVIEW LAPORAN ──
Margin top: 16px, padding: 0 20px
Card bg #EAF4FF, radius 12px, padding 16px:
  Label/Caption SemiBold, Ocean Blue: "RINGKASAN LAPORAN"
  Gap: 8px
  Baris info: Label/Caption Text/Tertiary "Moda" → Body/Default Text/Primary "MRT"
  Baris info: "Masalah" → "Terlambat 15 menit"
  Baris info: "Rute" → "Lebak Bulus Line"

Margin top: 16px
[Tombol Primary Full Width: "Kirim Laporan"]

── STATE SUKSES ──
Center layout seluruh layar:
  Ikon Check (48px) dalam lingkaran Sage Success
  Gap: 24px
  Heading/H1: "Laporan Diterima"
  Gap: 8px
  Body/Default, Text/Secondary: "ID Laporan: #LT-20260420-001"
  Micro/Hint, Text/Tertiary: "Kami akan memverifikasi dalam 24 jam"
  Gap: 32px
  [Tombol Primary: "Kembali ke Beranda"]
```

---

### SCREEN 13 — VOICE COMMAND (PERINTAH SUARA)

```
Frame: 390 × 844px

State STANDBY (overlay partial):
  Background: Foundation/Background Primary
  Floating button kanan bawah (64px, radius Full, bg Ocean Blue, shadow: Shadow/Modal):
    Ikon Mic (24px, putih)
  Label/Caption di atas tombol, text center, Text/Tertiary: "Ketuk untuk perintah suara"

State MENDENGARKAN (overlay penuh):
  Background: #1C1C1E dengan opacity 90%
  Center layout:
    Animasi gelombang suara (3 lingkaran konsentris, border 1.5px Ocean Blue, pulsating)
    Di tengah lingkaran: Ikon Mic (32px, putih)
    Gap: 32px
    Heading/H2, putih: "Mendengarkan..."
    Gap: 8px
    Body/Default, putih 60%: 'Coba ucap: "LinTas, bawa aku ke Sudirman"'
    Gap: 40px
    Tombol ikon X (48px, bg putih 15%, radius Full) — batalkan

State MEMPROSES:
  Overlay sama
  Ikon Mic berubah → spinner animasi, Ocean Blue
  Heading/H2, putih: "Memproses..."

State HASIL (Bottom Sheet):
  Background: Foundation/White Pure
  Radius atas: 20px
  Padding: 24px 20px
  Handle bar atas (40px lebar, 4px tinggi, bg #EEEEED, radius Full, center)
  Gap: 16px

  Label/Caption, Text/Tertiary: "HASIL PERINTAH SUARA"
  Gap: 12px
  Heading/H2: "Rute ke Sudirman"
  Display/Large: "22 menit via MRT"
  Chip row: [Badge MRT] [Chip On time]
  Gap: 20px
  [Tombol Primary Full Width: Ikon Navigation (20px) + "Mulai Navigasi"]
  [Tombol Ghost Full Width: "Cari Rute Lain"]

State ERROR:
  Alert Banner Tipe Error:
    Ikon AlertTriangle (16px) + "Perintah tidak dipahami. Coba ulangi."
  [Tombol Ghost center: Ikon Mic (16px) + "Coba Lagi"]
```

---

## BAGIAN 3 — PROTOTYPE FLOW

Di Figma Prototype panel, hubungkan screen dengan trigger dan transition:

```
Splash Screen
  Auto-navigate setelah 2 detik (Delay 2000ms)
  → Jika instalasi pertama: Welcome Screen [Dissolve, 300ms]
  → Jika token valid: Beranda [Dissolve, 300ms]

Welcome Screen
  [Mulai Sekarang] → Izin Lokasi [Push Left, 300ms]
  [Masuk sebagai Tamu] → Beranda [Push Left, 300ms]

Izin Lokasi
  [Izinkan Akses] → Login [Push Left, 300ms]
  [Nanti Saja] → Login [Push Left, 300ms]

Login
  [Masuk — berhasil] → Beranda [Dissolve, 400ms]
  [Lupa kata sandi] → Reset Password [Push Up, 300ms]
  Tab [Daftar] → Daftar Akun [Instant]

Daftar Akun
  [Daftar — berhasil] → State Verifikasi Email [Dissolve, 300ms]

Beranda
  [Search bar] → Pencarian Rute [Push Up, 300ms]
  [Card riwayat] → Detail Rute [Push Left, 300ms]
  [Alert gangguan] → Detail Gangguan [Push Up, 300ms]
  Bottom Nav [Rute] → Pencarian Rute [Dissolve]
  Bottom Nav [Profil] → Profil [Dissolve]

Pencarian Rute
  [Input tujuan] → Dropdown autocomplete [Smart Animate]
  [Card opsi rute] → Navigasi Aktif [Push Up, 400ms]

Navigasi Aktif
  [Tiba di tujuan — auto] → Ringkasan Perjalanan [Dissolve, 500ms]
  [Hentikan Navigasi] → Konfirmasi Dialog [Push Up] → Beranda

Detail Halte/Stasiun
  [Buat Rute] → Pencarian Rute [Push Left]
  [Simpan] → Konfirmasi saved (snackbar kecil muncul di bawah)

Profil
  [Edit Profil] → Edit Profil [Push Left]
  [Beri Masukan] → Laporan Masalah [Push Left]
  [Keluar] → Dialog konfirmasi → Login [Dissolve]

Laporan Masalah
  [Kirim] → State Sukses [Dissolve]
  [Kembali ke Beranda] → Beranda [Dissolve]

Voice Command
  [Tombol Mic] → State Mendengarkan [Dissolve, 200ms]
  [State Mendengarkan] → State Memproses [Smart Animate]
  [State Memproses] → Bottom Sheet Hasil [Push Up, 300ms]
  [Mulai Navigasi] → Navigasi Aktif [Push Up]
```

---

## BAGIAN 4 — DO'S & DON'TS

### YANG HARUS DILAKUKAN

- Gunakan Display/Large (28px SemiBold) hanya untuk satu angka krusial per layar: ETA, menit tersisa, atau nomor peron
- Gunakan whitespace sebagai elemen desain — padding minimum antar elemen adalah 16px
- Gunakan warna transit (MRT, KRL, dll) hanya sebagai badge/chip kecil, bukan background section
- Gunakan line icon SVG dengan stroke weight konsisten 1.5px di seluruh aplikasi
- Gunakan Shadow/Card dan Shadow/Elevated untuk menciptakan kedalaman — bukan border tebal
- Gunakan tabular-nums untuk semua angka real-time agar tidak bergeser saat nilai berubah

### YANG TIDAK BOLEH DILAKUKAN

- JANGAN gunakan emoji di mana pun dalam UI aplikasi — baik label, menu, tombol, maupun konten
- Jangan gunakan lebih dari 3 ukuran font dalam satu card atau section
- Jangan bold semua hal — hanya satu elemen per layar yang mendapat Display/Large
- Jangan gunakan warna accent (Ocean Blue, Amber, Coral) untuk teks konten biasa — hanya untuk action, status, dan navigasi
- Jangan gunakan gradien warna-warni atau latar belakang bertekstur
- Jangan gunakan pink, ungu, atau warm tone — LinTas harus terasa netral dan utilitarian
- Jangan taruh lebih dari 4 warna aktif dalam satu layar

---

## BAGIAN 5 — NAMING CONVENTION FIGMA

Gunakan penamaan berikut secara konsisten di seluruh file Figma:

```
Pages:
  Colors
  Typography
  Spacing & Grid
  Icons
  Components
  Screens
  Prototype Flow
  Dos and Donts

Frames (Screen):
  Screen/[Nama] → contoh: Screen/Beranda, Screen/Login, Screen/NamasiAktif

Components:
  [Kategori]/[Nama]/[Variant]
  Contoh:
    Badge/Transit/MRT
    Badge/Status/OnTime
    Button/Primary/Default
    Button/Primary/Loading
    Button/Secondary/Default
    Button/Ghost/Default
    Button/Destructive/Default
    Card/Rute/Default
    Card/Rute/Highlighted
    Card/Cepat/Default
    Input/Default
    Input/Focused
    Input/Error
    ListItem/Navigation
    ListItem/Toggle
    Alert/Info
    Alert/Warning
    Alert/Error
    Nav/BottomBar

Color Styles:
  Foundation/Background Primary
  Foundation/Surface Card
  Foundation/White Pure
  Text/Primary
  Text/Secondary
  Text/Tertiary
  Accent/Ocean Blue
  Accent/Amber Action
  Accent/Sage Success
  Accent/Coral Alert
  Transit/MRT
  Transit/LRT
  Transit/KRL
  Transit/TransJakarta
  Transit/JakLingko

Text Styles:
  Display/Large
  Heading/H1
  Heading/H2
  Body/Default
  Label/Caption
  Micro/Hint

Effect Styles:
  Shadow/Subtle
  Shadow/Card
  Shadow/Elevated
  Shadow/Modal

Variables (Spacing):
  Spacing/4
  Spacing/8
  Spacing/12
  Spacing/16
  Spacing/20
  Spacing/24
  Spacing/32
  Spacing/48

Variables (Radius):
  Radius/XSmall
  Radius/Small
  Radius/Medium
  Radius/Large
  Radius/XLarge
  Radius/Full
```

---

*Dokumen ini adalah panduan prompt untuk membangun Design System dan UI Aplikasi LinTas di Figma.*
*LinTas — Navigasi Transit Jakarta*
*Revisi v2 — Tanpa emoji, Modern Mobile Apps*