# Quality Assurance & Testing Suite
## Mirsharai School and College (মিরসরাই স্কুল এন্ড কলেজ)

### 1. Test Execution
Automated unit, integration, and formatting tests are executed using Vitest:
```bash
npm run test
```

### 2. Covered Test Scenarios
- **Grading & GPA Calculations:**
  - Standard Bangladesh Secondary & Higher Secondary Education Board 7-point scale:
    - 80-100: A+ (5.0)
    - 70-79: A (4.0)
    - 60-69: A- (3.5)
    - 50-59: B (3.0)
    - 40-49: C (2.0)
    - 33-39: D (1.0)
    - 0-32: F (0.0)
- **Localization Utilities:**
  - Numeral conversion (`12345` -> `১২৩৪৫`).
  - BDT currency formatting for both `bn` and `en`.
  - Locale route path switcher idempotency.
- **Translation Dictionaries:**
  - Verifies presence of institution names, navigation labels, and fee actions across `bn.json` and `en.json`.
