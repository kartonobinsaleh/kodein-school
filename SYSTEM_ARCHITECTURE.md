# 🏢 KODEIN School - System Architecture & Flow

Dokumen ini menjelaskan struktur pengguna, wewenang, dan alur kerja aplikasi School Information System (SIS).

## 👥 User Personas

| Role | Deskripsi | Tanggung Jawab Utama |
| :--- | :--- | :--- |
| **ADMIN** | Pengelola Sistem | Manajemen User, Kelas, Subjek, dan Kursus. |
| **MENTOR** | Pengajar / Coach | Membuat Aktivitas, Penilaian, dan Absensi. |
| **STUDENT** | Peserta Didik | Mengikuti Kursus dan mengumpulkan Tugas. |

---

## 🏗️ Technical Layer Architecture

Aplikasi ini menggunakan standar **Layered Architecture** untuk memastikan kode mudah dirawat:

1.  **Frontend (React + Vite)**:
    *   `modules/`: Berisi fitur per kategori (Student, Course, dsb).
    *   `hooks/`: Mengelola state data menggunakan React Query.
    *   `components/ui/`: Komponen UI premium yang reusable.

2.  **Backend (Express + Prisma)**:
    *   `Route`: Gerbang masuk API (Validasi Token).
    *   `Controller`: Menangani input Request.
    *   `Service`: **Pusat Logika Bisnis** (Validasi aturan main).
    *   `Repository`: Interaksi langsung dengan Database (Prisma).

---

## 🔄 Core Workflows

### 1. Siklus Akademik
- **Setup**: Admin membuat `Subject` -> Admin membuat `Course` dan menunjuk `Mentor`.
- **Eksplorasi**: Mentor membuat `Activity` (Tugas/Proyek) di dalam `Course`.
- **Interaksi**: Siswa mengerjakan Aktivitas dan membuat `Submission`.
- **Evaluasi**: Mentor menilai `Submission` dan memasukkan `Grade` akhir.

### 2. Standar Pencarian (Search & Pagination)
- Seluruh pengambilan data untuk tabel melalui endpoint `/search`.
- Metadata (Total, Page, limit) dikelola dari server untuk kecepatan akses.

### 3. Keamanan & Otorisasi
- **RBAC (Role Based)**: Membatasi akses menu berdasarkan Role di Frontend & Backend.
- **OBAC (Ownership Based)**: Mencegah Mentor A mengubah data milik Mentor B (Ownership check di tingkat Service).

---

## 🛠️ Tech Stack Recap
- **Frontend**: React, Tailwind CSS, Lucide Icons, React Query, Zustand.
- **Backend**: Node.js, TypeScript, Express, Prisma ORM, PostgreSQL.
- **Tools**: Git, Docker, JWT, Bcrypt.
