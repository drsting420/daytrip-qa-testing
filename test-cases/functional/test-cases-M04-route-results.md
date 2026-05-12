# Test Cases — M-04: Route Results Page

**Module:** M-04  
**Module Priority:** P1 — Critical  
**Page:** `daytrip.com/en/configurator/car?c={booking_id}`  
**Author:** Pavel Gribovskiy  
**Date:** 2026-04-26  

---

## Results Page Elements

| # | Element | Description |
|---|---|---|
| 1 | Progress bar | 3 steps: ① Select your ride → ② Add stops → ③ Details & Payment |
| 2 | Tags / Filters | "Door-to-door", "Driver speaks English", "Sightseeing available" — change based on selected vehicle |
| 3 | Free cancellation notice | "Free cancellations up to 24 hours before departure" |
| 4 | Vehicle cards | List of options: Sedan Lite, Sedan, Compact MPV, Van, Luxury sedan |
| 5 | Vehicle details | Vehicle icon, name, passengers, luggage (checked + carry-on), price (total + per person) |
| 6 | Sedan Lite specifics | Tags: "Driver with limited English", "No sightseeing" |
| 7 | Upsell banner | Yellow banner when Sedan Lite is selected: "Don't miss out! Upgrade to Sedan for just €X" |
| 8 | Sidebar — Itinerary | One way badge, passengers, luggage, date, From→To with time, Edit link |
| 9 | Sidebar — Price details | Transport, Stops, Total |
| 10 | Back button | "← Back" — returns to homepage |
| 11 | Next button | "Next: Add stops" (for Sedan+) or "Next: Checkout" (for Sedan Lite) |
| 12 | Currency selector | "€ - EUR" in header |
| 13 | Language selector | "EN" in header |

---

## TC-M04-001: Results page loads with vehicle options

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-001 |
| **Title** | Verify results page displays vehicle options after valid search |
| **Module** | M-04 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | Valid search completed: Prague → Vienna, future date, 9:00 AM, 2 adults |
| **Test Data** | From: Prague, To: Vienna |
| **Steps** | 1. Complete a valid search from homepage (Prague → Vienna, future date, 2 adults) 2. Observe the results page |
| **Expected Result** | Results page loads. Progress bar shows Step 1 "Select your ride" as active. At least one vehicle option is displayed with name, image, passenger capacity, luggage capacity, and price |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Results page is displayed |
| **Notes** | — |

---

## TC-M04-002: All five vehicle types are displayed

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-002 |
| **Title** | Verify all five vehicle types are displayed for Prague → Vienna route |
| **Module** | M-04 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Results page loaded for Prague → Vienna, 2 adults |
| **Test Data** | Route: Prague → Vienna |
| **Steps** | 1. On results page, count and identify all vehicle options |
| **Expected Result** | Five vehicle types displayed: Sedan Lite, Sedan, Compact MPV, Van, Luxury sedan. Each has: vehicle image, name, passenger range, luggage count, total price, and price per person |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | All vehicles visible |
| **Notes** | Number of vehicle types may vary by route — 5 confirmed for Prague→Vienna |

---

## TC-M04-003: Default vehicle is pre-selected

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-003 |
| **Title** | Verify Sedan is pre-selected as default vehicle option |
| **Module** | M-04 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | Results page loaded for Prague → Vienna, 2 adults |
| **Test Data** | — |
| **Steps** | 1. Observe which vehicle card has a blue border (selected state) on page load |
| **Expected Result** | "Sedan" card is pre-selected with blue border. Sidebar price shows Sedan price (€325 for this route) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Sedan is selected |
| **Notes** | — |

---

## TC-M04-004: Select different vehicle — sidebar updates

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-004 |
| **Title** | Verify sidebar price updates when selecting a different vehicle |
| **Module** | M-04 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | Results page loaded, Sedan is pre-selected (€325) |
| **Test Data** | Select: Compact MPV (€412) |
| **Steps** | 1. Click on "Compact MPV" vehicle card 2. Observe sidebar Price details |
| **Expected Result** | Compact MPV card gets blue border (selected state). Sedan loses selection. Sidebar Transport price updates to €412. Total updates to €412. Stops remains €0 |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Compact MPV is selected, sidebar shows updated price |
| **Notes** | — |

---

## TC-M04-005: Select Sedan Lite — tags change, upsell appears

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-005 |
| **Title** | Verify Sedan Lite selection changes tags and shows upsell banner |
| **Module** | M-04 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Results page loaded, Sedan is pre-selected |
| **Test Data** | Select: Sedan Lite (€309) |
| **Steps** | 1. Click on "Sedan Lite" vehicle card 2. Observe tags at the top of the vehicle list 3. Observe area below Sedan Lite card |
| **Expected Result** | Sedan Lite card gets blue border. Tags change: "Driver speaks English" and "Sightseeing available" are removed, only "Door-to-door" remains. Sedan Lite shows additional tags: "Driver with limited English", "No sightseeing". Yellow upsell banner appears: "Don't miss out! To add sightseeing stops on the next step, upgrade to a Sedan for just €16." Sidebar price updates to €309 |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Sedan Lite selected, upsell banner visible |
| **Notes** | — |

---

## TC-M04-006: Sedan Lite — Next button skips stops step

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-006 |
| **Title** | Verify "Next" button text changes to "Next: Checkout" for Sedan Lite (skips stops) |
| **Module** | M-04 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Sedan Lite is selected on results page |
| **Test Data** | — |
| **Steps** | 1. With Sedan Lite selected, observe the "Next" button at the bottom of the page |
| **Expected Result** | Button text shows "Next: Checkout" (not "Next: Add stops"). Since Sedan Lite has "No sightseeing", Step 2 (Add stops) is skipped |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | Compare with Sedan/MPV/Van which show "Next: Add stops" |

---

## TC-M04-007: Non-Lite vehicle — Next button goes to stops

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-007 |
| **Title** | Verify "Next" button text shows "Next: Add stops" for non-Lite vehicles |
| **Module** | M-04 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Results page loaded |
| **Test Data** | Select: Sedan (€325) |
| **Steps** | 1. Click on "Sedan" vehicle card 2. Observe the "Next" button at the bottom |
| **Expected Result** | Button text shows "Next: Add stops". Tags include "Sightseeing available" |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | — |

---

## TC-M04-008: Sidebar itinerary displays correct route info

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-008 |
| **Title** | Verify sidebar itinerary shows correct route, date, time, and passenger info |
| **Module** | M-04 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | Results page loaded for Prague → Vienna, Sun May 3, 9:00 AM, 2 adults |
| **Test Data** | From: Prague, To: Vienna, Date: Sun May 3, Time: 9:00 AM, Adults: 2 |
| **Steps** | 1. Observe the sidebar on the right side of the results page |
| **Expected Result** | Sidebar shows: "One way" badge, "👥 2 🧳 2", "Sun, May 3", "Prague, Czech Republic — 9:00 AM", "Vienna, Austria — [arrival time]", "Edit" link, Price details (Transport, Stops, Total), "Free cancellation up to 24 hours before your pickup time" |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | — |

---

## TC-M04-009: Edit link in sidebar returns to search

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-009 |
| **Title** | Verify "Edit" link in sidebar allows user to modify search parameters |
| **Module** | M-04 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | Results page loaded |
| **Test Data** | — |
| **Steps** | 1. Click "Edit" link in the sidebar itinerary section 2. Observe what happens |
| **Expected Result** | User is either redirected back to the search form or an edit modal/panel opens allowing modification of From, To, Date, Time, or Passengers |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User can modify search parameters |
| **Notes** | — |

---

## TC-M04-010: Back button returns to homepage

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-010 |
| **Title** | Verify "← Back" button returns user to the homepage |
| **Module** | M-04 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | Results page loaded |
| **Test Data** | — |
| **Steps** | 1. Click "← Back" button at the bottom of the page |
| **Expected Result** | User is returned to the homepage. Search fields retain previously entered values (Prague, Vienna, date) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User is on homepage |
| **Notes** | — |

---

## TC-M04-011: Vehicle card displays correct capacity info

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-011 |
| **Title** | Verify each vehicle card shows correct passenger and luggage capacity |
| **Module** | M-04 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Results page loaded with all 5 vehicle types |
| **Test Data** | — |
| **Steps** | 1. For each vehicle card, verify the displayed capacity icons |
| **Expected Result** | Each card shows: passenger icon with range (e.g., 👥 1-3), checked bag icon with count (e.g., 🧳 3), carry-on icon with count (e.g., 💼 3). Values per vehicle: Sedan Lite (1-3, 3, 3), Sedan (1-3, 3, 3), Compact MPV (4, 4, 4), Van (5-7, 7, 7), Luxury sedan (1-2, 2, 2) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | — |

---

## TC-M04-012: Price per person calculation

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-012 |
| **Title** | Verify price per person is correctly calculated for each vehicle |
| **Module** | M-04 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Results page loaded, 2 adults |
| **Test Data** | 2 adults |
| **Steps** | 1. For each vehicle, check the "per person" price 2. Verify: per person price = total price / number of passengers (2) |
| **Expected Result** | Per person prices are correct: Sedan Lite €309 / 2 = €154.5 pp, Sedan €325 / 2 = €162.5 pp, Compact MPV €412 / 2 = €206 pp, Van €492 / 2 = €246 pp, Luxury sedan €474 / 2 = €237 pp |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | Prices are dynamic and may change |

---

## TC-M04-013: Free cancellation notice is displayed

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-013 |
| **Title** | Verify free cancellation notice is displayed on results page |
| **Module** | M-04 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | Results page loaded |
| **Test Data** | — |
| **Steps** | 1. Observe the area above vehicle cards 2. Observe the sidebar |
| **Expected Result** | Two free cancellation notices visible: "Free cancellations up to 24 hours before departure" (above vehicle list with green checkmark) and "Free cancellation up to 24 hours before your pickup time" (in sidebar, green badge) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | — |

---

## TC-M04-014: Progress bar shows correct active step

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-014 |
| **Title** | Verify progress bar correctly shows Step 1 as active on results page |
| **Module** | M-04 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | Results page loaded |
| **Test Data** | — |
| **Steps** | 1. Observe the progress bar at the top of the page |
| **Expected Result** | Progress bar shows 3 steps: ① "Select your ride" (active/highlighted), ② "Add stops" (inactive), ③ "Details & Payment" (inactive) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | — |

---

## TC-M04-015: Currency selector is visible

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-015 |
| **Title** | Verify currency selector is displayed in the header on results page |
| **Module** | M-04 |
| **Priority** | Low |
| **Type** | Positive |
| **Preconditions** | Results page loaded |
| **Test Data** | — |
| **Steps** | 1. Observe the top-right corner of the page header |
| **Expected Result** | Currency selector is visible showing "€ - EUR". Language selector "EN" is also present |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | Currency switching functionality is not in scope for M-04, but presence is verified |

---

## TC-M04-016: Next button proceeds to Step 2 (Add stops)

| Field | Value |
|---|---|
| **Test Case ID** | TC-M04-016 |
| **Title** | Verify clicking "Next: Add stops" proceeds to Step 2 of booking flow |
| **Module** | M-04 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | Results page loaded, Sedan is selected |
| **Test Data** | Selected vehicle: Sedan |
| **Steps** | 1. Ensure Sedan is selected (blue border) 2. Click "Next: Add stops" button |
| **Expected Result** | User proceeds to Step 2 "Add stops" page. Progress bar updates: Step 1 shows checkmark, Step 2 becomes active. Sightseeing stops are displayed |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User is on Step 2 — Add stops page |
| **Notes** | This test case bridges M-04 and M-06 (Booking Flow) |

---

## Summary

| Type | Count |
|---|---|
| Positive | 16 |
| Negative | 0 |
| Boundary | 0 |
| Edge case | 0 |
| **Total** | **16** |

| Priority | Count |
|---|---|
| Critical | 4 |
| High | 5 |
| Medium | 5 |
| Low | 2 |
| **Total** | **16** |

**Note:** M-04 test cases are predominantly positive because the results page is a display/selection page. Negative and boundary tests for this area are covered in M-01 (search validation prevents invalid data from reaching results) and M-06 (booking flow validation).
