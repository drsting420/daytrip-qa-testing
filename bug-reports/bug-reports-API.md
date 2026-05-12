# Bug Reports — Phase 3: API Testing

---

## BUG-007

| Field | Value |
|---|---|
| **Bug ID** | BUG-007 |
| **Title** | [API] RequestOffers returns valid offers for past departure date — no server-side date validation |
| **Severity** | Major |
| **Priority** | High |
| **Environment** | Postman v11 / `https://api.mydaytrip.com/graphql` / mutation `RequestOffers` |
| **Module** | API — RequestOffers |
| **Preconditions** | Valid GraphQL request with correct headers (Content-Type, Lang, X-Daytrip-Client, X-Daytrip-Session-Unique-Id) |
| **Steps to Reproduce** | 1. Send POST to `https://api.mydaytrip.com/graphql` 2. Operation `RequestOffers` with `departureAt: "2024-01-01T09:00:00.000Z"` 3. Valid coordinates: origin Prague (50.0755381, 14.4378005), destination Vienna (48.2081743, 16.3738189) 4. Observe response |
| **Expected Result** | Server returns validation error or empty `offers: []`. Past dates must be rejected at API level, not only in UI. |
| **Actual Result** | `200 OK` with full offer list: 5 vehicle types with prices (Sedan €325, Compact MPV €412, Van €492, Luxury €474, type-100 €309). No `errors` field in response. |
| **Reproducibility** | Always |
| **Security Implication** | Any user with basic API knowledge can bypass the UI calendar and request offers for arbitrary past dates. If downstream booking endpoints also lack date validation, past-date bookings may be possible. |
| **Recommended Fix** | Add server-side validation in `RequestOffers` resolver: reject `departureAt` earlier than `now()` (with buffer for timezone differences). |
| **Found Via** | API Testing (Postman) — not detectable through UI testing alone |
| **Status** | Open |
| **Found Date** | 2026-05-04 |
| **Found By** | Pavel Gribovskiy |

---

## BUG-008

| Field | Value |
|---|---|
| **Bug ID** | BUG-008 |
| **Title** | [API] RequestOffers returns `offers:[null]` instead of error or empty array for impossible coordinates |
| **Severity** | Major |
| **Priority** | High |
| **Environment** | Postman v11 / `https://api.mydaytrip.com/graphql` / mutation `RequestOffers` |
| **Module** | API — RequestOffers |
| **Preconditions** | Valid GraphQL request with correct headers |
| **Steps to Reproduce** | 1. Send POST to `https://api.mydaytrip.com/graphql` 2. Operation `RequestOffers` with `originCoordinates: {latitude: 999, longitude: 999}` and `destinationCoordinates: {latitude: 999, longitude: 999}` 3. Valid future `departureAt` 4. Observe response |
| **Expected Result** | Server returns validation error (coordinates outside valid range: lat −90..+90, lon −180..+180) OR empty `offers: []`. |
| **Actual Result** | `200 OK` with `offers: [null]` — array containing a single `null` element. Response: `{"data": {"requestOffersV2": {"offers": [null], "mainCurrency": 0}}}` |
| **Reproducibility** | Always |
| **Risk** | Any client iterating over `offers` without null-checking will encounter `NullPointerException` / `TypeError: Cannot read properties of null`. Potential crash vector for frontend or downstream services. |
| **Recommended Fix** | 1. Validate coordinate ranges in resolver (reject lat outside −90..+90, lon outside −180..+180). 2. Return `offers: []` instead of `offers: [null]` when no valid offer can be constructed. |
| **Found Via** | API Testing (Postman) — not detectable through UI testing alone |
| **Status** | Open |
| **Found Date** | 2026-05-04 |
| **Found By** | Pavel Gribovskiy |
