# Online Payment Integration & Gateway Architecture
## Mirsharai School and College (মিরসরাই স্কুল এন্ড কলেজ)

### 1. Supported Payment Gateways
The institution's fee collection system is integrated with the leading payment channels in Bangladesh:
- **bKash** (bKash Payment Gateway / Merchant Checkout)
- **Nagad** (Nagad Merchant Direct API)
- **Rocket** (DBBL Mobile Banking)
- **Cards & Internet Banking** (SSLCOMMERZ / Bank Cards)

### 2. Payment Lifecycle & Idempotency
```
[User Selects Invoice] 
         │
         ▼
[Server Calculates Payable Amount] 
         │
         ▼
[Initiates Payment Transaction] 
         │
         ▼
[User Authenticates via Gateway (Sandbox / Live)]
         │
         ▼
[Server-Side Callback Verification]
         │
         ▼
[ACID DB Transaction: Post Payment + Update Invoice Status]
         │
         ▼
[Generate Official Printable Money Receipt (RCT-YYYYMMDD-XXXX)]
```

### 3. Sandbox / Testing Configuration
In development and staging, simulated sandbox endpoints verify payments safely without actual financial deductions:
- Test Accounts: Any student or parent account (e.g. `student` / `msc123456`).
- Test Numbers: Any valid 11-digit Bangladeshi mobile number (e.g. `01819998877`).
- Receipt Generation: Upon confirmation, an official PDF-ready money receipt is displayed with student details, transaction ID, and digital stamp.
