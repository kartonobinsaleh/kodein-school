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

### 4. Database Setup (Prisma)
Jika ini adalah pertama kali Anda mengatur *project*, wajib mereplikasi schema ke database agar tabel terbentuk, dilanjut dengan men-generate Prisma Client:
```bash
npx prisma db push
npx prisma generate
```

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
2. **Controller (`*.controller.ts`)**: Hanya fokus menangani Request (params, body) dari klien, mengirim `req.user` JWT Payload yang telah tervalidasi, mengembalikan format Response HTTP standar, dan melempar *Error Handler*. Tidak ada logika bisnis di sini.
3. **Service (`*.service.ts`)**: **Pusat Logika Bisnis & Otorisasi Hak Milik (Ownership).** Memvalidasi logic kompleks (seperti: "Apakah Mentor XYZ punga wewenang atas Course ini?"). *Tidak boleh sedikitpun memanggil Prisma/Database secara langsung.*
4. **Repository (`*.repository.ts`)**: Satu-satunya lapisan/layer yang boleh mengimport dan menyentuh `prisma`. Merangkai interaksi ke tabel PostgreSQL secara performan (misal: join relasi).
5. **Schema (`*.schema.ts`)**: Menyimpan definisi Zod untuk validasi `body` dari luar.

## 🔐 Role-Based & Ownership Access Control (OBAC)
- Autentikasi dilakukan via JWT HTTP Bearer Header.
- **RBAC**: Middleware otorisasi bisa membatasi *endpoint* murni berdasar role (Admin, Mentor, Student).
- **Service OBAC**: Di level `Service`, terdapat perlindungan *Ownership*. Sebuah API Endpoint diperbolehkan (tanpa terblokir 403 Forbidden) **TETAPI** service menolak memodifikasi sesuatu yang bukan mutlak milik pengguna (Contoh: Mentor A tidak bisa mengubah Nilai dari jadwal/pelajaran milik Mentor B).
