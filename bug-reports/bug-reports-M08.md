# Bug Reports — M-08: Navigation

---

## BUG-006

| Field | Value |
|---|---|
| **Bug ID** | BUG-006 |
| **Title** | [Navigation] Tripadvisor Travelers' Choice badge shows 2024 on all non-English language versions instead of 2025 |
| **Severity** | Minor |
| **Priority** | Medium |
| **Environment** | Chrome 147, Windows 11, 1920×1080, all language versions of `https://daytrip.com` |
| **Module** | M-08 |
| **Preconditions** | User is on any page of daytrip.com |
| **Steps to Reproduce** | 1. Navigate to `https://daytrip.com/en/transfers` 2. Observe Tripadvisor badge in hero section — shows "Tripadvisor Travelers' Choice 2025" 3. Scroll to footer, click "Spanish (ES)" in language switcher 4. Observe Tripadvisor badge — shows "Elección de los viajeros de Tripadvisor 2024" 5. Repeat for all other non-English languages: DE `/de`, FR `/fr`, ZH `/zh`, SV `/sv`, KO `/ko`, PT `/pt` |
| **Expected Result** | Tripadvisor Travelers' Choice badge should display the same year (2025) consistently across all 8 language versions of the site, as Daytrip holds the 2025 award |
| **Actual Result** | Tripadvisor badge shows **2025** only on the English (US) version (`/en`). All 7 other language versions display **2024**: Spanish (`/es`), French (`/fr`), Chinese (`/zh`), Swedish (`/sv`), Korean (`/ko`), Portuguese (`/pt`), German (`/de`). The localized content for this badge is one year behind. |
| **Affected URLs** | `daytrip.com/es`, `daytrip.com/fr`, `daytrip.com/zh`, `daytrip.com/sv`, `daytrip.com/ko`, `daytrip.com/pt`, `daytrip.com/de` |
| **Reproducibility** | Always |
| **Screenshot / Video** | See TC-M08-010 — screenshots of ES, FR, ZH, SV, KO, PT language versions showing 2024 badge |
| **Workaround** | None — users browsing in non-English languages see outdated award information |
| **Status** | Open |
| **Found Date** | 2026-04-27 |
| **Found By** | Pavel Gribovskiy |
