# Mirsharai School and College (মিরসরাই স্কুল এন্ড কলেজ)
## Complete School & College Management Web Application (Class 1–12)
### Bilingual Bangla + English | Single Institution Educational ERP (NOT SaaS)
**Location:** Mirsharai, Chattogram, Bangladesh (মিরসরাই, চট্টগ্রাম, বাংলাদেশ)  
**EIIN:** 104523 | **College Code:** 3201 | **Established:** 1972  

---

## 🏛️ Project Overview

**Mirsharai School and College Management Web Application** is a comprehensive, production-ready, fully bilingual (Bangla & English) educational institution ERP and public portal designed specifically for a single institution in Bangladesh covering **Classes 1 through 12** across Primary, Junior, Secondary (SSC), and Higher Secondary College (HSC) sections.

### Key Capabilities:
- **Public Portal:** Bilingual modern website with announcement banner, campus hero, facilities, dynamic notices, events, gallery, downloads, curriculum, faculty directory, and online admission.
- **7 Separate Role Dashboards:**
  1. **Super Admin Dashboard:** System health, role-based access control, institutional settings, audit logs, and backups.
  2. **Admin Dashboard:** Student registration, online admission review, teachers & staff directories, class/section/routine setup, attendance, exams, results, fee overviews.
  3. **Teacher Dashboard:** Assigned classes, daily routine, attendance taking, marks entry, and academic notices.
  4. **Student Dashboard:** Student profile, class routine, attendance rates, exam results with GPA/grades, fee invoices, online payment, and receipt printing.
  5. **Parent / Guardian Portal:** Linked child switcher, academic progress, child's attendance & results, fee dues, and online fee payment.
  6. **Accountant Portal:** Fee collections, automated invoices, payment reconciliation, expenses, and cashbook general ledger.
  7. **Staff Portal:** Assigned duties, daily attendance, leave requests, and administrative circulars.
- **Bilingual i18n Foundation:**
  - Full translations for all menus, forms, badges, modals, receipts, and system alerts (`bn` / `en`).
  - Seamless language switcher preserving routes and query parameters.
  - Localized dates (Bangladesh calendar format), numerals (`১২৩৪` / `1234`), and currency (`৳ ১,৫০০.০০` / `BDT 1,500.00`).
- **Online Fee Payment Engine:**
  - Automated invoice generation with due tracking.
  - Multi-provider gateway support (bKash, Nagad, Rocket, Cards/SSLCOMMERZ).
  - Server-side idempotent payment verification.
  - Printable official money receipts with verifiable Transaction IDs and institution crest.
- **Academic & Grading Engine:**
  - Official Bangladesh Board standard grading system (A+, A, A-, B, C, D, F) and GPA calculation (up to 5.00).

---

## 🔐 Demo Accounts & Credentials

All test accounts share the default development password: **`msc123456`**

| Role | Username / Identifier | Default Password | Access Dashboard Route |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin` | `msc123456` | `/bn/super-admin/dashboard` |
| **Admin** | `admin` | `msc123456` | `/bn/admin/dashboard` |
| **Teacher** | `teacher` | `msc123456` | `/bn/teacher/dashboard` |
| **Student** | `student` *(or `MSC-2026-1001`)* | `msc123456` | `/bn/student/dashboard` |
| **Parent** | `parent` | `msc123456` | `/bn/parent/dashboard` |
| **Accountant** | `accountant` | `msc123456` | `/bn/accountant/dashboard` |
| **Staff** | `staff` | `msc123456` | `/bn/staff/dashboard` |

> *Note: The login page includes quick one-click role selector buttons to instantly test any portal.*

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js v18+ or v20+
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
cd mirsharai-school-and-college

# Install dependencies
npm install
```

### 3. Environment Variables Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Database Initialization & Seeding
```bash
# Push Prisma schema to SQLite database (dev.db)
npm run prisma:push

# Seed comprehensive demo data (Classes 1-12, users, routines, fees, exams)
npm run prisma:seed
```

### 5. Running the Application
```bash
# Start Next.js development server on port 3000
npm run dev

# Or build and run in production mode
npm run build
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 6. Running Automated Tests
```bash
npm run test
```

---

## 🛠️ Technology Stack
- **Framework:** Next.js 15 (App Router with `/[locale]` bilingual routing)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with Custom Institution Theme (#12315A Navy & #2563EB Blue)
- **Icons:** Lucide React
- **Database & ORM:** SQLite / PostgreSQL with Prisma 6
- **Authentication:** Secure session cookie with bcrypt password hashing & server-side RBAC
- **Validation:** Zod schemas
- **Testing:** Vitest
