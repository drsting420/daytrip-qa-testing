# Test Cases — M-01: Search — City-to-City Transfer

**Module:** M-01  
**Module Priority:** P1 — Critical  
**Page:** `https://daytrip.com/` (Transfers tab)  
**Author:** Pavel Gribovskiy  
**Date:** 2026-04-26  

---

## Search Form Elements

| # | Element | Type | Placeholder / Label | Default value |
|---|---|---|---|---|
| 1 | From | Text input + autocomplete | "From city, hotel, airport" | Empty |
| 2 | To | Text input + autocomplete | "To city, hotel, airport" | Empty |
| 3 | Departure date | Date picker (two-month calendar) | "Departure" → "Select date" | Not selected |
| 4 | Departure time | Dropdown (Select time) | "Select time" | Not selected |
| 5 | Add return | Button / toggle | "+ Add return" | Inactive |
| 6 | Adults | Counter (− / +) | "Adults, Age 12+" | 2 |
| 7 | Children | Counter (− / +) | "Children, Age 0-12" | 0 |
| 8 | Extra sets of bags | Counter (− / +) | "Extra sets of bags" | 0 |
| 9 | Multi-city | Button / toggle | "Multi-city" | Inactive |
| 10 | Search | Button | "Search" | — |

---

## TC-M01-001: Autocomplete — valid city in From field

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-001 |
| **Title** | Verify city autocomplete returns results for valid input in From field |
| **Module** | M-01 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on daytrip.com homepage, Transfers tab is active, From field is empty |
| **Test Data** | searchString: "Prague" |
| **Steps** | 1. Click on "From city, hotel, airport" field 2. Type "Prague" |
| **Expected Result** | Autocomplete dropdown appears with "Prague, Czechia" as first suggestion. Dropdown contains city names with country names |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Autocomplete dropdown is visible |
| **Notes** | — |

---

## TC-M01-002: Autocomplete — select city from From dropdown

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-002 |
| **Title** | Verify user can select a city from From autocomplete dropdown |
| **Module** | M-01 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | TC-M01-001 completed, autocomplete dropdown is visible with "Prague, Czechia" |
| **Test Data** | Select: "Prague, Czechia" |
| **Steps** | 1. Click on "Prague, Czechia" in the autocomplete dropdown |
| **Expected Result** | "Prague" appears in the From field. Dropdown closes. Cursor moves to the To field |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | "Prague" is selected in From field, To field is active |
| **Notes** | — |

---

## TC-M01-003: Autocomplete — valid city in To field

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-003 |
| **Title** | Verify city autocomplete returns results for valid input in To field |
| **Module** | M-01 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | "Prague" is selected in From field, To field is empty |
| **Test Data** | searchString: "Vienna" |
| **Steps** | 1. Click on "To city, hotel, airport" field 2. Type "Vienna" |
| **Expected Result** | Autocomplete dropdown appears with "Vienna, Austria" as first suggestion |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Autocomplete dropdown is visible with Vienna suggestions |
| **Notes** | — |

---

## TC-M01-004: Autocomplete — airport search

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-004 |
| **Title** | Verify autocomplete returns airport results when airport name or code is entered |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on homepage, From field is empty |
| **Test Data** | searchString: "PRG" (Prague airport IATA code) |
| **Steps** | 1. Click on From field 2. Type "PRG" |
| **Expected Result** | Autocomplete dropdown includes "Prague International Airport (PRG)" with airport icon |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Airport suggestion is visible in dropdown |
| **Notes** | Phase 0 confirmed airportCodes field in API response and airport icon in dropdown |

---

## TC-M01-005: Autocomplete — hotel search

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-005 |
| **Title** | Verify autocomplete returns hotel results when hotel name is entered |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on homepage, From field is empty |
| **Test Data** | searchString: "Hilton Prague" |
| **Steps** | 1. Click on From field 2. Type "Hilton Prague" |
| **Expected Result** | Autocomplete dropdown includes hotel result with hotel-specific icon or label |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Hotel suggestion is visible in dropdown |
| **Notes** | Placeholder says "From city, hotel, airport" — hotel search should be supported |

---

## TC-M01-006: Autocomplete — minimum characters trigger

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-006 |
| **Title** | Verify autocomplete triggers after entering minimum required characters |
| **Module** | M-01 |
| **Priority** | Medium |
| **Type** | Boundary |
| **Preconditions** | User is on homepage, From field is empty |
| **Test Data** | searchString: "Pr" (2 characters) |
| **Steps** | 1. Click on From field 2. Type "P" 3. Observe — does dropdown appear? 4. Type "r" (now "Pr") 5. Observe — does dropdown appear? |
| **Expected Result** | Dropdown does NOT appear after 1 character ("P"). Dropdown appears after 2 characters ("Pr") with suggestions (Prague, Preston, Pristina, etc.) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Autocomplete dropdown is visible |
| **Notes** | Phase 0 XHR mapping confirmed GraphQL sends request with searchString: "Pr" (2 chars) |

---

## TC-M01-007: Autocomplete — invalid input (numbers)

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-007 |
| **Title** | Verify autocomplete handles numeric input gracefully |
| **Module** | M-01 |
| **Priority** | Medium |
| **Type** | Negative |
| **Preconditions** | User is on homepage, From field is empty |
| **Test Data** | searchString: "12345" |
| **Steps** | 1. Click on From field 2. Type "12345" |
| **Expected Result** | Autocomplete dropdown shows no results or displays a "no results found" message. No error or crash |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | From field contains "12345", no suggestions visible |
| **Notes** | — |

---

## TC-M01-008: Autocomplete — special characters (XSS payload)

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-008 |
| **Title** | Verify autocomplete does not execute script when XSS payload is entered |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on homepage, From field is empty |
| **Test Data** | searchString: `<script>alert('xss')</script>` |
| **Steps** | 1. Click on From field 2. Paste `<script>alert('xss')</script>` 3. Observe page behavior |
| **Expected Result** | No JavaScript alert popup. No page crash. Input is treated as plain text. Autocomplete shows no results or "no results found" |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Page remains functional, no script execution |
| **Notes** | Security test case — also belongs to security test suite |

---

## TC-M01-009: Autocomplete — empty input

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-009 |
| **Title** | Verify autocomplete does not trigger on empty or whitespace-only input |
| **Module** | M-01 |
| **Priority** | Medium |
| **Type** | Negative |
| **Preconditions** | User is on homepage, From field is empty |
| **Test Data** | searchString: "   " (3 spaces) |
| **Steps** | 1. Click on From field 2. Press Space bar 3 times |
| **Expected Result** | Autocomplete dropdown does not appear. No API requests sent for whitespace-only input |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | From field contains spaces, no dropdown visible |
| **Notes** | — |

---

## TC-M01-010: Autocomplete — unicode input

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-010 |
| **Title** | Verify autocomplete handles unicode characters (non-Latin scripts) |
| **Module** | M-01 |
| **Priority** | Low |
| **Type** | Edge case |
| **Preconditions** | User is on homepage, From field is empty |
| **Test Data** | searchString: "Прага" (Russian for Prague) |
| **Steps** | 1. Click on From field 2. Type "Прага" |
| **Expected Result** | Autocomplete either returns "Prague, Czechia" or shows no results. No error or crash |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Page remains functional |
| **Notes** | Tests internationalization support of the search |

---

## TC-M01-011: Swap From and To

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-011 |
| **Title** | Verify user can swap From and To cities using the swap button |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | "Prague" is selected in From field, "Vienna" is selected in To field |
| **Test Data** | From: "Prague", To: "Vienna" |
| **Steps** | 1. Click on the swap icon (⇄) between From and To fields |
| **Expected Result** | From field now shows "Vienna", To field now shows "Prague". Values are swapped |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | From: "Vienna", To: "Prague" |
| **Notes** | Swap button visible on Phase 0 screenshot between From and To fields |

---

## TC-M01-012: Date picker — select future date

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-012 |
| **Title** | Verify user can select a future departure date from the calendar |
| **Module** | M-01 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on homepage, From and To are filled |
| **Test Data** | Select a date 7 days from today |
| **Steps** | 1. Click on "Departure" field 2. Calendar popup opens showing current and next month 3. Click on a date 7 days from today |
| **Expected Result** | Date is selected and highlighted in the calendar. "Departure date" field below the calendar shows the selected date. Departure time dropdown becomes available |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Date is selected, time selection is available |
| **Notes** | — |

---

## TC-M01-013: Date picker — past dates are disabled

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-013 |
| **Title** | Verify past dates are disabled and cannot be selected in the calendar |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on homepage, Departure calendar is open |
| **Test Data** | Any date before today |
| **Steps** | 1. Click on "Departure" field 2. Try to click on a past date (greyed out) |
| **Expected Result** | Past dates are visually greyed out. Clicking on a past date does nothing — date is not selected |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | No date is selected, calendar remains open |
| **Notes** | Phase 0 screenshot confirmed past dates appear greyed out |

---

## TC-M01-014: Date picker — navigate to next/previous month

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-014 |
| **Title** | Verify calendar navigation arrows work to switch between months |
| **Module** | M-01 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | Departure calendar is open, showing April 2026 / May 2026 |
| **Test Data** | — |
| **Steps** | 1. Click right arrow (→) to navigate forward 2. Observe calendar months change 3. Click left arrow (←) to navigate back |
| **Expected Result** | Right arrow: calendar shifts to May 2026 / June 2026. Left arrow: calendar shifts back. Cannot navigate to past months (left arrow disabled when showing current month) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Calendar shows updated months |
| **Notes** | — |

---

## TC-M01-015: Departure time — select time

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-015 |
| **Title** | Verify user can select departure time from the dropdown |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Departure date is selected |
| **Test Data** | Select time: "9:00 AM" |
| **Steps** | 1. Click on "Departure time — Select time" dropdown 2. Select "9:00 AM" |
| **Expected Result** | Time "9:00 AM" is selected and displayed in the Departure time field. Departure field in the main form updates to show date and time |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Date and time are both selected |
| **Notes** | — |

---

## TC-M01-016: Passengers — increase Adults

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-016 |
| **Title** | Verify user can increase the number of adults using + button |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on homepage, passengers dropdown is open, Adults = 2 |
| **Test Data** | Click + once |
| **Steps** | 1. Click on passengers icon to open dropdown 2. Click "+" button next to Adults |
| **Expected Result** | Adults counter increases from 2 to 3. Passenger icon in the form updates accordingly |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Adults = 3 |
| **Notes** | — |

---

## TC-M01-017: Passengers — decrease Adults to minimum

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-017 |
| **Title** | Verify Adults cannot be decreased below minimum value (1) |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Boundary |
| **Preconditions** | Passengers dropdown is open, Adults = 2 |
| **Test Data** | Click − twice |
| **Steps** | 1. Click "−" button next to Adults — value becomes 1 2. Click "−" button again |
| **Expected Result** | Adults value stops at 1. "−" button becomes disabled or click has no effect. At least 1 adult is always required |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Adults = 1, cannot go lower |
| **Notes** | — |

---

## TC-M01-018: Passengers — add Children

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-018 |
| **Title** | Verify user can add children (Age 0-12) |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Passengers dropdown is open, Children = 0 |
| **Test Data** | Click + twice |
| **Steps** | 1. Click "+" button next to Children twice |
| **Expected Result** | Children counter increases from 0 to 2. Passenger summary in form updates to reflect 2 adults + 2 children |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Children = 2 |
| **Notes** | — |

---

## TC-M01-019: Passengers — maximum passengers limit

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-019 |
| **Title** | Verify there is a maximum limit for total passengers |
| **Module** | M-01 |
| **Priority** | Medium |
| **Type** | Boundary |
| **Preconditions** | Passengers dropdown is open |
| **Test Data** | Increase Adults and Children to maximum |
| **Steps** | 1. Click "+" on Adults repeatedly until button becomes disabled 2. Note maximum Adults value 3. Click "+" on Children repeatedly until button becomes disabled 4. Note maximum Children value |
| **Expected Result** | There is a maximum limit for passengers. "+" button becomes disabled or stops incrementing at maximum value. Maximum values are documented |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Maximum passenger values documented |
| **Notes** | Largest vehicle (Van) seats 5-7 — maximum might be 7 |

---

## TC-M01-020: Extra bags — add and remove

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-020 |
| **Title** | Verify user can add and remove extra sets of bags |
| **Module** | M-01 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | Passengers dropdown is open, Extra sets of bags = 0 |
| **Test Data** | Click + twice, then − once |
| **Steps** | 1. Click "+" next to "Extra sets of bags" twice — value becomes 2 2. Click "−" once — value becomes 1 3. Verify "−" button works at value 1 4. Click "−" again — value becomes 0 5. Click "−" at 0 |
| **Expected Result** | Counter increments and decrements correctly. Value cannot go below 0. "−" button disabled at 0 |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Extra sets of bags = 0 |
| **Notes** | Baggage info shown: "One checked bag + one carry on" per extra set |

---

## TC-M01-021: Search — valid complete search

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-021 |
| **Title** | Verify successful search with all required fields filled |
| **Module** | M-01 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on homepage |
| **Test Data** | From: "Prague", To: "Vienna", Date: 7 days from today, Time: "9:00 AM", Adults: 2, Children: 0, Extra bags: 0 |
| **Steps** | 1. Enter "Prague" in From field, select from autocomplete 2. Enter "Vienna" in To field, select from autocomplete 3. Select departure date (7 days from today) 4. Select departure time "9:00 AM" 5. Leave passengers as default (2 adults) 6. Click "Search" button |
| **Expected Result** | User is redirected to results page. URL contains route info. Page shows vehicle options with prices |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Results page is displayed with vehicle options |
| **Notes** | This is the core happy path test case |

---

## TC-M01-022: Search — empty From field

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-022 |
| **Title** | Verify search is blocked when From field is empty |
| **Module** | M-01 |
| **Priority** | Critical |
| **Type** | Negative |
| **Preconditions** | User is on homepage, From field is empty, To: "Vienna", Date and Time selected |
| **Test Data** | From: empty, To: "Vienna" |
| **Steps** | 1. Leave From field empty 2. Fill in To, Date, Time 3. Click "Search" |
| **Expected Result** | Search is not performed. Validation error or visual indication on From field. User stays on homepage |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User remains on homepage, From field highlighted |
| **Notes** | — |

---

## TC-M01-023: Search — empty To field

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-023 |
| **Title** | Verify search is blocked when To field is empty |
| **Module** | M-01 |
| **Priority** | Critical |
| **Type** | Negative |
| **Preconditions** | From: "Prague", To: empty, Date and Time selected |
| **Test Data** | From: "Prague", To: empty |
| **Steps** | 1. Fill in From: "Prague" 2. Leave To field empty 3. Select Date and Time 4. Click "Search" |
| **Expected Result** | Search is not performed. Validation error or visual indication on To field. User stays on homepage |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User remains on homepage, To field highlighted |
| **Notes** | — |

---

## TC-M01-024: Search — no date selected

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-024 |
| **Title** | Verify search behavior when departure date is not selected |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | From: "Prague", To: "Vienna", Date: not selected |
| **Test Data** | From: "Prague", To: "Vienna", Date: empty |
| **Steps** | 1. Fill in From and To 2. Do NOT select departure date 3. Click "Search" |
| **Expected Result** | Either: search is blocked with validation message, OR date picker opens automatically prompting user to select a date |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User prompted to select date |
| **Notes** | — |

---

## TC-M01-025: Search — same city in From and To

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-025 |
| **Title** | Verify search handles same city entered in both From and To |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on homepage |
| **Test Data** | From: "Prague", To: "Prague" |
| **Steps** | 1. Enter "Prague" in From field, select it 2. Enter "Prague" in To field, select it 3. Select Date and Time 4. Click "Search" |
| **Expected Result** | Search is blocked or error message displayed: origin and destination cannot be the same city |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User stays on homepage with error indication |
| **Notes** | — |

---

## TC-M01-026: Clear From field after selection

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-026 |
| **Title** | Verify user can clear the From field after selecting a city |
| **Module** | M-01 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | "Prague" is selected in From field |
| **Test Data** | — |
| **Steps** | 1. Click the clear (✕) button inside the From field, or select all text and delete |
| **Expected Result** | From field is cleared, returns to placeholder "From city, hotel, airport". Previous selection is removed |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | From field is empty |
| **Notes** | — |

---

## TC-M01-027: Add return toggle

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-027 |
| **Title** | Verify Add return toggle adds return trip fields |
| **Module** | M-01 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on homepage, From and To are filled |
| **Test Data** | From: "Prague", To: "Vienna" |
| **Steps** | 1. Click "+ Add return" |
| **Expected Result** | Return trip fields appear (return date, return time). Return route is automatically set as Vienna → Prague (reverse of original) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Return trip section is visible |
| **Notes** | — |

---

## TC-M01-028: Multi-city toggle

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-028 |
| **Title** | Verify Multi-city button adds additional route segment |
| **Module** | M-01 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on homepage |
| **Test Data** | — |
| **Steps** | 1. Click "Multi-city" button 2. Observe form changes |
| **Expected Result** | Additional route segment fields appear (third city input, second date). User can add multiple stops to create a multi-leg journey |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Multi-city form is visible |
| **Notes** | — |

---

## TC-M01-029: Autocomplete — long string input

| Field | Value |
|---|---|
| **Test Case ID** | TC-M01-029 |
| **Title** | Verify autocomplete handles very long input string without crash |
| **Module** | M-01 |
| **Priority** | Low |
| **Type** | Boundary |
| **Preconditions** | User is on homepage, From field is empty |
| **Test Data** | searchString: 500-character random string |
| **Steps** | 1. Click on From field 2. Paste a 500-character string |
| **Expected Result** | No page crash or JavaScript error. Autocomplete shows no results or handles input gracefully. Field may truncate the input |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Page remains functional |
| **Notes** | — |

---

## Summary

| Type | Count |
|---|---|
| Positive | 14 |
| Negative | 7 |
| Boundary | 4 |
| Edge case | 1 |
| **Total** | **26** |

| Priority | Count |
|---|---|
| Critical | 5 |
| High | 10 |
| Medium | 7 |
| Low | 2 |
| **Total** | **26** (2 also belong to Security suite) |
