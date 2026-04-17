# 🚀 KODEIN School - Onboarding Guide for New Team

Selamat datang di tim pengembang KODEIN School SIS! Ikuti langkah-langkah berikut untuk menyiapkan lingkungan pengembangan di mesin lokal Anda.

## 📋 Persyaratan Sistem
Pastikan Anda sudah menginstall perangkat lunak berikut:
- **Node.js** v22 atau yang terbaru.
- **Docker Desktop** (Opsional, jika ingin menjalankan Postgres via Docker).
- **Git** (Untuk version control).

---

## 🏗️ 1. Setup Backend (Server)

1.  **Masuk ke Folder Backend**:
    `cd backend`

2.  **Install Dependencies**:
    `npm install`

3.  **Konfigurasi Environment (`.env`)**:
    `cp .env.example .env`

4.  **Database & Dummy Data Setup**:
    Pastikan database PostgreSQL Anda sudah menyala, lalu jalankan rangkaian perintah ini:
    `npx prisma db push`
    `npx prisma generate`
    `npm run seed`  <-- **PENTING**: Ini akan mengisi 25+ data untuk mengetes tabel & pagination.

5.  **Jalankan Server Development**:
    `npm run dev` (Kini server menyala dengan data simulasi yang lengkap).

---

## 🎨 2. Setup Frontend (Client)

1.  **Masuk ke Folder Frontend**:
    `cd frontend`

2.  **Install Dependencies**:
    `npm install`

3.  **Konfigurasi Environment (`.env`)**:
    `cp .env.example .env`

4.  **Jalankan Frontend Dev**:
    `npm run dev`

---

## 🛠️ 3. Workflow Pengembangan (Wajib Dipahami)

### 🔍 Search & Pagination Pattern
Semua modul wajib menggunakan pola `/search`. Data dummy hasil seeding di atas dirancang untuk mengetes apakah pagination Anda berfungsi (berpindah halaman 1, 2, dsb).

### ✅ Melakukan Build Test
Gunakan perintah ini untuk memastikan tidak ada error TypeScript sebelum melakukan push:
`npm run build`

---

## 🆘 Butuh Bantuan?
Gunakan kredensial berikut untuk login pertama kali:
- **Email**: `mentor@kodein.com` atau `scholar1@kodein.com` sampai `scholar25@kodein.com`
- **Password**: `password123`
