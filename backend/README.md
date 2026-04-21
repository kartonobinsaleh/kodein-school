# 🏫 KODEIN School - SIS Backend API

REST API untuk sistem administrasi sekolah (School Information System) KODEIN School. Dibangun dengan memprioritaskan arsitektur yang modular, *type-safe*, dan skalabel.

## 🛠 Tech Stack

- **Runtime:** Node.js v22+
- **Framework:** Express.js + TypeScript
- **Database:** PostgreSQL (berbasis *Neon DB* / Local Postgres)
- **ORM:** Prisma v7
- **Validation:** Zod
- **Logging:** Winston + Morgan
- **Auth:** JWT (JSON Web Tokens) & Bcrypt

---

## 🚀 Quick Start (Development)

### 1. Prerequisites
Pastikan Anda sudah menginstall **Node.js** dan memiliki akses/koneksi ke database **PostgreSQL**.

### 2. Instalasi
```bash
npm install
```

### 3. Environment Variables
Copy template `.env.example` ke `.env`:
```bash
cp .env.example .env
```
Isi nilai `.env` dengan kredensial database Anda (Sangat disarankan menggunakan port `4000` agar tidak bentrok dengan frontend Next.js di `3000`).

### 4. Database Setup (Prisma & Seeding)
Jika ini adalah pertama kali Anda mengatur *project*, lakukan migrasi schema ke database, men-generate client, lalu mengisi data dummy:
```bash
# Untuk sinkronisasi schema dan membuat file migration (Disarankan)
npx prisma migrate dev --name init

# ATAU jika hanya ingin push schema tanpa file migration (Prototyping)
npx prisma db push

npx prisma generate
npm run seed
```
*Note: `migrate dev` akan membuat folder `prisma/migrations` untuk melacak perubahan database secara terstruktur. Script seed akan menghapus data lama dan membuat 25+ record baru.*

### 5. Jalankan Server!
```bash
npm run dev
```
Server akan menyala di `http://localhost:4000` (tergantung `.env` Anda). \
Gunakan Endpoint uji coba: `GET http://localhost:4000/health`

---

## 🏗️ Architecture Guidelines (Strict!)

Project ini mutlak **wajib** mengikuti struktur *Layered Architecture* berikut sesuai urutan ke bawah. Dilarang keras melakukan *Layer Skipping*!

1. **Route (`*.route.ts`)**: Mendefinisikan URL/Path, menerima *Middleware Authentication/RBAC*, dan mengarahkan ke Controller.
2. **Controller (`*.controller.ts`)**: Fokus menangani Request (params, body), mengirim format Response HTTP standar, dan melempar *Error Handler*.
3. **Service (`*.service.ts`)**: **Pusat Logika Bisnis & Otorisasi.** Validasi logic kompleks dan pengolahan data sebelum masuk ke DB.
4. **Repository (`*.repository.ts`)**: Satu-satunya layer yang boleh menyentuh `prisma`.
5. **Schema (`*.schema.ts`)**: Definisi Zod untuk validasi data.

### 🔍 Standardisasi Search & Pagination
Semua modul yang memiliki tampilan daftar (Tabel/Grid) **WAJIB** memisahkan endpoint pengambilan data menjadi dua kategori:

1.  **`GET /` (Full List)**: Mengambil seluruh data tanpa batasan (biasanya untuk kebutuhan *Dropdown*/*Select Option*).
2.  **`GET /search` (Paginated Search)**: Menggunakan query params `search`, `page`, dan `limit`. Endpoint ini wajib mengembalikan objek `meta`.

**Contoh Response `/search` Standar:**
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15
  }
}
```

---

## 🔐 Role-Based & Ownership Access Control (OBAC)
- Autentikasi dilakukan via JWT HTTP Bearer Header.
- **RBAC**: Middleware otorisasi membatasi *endpoint* berdasar role (Admin, Mentor, Student).
- **Service OBAC**: Di level `Service`, terdapat perlindungan *Ownership*. Sebuah API Endpoint diperbolehkan (tanpa terblokir 403 Forbidden) **TETAPI** service menolak memodifikasi sesuatu yang bukan mutlak milik pengguna.
