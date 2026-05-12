# Test Plan — Daytrip.com

**Project:** QA Portfolio Project — Daytrip.com  
**Author:** Pavel Gribovskiy  
**Version:** 1.0  
**Date:** 2026-04-20  
**Status:** Approved  

---

## 1. Introduction

### 1.1 Purpose

This Test Plan defines the scope, approach, resources, schedule, and artifacts for a full QA testing cycle of the public-facing frontend of Daytrip.com. It serves as the foundation for planning and executing testing across all project phases.

### 1.2 Product Overview

Daytrip.com is a marketplace for private car transfers and day trips with a driver, operating in 120+ countries. The platform serves 1,000,000+ travellers through a network of 10,000+ drivers. Core services: city-to-city transfers with optional sightseeing stops, hourly driver, and day trips.

**Technology stack:** Next.js 16.2.0 (React), Turbopack, Panda CSS, Amazon CloudFront (CDN), GraphQL API (`api.mydaytrip.com`), HTTP/3. Analytics: GA4, GTM, Amplitude, Mixpanel. Authentication: OAuth (Apple, Google, Facebook) + Email. Payments: Apple Pay, Google Pay, Credit/Debit Card (Visa, Mastercard, Amex), Cash.

**Source:** Phase 0 Reconnaissance — Chrome DevTools Response Headers, Wappalyzer, robots.txt, XHR/Fetch mapping (2026-04-11 — 2026-04-18).

### 1.3 Testing Type

Black-box testing of the customer-facing frontend. No access to source code, staging environment, internal systems, or database. Testing is conducted on the production environment only.

---

## 2. Scope

### 2.1 In-Scope

**Functional modules (17 modules, P1–P4 prioritisation):**

**P1 — Critical (core revenue flow):**
- M-01: Search — City-to-City Transfer (search form: From → To, Date, Passengers)
- M-04: Route Results Page (vehicle options, prices, filters)
- M-06: Booking Flow (3 steps: Select your ride → Add stops → Details & Payment, up to "Book with..." button)

**P2 — High:**
- M-02: Search — Hourly Driver (form: Location, Duration, Date/Time, Passengers)
- M-03: Search — Day Trips (city selection → day trips list)
- M-05: Sightseeing Stops Selection (cards with photos, prices, duration)
- M-08: Header / Main Navigation (menu, language selector, Sign in)
- M-11: Specific Route Pages (route information, FAQ, tailored trips)
- M-15: Find My Booking / Sign In (modal: Apple/Google/Facebook OAuth + Email)

**P3 — Medium:**
- M-07: Custom Route Request (form for non-standard route requests)
- M-09: Footer (links, popular routes)
- M-10: Countries / Cities Catalogue (catalogue by region)
- M-13: FAQ Section (expandable questions and answers)
- M-16: Travel Agent Login (separate authentication)
- M-17: Language Selector (8 languages: EN, ES, DE, FR, ZH, KO, SV, PT)

**P4 — Low:**
- M-12: About Page (static content)
- M-14: "For..." Landing Pages (18+ pages for different audiences)

**Testing types:**
- Functional testing (all modules)
- UI/UX testing (visual correctness, usability)
- Cross-browser testing (Chrome, Firefox)
- Responsive testing (Desktop, Tablet, Mobile — via Chrome DevTools Device Toolbar)
- Accessibility testing (axe DevTools)
- Basic security checks (headers, XSS in form fields, HTTPS/TLS)
- API testing (GraphQL endpoint via Postman)
- Automation (Playwright + TypeScript, 8–10 E2E tests)
- Performance testing (Lighthouse CLI — Performance Score + Core Web Vitals)

### 2.2 Out-of-Scope

| Item | Reason |
|---|---|
| Real payment completion (booking finalisation) | Cannot perform real financial transactions |
| Driver portal (`drivers.daytrip.com`) | Separate Squarespace platform, B2B |
| Travel Agent portal (`agents.daytrip.com`) | Separate Squarespace platform, B2B |
| Partners / Affiliate portals | B2B tools |
| Blog (`blog.daytrip.com`) | Separate Squarespace site |
| Mobile app (iOS / Android) | Scope limited to web version |
| Admin panel / Backoffice | No access |
| Staging / Dev environment | Production only accessible |
| High-load testing (50+ VU) | Risk of impact on real users. Performance testing conducted via Lighthouse (no server load) and optionally k6 smoke test (1–5 VU) |
| Payment provider internals (Stripe) | No sandbox access |

---

## 3. Test Environments

### 3.1 Environment

| Parameter | Value |
|---|---|
| **URL** | `https://daytrip.com/` (production) |
| **API** | `https://api.mydaytrip.com/graphql` (GraphQL, POST) |
| **CDN** | Amazon CloudFront (edge: PRG50-P2) |
| **Access type** | Public, no VPN required |

### 3.2 Browsers

| Browser | Version |
|---|---|
| Google Chrome | Latest (147+) |
| Mozilla Firefox | Latest |

### 3.3 Viewports

| Type | Resolution | Tool |
|---|---|---|
| Desktop | 1920×1080 | Primary viewport, browser |
| Tablet | 768×1024 | Chrome DevTools Device Toolbar |
| Mobile | 375×667 | Chrome DevTools Device Toolbar |

### 3.4 Operating System

- Windows 11

---

## 4. Testing Approach

### 4.1 Manual Testing

Manual testing is performed first for all modules. Each test case follows a standard template:

| Field | Description | Example |
|---|---|---|
| **Test Case ID** | Unique: `TC-{module}-{number}` | `TC-M01-001` |
| **Title** | Brief description of the check | "Verify city autocomplete returns results for valid input" |
| **Module** | Module ID from scope | `M-01` |
| **Priority** | Critical / High / Medium / Low | `High` |
| **Type** | Positive / Negative / Boundary / Edge case | `Positive` |
| **Preconditions** | Initial state, required setup | "User is on daytrip.com homepage, From field is empty" |
| **Test Data** | Specific input data | `searchString: "Prague"` |
| **Steps** | Numbered steps | 1. Open daytrip.com 2. Click "From city" field 3. Type "Prague" |
| **Expected Result** | Specific, measurable result | "Dropdown appears with 'Prague, Czechia' as first suggestion" |
| **Actual Result** | Filled in during execution | "As expected" or description of deviation |
| **Status** | Pass / Fail / Blocked / Skipped / Not Run | `Pass` |
| **Environment** | Browser, OS, viewport | "Chrome 147, Windows 11, 1920×1080" |
| **Post-conditions** | System state after test | "Prague selected in From field" |
| **Notes** | Additional observations, bug references | "See BUG-003" |

### 4.2 API Testing

**Tool:** Postman + Newman (CLI).

Daytrip uses a GraphQL API (`https://api.mydaytrip.com/graphql`). Testing includes:
- Operation `FindLocationsBySearchStringV3` — location autocomplete (valid/invalid searchString, empty strings, special characters, boundary values)
- Operation `RequestOffers` — route search (valid/invalid parameters: past dates, non-existent cities, negative passenger counts)
- Custom header validation: `Lang`, `X-Daytrip-Client`, `X-Daytrip-Session-Unique-Id`
- Postman Environment Variables for parameter reuse
- Minimum 1 Pre-request Script or Test Script in JavaScript
- Newman for running collection from CLI (CI/CD integration)

### 4.3 Automation

**Stack:** Playwright + TypeScript + Allure Reports + Page Object Model (POM).

**Target scenarios (8–10 E2E tests):**
1. Route search (city-to-city): enter From/To, select from autocomplete, click Search
2. Route search (hourly driver): enter Location, select Duration
3. Route search (day trips): select city
4. Search results: verify vehicle options are displayed
5. Booking flow Step 1: select vehicle type
6. Booking flow Step 2: add/remove sightseeing stops
7. Booking flow Step 3: verify Contact info form validation
8. Navigation: header links, switching between Transfers / By the hour / Day trips
9. Language selector: language switch, URL and content verification
10. Responsive: verify layout on Mobile viewport

**Additionally:** 1–2 tests via Playwright `request context` (API tests without browser) for GraphQL autocomplete operation.

### 4.4 Security Testing

Basic checks without offensive tools:
- **Headers:** verify presence of security headers (completed in Phase 0; Content-Security-Policy missing — finding)
- **XSS:** input `<script>alert('xss')</script>` and similar payloads in search fields (From, To, Contact info)
- **HTTPS/TLS:** verify HTTP → HTTPS redirect, certificate validity
- **Open directories:** attempt access to paths from robots.txt (configurator, customer, payment-request, etc.)
- **Sensitive data exposure:** verify GraphQL API does not return unnecessary information

### 4.5 Accessibility Testing

- **Tool:** axe DevTools (Chrome extension)
- **Standard:** WCAG 2.1 Level AA
- **Scope:** homepage, search form, results, booking flow Step 3 (form with input fields)
- **Checks:** text contrast, image alt texts, keyboard navigation, ARIA roles, focus management

### 4.6 Performance Testing

- **Tool:** Lighthouse CLI — a single tool that measures Performance Score, Core Web Vitals (LCP, INP, CLS), and Accessibility Score. Lighthouse runs locally in the browser and does NOT create server load (unlike load testing). This is why Lighthouse is used for performance, while high-load testing remains out of scope.
- **Scope:** homepage, route page (Prague→Vienna), booking flow Step 3
- **Optional:** k6 smoke test (1–5 virtual users) for GraphQL autocomplete endpoint — minimal load, safe for production

### 4.7 AI-Assisted Testing

Claude AI usage is documented in the `/ai-prompts/` folder:
- Test case generation from requirements
- Bug report enrichment and analysis
- Test data creation (boundary values, negative cases)
- Test documentation and coverage review

Each file contains: Objective → Prompt (verbatim) → Output → Evaluation (as-is / adapted / rejected).

---

## 5. Entry and Exit Criteria

### 5.1 Entry Criteria

- ✅ Phase 0 (Reconnaissance) completed, artifacts documented
- ✅ Test Plan and Test Strategy reviewed and approved
- ✅ Test environments accessible (daytrip.com and api.mydaytrip.com responding)
- ✅ Tools installed (Chrome DevTools, Postman, Node.js, Playwright)
- ✅ GitHub repository created with folder structure

### 5.2 Exit Criteria

- All P1 (Critical) test cases executed, results documented
- At least 80% of P2 (High) test cases executed
- All Blocker/Critical bugs found are documented
- 8–10 automated tests written and passing in CI/CD pipeline
- Postman collection contains minimum 5 GraphQL requests, runs via Newman
- Allure report generated
- README.md contains project description, stack, and run instructions

### 5.3 Suspension Criteria

- daytrip.com unavailable for more than 24 hours
- API endpoint `api.mydaytrip.com` has blocked the IP address
- Critical UI change making test execution impossible (complete booking flow rewrite)

---

## 6. Schedule

**Total duration:** 12 weeks (3 months), 10–15 hours per week.

| Phase | Duration | Hours | Artifacts |
|---|---|---|---|
| **Phase 0:** Reconnaissance | ✅ Completed | ~8h | `phase-0-reconnaissance.md`, `CHANGELOG.md` |
| **Phase 1:** Test Plan & Strategy | Week 1 | ~8h | `test-plan.md`, `test-strategy.md`, `quality-metrics.md` |
| **Phase 2:** Manual Testing | Weeks 2–4 | ~35h | Test cases (functional, security, accessibility), bug reports |
| **Phase 3:** API Testing (Postman) | Weeks 5–6 | ~15h | Postman collection + environment, Newman CLI |
| **Phase 4:** Automation (Playwright) | Weeks 7–9 | ~30h | POM, 8–10 E2E tests, Allure config |
| **Phase 5:** CI/CD + Performance | Week 10 | ~10h | GitHub Actions, Lighthouse reports |
| **Phase 6:** BDD (optional) | Week 11 | ~8h | 2–3 Gherkin *.feature files |
| **Phase 7:** Finalisation | Week 12 | ~8h | README.md, Allure report, final review |

**Note:** schedule is flexible. Phases may overlap; optional phases (BDD, k6) are completed when time permits.

---

## 7. Defect Management

### 7.1 Bug Report Format

Each bug is documented following a standard template:

| Field | Description | Example |
|---|---|---|
| **Bug ID** | Unique identifier | `BUG-001` |
| **Title** | Format: `[Area]: brief description` | `[Search] Autocomplete dropdown not closing on Escape key` |
| **Severity** | Blocker / Critical / Major / Minor / Trivial | `Minor` |
| **Priority** | Critical / High / Medium / Low | `Medium` |
| **Environment** | Browser + version, OS, Viewport, URL | "Chrome 147, Windows 11, 1920×1080, daytrip.com/" |
| **Module** | Module ID from scope | `M-01` |
| **Preconditions** | Required setup before reproduction | "User is on homepage, no text in search fields" |
| **Steps to Reproduce** | Numbered steps (specific, unambiguous) | 1. Open daytrip.com 2. Click "From city" 3. Type "Prague" 4. Press Escape |
| **Expected Result** | Specific, measurable | "Autocomplete dropdown closes" |
| **Actual Result** | What actually happens | "Dropdown remains visible, overlapping page content" |
| **Reproducibility** | Always / Intermittent / Once | `Always` |
| **Screenshot / Video** | Screenshot or video (required for UI bugs) | `screenshots/BUG-001.png` |
| **Workaround** | Whether a workaround exists | "Click outside the dropdown to close it" |
| **Status** | Open / In Progress / Fixed / Closed / Won't Fix | `Open` |
| **Found Date** | Date of discovery | `2026-04-26` |
| **Found By** | Who found it | `Pavel Gribovskiy` |

### 7.2 Severity vs Priority

| Severity | Description | Example |
|---|---|---|
| **Blocker** | Core flow completely blocked | "Search" button not working |
| **Critical** | Critical feature broken, but workaround exists | Autocomplete not working, but city can be typed manually |
| **Major** | Important feature working incorrectly | Price in sidebar not updating when stop is added |
| **Minor** | Minor defect, does not affect functionality | Typo in FAQ text |
| **Trivial** | Cosmetic defect | Minor padding misalignment |

---

## 8. Risks and Mitigation

| ID | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R-01 | Rate limiting / IP ban during automated tests | High | High | Throttling 2–3 sec between requests, limit parallel tests |
| R-02 | Dynamic prices / routes | High | Medium | Assert on response structure, not specific values |
| R-03 | A/B tests on production (feature flags) | Medium | Medium | Stable locators, screenshots for documentation |
| R-04 | CAPTCHA / bot protection (challenge.js) | Medium | High | Monitor; if blocked — log as blocker |
| R-05 | UI changes without notice | High | Medium | POM pattern, isolated locators, CHANGELOG |
| R-06 | Booking flow requires validation (email/SMS) | Medium | Medium | Test up to validation boundary, document the boundary |
| R-07 | No access to backend logs | High | Low | Frontend validation + Network analysis |
| R-08 | Seasonal content (day trips) | Medium | Low | Use popular routes (Prague→Vienna) |

---

## 9. Artifacts and Deliverables

| Artifact | Location | Phase |
|---|---|---|
| Phase 0 Reconnaissance | `docs/phase-0-reconnaissance.md` | Phase 0 ✅ |
| Test Plan | `docs/test-plan.md` | Phase 1 ✅ |
| Test Strategy | `docs/test-strategy.md` | Phase 1 ✅ |
| Quality Metrics | `docs/quality-metrics.md` | Phase 1 ✅ |
| Functional Test Cases | `test-cases/functional/` | Phase 2 ✅ |
| Bug Reports | `bug-reports/` | Phase 2+ ✅ |
| Postman Collection | `postman/daytrip-collection.json` | Phase 3 ✅ |
| Postman Environment | `postman/daytrip-environment.json` | Phase 3 ✅ |
| API Test Report | `docs/api-test-report.md` | Phase 3 ✅ |
| Playwright Tests (POM) | `tests/pages/`, `tests/e2e/` | Phase 4 ✅ |
| Playwright API Tests | `tests/api/` | Phase 4 ✅ |
| Performance Reports | `performance/` | Phase 5 ✅ |
| CI/CD Pipeline | `.github/workflows/ci.yml` | Phase 6 |
| AI Prompts Documentation | `ai-prompts/` | All phases ✅ |
| Allure Report | Generated locally / CI | Phase 4 ✅ |
| README.md | Root | Phase 7 ✅ |
| CHANGELOG.md | Root | All phases ✅ |

---

## 10. Tools

| Tool | Purpose | Phase |
|---|---|---|
| Chrome DevTools | Manual testing, Network analysis, security headers | Phase 0, 2 |
| Wappalyzer | Tech stack identification | Phase 0 |
| axe DevTools | Accessibility testing | Phase 2 |
| Lighthouse CLI | Performance + Web Vitals audit | Phase 5 |
| Postman | GraphQL API testing | Phase 3 |
| Newman | Postman CLI runner (CI/CD) | Phase 3 |
| Playwright | E2E automation + API testing | Phase 4 |
| TypeScript | Automation language | Phase 4 |
| Allure Reports | Test reporting | Phase 4 |
| GitHub Actions | CI/CD pipeline | Phase 6 |
| Claude | AI-assisted testing (documented) | All phases |


