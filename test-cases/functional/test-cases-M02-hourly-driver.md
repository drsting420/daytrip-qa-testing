# Test Cases — M-02: Search — Hourly Driver

**Module:** M-02  
**Module Priority:** P2 — High  
**Page:** `https://daytrip.com/en/hourly-driver`  
**Author:** Pavel Gribovskiy  
**Created:** 2026-04-27  
**Executed:** 2026-04-27  
**Module Status:** ✅ Completed — 10/10 Pass

---

## Hourly Driver Search Form Elements

| # | Element | Type | Placeholder / Label | Default value |
|---|---|---|---|---|
| 1 | From | Text input + autocomplete | "From city, hotel, airport" | Empty |
| 2 | Duration | Dropdown | "Duration" | Not selected |
| 3 | Date and time | Date + time picker | "Date and time" | Not selected |
| 4 | Adults | Counter (− / +) | "Adults, Age 12+" | 2 |
| 5 | Children | Counter (− / +) | "Children, Age 0-12" | 0 |
| 6 | Extra sets of bags | Counter (− / +) | "Extra sets of bags" | 0 |
| 7 | Search | Button | "Search" | — |

**Differences from Transfer (M-01):** no To field, no Add return, no Multi-city; single "Date and time" field instead of Departure; Duration dropdown (2–14 hours) added.

---

## TC-M02-001: Autocomplete — valid city in From field

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-001 |
| **Title** | Verify autocomplete works in From field on Hourly Driver page |
| **Module** | M-02 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on daytrip.com/en/hourly-driver, From field is empty |
| **Test Data** | searchString: "Prague" |
| **Steps** | 1. Click on "From city, hotel, airport" field 2. Type "Prague" |
| **Expected Result** | Autocomplete dropdown appears with "Prague, Czechia" as first suggestion. Dropdown behavior identical to Transfer page (M-01) |
| **Actual Result** | Autocomplete dropdown appeared with Prague (Czechia), Prague International Airport (PRG), Prague Castle, Prague Astronomical Clock, Prague Zoo. Clear (✕) button visible in From field. Behavior identical to M-01. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Shared component with M-01 — behaves identically |

---

## TC-M02-002: Duration dropdown — select value

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-002 |
| **Title** | Verify Duration dropdown displays available options and allows selection |
| **Module** | M-02 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on hourly-driver page |
| **Test Data** | Select: "4 hours" |
| **Steps** | 1. Click on "Duration" dropdown 2. Observe available options 3. Select "4 hours" |
| **Expected Result** | Dropdown opens with hourly options. "4 hours" is selected and displayed in the field. Dropdown closes. |
| **Actual Result** | Dropdown opened with hourly options. "4 hours" selected and displayed in Duration field. Clear (✕) button appeared on Duration field. Dropdown closed after selection. Note: From field on Hourly Driver page has ✕ button — unlike Transfer page (M-01) where From field has no ✕. Minor inconsistency observed. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | From field ✕ button inconsistency vs M-01 noted — not a functional bug, UX observation |

---

## TC-M02-003: Duration dropdown — minimum and maximum values

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-003 |
| **Title** | Verify Duration dropdown minimum and maximum values |
| **Module** | M-02 |
| **Priority** | High |
| **Type** | Boundary |
| **Preconditions** | User is on hourly-driver page |
| **Test Data** | — |
| **Steps** | 1. Click on "Duration" dropdown 2. Note the first (minimum) option 3. Scroll to the bottom of the list 4. Note the last (maximum) option |
| **Expected Result** | Minimum and maximum duration values documented. All values in 1-hour increments. |
| **Actual Result** | Minimum = 2 hours, Maximum = 14 hours. Full range: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 hours (13 options total, 1-hour increments). Confirmed Phase 0 reconnaissance estimate. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Range 2–14 hours confirmed |

---

## TC-M02-004: Date and time picker

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-004 |
| **Title** | Verify Date and time picker opens and allows selection |
| **Module** | M-02 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on hourly-driver page |
| **Test Data** | Date: Mon, May 4 2026 / Time: 10:00 am |
| **Steps** | 1. Click on "Date and time" field 2. Observe calendar 3. Select a future date 4. Select a time |
| **Expected Result** | Calendar opens showing current and next month. Date and time can be selected. Field displays selected values in readable format. |
| **Actual Result** | Calendar opened showing April 2026 + May 2026 side by side. Date Mon May 4 selected (highlighted in blue circle). Time 10:00 am selected via dropdown. Field displays "Mon, May 4 / 10:00 am". Separate sections: "Departure date" and "Departure time" visible at bottom of picker. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Two-month calendar view. Time format: HH:MM am/pm |

---

## TC-M02-005: Happy Path — full search Hourly Driver

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-005 |
| **Title** | Verify full search flow returns results for valid Hourly Driver query |
| **Module** | M-02 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on hourly-driver page |
| **Test Data** | From: Prague, Czech Republic / Duration: 4 hours / Date: Mon May 4 / Time: 10:00 am / Adults: 2 / Bags: 2 |
| **Steps** | 1. Fill From field with "Prague" and select "Prague, Czech Republic" 2. Select Duration: 4 hours 3. Select Date: Mon May 4, Time: 10:00 am 4. Click Search |
| **Expected Result** | Redirect to results page showing available vehicle options with prices. Order summary sidebar displays correct trip details. |
| **Actual Result** | Redirected to `/en/configurator/car?c=UUID`. Page "Select your ride" displayed 4 vehicle options: Sedan €118, Compact MPV €131, Van €144, Luxury sedan €171. Sidebar: "Driver by hour" / Sun May 10 9:00 AM – 1:00 PM / Prague, Czech Republic / "Personal driver for 4 hours" €118 / 80 km included / Free cancellation notice. Duration, price, and km correctly reflected selected 4 hours. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Pricing scales correctly: 3h=€112/60km, 4h=€118/80km confirmed |

---

## TC-M02-006: Empty From field — validation on Search

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-006 |
| **Title** | Verify Search is blocked when From field is empty |
| **Module** | M-02 |
| **Priority** | Critical |
| **Type** | Negative |
| **Preconditions** | User is on hourly-driver page, Duration and Date filled, From is empty |
| **Test Data** | From: empty / Duration: 3 hours / Date: Fri May 22 / Time: 9:00 am |
| **Steps** | 1. Leave From field empty 2. Select Duration: 3 hours 3. Select Date and time 4. Click Search |
| **Expected Result** | Search does not execute. From field highlighted to indicate error. |
| **Actual Result** | Search did not execute. From field highlighted with orange background, placeholder text "From city, hotel, airport" changed to orange color. No text error message displayed — validation via color only. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Validation is color-only (no text message). Potential accessibility concern — screen readers may not announce the error state. Consistent with M-01 behavior. |

---

## TC-M02-007: No Duration selected — validation on Search

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-007 |
| **Title** | Verify Search is blocked when Duration is not selected |
| **Module** | M-02 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on hourly-driver page, From and Date filled, Duration not selected |
| **Test Data** | From: Prague / Duration: not selected / Date: Thu May 14 / Time: 9:00 am |
| **Steps** | 1. Fill From: Prague 2. Leave Duration unselected 3. Select Date and time 4. Click Search |
| **Expected Result** | Search does not execute. Duration field highlighted to indicate error. |
| **Actual Result** | Search did not execute. Duration field highlighted with orange background, label "Duration" changed to orange color. No text error message. Behavior identical to TC-M02-006. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Consistent validation pattern across all required fields |

---

## TC-M02-008: No Date and time — validation on Search

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-008 |
| **Title** | Verify Search is blocked when Date and time is not selected |
| **Module** | M-02 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on hourly-driver page, From and Duration filled, Date and time not selected |
| **Test Data** | From: Prague / Duration: 7 hours / Date and time: not selected |
| **Steps** | 1. Fill From: Prague 2. Select Duration: 7 hours 3. Leave Date and time empty 4. Click Search |
| **Expected Result** | Search does not execute. Date and time field highlighted to indicate error. |
| **Actual Result** | Search did not execute. "Date and time" field highlighted with orange background, label "Date and time" changed to orange color. No text error message. Behavior identical to TC-M02-006 and TC-M02-007. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | All three required fields (From, Duration, Date and time) use identical orange-highlight validation pattern |

---

## TC-M02-009: Tab navigation Transfers ↔ By the hour

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-009 |
| **Title** | Verify tab switching between Transfers and By the hour works correctly |
| **Module** | M-02 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on hourly-driver page, "By the hour" tab active |
| **Test Data** | — |
| **Steps** | 1. Observe "By the hour" tab active 2. Click "Transfers" tab 3. Observe form changes 4. Click "By the hour" tab again |
| **Expected Result** | "Transfers" switches to Transfer form (From + To + Departure + Add return + Multi-city). URL changes to `/en/transfers`. "By the hour" returns to hourly driver form. Active tab visually indicated. |
| **Actual Result** | Click "Transfers": URL changed to `/en/transfers`, form switched to Transfer layout (From + To + Date + Add return + Multi-city button). "Transfers" tab underlined. Click "By the hour": URL returned to `/en/hourly-driver`, form returned to Hourly Driver layout (From + Duration + Date and time). Form data (Prague, date) persisted between tab switches. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Form data persists across tab switches — good UX behavior |

---

## TC-M02-010: Autocomplete — XSS payload in From field

| Field | Value |
|---|---|
| **Test Case ID** | TC-M02-010 |
| **Title** | Verify autocomplete handles XSS payload safely on Hourly Driver page |
| **Module** | M-02 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on hourly-driver page, From field is empty |
| **Test Data** | searchString: `<script>alert('xss')</script>` |
| **Steps** | 1. Click on From field 2. Paste `<script>alert('xss')</script>` 3. Observe page behavior |
| **Expected Result** | No JavaScript alert. Input treated as plain text. "We don't recognize the location" message appears. Page remains functional. |
| **Actual Result** | XSS payload displayed as plain text in From field. No JavaScript alert executed. Autocomplete dropdown showed: "We don't recognize the location. Please, check the name for typos. If the location is correct, please, get in touch with us via chat." Page remained fully functional. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Security test — identical behavior to M-01. Input is properly sanitized. |

---

## Summary

| Type | Count | Pass | Fail |
|---|---|---|---|
| Positive | 6 | 6 | 0 |
| Negative | 3 | 3 | 0 |
| Boundary | 1 | 1 | 0 |
| **Total** | **10** | **10** | **0** |

| Priority | Count | Pass | Fail |
|---|---|---|---|
| Critical | 4 | 4 | 0 |
| High | 5 | 5 | 0 |
| Medium | 1 | 1 | 0 |
| **Total** | **10** | **10** | **0** |

**Defects found:** 0  
**UX observations:** 2 (color-only validation without text message; From field ✕ button inconsistency vs M-01)  
**Security:** XSS input safely handled ✅
