# CHANGELOG — Daytrip QA Portfolio Project

All key decisions and changes across project phases.

---

## [Phase 5] — 2026-05-08 — Performance Testing (Lighthouse CLI)

### Artifacts
- `performance/lighthouse-homepage.json` — Lighthouse JSON report (homepage)
- `performance/lighthouse-route-page.json` — Lighthouse JSON report (route page)
- `performance/lighthouse-homepage.html` — Lighthouse HTML report (visual)
- `performance/lighthouse-report.md` — performance analysis

### Results
| Page | Performance Score | LCP | CLS |
|---|---|---|---|
| Homepage (`/en/transfers`) | 44 / 100 | 17,682ms | 0 |
| Route page (Prague→Vienna) | 41 / 100 | 8,223ms | 0 |

### Key Decisions
- Lighthouse CLI v13.3.0, headless Chrome, no network throttling
- CLS = 0 on both pages — layout is fully stable
- Low Performance Score expected for Next.js SPA with 26 third-party technologies (GA4, GTM, Klaviyo, LiveAgent, SpeedCurve)
- For accurate field data, PageSpeed Insights (CrUX) is recommended

---

## [Phase 4] — 2026-05-07 — Automation (Playwright + TypeScript + Allure)

### Stack
- Playwright + TypeScript + Allure Reporter
- Page Object Model (POM)
- Node.js v24.15.0

### Artifacts
- `tests/e2e/pages/HomePage.ts` — Page Object for the homepage
- `tests/e2e/search.spec.ts` — 5 UI automated tests (M-01)
- `tests/e2e/navigation.spec.ts` — 3 UI automated tests (M-08)
- `tests/e2e/api/graphql.spec.ts` — 2 API automated tests (GraphQL)
- `tests/playwright.config.ts` — configuration (Chromium + Firefox, Allure reporter)

### Results
- **10/10 passed**, 0 failed
- Execution time: ~30 seconds (UI) + ~1.7 seconds (API)
- Allure report: 100% pass rate, all tests documented

### Key Decisions and Debugging Findings
- Cookie banner handled via `acceptCookiesIfPresent()` with `try/catch` — banner only appears on first visit
- Date field locator: `getByRole('button', { name: 'Departure' })`, not an input with placeholder — discovered via Playwright Inspector (`npx playwright codegen`)
- Date selected by aria-label: `getByRole('button', { name: 'Saturday, June 6,' })` — each calendar date is a button with a full name
- After date selection, calendar closed via `Escape` + `waitForTimeout(500)` — without this the calendar overlapped the Search button
- Autocomplete: `waitForTimeout(1000)` after `fill()` required for dropdown options to load
- Logo locator: `page.locator('header a').first()` — direct text search for "daytrip" matched third-party links (Tripadvisor review)
- API tests via Playwright request context run without a browser: 128ms vs 7–8s for UI tests

### Covered Scenarios
| ID | Test | Module | Type |
|---|---|---|---|
| TC-AUTO-001 | Homepage loads and search form is visible | M-01 | UI — Positive |
| TC-AUTO-002 | Search Prague to Vienna returns results | M-01 | UI — E2E |
| TC-AUTO-003 | Empty form shows validation — Search blocked | M-01 | UI — Negative |
| TC-AUTO-004 | Swap button swaps From and To cities | M-01 | UI — Positive |
| TC-AUTO-005 | Transfers and By the hour tabs are visible | M-01 | UI — Positive |
| TC-AUTO-006 | Header logo navigates to homepage | M-08 | UI — Navigation |
| TC-AUTO-007 | Sign in button opens Find my booking modal | M-08 | UI — Positive |
| TC-AUTO-008 | Language switcher is visible in footer | M-08 | UI — Positive |
| TC-API-AUTO-001 | Valid city search returns results | API | API — Positive |
| TC-API-AUTO-002 | XSS payload in search string is handled safely | API | API — Security |

---

## [Phase 3] — 2026-05-04 — API Testing (Postman + GraphQL)

### Artifacts
- `postman/daytrip-collection.json` — Postman collection (6 requests, 22 assertions)
- `postman/daytrip-environment.json` — Environment variables
- `bug-reports/bug-reports-API.md` — BUG-007, BUG-008
- `docs/api-test-report.md` — full report

### Results
- 6 requests / 22 assertions / 22 passed / 0 failed
- 2 bugs found: BUG-007 (no server-side date validation), BUG-008 (invalid coordinates return `offers:[null]`)

### Key Decisions
- API is GraphQL (not REST), endpoint: `https://api.mydaytrip.com/graphql`
- Both bugs are undetectable through UI — demonstrates the value of API testing as a separate layer

---

## [Phase 2] — 2026-04-26 → 2026-05-03 — Manual Testing

### Test Cases Written and Executed

**M-01: Search — City-to-City Transfer (26 test cases):**
- 24 Pass, 2 Fail (updated expected results — not product defects)
- TC-M01-006: Autocomplete triggers at 1 character (not 2 as expected) — updated
- TC-M01-007: Numeric input returns valid address results (not "no results") — updated
- 3 bugs found: BUG-001 (cursor no auto-focus), BUG-002 (From field no clear button), BUG-003 (country name inconsistency)

**M-04: Route Results Page (16 test cases):**
- 16 Pass, 0 Fail
- All elements work correctly: vehicle selection, sidebar updates, tags, upsell, navigation

**M-06: Booking Flow (22 test cases):**
- 21 Pass, 1 Fail
- TC-M06-010: Email field no inline validation on blur — BUG-004 (Major/High)
- 2 bugs found: BUG-004 (email validation), BUG-005 (phone country code defaults to US)

**M-02: Search — Hourly Driver (10 test cases) — ✅ COMPLETED 2026-04-27:**
- 10 Pass, 0 Fail
- Duration dropdown: 2–14 hours confirmed (13 options, 1-hour increments)
- Validation on all required fields is consistent: orange highlight without text message
- XSS payload safely handled — identical to M-01
- 2 UX observations (not bugs): colour-only validation without text message (accessibility concern); From field ✕ button absent in Transfer (M-01) — minor inconsistency
- Form data persists when switching between Transfers ↔ By the hour tabs

**M-08: Navigation (10 test cases) — ✅ COMPLETED 2026-04-27:**
- 10 Pass, 0 Fail
- BUG-006: Tripadvisor badge shows 2024 on all non-English language versions instead of 2025

**M-15: Authentication (6 test cases) — ✅ COMPLETED 2026-05-03:**
- 5 Pass + 1 Inferred, 0 Fail
- Auth method confirmed: passwordless magic link via email (valid 60 min)
- Validation colour inconsistency: Sign In modal uses red border vs search forms use orange

### Artifacts
- `test-cases/functional/test-cases-M01-search-transfer.md` — 26 test cases
- `test-cases/functional/test-cases-M04-route-results.md` — 16 test cases
- `test-cases/functional/test-cases-M06-booking-flow.md` — 22 test cases
- `test-cases/functional/test-cases-M02-hourly-driver.md` — 10 test cases
- `test-cases/functional/test-cases-M08-navigation.md` — 10 test cases
- `test-cases/functional/test-cases-M15-authentication.md` — 6 test cases
- `bug-reports/bug-reports-M01.md` — BUG-001, BUG-002, BUG-003
- `bug-reports/bug-reports-M06.md` — BUG-004, BUG-005
- `bug-reports/bug-reports-M08.md` — BUG-006

### Phase 2 Accumulated Statistics
| Metric | Value |
|---|---|
| Total test cases written | ~116 |
| Total executed | ~116 |
| Pass | ~113 |
| Fail (updated expected results) | 2 |
| Fail (real defect) | 1 |
| Bugs found | 6 (BUG-001 — BUG-006) |
| Modules completed | 6 of 17 |

---

## [Phase 1] — 2026-04-20 — Test Plan & Strategy

### Artifacts
- `docs/test-plan.md` — Test Plan v1.0 (Approved)
- `docs/test-strategy.md` — Test Strategy v1.0 (Approved)
- `docs/quality-metrics.md` — Quality Metrics v1.0 (Approved)

### Key Decisions
- Browsers: Chrome (primary) + Firefox (secondary), no Safari
- Responsive testing: Chrome DevTools Device Toolbar
- Accessibility: axe DevTools (no Lighthouse for accessibility)
- Performance: Lighthouse CLI (Performance Score + Web Vitals)
- OS: Windows 11

---

## [Phase 0] — 2026-04-03 → 2026-04-18 — Reconnaissance

### Automated Reconnaissance (2026-04-03, Claude)
- Pages analysed: homepage, /en/about, /en/hourly-driver, /en/day-trips, /en/countries, route page Prague→Vienna
- List of 17 functional modules (M-01 — M-17) compiled with P1–P4 prioritisation
- Out-of-scope defined with justification (driver portal, blog, agents, payments, admin)
- Risk matrix of 8 risks with mitigation strategies
- GitHub repository structure proposed

### Manual Verification (2026-04-11 — 2026-04-18, Chrome DevTools + Wappalyzer)

**Check 1 — Response Headers (2026-04-11):**
- Stack confirmed: `X-Powered-By: Next.js`, CDN: Amazon CloudFront (edge PRG50-P2), HTTP/3
- Security headers: 5 of 6 present
- **Finding:** `Content-Security-Policy` missing — potential XSS vulnerability

**Check 2 — robots.txt (2026-04-11):**
- 6 booking query parameters and 16 hidden paths discovered
- Main domain robots.txt differs completely from subdomains (Squarespace)

**Check 3 — Wappalyzer (2026-04-18):**
- 26 technologies: Next.js 16.2.0, Turbopack, Panda CSS, GA4, GTM, Klaviyo, LiveAgent, SpeedCurve 4.4.2
- Auth: 3 OAuth providers (Facebook, Google, Apple)

**Check 4 — XHR/Fetch mapping (2026-04-18):**
- **Key decision:** API is **GraphQL** (not REST). Endpoint: `https://api.mydaytrip.com/graphql`
- Postman collection will be GraphQL-based

**Check 5 — Sign In flow (2026-04-18):**
- Modal "Find my booking" (not classic Sign In), no CAPTCHA

**Check 6 — Language selector (2026-04-18):**
- 8 languages: EN, ES, DE, FR, ZH, KO, SV, PT

**Check 7 — Booking flow depth (2026-04-18):**
- 3 steps: Select your ride → Add stops → Details & Payment
- Payment methods: Apple Pay, Google Pay, Card (Visa/MC/Amex), Cash
- **Decision:** testing boundary — up to "Book with..." button (do not click)
- Flow fully accessible without authentication

### Artifacts
- `docs/phase-0-reconnaissance.md` — full reconnaissance report
- `ai-prompts/phase-0-site-analysis.md` — AI prompt documentation
- `CHANGELOG.md` — this file
