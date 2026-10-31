# Security & Data Privacy Guidelines
## Mirsharai School and College (মিরসরাই স্কুল এন্ড কলেজ)

### 1. Server-Side Authorization & RBAC
- All dashboard routes (`/[locale]/admin/*`, `/[locale]/super-admin/*`, `/[locale]/teacher/*`, etc.) require valid session tokens.
- Authentication state is verified server-side using secure HTTP-only cookies (`msc_auth_session`).
- Role verification ensures students cannot access admin dashboards, parents can only view their own linked children, and staff cannot escalate privileges.

### 2. Password & Credential Security
- Passwords are encrypted using salted bcrypt hashing (`bcryptjs` with salt factor 10).
- Plaintext passwords are never stored in databases or log streams.
- Public self-registration for administrative roles is prohibited. Accounts are provisioned exclusively by authorized institution admins.

### 3. Student Personal Data Privacy
- Student phone numbers, home addresses, emergency guardian contacts, and birth records are restricted to authorized school personnel.
- Unpublished results and examination mark entries are hidden from public queries.

### 4. Financial & Payment Transaction Security
- Idempotent payment processing ensures duplicate gateway callbacks cannot result in double posting.
- Transactions are executed inside ACID database transactions (`prisma.$transaction`).
- Bank card numbers, CVVs, and mobile banking PINs are never handled or stored on the school application servers.

### 5. Audit Logging
- Critical security and financial operations (logins, logouts, marks updates, admission approvals, fee receipts) are permanently recorded in the `AuditLog` table with user IDs, action names, entity IDs, and timestamps.
