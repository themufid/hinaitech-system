# HEROIC OS - Setup & Testing Guide

## 🚀 Quick Start

Aplikasi sudah siap untuk dijalankan. Ikuti langkah-langkah berikut:

### 1. Start Development Server

```bash
pnpm dev
```

Server akan berjalan di `http://localhost:3000`

### 2. Halaman yang Tersedia

#### Auth Pages (Tanpa Login Required)
- **Login**: `http://localhost:3000/auth/login`
- **Sign Up**: `http://localhost:3000/auth/sign-up`
- **Error Page**: `http://localhost:3000/auth/error`

#### Dashboard Pages (Memerlukan Login)
- **Dashboard**: `http://localhost:3000/dashboard` - Main dashboard with overview
- **Company**: `http://localhost:3000/dashboard/company` - Company management
- **Services**: `http://localhost:3000/dashboard/services` - Service offerings
- **Leads**: `http://localhost:3000/dashboard/leads` - Sales pipeline
- **Sales**: `http://localhost:3000/dashboard/sales` - Quotations & invoices
- **Clients**: `http://localhost:3000/dashboard/clients` - Client management
- **Projects**: `http://localhost:3000/dashboard/projects` - Project tracking
- **Finance**: `http://localhost:3000/dashboard/finance` - Income & expense tracking
- **Content**: `http://localhost:3000/dashboard/content` - Content calendar
- **Settings**: `http://localhost:3000/dashboard/settings` - User settings & password change

## 🔐 Authentication Flow

### Signup
1. Buka `http://localhost:3000/auth/sign-up`
2. Masukkan email dan password
3. Setelah signup berhasil, Anda akan redirect ke dashboard
4. Profil akan otomatis dibuat di database

### Login
1. Buka `http://localhost:3000/auth/login`
2. Masukkan email dan password yang sudah didaftar
3. Sistem akan redirect ke dashboard otomatis setelah login berhasil

## 🔑 Edit Password

Untuk mengubah password akun Anda:

1. Login ke aplikasi
2. Klik menu **Settings** di sidebar
3. Di halaman Settings, Anda akan melihat form "Change Password"
4. Masukkan:
   - **Current Password**: Password saat ini Anda
   - **New Password**: Password baru yang ingin digunakan
   - **Confirm New Password**: Konfirmasi password baru
5. Klik tombol "Update Password"
6. Sistem akan memberikan feedback jika perubahan berhasil atau ada error

### Password Requirements
- Minimal 8 karakter
- Password baru harus berbeda dengan password lama
- Harus di-confirm dengan memasukkan password baru 2x

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#00d4ff) - untuk main actions
- **Secondary**: Purple (#7c3aed) - untuk secondary actions
- **Background**: Dark (#0a0e27) - futuristic dark theme
- **Foreground**: Light Gray (#e0e6ff) - untuk text

### Responsive Design
Aplikasi sudah fully responsive untuk:
- Desktop (1920px dan lebih)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 📊 Module Overview

### ✅ Implemented Modules

1. **Company Management** - Full CRUD untuk company profiles
2. **Services & Leads** - Service offerings dengan sales pipeline kanban
3. **Sales & Contracts** - Quotations, invoices, dan contracts
4. **Clients** - Client relationship management
5. **Projects** - Project tracking dan task management
6. **Finance** - Income/expense tracking
7. **Content** - Content calendar untuk multi-platform
8. **Settings** - User profile dan password management

### 🔄 API Structure

Semua API routes tersedia di `/app/api/`:
- `/api/companies` - Company CRUD
- `/api/services` - Services CRUD
- `/api/leads` - Leads CRUD
- `/api/quotations` - Quotations CRUD
- `/api/invoices` - Invoices CRUD
- `/api/contracts` - Contracts CRUD
- `/api/clients` - Clients CRUD
- `/api/projects` - Projects CRUD
- `/api/transactions` - Finance transactions
- `/api/content` - Content calendar

## 🔐 Security Features

- ✅ Row Level Security (RLS) di database
- ✅ Session management via Supabase Auth
- ✅ Protected routes dengan middleware
- ✅ CSRF protection
- ✅ Secure password hashing
- ✅ User isolation - pengguna hanya bisa akses data miliknya

## 📝 Environment Variables

Aplikasi memerlukan environment variables dari Supabase:
- `NEXT_PUBLIC_SUPABASE_URL` - URL Supabase project
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anonymous API key

Env vars sudah di-set melalui Vercel project settings.

## 🐛 Troubleshooting

### Dashboard Shows 404
- Pastikan Anda sudah login
- Check browser console untuk error messages
- Refresh halaman (Ctrl+R)

### Login/Signup Not Working
- Pastikan environment variables sudah di-set
- Check Supabase project status
- Verifikasi email format yang valid

### Password Change Not Working
- Pastikan Anda login terlebih dahulu
- Current password harus correct
- New password harus minimal 8 karakter

## 📚 Tech Stack

- **Frontend**: Next.js 16 dengan React 19
- **Styling**: Tailwind CSS v4 dengan shadcn/ui components
- **Auth**: Supabase Authentication
- **Database**: Supabase PostgreSQL dengan RLS
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form dengan Zod validation

## 🚀 Next Steps

Aplikasi sudah siap untuk:
1. Testing semua authentication flows
2. Testing semua dashboard pages
3. Testing API endpoints
4. Deploy ke production via Vercel

---

**Notes**:
- Middleware warning tentang ".middleware" bisa diabaikan - masih supported
- Turbopack enabled untuk development yang lebih cepat
- TypeScript strict mode disabled untuk development yang lebih flexible
