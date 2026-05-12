# Test Strategy — Daytrip.com

**Project:** QA Portfolio Project — Daytrip.com  
**Author:** Pavel Gribovskiy  
**Version:** 1.0  
**Date:** 2026-04-20  
**Status:** Approved  
**Related documents:** Test Plan v1.0, Phase 0 Reconnaissance

\---

## 1\. Purpose

This Test Strategy defines the technical approaches, methodologies, tools, and their rationale for QA testing of the public-facing frontend of Daytrip.com. It complements the Test Plan by focusing on "how" and "why" rather than "what" and "when".

\---

## 2\. Stack Selection Rationale

### 2.1 Playwright + TypeScript (vs Selenium + Python)

The first portfolio project (PPL.cz) was built with Python + Selenium + Pytest. Playwright + TypeScript was chosen for this project for the following reasons:

|Criterion|Selenium + Python (PPL.cz)|Playwright + TypeScript (Daytrip)|
|-|-|-|
|**Execution speed**|Slower, requires separate WebDriver|Faster, built-in browser engine|
|**Waits**|Explicit waits configured manually|Auto-waiting built in by default|
|**API testing**|Requires separate library (requests)|Built-in `request context`|
|**Multi-browser**|Separate drivers per browser|Chromium, Firefox, WebKit out of the box|
|**Market demand**|Stable demand|Growing demand, modern standard|
|**Type safety**|Dynamic (Python)|Static (TypeScript) — fewer runtime errors|
|**Project alignment**|—|Daytrip runs on Next.js (React/TypeScript) — same language|

### 2.2 Postman + Newman + Playwright request context

Daytrip uses a GraphQL API (`api.mydaytrip.com/graphql`). A combination of three tools was chosen for API testing, each with a distinct role:

|Tool|Role|Rationale|
|-|-|-|
|**Postman**|Manual API exploration, collection creation|Visual interface is convenient for exploring GraphQL requests and rapid test prototyping|
|**Newman**|Run Postman collection from CLI|CI/CD pipeline integration (GitHub Actions)|
|**Playwright request context**|Programmatic API tests|1–2 tests demonstrating the "API testing without browser" approach|

### 2.3 Allure Reports

Allure was chosen as the reporting system:

|Advantage|Description|
|-|-|
|**Detailed visualisation**|Pass/fail charts, run trends, defect categories|
|**Attachments**|Screenshots, videos, logs attached to each test|
|**CI/CD integration**|Publish to GitHub Pages, maintain run history|
|**Compatibility**|Supports Playwright, Pytest, JUnit — works across both portfolio projects|

### 2.4 Page Object Model (POM)

POM was chosen as the architectural pattern for automated tests:

|Principle|Application in project|
|-|-|
|**Locator isolation**|All selectors stored in `tests/pages/` — only the Page Object needs updating when UI changes|
|**Reusability**|`HomePage` used across transfer search, hourly driver, and day trips tests|
|**Readability**|Tests read as user scenarios: `homePage.searchTransfer('Prague', 'Vienna')`|
|**Risk R-05 mitigation**|Unexpected UI changes — update one Page Object, not all tests|

**Page Objects structure:**

```
tests/pages/
├── HomePage.ts           # Homepage, transfer search form
├── HourlyDriverPage.ts   # Hourly driver search form
├── DayTripsPage.ts       # Day trips search form
├── ResultsPage.ts        # Search results (vehicle selection)
├── StopsPage.ts          # Step 2: sightseeing stops selection
├── CheckoutPage.ts       # Step 3: Details \& Payment
└── components/
    ├── Header.ts          # Header navigation, language selector, Sign in
    ├── Footer.ts          # Footer links
    └── Autocomplete.ts    # Autocomplete component (From/To)
```

\---

## 3\. Testing Strategy by Type

### 3.1 Functional Testing

**Approach:** Risk-based testing — modules tested in priority order (P1 → P2 → P3 → P4). P1 modules (core revenue flow: Search → Results → Booking) receive the highest coverage.

**Test design techniques:**

|Technique|Where applied|Example|
|-|-|-|
|**Equivalence Partitioning**|Input fields (From, To, passengers)|Valid cities / invalid strings / special characters|
|**Boundary Value Analysis**|Numeric fields (adults, children, luggage)|0, 1, max, max+1 passengers|
|**Decision Table**|Booking flow combinations|tripType × vehicleType × stops (yes/no)|
|**State Transition**|Booking flow steps|Step 1 → Step 2 → Step 3, Back navigation|
|**Error Guessing**|All forms|XSS payload, SQL injection, emoji, empty fields|
|**Exploratory Testing**|After formalised tests|Free investigation of edge cases|

### 3.2 Cross-Browser Testing

**Approach:** Primary browser first — all test cases run in Chrome (primary), then P1 scenarios repeated in Firefox to verify compatibility.

|What we check|Chrome|Firefox|
|-|-|-|
|All test cases (P1–P4)|✅|—|
|P1 Critical flows|✅|✅|
|Visual differences|Baseline|Compare with Chrome|

### 3.3 Responsive Testing

**Approach:** Desktop-first — primary testing on Desktop (1920×1080), then key flows verified on Tablet and Mobile viewports.

**Tools:** Chrome DevTools Device Toolbar.

**What we check per viewport:**

|Check|Desktop|Tablet|Mobile|
|-|-|-|-|
|Search form (layout, inputs)|✅|✅|✅|
|Navigation (header, menu)|✅|✅|✅ (burger menu?)|
|Search results|✅|✅|✅|
|Booking flow|✅|✅|✅|
|Footer|✅|—|—|
|Landing pages|✅|—|—|

### 3.4 Accessibility Testing

**Approach:** Automated-first + manual spot checks.

|Stage|Tool|What we check|
|-|-|-|
|**Automated scan**|axe DevTools|Automated WCAG 2.1 AA checks: contrast, alt texts, ARIA, form labels|
|**Manual checks**|Keyboard|Tab navigation through search form and booking flow, focus visibility|
|**Manual checks**|Screen reader emulation|Logical reading order, ARIA roles on interactive elements|

**Scope:** homepage, search form, results, booking flow Step 3 (largest number of form elements).

### 3.5 Security Testing

**Approach:** Passive reconnaissance + basic input validation. No offensive tools (Burp Suite, OWASP ZAP) — manual checks only.

|Check|Method|Status|
|-|-|-|
|Security headers|Chrome DevTools Response Headers|✅ Completed in Phase 0. Finding: CSP missing|
|HTTPS enforcement|Verify `http://` → `https://` redirect|Phase 2|
|XSS in input fields|Enter `<script>`, `<img onerror>`, `javascript:` in From/To/Contact info|Phase 2 ✅|
|Open directories|Direct access to paths from robots.txt|Phase 2|
|Sensitive data in API|Check GraphQL response for unnecessary fields|Phase 3 ✅|

### 3.6 API Testing (GraphQL)

**Approach:** Endpoint-driven — each discovered GraphQL operation tested independently.

**Endpoint:** `POST https://api.mydaytrip.com/graphql`

**Required headers for Postman:**

```
Content-Type: application/json
Lang: en
X-Daytrip-Client: website prd-7fba4fa5
X-Daytrip-Session-Unique-Id: {{session\_id}}
```

**Operations tested:**

|Operation|Type|Test cases|
|-|-|-|
|`FindLocationsBySearchStringV3`|query|Valid city, partial input (2 chars), empty string, special characters (`<script>`, `' OR 1=1`), unicode (中文, العربية), very long string (1000+ chars)|
|`RequestOffers`|mutation|Valid route, past date, non-existent city, adults=0, adults=99, invalid coordinates|

**Postman Environment Variables:**

```
{{base\_url}}     = https://api.mydaytrip.com
{{lang}}         = en
{{session\_id}}   = (generated in Pre-request Script)
{{origin\_id}}    = ChIJi3lwCZyTC0cRkEAWZg-vAAQ  (Prague)
{{dest\_id}}      = ChIJn8o2UZ4HbUcRR1uiUYr1wv0  (Vienna)
```

### 3.7 Performance Testing

**Approach:** Lighthouse-first — measure performance without server load.

|Metric|Target|Source|
|-|-|-|
|Performance Score|≥ 70|Lighthouse|
|LCP (Largest Contentful Paint)|≤ 2.5s|Lighthouse / Web Vitals|
|INP (Interaction to Next Paint)|≤ 200ms|Lighthouse / Web Vitals|
|CLS (Cumulative Layout Shift)|≤ 0.1|Lighthouse / Web Vitals|

**Pages measured:** homepage (`/`), route page (`/en/transfers/prague-cz/vienna-at`), booking flow Step 3.

**Optional:** k6 smoke test — 1–5 virtual users, GraphQL autocomplete, 30 seconds. Goal: verify API responds consistently without timeouts.

\---

## 4\. Test Data Strategy

### 4.1 Principles

|Principle|Implementation|
|-|-|
|**No real personal data**|Use synthetic data (Faker.js)|
|**No real bookings**|Testing stops before "Book with..." button|
|**Reusability**|Test data stored in `tests/fixtures/`|
|**Environment separation**|Postman Environment Variables for API data|

### 4.2 Test Routes

|Route|Why|
|-|-|
|Prague → Vienna|Primary test route (popular, stable, familiar)|
|Naples → Positano|Secondary route (short, different region)|
|Lisbon → Porto|Third route (within one country, different region)|

### 4.3 Test Data Types

|Type|Examples|Where used|
|-|-|-|
|**Valid**|"Prague", "Vienna", 2 adults, date one week ahead|Positive test cases|
|**Invalid**|"12345", "!@#$%", empty string|Negative test cases|
|**Boundary**|adults=0, adults=1, adults=99|Boundary value analysis|
|**XSS payload**|`<script>alert(1)</script>`, `"><img onerror=alert(1)>`|Security testing|
|**Unicode**|"Прага", "東京", "القاهرة"|Internationalisation|
|**Long strings**|1000+ characters|Input field stress testing|

\---

## 5\. Automation Strategy

### 5.1 Testing Pyramid

```
        /\\
       /  \\       UI E2E Tests (Playwright)
      / 8-10\\     — critical user flows
     /--------\\
    /          \\   API Tests (Postman + Playwright request context)
   /  5-8 tests \\  — GraphQL operations
  /--------------\\
 /                \\ Manual Testing
/   \~116 test cases \\ — full coverage of all modules
\\\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_/
```

**Principle:** automate only stable, critical flows. Everything else — manual testing.

### 5.2 What We Automate

|Automate|Do not automate|
|-|-|
|Core search flow (From → To → Search)|Exploratory testing|
|Route results validation|Visual/UI comparison|
|Booking flow steps 1–3|OAuth login (external services)|
|Header navigation|Content pages (About, Landing)|
|Language switching|Payment method interaction|
|GraphQL autocomplete API|FAQ accordion behaviour|

### 5.3 Locator Strategy

Locator priority (best to worst):

|Priority|Locator type|Example|Why|
|-|-|-|-|
|1|`data-testid`|`\[data-testid="search-from"]`|Stable, UI-independent|
|2|ARIA role + text|`getByRole('button', { name: 'Search' })`|Semantic, Playwright-recommended|
|3|Placeholder / Label|`getByPlaceholder('From city')`|Readable, but text-dependent|
|4|CSS selector|`.search-form input:first-child`|Brittle, last resort|

**Note:** `data-testid` availability on Daytrip.com was verified during development — they are not present, so ARIA locators (priority 2) are used throughout.

\---

## 6\. CI/CD Strategy

### 6.1 GitHub Actions Pipeline

```yaml
# Trigger: push to main or pull request
on:
  push:
    branches: \[main]
  pull\_request:
    branches: \[main]

# Steps:
# 1. Setup Node.js + install dependencies
# 2. Run Playwright E2E tests
# 3. Run Newman (Postman API tests)
# 4. Generate Allure report
# 5. Upload artifacts
```

### 6.2 CI/CD Constraints on Production

|Constraint|Solution|
|-|-|
|Rate limiting|Sequential test execution (no parallel)|
|Dynamic data|Assert on structure, not specific values|
|Production instability|Retry policy (2 retries per test)|
|Execution time|30s timeout per test, 10 min pipeline timeout|

\---

## 7\. Test Quality Criteria

|Criterion|Requirement|
|-|-|
|**Independence**|Each test can run in isolation, without depending on others|
|**Repeatability**|Test produces the same result on re-run|
|**Readability**|Test name describes the scenario: `test('should display vehicle options after search')`|
|**Speed**|One E2E test — no more than 30 seconds|
|**Maintainability**|UI change requires updating only the Page Object, not the tests|



