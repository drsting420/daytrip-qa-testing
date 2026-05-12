# API Test Report — Phase 3
## Daytrip.com GraphQL API Testing

**Project:** QA Portfolio Project — Daytrip.com  
**Author:** Pavel Gribovskiy  
**Date:** 2026-05-04  
**Phase:** Phase 3 — API Testing  
**Tool:** Postman v11  
**API endpoint:** `https://api.mydaytrip.com/graphql`  
**API type:** GraphQL (not REST)  

---

## 1. Testing Objective

Test the Daytrip.com GraphQL API directly, bypassing the UI, to identify backend-level defects — specifically missing server-side input validation, incorrect handling of edge cases, and security vulnerabilities.

---

## 2. How the API Was Discovered

The API was discovered in Phase 0 via Chrome DevTools → Network → Fetch/XHR while interacting with the search form on daytrip.com. No public documentation (Swagger, /docs, /api) exists. The endpoint was identified empirically: `https://api.mydaytrip.com/graphql` (POST method).

There is no public REST API. All communication between frontend and backend is handled via GraphQL.

---

## 3. API Technical Specifications

| Parameter | Value |
|---|---|
| Endpoint | `https://api.mydaytrip.com/graphql` |
| Method | POST |
| Type | GraphQL |
| Content-Type | `application/json` |
| Required headers | `Lang`, `X-Daytrip-Client`, `X-Daytrip-Session-Unique-Id` |
| Authentication | Not required for search operations |
| CDN | Amazon CloudFront |

### Custom Headers

| Header | Example Value | Purpose |
|---|---|---|
| `Lang` | `en` | Response language |
| `X-Daytrip-Client` | `website prd-7fba4fa5` | Client identifier (build ID) |
| `X-Daytrip-Session-Unique-Id` | `361052740.1773992867-1777814313` | Session identifier (dynamic) |

---

## 4. Tested Operations

### 4.1 FindLocationsBySearchStringV3

**Type:** Query  
**Purpose:** Autocomplete for cities, airports, and POIs in the search field  
**Input parameters:** `searchString` (String), `originLocationId` (String, optional), `destinationLocationId` (String, optional)  
**Returned fields:** `_id`, `mainText`, `secondaryText`, `locationType`, `source`, `airportCodes`

### 4.2 RequestOffers

**Type:** Mutation  
**Purpose:** Retrieve available vehicle offers with prices for a given route  
**Input parameters:** `offerRequests` array containing origin/destination coordinates, departure date, passenger parameters  
**Returned fields:** `offers` (array with prices and vehicle types), `mainCurrency`

---

## 5. Test Results

### 5.1 Summary Table

| # | Request Name | Operation | Test Type | Assertions | Result | Bug |
|---|---|---|---|---|---|---|
| 1 | FindLocations — valid city (Prague) | FindLocationsBySearchStringV3 | Positive | 5/5 ✅ | Pass | — |
| 2 | FindLocations — empty search string | FindLocationsBySearchStringV3 | Boundary | 4/4 ✅ | Pass (see note) | — |
| 3 | FindLocations — XSS payload | FindLocationsBySearchStringV3 | Security | 4/4 ✅ | Pass | — |
| 4 | RequestOffers — valid route Prague→Vienna | RequestOffers | Positive | 5/5 ✅ | Pass | — |
| 5 | RequestOffers — past date | RequestOffers | Negative | 2/2 ✅ | Behaviour documented | BUG-007 |
| 6 | RequestOffers — invalid coordinates | RequestOffers | Negative | 2/2 ✅ | Behaviour documented | BUG-008 |

**Total:** 6 requests / 22 assertions / 22 passed / 0 failed / 2 bugs logged

### 5.2 Request Details

**Request 1 — FindLocations — valid city (Prague)**  
The request with `searchString: "Prague"` returned 5 results: city Prague (locationType: city), Prague International Airport (locationType: airport, airportCodes: ["PRG"]), Prague Castle, Prague Astronomical Clock, Prague Zoo (locationType: unspecified). Response structure matches expectations. Response time: 202ms (after CDN warm-up).

**Request 2 — FindLocations — empty search string**  
An empty `searchString: ""` returned an array of popular destinations (Vienna, Munich, etc.) with `source: 0` — unlike `source: 1` for regular search results. This is presumably intentional behaviour (popular destination suggestions) but is not publicly documented. Logged as an observation.

**Request 3 — FindLocations — XSS payload**  
`searchString: "<script>alert('xss')</script>"` did not trigger JavaScript execution at the API level. The server returned `200 OK` with no `errors` field, and results do not contain the reflected XSS payload in `mainText`. The backend is protected against XSS at the string processing level. Confirms Phase 2 (UI testing) results.

**Request 4 — RequestOffers — valid route Prague→Vienna**  
A valid request returned 1 offer with 5 vehicle types: Sedan (vehicleType: 0), Compact MPV (1), Van (2), Luxury (3), type 100. The `finalPrice.total` field is present for each. `mainCurrency: 0` (presumably EUR). Response time: 369ms.

**Request 5 — RequestOffers — past date → BUG-007**  
See section 6.

**Request 6 — RequestOffers — invalid coordinates → BUG-008**  
See section 6.

---

## 6. Defects Found

### BUG-007 — Missing Server-Side Date Validation

**Severity:** Major | **Priority:** High

The `RequestOffers` mutation accepts past dates (`2024-01-01`) and returns a full list of offers with prices. The UI blocks selection of past dates via the calendar, but no server-side validation exists. Any user sending requests directly (Postman, curl) can bypass this restriction.

**Why it matters:** missing server-side validation is one of the most common vulnerabilities (OWASP). If the booking endpoint also lacks date validation, creating bookings for past dates may be possible.

### BUG-008 — Incorrect Response for Invalid Coordinates

**Severity:** Major | **Priority:** High

Coordinates outside the valid range (latitude: 999, longitude: 999) return `offers: [null]` instead of a validation error or empty array `[]`. Two defects in one response: missing input validation and an incorrect response structure (`null` inside the array instead of an empty array).

**Why it matters:** client code iterating over `offers` without null-checking will crash with a `TypeError`. This is a potential crash vector.

---

## 7. Observations (not bugs)

| # | Observation | Assessment |
|---|---|---|
| 1 | Empty `searchString` returns popular destinations (source: 0) | Presumably intentional, but not publicly documented |
| 2 | `X-Daytrip-Session-Unique-Id` is dynamic — changes every session | Expected behaviour for session tracking |
| 3 | First response time ~1.86s, subsequent ~200ms | CloudFront CDN caching — expected behaviour |
| 4 | `mainCurrency: 0` in response — numeric code instead of string "EUR" | Presumably an enum, requires API documentation |
| 5 | Authentication not required for search operations | Expected for public search |

---

## 8. Conclusions

**API strengths:**
- Correct handling of XSS payload at the server level
- Stable response times after CDN warm-up
- Consistent GraphQL response structure for valid requests

**Areas for improvement:**
- Missing server-side validation for business-critical fields (date, coordinates)
- Incorrect handling of invalid coordinates (`[null]` instead of `[]`)
- Absence of public API documentation (Swagger/GraphQL schema) makes testing more difficult

**Key takeaway:** both defects found (BUG-007, BUG-008) are not detectable through UI testing. The UI correctly blocks invalid inputs (past dates via calendar, impossible coordinates via autocomplete). This demonstrates the value of API testing as a separate layer in the testing strategy.

---

## 9. Phase 3 Artifacts

| File | Description |
|---|---|
| `postman/daytrip-collection.json` | Postman collection (6 requests, 22 assertions) |
| `postman/daytrip-environment.json` | Environment variables (baseUrl, lang, clientId) |
| `bug-reports/bug-reports-API.md` | BUG-007, BUG-008 |
| `docs/api-test-report.md` | This document |
