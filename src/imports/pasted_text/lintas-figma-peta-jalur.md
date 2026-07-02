# PROMPT FIGMA — LinTas Revisi Fitur Peta Jalur
> Dokumen ini adalah **lanjutan dari LinTas_Figma_Prompt_v2.md**.
> Semua aturan Design System (tipografi, warna, ikon, spacing, radius, shadow) dari v2 tetap berlaku penuh.
> Prompt ini hanya mendefinisikan revisi dan penambahan yang berkaitan dengan fitur **Peta Jalur Transit**.

---

## KONTEKS REVISI

### Masalah yang diperbaiki dari versi sebelumnya

Tab "Peta" di Bottom Navigation Bar sebelumnya menampilkan layar detail keberangkatan stasiun —
bukan tampilan peta yang sesungguhnya. Ini melanggar prinsip HCI **Recognition over Recall**
karena label tidak mencerminkan konten yang ditampilkan, menciptakan disorientasi pada pengguna.

### Solusi yang diimplementasikan

Tab "Peta" diubah menjadi fitur **Peta Jalur Transit** — peta interaktif jaringan transportasi publik
Jabodetabek yang menampilkan jalur dan pemberhentian per moda secara terpisah.
Pengguna memilih satu moda terlebih dahulu, lalu memilih jalur spesifik, kemudian peta merender
polyline jalur beserta seluruh titik pemberhentiannya.

### Penambahan moda baru

Moda **Jak Lingko / Angkot** ditambahkan ke seluruh sistem sebagai moda keenam yang sebelumnya
tidak ada. Warna dan badge-nya didaftarkan sebagai Color Style dan komponen baru.

---

## BAGIAN 1 — TAMBAHAN DESIGN SYSTEM

### 1A. Color Style Baru — Tambahkan ke halaman "Colors"

Tambahkan ke grup **LAYER 4 — TRANSIT LINE CODING**:

| Style Name          | Hex       | Kegunaan                     |
|---------------------|-----------|------------------------------|
| Transit/JakLingko   | `#00923F` | Badge & polyline Jak Lingko  |
| Transit/Transcity   | `#6A5ACD` | Badge & polyline Transcity   |

> Catatan: `Transit/JakLingko` mungkin sudah ada di v2. Pastikan tidak duplikat —
> jika sudah ada, skip dan lanjutkan ke Transcity saja.

Warna ini mengikuti aturan yang sama: **hanya muncul sebagai badge/chip kecil atau polyline di peta**.
Tidak boleh digunakan sebagai background section, header, atau elemen besar apapun.

---

### 1B. Badge / Chip Moda Baru — Tambahkan ke Komponen Badge/Transit

Buka komponen `Badge/Transit` di halaman Components dan tambahkan dua variant baru:

```
Badge/Transit/JakLingko
  Background: #00923F
  Text: #FFFFFF
  Label: "Jak Lingko"
  Padding: 4px 10px
  Radius: Radius/Full (100px)
  Font: Label/Caption (13px Medium)

Badge/Transit/Transcity
  Background: #6A5ACD
  Text: #FFFFFF
  Label: "Transcity"
  Padding: 4px 10px
  Radius: Radius/Full (100px)
  Font: Label/Caption (13px Medium)
```

---

### 1C. Ikon Baru — Tambahkan ke daftar ikon

Tambahkan ke tabel ikon di halaman "Icons":

| Fungsi                    | Nama Ikon Lucide     |
|---------------------------|----------------------|
| Peta jalur / transit map  | `Map`                |
| Filter / pilih moda       | `Layers`             |
| Halte / titik berhenti    | `CircleDot`          |
| Jalur / rute garis        | `Route`              |
| Angkot / kendaraan kecil  | `Truck`              |
| Arah jalur                | `ArrowRightLeft`     |

---

### 1D. Komponen Baru — Chip Pemilih Moda (Mode Selector Chip)

Buat komponen baru: `Chip/ModaSelector`

Ini adalah chip horizontal yang digunakan di layar Peta Jalur untuk memilih moda transportasi.
Berbeda dari Badge/Transit — chip ini lebih besar, tappable, dan memiliki state aktif/tidak aktif.

```
Komponen: Chip/ModaSelector
Tinggi: 36px
Padding horizontal: 14px
Radius: Radius/Full (100px)
Gap ikon ke label: 6px

State INACTIVE (default):
  Background: Foundation/White Pure (#FFFFFF)
  Border: 1px solid #EEEEED
  Ikon (16px): Text/Tertiary (#8E8E93)
  Label teks: Label/Caption (13px Medium), Text/Secondary (#3C3C43)
  Shadow: Shadow/Subtle

State ACTIVE:
  Background: warna moda (lihat tabel di bawah)
  Border: tidak ada
  Ikon (16px): #FFFFFF
  Label teks: Label/Caption (13px Medium), #FFFFFF
  Shadow: Shadow/Card

Variants (Property: "Moda"):
  JakLingko   → active bg: #00923F,  ikon: Truck
  TransJakarta → active bg: #E2001A, ikon: Bus
  KRL         → active bg: #FF6600,  ikon: Train
  MRT         → active bg: #0070C0,  ikon: Train
  LRT         → active bg: #E4002B,  ikon: Train
  Transcity   → active bg: #6A5ACD,  ikon: Truck

Variants (Property: "State"):
  Inactive | Active
```

---

### 1E. Komponen Baru — Kartu Jalur (Route Line Card)

Buat komponen baru: `Card/JalurTransit`

Digunakan di bottom sheet daftar jalur setelah pengguna memilih moda.

```
Komponen: Card/JalurTransit
Background: Foundation/White Pure (#FFFFFF)
Radius: Radius/Medium (12px)
Padding: 14px 16px
Shadow: Shadow/Subtle
Border: tidak ada

Struktur layout (Auto Layout, direction: horizontal, align center):

  [Kiri — strip warna moda]
    Lebar: 4px
    Tinggi: seluruh tinggi card
    Radius: Radius/XSmall (6px) di sisi kiri saja
    Warna: mengikuti warna moda yang dipilih

  [Gap: 12px]

  [Tengah — Auto Layout vertikal, flex grow]
    Baris 1: Label/Caption (13px Medium), Text/Primary
      Nomor atau kode jalur — contoh: "2A", "Bogor Line", "Lebak Bulus → Bundaran HI"
    Gap: 3px
    Baris 2: Micro/Hint (11px), Text/Tertiary
      Jumlah pemberhentian — contoh: "24 halte  ·  Arah Bundaran HI"

  [Kanan — Ikon ChevronRight (16px, Text/Tertiary)]

Variants (Property: "State"):
  Default    → seperti di atas
  Selected   → border kiri: 3px solid warna moda (menggantikan strip 4px), background: tint 5% warna moda
  Disabled   → opacity: 40%
```

---

### 1F. Komponen Baru — Popup Halte (Stop Popup)

Buat komponen baru: `Popup/Halte`

Muncul sebagai bottom sheet mini (bukan full sheet) ketika pengguna mengetuk titik halte di peta.

```
Komponen: Popup/Halte
Background: Foundation/White Pure (#FFFFFF)
Radius atas: Radius/XLarge (20px)
Radius bawah: 0px (menempel ke tepi bawah layar)
Padding: 20px 20px 16px
Shadow: Shadow/Modal

Struktur layout (Auto Layout, vertikal):

  Handle bar:
    Lebar: 40px, Tinggi: 4px
    Background: #EEEEED
    Radius: Radius/Full
    Alignment: center horizontal
    Margin bawah: 16px

  Baris header (horizontal, space-between):
    Kiri:
      Badge moda (Badge/Transit sesuai moda aktif)
      Gap: 8px
      Heading/H2: nama halte/stasiun
    Kanan:
      Ikon Bookmark (20px, Text/Tertiary) — untuk simpan

  Gap: 4px

  Body/Default, Text/Secondary: info tambahan
    contoh: "Peron 2  ·  Pintu Selatan"
    Untuk halte bus: "Sisi kanan jalan  ·  Arah Bundaran HI"
    Untuk Jak Lingko: "Shelter Jak Lingko  ·  Rute 3B, 4A"

  Gap: 16px

  Divider tipis: 1px solid #EEEEED

  Gap: 14px

  Baris tombol aksi (horizontal, gap: 10px):
    [Tombol Secondary — setengah lebar: Ikon CalendarDays (16px) + "Jadwal"]
    [Tombol Primary — setengah lebar: Ikon Navigation (16px) + "Rute ke sini"]

  Gap: 8px

  [Tombol Ghost Full Width: Ikon Bookmark (16px) + "Simpan halte ini"]

Variants (Property: "TipeTransit"):
  Stasiun  → tampilkan info peron dan pintu
  Halte    → tampilkan info sisi jalan dan arah
  Terminal → tampilkan info gate dan bay keberangkatan
  Shelter  → tampilkan info rute Jak Lingko yang lewat
```

---

### 1G. Komponen Baru — Strip Info Jalur Aktif (Active Route Info Strip)

Buat komponen baru: `Strip/JalurAktif`

Muncul di bagian atas peta (di bawah status bar) ketika jalur spesifik sudah dipilih.
Menampilkan konteks jalur yang sedang dilihat pengguna.

```
Komponen: Strip/JalurAktif
Background: Foundation/White Pure (#FFFFFF)
Padding: 12px 20px
Border bawah: 1px solid #EEEEED
Shadow: Shadow/Subtle

Struktur layout (horizontal, align center, space-between):

  [Kiri — Auto Layout horizontal, align center, gap 10px]
    Ikon ChevronLeft (20px, Text/Secondary) — kembali ke daftar jalur
    Badge/Transit sesuai moda aktif (komponen Badge/Transit)
    Gap: 4px
    Heading/H2: nama jalur
    Body/Default, Text/Tertiary: "· X halte"

  [Kanan — Auto Layout horizontal, align center, gap 8px]
    Ikon ArrowRightLeft (16px, Text/Tertiary) — ganti arah jalur
    Label/Caption, Text/Secondary: "Ganti arah"
```

---

## BAGIAN 2 — REVISI BOTTOM NAVIGATION BAR

### 2A. Perubahan Tab & Urutan

Tab Bottom Navigation Bar direvisi dari **4 tab** menjadi **5 tab** untuk mengakomodasi
penambahan fitur Peta Jalur yang kini memiliki fungsi berbeda dari tab Rute.

```
SEBELUMNYA (4 tab):
  Beranda (Home) | Rute (Navigation) | Peta (Map) | Profil (User)

SESUDAH (5 tab):
  Beranda (Home) | Rute (Navigation) | Peta Jalur (Layers) | Tersimpan (Bookmark) | Profil (User)
```

**Penjelasan perubahan:**

| Tab         | Ikon Lucide  | Fungsi                                               |
|-------------|--------------|------------------------------------------------------|
| Beranda     | `Home`       | Dashboard utama, peta lokasi real-time, search bar   |
| Rute        | `Navigation` | Pencarian & perencanaan rute perjalanan              |
| Peta Jalur  | `Layers`     | Peta jaringan transit, pilih moda & jalur            |
| Tersimpan   | `Bookmark`   | Tempat tersimpan & riwayat 7 perjalanan terakhir     |
| Profil      | `User`       | Profil, preferensi, laporan, logout                  |

> Catatan penting: Tab "Tersimpan" dipindahkan dari dalam menu Profil ke nav bar utama
> karena frekuensi aksesnya tinggi (komuter mengakses "Rumah" dan "Kantor" setiap hari).
> Ini mengikuti prinsip HCI **Frequency of Use** — fitur yang sering dipakai harus di thumb zone.

### 2B. Revisi Komponen Nav/BottomBar

Buka komponen `Nav/BottomBar` di halaman Components dan update:

```
Komponen: Nav/BottomBar
Background: Foundation/White Pure (#FFFFFF)
Height: 56px + safe area bawah (34px iOS) = 90px total frame
Top border: 1px solid #EEEEED
Padding horizontal: 0px (tab mengisi penuh)

5 Tab Item (lebar sama rata = 78px masing-masing):
  Setiap item: Auto Layout vertikal, center, gap 4px
  Ikon: 20x20px
  Label: Micro/Hint (11px Medium)

  Active state:
    Ikon: Accent/Ocean Blue (#1A6FBF)
    Label: Accent/Ocean Blue (#1A6FBF)
    Background tab: tidak ada highlight

  Inactive state:
    Ikon: Text/Tertiary (#8E8E93)
    Label: Text/Tertiary (#8E8E93)

Variants (Property: "Active Tab"):
  Beranda | Rute | PetaJalur | Tersimpan | Profil
```

---

## BAGIAN 3 — SCREEN BARU: PETA JALUR

### SCREEN — PETA JALUR (State: Pilih Moda)

Ini adalah state awal ketika pengguna membuka tab Peta Jalur.
Peta ditampilkan tanpa jalur apapun. Pengguna harus memilih moda terlebih dahulu.

```
Frame: 390 × 844px
Nama frame Figma: Screen/PetaJalur/PilihModa

Struktur layar (dari atas ke bawah):

── STATUS BAR iOS (44px) ──

── HEADER (56px) ──
  Background: Foundation/White Pure (#FFFFFF)
  Border bawah: 1px solid #EEEEED
  Padding: 0 20px
  Layout horizontal, align center, space-between:
    Heading/H2: "Peta Jalur"
    Ikon Search (20px, Text/Secondary) — cari nama halte/jalur

── CHIP ROW MODA (60px termasuk padding atas-bawah) ──
  Background: Foundation/White Pure (#FFFFFF)
  Border bawah: 1px solid #EEEEED
  Padding: 10px 20px
  Scrollable horizontal (tidak wrap)
  Gap antar chip: 8px

  Urutan chip (kiri ke kanan):
    Chip/ModaSelector - JakLingko   (State: Inactive)
    Chip/ModaSelector - TransJakarta (State: Inactive)
    Chip/ModaSelector - KRL         (State: Inactive)
    Chip/ModaSelector - MRT         (State: Inactive)
    Chip/ModaSelector - LRT         (State: Inactive)
    Chip/ModaSelector - Transcity   (State: Inactive)

── AREA PETA (mengisi sisa tinggi layar) ──
  Background peta: #EEE9E0 (warna peta netral, bukan putih murni)
  Tampilkan peta Jabodetabek tanpa jalur apapun
  Hanya tampilkan:
    - Jalan utama (garis tipis abu-abu)
    - Label nama area besar (Jakpus, Jaksel, Bogor, dsb.)
    - Titik lokasi pengguna (dot biru beranimasi pulse)

  Overlay teks di tengah peta (center horizontal & vertikal):
    Background: Foundation/White Pure, radius Radius/Large, padding 16px 20px, shadow Shadow/Card
    Ikon Layers (24px, Text/Tertiary)
    Gap: 8px
    Body/Default, Text/Secondary, center:
      "Pilih moda transportasi di atas"
      "untuk melihat jalur dan pemberhentiannya"

── BOTTOM NAVIGATION BAR ──
  Tab aktif: Peta Jalur
```

---

### SCREEN — PETA JALUR (State: Moda Terpilih, Daftar Jalur)

State setelah pengguna memilih satu moda. Bottom sheet muncul dengan daftar jalur.
Contoh: pengguna memilih Transjakarta.

```
Frame: 390 × 844px
Nama frame Figma: Screen/PetaJalur/DaftarJalur

Struktur layar:

── STATUS BAR iOS (44px) ──

── HEADER (56px) ──
  (sama seperti state PilihModa)

── CHIP ROW MODA (60px) ──
  Sama, tapi chip yang dipilih berubah ke state ACTIVE:
    Chip/ModaSelector - TransJakarta (State: Active) — tampil merah #E2001A, teks putih
    Chip lainnya tetap Inactive

── AREA PETA (mengisi sisa tinggi, dikurangi bottom sheet) ──
  Peta masih kosong (jalur belum dirender karena jalur spesifik belum dipilih)
  Semua chip Inactive lain masih bisa digeser dan diklik

── BOTTOM SHEET — DAFTAR JALUR (tinggi 340px, tidak full screen) ──
  Background: Foundation/White Pure (#FFFFFF)
  Radius atas: Radius/XLarge (20px)
  Shadow: Shadow/Modal

  Handle bar (40px lebar, 4px tinggi, #EEEEED, radius Full, center, margin bawah 16px)

  Baris header bottom sheet (horizontal, space-between, padding 0 20px):
    Heading/H2: "Pilih Jalur Transjakarta"
    Label/Caption, Text/Tertiary: "48 jalur"

  Gap: 12px

  Input pencarian jalur (tinggi 40px):
    Padding horizontal: 20px
    Background: Foundation/Background Primary (#F7F7F5)
    Radius: Radius/Medium (12px)
    Padding internal: 0 12px
    Ikon Search (16px, Text/Tertiary) di kiri
    Placeholder: Body/Default, Text/Tertiary: "Cari nomor atau nama jalur"

  Gap: 12px

  Daftar jalur (scrollable vertikal):
    Padding horizontal: 20px
    Gap antar card: 8px

    Card/JalurTransit (State: Default):
      Strip: merah #E2001A (4px)
      Nomor jalur: "1"
      Keterangan: "Blok M → Kota  ·  24 halte"

    Card/JalurTransit (State: Default):
      Strip: merah #E2001A (4px)
      Nomor jalur: "2A"
      Keterangan: "Pulo Gadung → Rawa Buaya  ·  32 halte"

    Card/JalurTransit (State: Default):
      Strip: merah #E2001A (4px)
      Nomor jalur: "2B"
      Keterangan: "Harmoni → Rawa Buaya  ·  28 halte"

    Card/JalurTransit (State: Default):
      Strip: merah #E2001A (4px)
      Nomor jalur: "3"
      Keterangan: "Kalideres → Pasar Baru  ·  21 halte"

    [dst. — tampilkan 4-5 card terlihat, sisanya scroll]

── BOTTOM NAVIGATION BAR ──
  Tab aktif: Peta Jalur
```

---

### SCREEN — PETA JALUR (State: Jalur Aktif Dirender)

State setelah pengguna memilih jalur spesifik (contoh: Transjakarta 2A).
Bottom sheet daftar jalur collapse menjadi strip tipis di bawah.
Peta merender polyline jalur beserta titik-titik haltenya.

```
Frame: 390 × 844px
Nama frame Figma: Screen/PetaJalur/JalurAktif

Struktur layar:

── STATUS BAR iOS (44px) ──

── STRIP INFO JALUR AKTIF (Strip/JalurAktif, 52px) ──
  Badge: Badge/Transit/TransJakarta ("Transjakarta")
  Nama jalur: "2A — Pulo Gadung → Rawa Buaya"
  Info: "· 32 halte"
  Kanan: Ikon ArrowRightLeft (16px) + Label "Ganti arah"

── CHIP ROW MODA (60px) ──
  Chip/ModaSelector - TransJakarta (State: Active)
  Chip lain: Inactive

── AREA PETA (mengisi sisa tinggi dikurangi bottom strip) ──
  Peta menampilkan:

  POLYLINE JALUR:
    Garis tebal: stroke 4px, warna #E2001A (sesuai moda TJ)
    Rounded cap di ujung
    Mengikuti jalan sesuai rute asli

  TITIK HALTE (stop markers):
    Bentuk: lingkaran
    Diameter: 10px
    Background: #FFFFFF
    Border: 2px solid #E2001A
    Ditempatkan tepat di atas polyline

  TITIK HALTE YANG DIKETUK (popup terbuka):
    Diameter: 14px
    Background: #E2001A
    Border: 3px solid #FFFFFF
    Shadow: Shadow/Card

  LABEL HALTE UTAMA (tampil di zoom tertentu):
    Micro/Hint (11px), Text/Primary
    Background: Foundation/White Pure, radius 4px, padding 2px 6px, shadow Shadow/Subtle
    Muncul hanya untuk halte besar (Harmoni, Blok M, dsb.)

  TOMBOL KONTROL PETA (pojok kanan bawah, di atas bottom strip):
    Tumpukan vertikal, gap 8px:
      Tombol zoom in  → lingkaran 40px, bg White, shadow Card, ikon Plus (20px)
      Tombol zoom out → lingkaran 40px, bg White, shadow Card, ikon Minus (20px)
      Tombol lokasiku → lingkaran 40px, bg Ocean Blue, shadow Card, ikon Crosshair (20px, putih)

── POPUP/HALTE (bottom sheet mini, tinggi 220px) ──
  Tampil ketika salah satu titik halte diketuk.
  Gunakan komponen Popup/Halte (TipeTransit: Halte)
  Contoh isi:
    Badge: Transjakarta
    Nama: "Halte Jembatan Besi"
    Sub: "Sisi kanan jalan  ·  Arah Rawa Buaya"
    Tombol: [Jadwal] [Rute ke sini]
    Tombol ghost: [Simpan halte ini]

── BOTTOM STRIP DAFTAR JALUR (collapsed, 52px) ──
  Background: Foundation/White Pure
  Border atas: 1px solid #EEEEED
  Padding: 0 20px
  Layout horizontal, align center, space-between:
    Body/Default, Text/Secondary: "Semua jalur Transjakarta"
    Tombol Ghost kecil: Label/Caption, Ocean Blue: "Ganti jalur"

── BOTTOM NAVIGATION BAR ──
  Tab aktif: Peta Jalur
```

---

### SCREEN — PETA JALUR (State: Hasil Pencarian Halte)

State ketika pengguna menggunakan kolom pencarian di header
untuk mencari nama halte atau jalur secara spesifik.

```
Frame: 390 × 844px
Nama frame Figma: Screen/PetaJalur/CariHalte

Struktur layar:

── STATUS BAR iOS (44px) ──

── HEADER SEARCH AKTIF (56px) ──
  Background: Foundation/White Pure (#FFFFFF)
  Border bawah: 1px solid #EEEEED
  Padding: 0 20px
  Layout horizontal, align center, gap 12px:
    Ikon ChevronLeft (20px, Text/Secondary) — kembali
    Input Field (tinggi 40px, state Focused, flex grow):
      Ikon Search (16px, Text/Tertiary) di kiri
      Teks aktif: "Jembatan Besi"
      Trailing: Ikon X (16px, Text/Tertiary) — hapus teks

── HASIL PENCARIAN (scrollable, padding 16px 20px) ──

  Section label: Label/Caption, Text/Tertiary, letter-spacing +0.1px:
    "HALTE & STASIUN"

  Gap: 8px

  ListItem/Navigation (berulang untuk setiap hasil):
    Ikon kiri: CircleDot (20px, warna moda)
    Label: nama halte/stasiun (Body/Default, Text/Primary)
    Sub di bawah label: nama moda + nomor jalur (Micro/Hint, Text/Tertiary)
    Kanan: Ikon ChevronRight (16px, Text/Tertiary)

  Contoh hasil:
    CircleDot merah → "Halte Jembatan Besi"
                       "Transjakarta · 2A, 2B, 3"
    CircleDot merah → "Halte Jembatan Lima"
                       "Transjakarta · 9"

  Gap: 20px

  Section label: "JALUR"

  Gap: 8px

  ListItem/Navigation (hasil jalur):
    Ikon kiri: Route (20px, warna moda)
    Label: kode + nama jalur (Body/Default, Text/Primary)
    Sub: jumlah halte (Micro/Hint, Text/Tertiary)
    Kanan: Ikon ChevronRight (16px, Text/Tertiary)

  Contoh hasil:
    Route merah → "2A — Pulo Gadung → Rawa Buaya"
                   "32 halte"

── BOTTOM NAVIGATION BAR ──
  Tab aktif: Peta Jalur
```

---

### SCREEN — PETA JALUR (State: Jak Lingko / Angkot)

State khusus untuk moda Jak Lingko karena strukturnya berbeda:
Jak Lingko tidak memiliki jalur numerik tetap seperti TJ atau KRL —
melainkan berupa zona layanan dan titik pemberhentian shelter.

```
Frame: 390 × 844px
Nama frame Figma: Screen/PetaJalur/JakLingko

Perbedaan dari layar moda lain:

── CHIP ROW MODA ──
  Chip/ModaSelector - JakLingko (State: Active)

── AREA PETA ──
  Tidak menggunakan polyline tunggal seperti TJ/KRL
  Tampilkan:
    ZONA LAYANAN (area shading):
      Fill semi-transparan #00923F dengan opacity 10%
      Outline: 1px solid #00923F opacity 30%
      Setiap zona memiliki label nama wilayah

    TITIK SHELTER JAK LINGKO:
      Bentuk: persegi dengan sudut rounded (rx 4px), bukan lingkaran
      Ukuran: 12x12px
      Background: #00923F
      Border: 2px solid #FFFFFF
      Ini membedakan secara visual dari halte bus biasa (lingkaran)

── BOTTOM SHEET — DAFTAR ZONA (tinggi 300px) ──
  Handle bar + Heading/H2: "Pilih Area Layanan Jak Lingko"
  Label/Caption, Text/Tertiary: "Ketuk zona di peta atau pilih dari daftar"

  Gap: 12px

  Daftar zona (Card/JalurTransit):
    Strip: hijau #00923F
    Nama zona: "Jakarta Utara — Penjaringan"
    Keterangan: "18 shelter  ·  Rute 1A, 1B, 2C"

    Strip: hijau #00923F
    Nama zona: "Jakarta Selatan — Pasar Minggu"
    Keterangan: "12 shelter  ·  Rute 5A, 5B"

    [dst.]

── POPUP SHELTER JAK LINGKO (Popup/Halte — TipeTransit: Shelter) ──
  Badge: Badge/Transit/JakLingko ("Jak Lingko")
  Nama: "Shelter Jak Lingko Cempaka Mas"
  Sub: "Rute 3B, 4A, 7C tersedia di sini"
  Tombol: [Jadwal] [Rute ke sini]
  Tombol ghost: [Simpan shelter ini]
```

---

## BAGIAN 4 — REVISI PROTOTYPE FLOW

Tambahkan koneksi berikut ke panel Prototype Figma (melengkapi flow yang sudah ada di v2):

```
Tab Peta Jalur (Bottom Nav)
  → Screen/PetaJalur/PilihModa [Dissolve, 200ms]

Screen/PetaJalur/PilihModa
  [Chip moda mana pun] → Screen/PetaJalur/DaftarJalur [Smart Animate, 250ms]
  [Ikon Search di header] → Screen/PetaJalur/CariHalte [Push Up, 250ms]

Screen/PetaJalur/DaftarJalur
  [Card/JalurTransit mana pun] → Screen/PetaJalur/JalurAktif [Smart Animate, 300ms]
  [Chip moda lain] → Screen/PetaJalur/DaftarJalur (moda berbeda) [Smart Animate, 200ms]
  [Chip JakLingko] → Screen/PetaJalur/JakLingko [Smart Animate, 250ms]

Screen/PetaJalur/JalurAktif
  [Titik halte di peta] → Popup/Halte muncul [Push Up, 200ms]
  [Popup → "Jadwal"] → Screen/DetailHalte/Keberangkatan [Push Left, 300ms]
  [Popup → "Rute ke sini"] → Screen/PencarianRute (pre-filled) [Push Up, 300ms]
  [Popup → "Simpan halte"] → Snackbar konfirmasi kecil [Smart Animate]
  [Strip bawah → "Ganti jalur"] → Screen/PetaJalur/DaftarJalur [Push Down, 250ms]
  [Strip atas → ChevronLeft] → Screen/PetaJalur/DaftarJalur [Push Right, 250ms]
  [Ikon ArrowRightLeft] → Screen/PetaJalur/JalurAktif (arah terbalik) [Smart Animate, 200ms]

Screen/PetaJalur/CariHalte
  [Hasil halte diklik] → Screen/PetaJalur/JalurAktif (terpusat ke halte) [Smart Animate, 300ms]
  [Hasil jalur diklik] → Screen/PetaJalur/JalurAktif [Push Left, 300ms]
  [ChevronLeft / batal] → Screen/PetaJalur/PilihModa [Push Right, 250ms]

Screen/PetaJalur/JakLingko
  [Zona di peta / Card zona] → peta zoom ke zona, shelter muncul [Smart Animate, 300ms]
  [Shelter diklik] → Popup/Halte (TipeTransit: Shelter) [Push Up, 200ms]
```

---

## BAGIAN 5 — REVISI NAMING CONVENTION

Tambahkan nama-nama berikut ke konvensi penamaan yang sudah ada di v2:

```
Color Styles (tambahan):
  Transit/Transcity

Components (tambahan):
  Chip/ModaSelector/JakLingko/Inactive
  Chip/ModaSelector/JakLingko/Active
  Chip/ModaSelector/TransJakarta/Inactive
  Chip/ModaSelector/TransJakarta/Active
  Chip/ModaSelector/KRL/Inactive
  Chip/ModaSelector/KRL/Active
  Chip/ModaSelector/MRT/Inactive
  Chip/ModaSelector/MRT/Active
  Chip/ModaSelector/LRT/Inactive
  Chip/ModaSelector/LRT/Active
  Chip/ModaSelector/Transcity/Inactive
  Chip/ModaSelector/Transcity/Active

  Card/JalurTransit/Default
  Card/JalurTransit/Selected
  Card/JalurTransit/Disabled

  Popup/Halte/Stasiun
  Popup/Halte/Halte
  Popup/Halte/Terminal
  Popup/Halte/Shelter

  Strip/JalurAktif

  Badge/Transit/Transcity

Frames / Screens (tambahan):
  Screen/PetaJalur/PilihModa
  Screen/PetaJalur/DaftarJalur
  Screen/PetaJalur/JalurAktif
  Screen/PetaJalur/CariHalte
  Screen/PetaJalur/JakLingko

Nav/BottomBar variants (diperbarui):
  Active Tab: Beranda | Rute | PetaJalur | Tersimpan | Profil
```

---

## BAGIAN 6 — DO'S & DON'TS TAMBAHAN (Khusus Peta Jalur)

### YANG HARUS DILAKUKAN

- Gunakan bentuk visual berbeda untuk membedakan tipe titik transit:
  lingkaran untuk halte/stasiun, persegi rounded untuk shelter Jak Lingko
- Tampilkan warna moda hanya pada polyline jalur dan border titik halte — bukan background peta
- Pastikan polyline jalur memiliki stroke cukup tebal (min 4px) agar terlihat di peta yang sibuk
- Gunakan Chip/ModaSelector (bukan Badge/Transit) untuk elemen pilihan moda — ukurannya
  dirancang untuk touch target minimum 44px
- Munculkan label halte hanya pada zoom level tertentu agar tidak crowded di zoom jauh

### YANG TIDAK BOLEH DILAKUKAN

- Jangan render semua 6 moda sekaligus di peta — terlalu ramai dan melanggar prinsip
  minimal cognitive load untuk komuter yang bergerak
- Jangan gunakan background peta putih murni (#FFFFFF) — gunakan #EEE9E0 agar polyline
  berwarna terlihat kontras tanpa terlalu mencolok
- Jangan tampilkan lebih dari satu jalur aktif di peta dalam waktu bersamaan
- Jangan letakkan tombol zoom/kontrol di area yang terhalang popup halte
- Jangan gunakan emoji atau ikon emoji untuk menandai titik halte di peta

---

*Dokumen ini adalah lanjutan dari LinTas_Figma_Prompt_v2.md*
*LinTas — Navigasi Transit Jakarta*
*Revisi v3 — Fitur Peta Jalur Transit & Penambahan Moda Jak Lingko / Transcity*