# Database Design & Architecture
## Mirsharai School and College (মিরসরাই স্কুল এন্ড কলেজ)

### Schema Overview
The database uses a normalized relational architecture managed via Prisma ORM.

```
                      +-------------------+
                      |   SchoolSetting   |
                      +-------------------+
                                |
       +------------------------+------------------------+
       |                        |                        |
+--------------+        +---------------+        +---------------+
|     User     |        |AcademicSession|        |    Notice     |
+--------------+        +---------------+        +---------------+
       |                        |                        |
       +------------+-----------+                        |
       |            |           |                        |
+--------------+ +------+ +-----------+          +---------------+
|    Staff     | |Class | |  Invoice  |          | AcademicEvent |
+--------------+ +------+ +-----------+          +---------------+
       |            |           |
       |         +------+ +-----------+
       |         |Section | Payment   |
       |         +------+ +-----------+
       |            |
+--------------+ +------+
|   Student    | |Routine
+--------------+ +------+
       |
+--------------+
|     Mark     |
+--------------+
```

### Key Models

1. **User (Authentication & RBAC):**
   - `id`, `username`, `email`, `passwordHash`, `role` (`SUPER_ADMIN`, `ADMIN`, `TEACHER`, `STUDENT`, `PARENT`, `ACCOUNTANT`, `STAFF`), `isActive`.

2. **Class (1 to 12) & Section:**
   - Supports 12 distinct educational levels:
     - Primary: 1 to 5
     - Junior: 6 to 8
     - Secondary: 9 to 10
     - Higher Secondary College: 11 to 12
   - Section with capacity, room assignment, and group allocation (`SCIENCE`, `HUMANITIES`, `BUSINESS_STUDIES`, `GENERAL`).

3. **Student & Guardian:**
   - Stable internal IDs (`MSC-2026-XXXX`).
   - Roll number, admission number, Bangla and English names, gender, DOB, emergency contacts.
   - Guardian relationships via `StudentGuardian` junction table.

4. **Examinations & Grading:**
   - `Exam`: Term, Half-Yearly, Annual.
   - `ExamSchedule`: Date, start/end time, room number.
   - `Mark`: Written, MCQ, Practical, Total, Letter Grade (A+, A, A-, B, C, D, F), GPA (0.0 to 5.0).

5. **Fees & Payments:**
   - `FeeCategory`: Tuition, Exam, Laboratory, Library, Session fees.
   - `Invoice` & `InvoiceItem`: Invoicing per student and session with due tracking.
   - `PaymentAttempt` & `Payment`: Transaction verification, receipt numbers (`RCT-YYYYMMDD-XXXX`), and gateway records.

6. **General Ledger & Double-Entry Accounting:**
   - `Account`, `JournalEntry`, `JournalLine`, `BankAccount`, and `Expense` vouchers.
