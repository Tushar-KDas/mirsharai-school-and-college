# Development Plan & Implementation Matrix
## Mirsharai School and College (মিরসরাই স্কুল এন্ড কলেজ)

### Phase 1: Architecture & Institutional Identity
- [x] Defined single-institution ERP configuration (Classes 1–12, Not SaaS).
- [x] Created Institution profile: Mirsharai School and College, EIIN 104523, estd 1972, Mirsharai, Chattogram, Bangladesh.
- [x] Established Theme: Primary Navy `#12315A`, Primary Blue `#2563EB`, Success `#16A34A`, Background `#F8FAFC`.

### Phase 2: Bilingual Foundation (i18n)
- [x] Implemented Next.js App Router dynamic locale structure `/[locale]/...` (`bn` / `en`).
- [x] Configured translation namespaces in `src/messages/bn.json` and `src/messages/en.json`.
- [x] Developed visible Language Switcher preserving subpath, queries, and auth state.
- [x] Added Bengali numeral conversion (`১২৩৪` <-> `1234`) and BDT currency formatting (`৳ ১,৫০০.০০` / `BDT 1,500.00`).

### Phase 3: Database & ORM
- [x] Configured Prisma schema covering: User, AcademicSession, Class (1 to 12), Section, Subject, Staff, Student, Guardian, Routine, Attendance, Exam, ExamSchedule, Mark, FeeCategory, Invoice, Payment, Expense, Notice, Event, Gallery, Download, SchoolSetting, AuditLog.
- [x] Generated Prisma client and synced SQLite dev database.
- [x] Authored robust seeding script `scripts/seed.mjs` with demo data for all 7 roles.

### Phase 4: Authentication & Strict RBAC
- [x] Session-based cookie auth with bcrypt password encryption.
- [x] Support login by username, email, employeeId, or studentId.
- [x] Unauthenticated dashboard route protection redirecting to `/[locale]/login`.
- [x] Server-side role verification mapping users to authorized dashboards.

### Phase 5: Role Dashboards
- [x] **Super Admin Dashboard:** System status, user distribution, settings, audit logs.
- [x] **Admin Dashboard:** Total stats, attendance trends, recent activities, fee progress, upcoming exams.
- [x] **Teacher Dashboard:** Assigned classes, daily routine, attendance status, notice board.
- [x] **Student Dashboard:** Profile summary, attendance %, GPA, due fees, interactive fee payment.
- [x] **Parent Dashboard:** Linked child progress, attendance, results, online fee payment.
- [x] **Accountant Dashboard:** Collections, dues, expense vouchers, bank account balances.
- [x] **Staff Dashboard:** Assigned tasks, daily attendance, leave balance.

### Phase 6: Online Fee Payment & Receipts
- [x] Payment adapter supporting bKash, Nagad, Rocket, and Cards/SSLCOMMERZ.
- [x] Server-side transaction processing with unique TrxID generation and invoice recalculation.
- [x] Printable official Money Receipt with student details, itemized breakdown, and institutional seal.

### Phase 7: Public Website & CMS
- [x] Home Page with Announcement bar, Hero banner with campus photo, 4 feature pills, Latest Notices, Our Facilities, Upcoming Events, Photo Gallery, Footer.
- [x] Subpages: About, Principal's Message, Mission & Vision, Academics, Classes 1-12, Teachers, Admission Info, Online Admission Application Form, Notices, Exams, Results, Events, Gallery, Downloads, Contact, Privacy, Terms.
