# Quality Metrics — Daytrip.com

**Project:** QA Portfolio Project — Daytrip.com  
**Author:** Pavel Gribovskiy  
**Version:** 2.0 (final — Phases 0–5 completed)  
**Created:** 2026-04-20  
**Updated:** 2026-05-08  
**Status:** Updated  
**Related documents:** Test Plan v1.0, Test Strategy v1.0, CHANGELOG.md

\---

## 1\. Purpose

Define a set of metrics for objective assessment of the testing process and results across each project phase. Metrics enable tracking progress, identifying problem areas, and making phase completion decisions.

\---

## 2\. Test Execution Metrics

### 2.1 Test Execution Rate

**Measures:** what percentage of planned test cases were executed.

**Formula:** `(Executed test cases / Total test cases) × 100%`

**Targets and actual results:**

|Module priority|Target|Actual|Status|
|-|-|-|-|
|P1 — Critical|100%|100% (M-01, M-04, M-06 completed)|✅|
|P2 — High|≥ 80%|\~85% (M-02, M-08, M-15 completed; M-03, M-11 partial)|✅|
|P3 — Medium|≥ 50%|Not measured (P3 modules not in Phase 2 scope)|⏳|
|P4 — Low|As available|Not tested|—|

### 2.2 Pass / Fail Rate

**Measures:** ratio of passing to failing tests.

**Formula:** `(Passed test cases / Executed test cases) × 100%`

**Actual results:**

|Testing level|Total|Pass|Fail (defect)|Fail (updated expected)|Pass Rate|
|-|-|-|-|-|-|
|Manual Testing (Phase 2)|\~116|\~113|1|2|**97.4%**|
|API Testing — Postman (Phase 3)|22 assertions|22|0|—|**100%**|
|Automation — Playwright (Phase 4)|10|10|0|—|**100%**|
|**Total**|**\~148**|**\~145**|**1**|**2**|**\~98%**|

**Interpretation:** the product is stable (≥ 90% pass rate). The only real Fail is BUG-004 (email validation on blur). Two updated expected results are not product defects — they represent requirement refinement during testing.

### 2.3 Test Cases by Type

**Actual distribution — Manual Testing:**

|Type|Count|Percentage|
|-|-|-|
|Positive|\~72|\~62%|
|Negative|\~32|\~28%|
|Boundary / Edge case|\~12|\~10%|
|**Total**|**\~116**|**100%**|

**Conclusion:** distribution matches the target (\~60/30/10). Testing is well-balanced.

\---

## 3\. Defect Metrics

### 3.1 Defect Count by Severity

|Severity|Count|Percentage|Bugs|
|-|-|-|-|
|Blocker|0|0%|—|
|Critical|0|0%|—|
|Major|3|37.5%|BUG-004, BUG-007, BUG-008|
|Minor|4|50%|BUG-001, BUG-002, BUG-005, BUG-006|
|Trivial|1|12.5%|BUG-003|
|**Total**|**8**|**100%**|—|

**Interpretation:** the absence of Blocker/Critical defects indicates the core flow works correctly. The product is stable for production. Three Major bugs are concentrated in the API layer (BUG-007, BUG-008) and checkout form (BUG-004) — require developer attention.

### 3.2 Defect Count by Module

|Module|Bugs|Severity|Module Priority|
|-|-|-|-|
|M-01: Search Transfer|3|Minor × 2, Trivial × 1|P1|
|M-04: Route Results|0|—|P1|
|M-06: Booking Flow|2|Major × 1, Minor × 1|P1|
|M-08: Navigation|1|Minor × 1|P2|
|M-15: Authentication|0|—|P2|
|API: GraphQL|2|Major × 2|—|
|**Total**|**8**|—|—|

**Conclusion:** highest defect density in M-01 (Search) — 3 bugs, all Minor/Trivial. The API layer contains the most severe defects (Major), which are undetectable through UI testing. This confirms the value of multi-layer testing.

### 3.3 Defect Status Distribution

|Status|Count|
|-|-|
|Open|8|
|In Progress|0|
|Fixed|0|
|Closed|0|
|Won't Fix|0|

**Note:** all defects remain Open — no access to the Daytrip development team. For a portfolio project this is expected: what matters is the quality of discovery and documentation.

\---

## 4\. Automation Metrics

### 4.1 Automation Coverage

**Formula:** `(P1 scenarios with automated tests / Total P1 scenarios) × 100%`

|Module|P1 scenarios|Covered by automation|Coverage|
|-|-|-|-|
|M-01: Search Transfer|8 (critical flows)|5 (TC-AUTO-001 — 005)|63%|
|M-06: Booking Flow|5 (critical flows)|0|0%|
|M-08: Navigation|5 (critical flows)|3 (TC-AUTO-006 — 008)|60%|
|**P1 total**|**\~18**|**8**|**\~44%**|

**Target:** ≥ 60% of P1 scenarios. **Actual: \~44%.** ⚠️

**Note:** target not reached for M-06 (Booking Flow not covered — requires real booking or mock). For a portfolio project, current coverage demonstrates tool proficiency and POM pattern understanding.

### 4.2 Automated Test Pass Rate

|Run|Total tests|Passed|Pass Rate|
|-|-|-|-|
|Phase 4 final run|10|10|**100%**|

**Target:** ≥ 90%. **Actual: 100%.** ✅

### 4.3 Flaky Test Rate

**Observations during test development:**

|Test|Was flaky|Cause|Fix|
|-|-|-|-|
|TC-AUTO-002|Yes|Cookie banner overlapping form|`acceptCookiesIfPresent()`|
|TC-AUTO-002|Yes|Wrong date field locator|`getByRole('button', { name: 'Departure' })`|
|TC-AUTO-002|Yes|Calendar overlapping Search button|`Escape` + `waitForTimeout(500)`|
|TC-AUTO-004|Yes|Autocomplete selecting wrong city|`waitForTimeout(1000)` after `fill()`|

**Final Flaky Test Rate: 0%** (all instabilities resolved before final run).

**Target:** ≤ 10%. **Actual: 0%.** ✅

\---

## 5\. API Testing Metrics

### 5.1 API Test Coverage

**Actual results (Postman + Playwright):**

|Operation|Positive|Negative|Boundary / Security|Total|
|-|-|-|-|-|
|`FindLocationsBySearchStringV3`|2|1|2 (empty string, XSS)|**5**|
|`RequestOffers`|1|2 (past date, invalid coords)|—|**3**|
|**Total**|**3**|**3**|**2**|**8**|

**Target:** ≥ 7 tests per operation. Achieved for `FindLocationsBySearchStringV3` (5 Postman + 2 Playwright = 7). `RequestOffers` covered at Postman level (3 tests).

### 5.2 API Response Validation

**100% of API tests include assertions on:**

* HTTP status code (200)
* JSON response structure (required fields present)
* Business logic (results present, data correct)

✅ Target achieved.

\---

## 6\. Performance Metrics

### 6.1 Lighthouse Scores

**Tool:** Lighthouse CLI v13.3.0, headless Chrome, no network throttling.

|Page|Performance Score|LCP|FCP|TBT|CLS|Status|
|-|-|-|-|-|-|-|
|Homepage (`/en/transfers`)|44 / 100|17,682ms|4,585ms|774ms|**0**|⚠️|
|Route page (Prague→Vienna)|41 / 100|8,223ms|4,608ms|1,102ms|**0**|⚠️|

**Targets:** Performance Score ≥ 70, LCP ≤ 2,500ms, INP ≤ 200ms, CLS ≤ 0.1.

**Interpretation:** Performance Scores below target are expected for a Next.js SPA with 26 third-party technologies (GA4, GTM, Klaviyo, LiveAgent, SpeedCurve). CLS = 0 on both pages is an excellent result — layout is fully stable. For accurate field data, PageSpeed Insights (CrUX) is recommended.

\---

## 7\. Accessibility Metrics

### 7.1 axe DevTools Violations

**Status:** not measured within completed phases.

|Page|Critical|Serious|Moderate|Minor|Status|
|-|-|-|-|-|-|
|Homepage|—|—|—|—|⏳ not measured|
|Search form|—|—|—|—|⏳ not measured|
|Booking Step 3|—|—|—|—|⏳ not measured|

**Observation from Manual Testing:** the search form uses colour-only validation without a text error message (orange highlight) — a potential accessibility issue for screen readers. Logged as UX observation in M-01 and M-02.

\---

## 8\. Summary Table — Final Results

|#|Metric|Target|Actual|Status|
|-|-|-|-|-|
|1|Test Execution Rate (P1)|100%|100%|✅|
|2|Test Execution Rate (P2)|≥ 80%|\~85%|✅|
|3|Manual Pass / Fail Rate|Record actual|97.4%|✅|
|4|Test Cases by Type|\~60/30/10|62/28/10|✅|
|5|Total Defects Found|Record actual|8 bugs|✅|
|6|Defects by Severity|Record distribution|0 Blocker/Critical, 3 Major, 4 Minor, 1 Trivial|✅|
|7|Defects by Module|Record distribution|M-01: 3, M-06: 2, M-08: 1, API: 2|✅|
|8|Automation Coverage (P1)|≥ 60%|\~44%|⚠️|
|9|Automated Test Pass Rate|≥ 90%|100%|✅|
|10|Flaky Test Rate|≤ 10%|0%|✅|
|11|API Test Coverage|≥ 7 tests per operation|7–8 tests|✅|
|12|Lighthouse Performance Score|≥ 70|41–44|⚠️|
|13|Accessibility Critical Violations|0|not measured|⏳|

**Legend:** ✅ achieved / ⚠️ partial / ⏳ not measured

\---

## 9\. Key Project Conclusions

**Product strengths (daytrip.com):**

* Core booking flow works correctly — no Blocker/Critical defects
* XSS protection confirmed at both UI and API levels
* Passwordless auth (magic link) — modern pattern without password vulnerabilities
* Stable API response times after CDN warm-up (\~200ms)
* CLS = 0 on all tested pages — excellent layout stability

**Areas for improvement:**

* Missing server-side validation in `RequestOffers` (BUG-007, BUG-008) — most critical findings
* Email field not validated on blur in checkout (BUG-004) — UX issue
* Missing `Content-Security-Policy` header — potential XSS vulnerability
* Tripadvisor badge shows 2024 on non-English versions (BUG-006) — content issue
* High LCP on both pages (8–18s in Lighthouse) — performance optimisation needed

**Key takeaway:** 2 of 8 bugs (BUG-007, BUG-008) were found only through API testing — the UI correctly hides them. This demonstrates the value of a multi-layer testing strategy.



