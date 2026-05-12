# Daytrip.com — Full QA Testing Cycle

> \*\*Portfolio Project\*\* | QA Engineer: Pavel Gribovskiy | 2026

A complete end-to-end QA testing project for [daytrip.com](https://www.daytrip.com) — a global marketplace for private car transfers and day trips operating in 120+ countries.

\---

## 📋 Project Overview

|||
|-|-|
|**Tested product**|daytrip.com (customer-facing frontend only)|
|**Testing type**|Black-box, production environment|
|**Tech stack under test**|Next.js 16.2.0, GraphQL API, Amazon CloudFront, HTTP/3|
|**Test environment**|Chrome 147, Windows 11, 1920×1080|
|**Project duration**|April – May 2026|

**Why this project:** I work at Daytrip as an Operations Specialist, which gives me strong domain knowledge of the product. This project was executed independently as a QA portfolio artifact — testing only the public frontend, without access to internal systems, staging environment, or source code.

\---

## 🛠️ Tech Stack

|Layer|Tools|
|-|-|
|**Manual Testing**|Chrome DevTools, Wappalyzer, axe DevTools|
|**API Testing**|Postman v11, GraphQL, Newman|
|**Automation**|Playwright + TypeScript + Page Object Model|
|**Reporting**|Allure Report|
|**Performance**|Lighthouse CLI v13.3.0|
|**CI/CD**|GitHub Actions|
|**AI-Assisted**|Claude|

\---

## 📊 Results Summary

### Manual Testing (Phase 2)

|Metric|Value|
|-|-|
|Total test cases|\~116|
|Pass rate|**97.4%**|
|Bugs found|**6** (BUG-001 — BUG-006)|
|Modules covered|6 of 17 (all P1 + key P2)|

### API Testing (Phase 3)

|Metric|Value|
|-|-|
|GraphQL operations tested|2 (`FindLocationsBySearchStringV3`, `RequestOffers`)|
|Total assertions|22 / 22 passed|
|Bugs found|**2** (BUG-007, BUG-008)|

### Automation (Phase 4)

|Metric|Value|
|-|-|
|Automated tests|**10 / 10 passed**|
|UI tests|8 (Playwright + TypeScript + POM)|
|API tests|2 (Playwright request context)|
|Execution time|\~30 seconds|
|Allure pass rate|**100%**|

### Performance (Phase 5)

|Page|Performance Score|LCP|CLS|
|-|-|-|-|
|Homepage (`/en/transfers`)|44 / 100|17.7s|**0** ✅|
|Route page (Prague→Vienna)|41 / 100|8.2s|**0** ✅|

> Note: Scores measured with Lighthouse CLI in headless mode without network throttling. CLS = 0 on both pages is a strong result indicating layout stability.

\---

## 🐛 Bugs Found

|ID|Title|Severity|Module|Found via|
|-|-|-|-|-|
|BUG-001|Cursor does not auto-focus on To field after From selection|Minor|M-01|Manual|
|BUG-002|From field lacks clear (✕) button — inconsistent with other fields|Minor|M-01|Manual|
|BUG-003|Inconsistent country name: "Czechia" vs "Czech Republic"|Trivial|M-01|Manual|
|BUG-004|Email field does not validate on blur in checkout|Major|M-06|Manual|
|BUG-005|Phone country code defaults to US (+1) regardless of user location|Minor|M-06|Manual|
|BUG-006|Tripadvisor badge shows 2024 on all non-English language versions|Minor|M-08|Manual|
|BUG-007|`RequestOffers` accepts past departure dates — no server-side validation|Major|API|API Testing|
|BUG-008|Invalid coordinates return `offers:\[null]` instead of error or empty array|Major|API|API Testing|

> \*\*Key insight:\*\* BUG-007 and BUG-008 are not detectable through UI testing — the UI correctly blocks invalid inputs via calendar and autocomplete. This demonstrates the value of API testing as a separate layer.

\---

## 📁 Repository Structure

```
/
├── docs/
│   ├── test-plan.md                    # Test Plan v1.0
│   ├── test-strategy.md                # Test Strategy v1.0
│   ├── quality-metrics.md              # Quality Metrics (with actual results)
│   ├── phase-0-reconnaissance.md       # Reconnaissance report
│   └── api-test-report.md              # API Testing report (Phase 3)
│
├── test-cases/
│   ├── functional/
│   │   ├── test-cases-M01-search-transfer.md       # 26 test cases
│   │   ├── test-cases-M02-hourly-driver.md         # 10 test cases
│   │   ├── test-cases-M03-day-trips.md
│   │   ├── test-cases-M04-route-results.md         # 16 test cases
│   │   ├── test-cases-M06-booking-flow.md          # 22 test cases
│   │   ├── test-cases-M08-navigation.md            # 10 test cases
│   │   ├── test-cases-M11-route-pages.md
│   │   └── test-cases-M15-authentication.md        # 6 test cases
│
├── bug-reports/
│   ├── bug-reports-M01.md              # BUG-001, BUG-002, BUG-003
│   ├── bug-reports-M06.md              # BUG-004, BUG-005
│   ├── bug-reports-M08.md              # BUG-006
│   └── bug-reports-API.md              # BUG-007, BUG-008
│
├── postman/
│   ├── daytrip-collection.json         # 6 GraphQL requests, 22 assertions
│   └── daytrip-environment.json        # Environment variables
│
├── tests/                              # Playwright automation
│   ├── pages/
│   │   └── HomePage.ts                 # Page Object Model
│   ├── e2e/
│   │   ├── search.spec.ts              # 5 UI tests (M-01)
│   │   └── navigation.spec.ts          # 3 UI tests (M-08)
│   └── api/
│       └── graphql.spec.ts             # 2 API tests (GraphQL)
│
├── performance/
│   ├── lighthouse-homepage.json        # Lighthouse JSON report
│   ├── lighthouse-route-page.json      # Lighthouse JSON report
│   ├── lighthouse-homepage.html        # Lighthouse HTML report (visual)
│   └── lighthouse-report.md           # Performance analysis
│
├── ai-prompts/
│   └── phase-0-site-analysis.md       # AI prompt documentation
│
├── .github/workflows/
│   └── ci.yml                          # GitHub Actions — Playwright + Newman
│
├── CHANGELOG.md                        # Key decisions per phase
└── README.md                           # This file
```

\---

## 🚀 Running the Tests

### Prerequisites

```bash
node --version   # v18+
npm --version
```

### Install dependencies

```bash
cd tests
npm install
npx playwright install
```

### Run all Playwright tests

```bash
npx playwright test --project=chromium
```

### Run specific test file

```bash
npx playwright test search.spec.ts --project=chromium
npx playwright test navigation.spec.ts --project=chromium
npx playwright test graphql.spec.ts --project=chromium
```

### Generate Allure report

```bash
npx playwright test --project=chromium
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### Run API tests with Newman

```bash
newman run postman/daytrip-collection.json \\
  --environment postman/daytrip-environment.json \\
  --reporters cli,json \\
  --reporter-json-export postman/newman-report.json
```

\---

## ⚙️ CI/CD

GitHub Actions pipeline runs automatically on every push to `main`:

* ✅ Playwright tests (Chromium)
* ✅ Newman API tests
* ✅ Allure report upload

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for configuration.

\---

## 📈 Quality Metrics

Full metrics with targets and actual values: [`docs/quality-metrics.md`](./docs/quality-metrics.md)

|Metric|Target|Actual|
|-|-|-|
|Test Execution Rate (P1)|100%|**100%** ✅|
|Manual Pass Rate|—|**97.4%** ✅|
|Automated Pass Rate|≥ 90%|**100%** ✅|
|Flaky Test Rate|≤ 10%|**0%** ✅|
|Defects by Severity|—|0 Blocker, 0 Critical, 3 Major, 4 Minor, 1 Trivial|

\---

## 👤 About

**Pavel Gribovskiy** — QA Engineer (Manual + Automation)

* 📧 pavel.gribovsky@gmail.com
* 💼 [LinkedIn](https://www.linkedin.com/in/pavel-gribovskiy/)
* 🐙 [GitHub](https://github.com/drsting420)

\---

*This project is an independent QA portfolio artifact. Daytrip.com is a real product; testing was conducted on the public frontend only, without access to internal systems.*

