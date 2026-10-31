# Bilingual Localization & i18n Architecture
## Mirsharai School and College (মিরসরাই স্কুল এন্ড কলেজ)

### 1. Supported Locales
- **Bangla (`bn`):** Default locale for public website and administrative portals.
- **English (`en`):** Full parallel locale for all public and dashboard views.

### 2. Route Organization
- Root Route (`/`) dynamically redirects visitors to `/bn` or the user's stored locale preference cookie (`NEXT_LOCALE`).
- All pages and dashboards are namespaced under `/[locale]`:
  - Public Website: `/[locale]/`, `/[locale]/about`, `/[locale]/notices`, etc.
  - Dashboards: `/[locale]/admin/dashboard`, `/[locale]/student/dashboard`, etc.

### 3. Number, Currency & Date Formatting
- **Bengali Numerals:** Automatically transforms ASCII digits into Bengali glyphs (`0-9` -> `০-৯`) when viewing in `bn` mode.
- **Currency:** Consistently formats Bangladeshi Taka (`৳ ১,৫০০.০০` in Bangla and `BDT 1,500.00` in English).
- **Bangladesh Dates:** Formats dates in both Bengali month names (e.g. `২৯ অক্টোবর ২০২৬`) and English (e.g. `29 October 2026`).

### 4. Language Switcher
The language switcher (`বাংলা | English`) is permanently visible across headers and dashboards. Switching languages preserves:
- The user's active subpath.
- Query parameters.
- User authentication and session state.
