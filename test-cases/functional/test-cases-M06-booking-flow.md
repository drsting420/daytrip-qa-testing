# Test Cases — M-06: Booking Flow

**Module:** M-06  
**Module Priority:** P1 — Critical  
**Pages:** Step 2: `/en/configurator/stops?c={id}`, Step 3: `/en/checkout?c={id}`  
**Author:** Pavel Gribovskiy  
**Date:** 2026-04-26  
**Testing boundary:** Up to "Book with..." button — do NOT click  

---

## Booking Flow Elements

### Step 2 — Add stops (`/en/configurator/stops`)

| # | Element | Description |
|---|---|---|
| 1 | Sightseeing stop cards | Cards with photo, name, duration, price, + button |
| 2 | Stop tags | "Most popular", "Recommended" |
| 3 | Added stop indicator | Card changes appearance: blue border, ✏️ (edit) button, stop appears in sidebar |
| 4 | Sidebar — Itinerary | Route, arrival time (updates when stop added), Stops badge, Price details |
| 5 | "Forgot to add stops?" modal | Appears when clicking "Skip stop selection": upsell for Lednice Chateau, buttons "Add this stop" / "Book without stops" |
| 6 | Back button | "← Back" — returns to Step 1 |
| 7 | Skip / Next button | "Skip stop selection" (0 stops) or "Next: Checkout" (1+ stops) |

### Step 3 — Details & Payment (`/en/checkout`)

| # | Element | Description |
|---|---|---|
| 8 | Log in to book faster | OAuth section: Apple, Google, Facebook. Dismissible (✕) |
| 9 | Contact information | Name, Surname, Phone (country code + number), Email |
| 10 | Add another contact | Link to add a second contact |
| 11 | Age confirmation | Checkbox "The lead passenger is over 18 years old" |
| 12 | Special requirements | Expandable section (+) |
| 13 | Pickup and drop-off | "Add pickup point", "Add drop-off point", info: "up to 24 hours before departure" |
| 14 | Upgrade your ride | Upsell: Luxury sedan, "Recommended for you", "Upgrade for €149" |
| 15 | Payment method | Apple Pay, Google Pay, Credit/debit card (Visa/MC/Amex +3), Cash on pickup (EUR) |
| 16 | Promo code | "Add promo code" link |
| 17 | Marketing opt-in | Checkbox "I want to receive exclusive offers and travel tips" |
| 18 | Legal footer | "SSL protected", Terms of Use, Privacy Policy |
| 19 | Book button | "Book with Apple Pay" (changes based on selected payment method) |
| 20 | Sidebar | Itinerary, Selected vehicle (image + name), Original price, Total |

---

## Step 2 — Add Stops

---

## TC-M06-001: Add sightseeing stop

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-001 |
| **Title** | Verify user can add a sightseeing stop to the trip |
| **Module** | M-06 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on Step 2 "Add stops" page, Sedan selected, no stops added |
| **Test Data** | Stop: Kutna Hora (1h 30m, €58) |
| **Steps** | 1. Click + button on "Kutna Hora" card |
| **Expected Result** | Kutna Hora card gets blue border and edit icon (✏️). Sidebar updates: "Stops" section shows "Kutna Hora (1h 30m, €58)" with remove (✕) button. Stops price changes from €0 to €58. Total updates (Transport + Stops). Arrival time in sidebar increases. "No Stops" badge changes to "1 Stop". Button changes from "Skip stop selection" to "Next: Checkout" |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Kutna Hora added, sidebar reflects updated price and time |
| **Notes** | — |

---

## TC-M06-002: Remove sightseeing stop

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-002 |
| **Title** | Verify user can remove a previously added sightseeing stop |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | Kutna Hora is added (TC-M06-001 completed) |
| **Test Data** | Remove: Kutna Hora |
| **Steps** | 1. Click ✕ button next to "Kutna Hora (1h 30m, €58)" in the sidebar, or click the edit icon (✏️) on the Kutna Hora card |
| **Expected Result** | Kutna Hora is removed from sidebar. Stops price returns to €0. Total returns to Transport-only price. Arrival time decreases back to original. Badge returns to "No Stops". Button returns to "Skip stop selection" |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | No stops added, original state restored |
| **Notes** | — |

---

## TC-M06-003: Add multiple stops

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-003 |
| **Title** | Verify user can add multiple sightseeing stops |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on Step 2, no stops added |
| **Test Data** | Stop 1: Kutna Hora (€58), Stop 2: Lednice Chateau and Park (€31) |
| **Steps** | 1. Click + on Kutna Hora 2. Click + on Lednice Chateau and Park 3. Observe sidebar |
| **Expected Result** | Both stops appear in sidebar Stops section. Stops price = €58 + €31 = €89. Total = Transport + €89. Badge shows "2 Stops". Arrival time increases further |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Two stops added |
| **Notes** | — |

---

## TC-M06-004: Skip stop selection — upsell modal appears

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-004 |
| **Title** | Verify "Forgot to add stops?" modal appears when skipping stops |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on Step 2, no stops added |
| **Test Data** | — |
| **Steps** | 1. Click "Skip stop selection" button |
| **Expected Result** | Modal popup appears: "Forgot to add stops?" with upsell for recommended stop (Lednice Chateau and Park, "Most popular", Duration: 60 min stop, Price: €31). Two buttons: "Add this stop" (blue, primary) and "Book without stops" (white, secondary) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Modal is visible |
| **Notes** | — |

---

## TC-M06-005: Dismiss upsell modal — proceed without stops

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-005 |
| **Title** | Verify user can dismiss upsell modal and proceed to checkout without stops |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | "Forgot to add stops?" modal is visible (TC-M06-004 completed) |
| **Test Data** | — |
| **Steps** | 1. Click "Book without stops" button in the modal |
| **Expected Result** | Modal closes. User proceeds to Step 3 "Details & Payment". Progress bar: Step 1 ✓, Step 2 ✓, Step 3 active. Sidebar shows "No Stops", Stops = €0 |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User is on Step 3 |
| **Notes** | — |

---

## TC-M06-006: Back from Step 2 to Step 1

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-006 |
| **Title** | Verify "← Back" button returns user from Step 2 to Step 1 (Select your ride) |
| **Module** | M-06 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on Step 2 |
| **Test Data** | — |
| **Steps** | 1. Click "← Back" button |
| **Expected Result** | User returns to Step 1 "Select your ride". Previously selected vehicle (Sedan) is still selected. Progress bar: Step 1 active |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User is on Step 1 with previous selection preserved |
| **Notes** | — |

---

## Step 3 — Details & Payment

---

## TC-M06-007: Step 3 page loads with all sections

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-007 |
| **Title** | Verify Step 3 "Details & Payment" page displays all required sections |
| **Module** | M-06 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User proceeded to Step 3 from Step 2 |
| **Test Data** | — |
| **Steps** | 1. Observe all sections on the Details & Payment page |
| **Expected Result** | Page contains all sections: "Log in to book faster" (dismissible), "Contact information" (Name, Surname, Phone, Email), age confirmation checkbox, "I have special requirements" (expandable), "Pickup and drop-off location", "Upgrade your ride" upsell, "Payment method" (4 options), marketing opt-in checkbox, legal footer (SSL, Terms, Privacy), "Book with..." button. Sidebar shows Itinerary + Selected vehicle + Total |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | All sections visible |
| **Notes** | — |

---

## TC-M06-008: Dismiss "Log in to book faster" section

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-008 |
| **Title** | Verify user can dismiss the "Log in to book faster" OAuth section |
| **Module** | M-06 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on Step 3, "Log in to book faster" section is visible |
| **Test Data** | — |
| **Steps** | 1. Click ✕ button on the "Log in to book faster" section |
| **Expected Result** | OAuth section (Apple, Google, Facebook buttons) is hidden. Contact information form remains visible. Rest of the page is unaffected |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | OAuth section dismissed, form accessible |
| **Notes** | Booking flow is accessible without login |

---

## TC-M06-009: Contact information — valid input

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-009 |
| **Title** | Verify contact information form accepts valid input |
| **Module** | M-06 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on Step 3 |
| **Test Data** | Name: "John", Surname: "Doe", Phone: "+1 555-123-4567", Email: "john.doe@example.com" |
| **Steps** | 1. Enter "John" in Name field 2. Enter "Doe" in Surname field 3. Select country code, enter phone number 4. Enter "john.doe@example.com" in Email field |
| **Expected Result** | All fields accept input. No validation errors. Fields display entered values correctly |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Contact form filled with valid data |
| **Notes** | Use synthetic test data only — do not use real personal data |

---

## TC-M06-010: Contact information — invalid email format

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-010 |
| **Title** | Verify email field validates email format |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on Step 3, other fields filled with valid data |
| **Test Data** | Email: "not-an-email" |
| **Steps** | 1. Enter "not-an-email" in Email field 2. Click outside the field or attempt to proceed |
| **Expected Result** | Validation error appears indicating invalid email format. Email field is highlighted |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Validation error visible |
| **Notes** | — |

---

## TC-M06-011: Contact information — empty required fields

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-011 |
| **Title** | Verify form validation when required contact fields are empty |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on Step 3, all contact fields are empty |
| **Test Data** | All fields empty |
| **Steps** | 1. Leave all contact fields empty 2. Check the age confirmation checkbox 3. Select a payment method 4. Click "Book with..." button |
| **Expected Result** | Booking is NOT completed. Validation errors shown on empty required fields (Name, Surname, Phone, Email). User remains on Step 3 |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User on Step 3 with validation errors |
| **Notes** | ⚠️ This test clicks "Book with..." — verify that validation fires BEFORE any payment processing |

---

## TC-M06-012: Phone country code selector

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-012 |
| **Title** | Verify phone country code selector works |
| **Module** | M-06 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on Step 3 |
| **Test Data** | Change country code from +1 to another country |
| **Steps** | 1. Click on the country code dropdown (shows flag + "+1") 2. Select a different country (e.g., Czech Republic +420) |
| **Expected Result** | Dropdown opens with list of countries and codes. Selected country flag and code update. Phone number field remains editable |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Country code changed |
| **Notes** | Default shows US flag +1 — should auto-detect based on user location? |

---

## TC-M06-013: Age confirmation checkbox

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-013 |
| **Title** | Verify age confirmation checkbox is required |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on Step 3, contact info filled, age checkbox NOT checked |
| **Test Data** | Age checkbox: unchecked |
| **Steps** | 1. Fill in all contact information with valid data 2. Leave "The lead passenger is over 18 years old" checkbox UNCHECKED 3. Select payment method 4. Click "Book with..." button |
| **Expected Result** | Booking is NOT completed. Validation error indicates age confirmation is required |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | User on Step 3 with validation error |
| **Notes** | ⚠️ This test clicks "Book with..." — verify validation fires before payment |

---

## TC-M06-014: Pickup and drop-off location fields

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-014 |
| **Title** | Verify pickup and drop-off location fields are present and editable |
| **Module** | M-06 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on Step 3 |
| **Test Data** | — |
| **Steps** | 1. Observe "Pickup and drop-off location" section 2. Verify info message is displayed 3. Click on "Add pickup point" field |
| **Expected Result** | Section visible with info: "You can add or change these up to 24 hours before departure." Two fields: "Add pickup point" and "Add drop-off point" (both with placeholders). Fields are clickable and accept input (likely autocomplete similar to search) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | Fields are optional — booking can proceed without them |

---

## TC-M06-015: Upgrade your ride upsell

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-015 |
| **Title** | Verify "Upgrade your ride" upsell section is displayed |
| **Module** | M-06 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on Step 3, Sedan selected |
| **Test Data** | — |
| **Steps** | 1. Observe "Upgrade your ride" section |
| **Expected Result** | Upsell section shows Luxury sedan with "Recommended for you" badge, vehicle image, description, and "Upgrade for €149" button |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | Upgrade price = Luxury sedan price − Sedan price (€474 − €325 = €149) |

---

## TC-M06-016: Payment methods displayed

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-016 |
| **Title** | Verify all four payment methods are displayed |
| **Module** | M-06 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on Step 3 |
| **Test Data** | — |
| **Steps** | 1. Observe "Payment method" section |
| **Expected Result** | Four payment options with radio buttons: Apple Pay (with Apple Pay icon), Google Pay (with Google Pay icon), Credit or debit card (with Visa, Mastercard, Amex icons + "+3"), Cash on pickup (in EUR). Apple Pay is pre-selected. "Add promo code" link is visible next to section header |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | — |

---

## TC-M06-017: Switch payment method

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-017 |
| **Title** | Verify user can switch between payment methods |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on Step 3, Apple Pay is pre-selected |
| **Test Data** | Switch to: Credit or debit card |
| **Steps** | 1. Click on "Credit or debit card" radio button 2. Observe changes |
| **Expected Result** | "Credit or debit card" becomes selected (radio button filled). "Book with..." button at the bottom updates to reflect new payment method. Card input fields may appear (card number, expiry, CVV) |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Credit card payment method selected |
| **Notes** | Do NOT enter real card data |

---

## TC-M06-018: Marketing opt-in checkbox

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-018 |
| **Title** | Verify marketing opt-in checkbox is unchecked by default |
| **Module** | M-06 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on Step 3 |
| **Test Data** | — |
| **Steps** | 1. Observe "I want to receive exclusive offers and travel tips" checkbox |
| **Expected Result** | Checkbox is unchecked by default. User can check/uncheck it freely. It is not required for booking |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | GDPR compliance — marketing should be opt-in, not opt-out |

---

## TC-M06-019: Legal footer elements

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-019 |
| **Title** | Verify legal footer displays SSL badge, Terms of Use, and Privacy Policy links |
| **Module** | M-06 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on Step 3 |
| **Test Data** | — |
| **Steps** | 1. Scroll to the bottom of the page 2. Observe footer area near the "Book with..." button |
| **Expected Result** | "SSL protected" badge with green checkmark visible. Text: "By booking, you agree to Daytrip's Terms of Use and Privacy Policy." Both "Terms of Use" and "Privacy Policy" are clickable links |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | — |

---

## TC-M06-020: Sidebar shows correct vehicle and price on Step 3

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-020 |
| **Title** | Verify sidebar on Step 3 correctly reflects selected vehicle, route, and total price |
| **Module** | M-06 |
| **Priority** | Critical |
| **Type** | Positive |
| **Preconditions** | User is on Step 3, Sedan selected, no stops |
| **Test Data** | Vehicle: Sedan, Route: Prague → Vienna |
| **Steps** | 1. Observe sidebar on Step 3 |
| **Expected Result** | Sidebar shows: "View details" link, Itinerary (Sun May 3, Prague 9:00 AM → Vienna 12:28 PM), 👥 2, 🧳 2, Sedan, No Stops, Selected vehicle section with "Sedan — Standard option" and car image, Original price €325, Total €325, Free cancellation notice |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | — |
| **Notes** | — |

---

## TC-M06-021: Contact info — XSS in Name field

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-021 |
| **Title** | Verify Name field does not execute script when XSS payload is entered |
| **Module** | M-06 |
| **Priority** | High |
| **Type** | Negative |
| **Preconditions** | User is on Step 3 |
| **Test Data** | Name: `<script>alert('xss')</script>` |
| **Steps** | 1. Paste `<script>alert('xss')</script>` into the Name field 2. Click outside the field 3. Observe page behavior |
| **Expected Result** | No JavaScript alert popup. No page crash. Input treated as plain text. Page remains functional |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Page remains functional |
| **Notes** | Security test — also belongs to security test suite |

---

## TC-M06-022: Add another contact

| Field | Value |
|---|---|
| **Test Case ID** | TC-M06-022 |
| **Title** | Verify "Add another contact" link adds a second contact form |
| **Module** | M-06 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on Step 3, first contact form visible |
| **Test Data** | — |
| **Steps** | 1. Click "Add another contact" link |
| **Expected Result** | Second set of contact fields appears (Name, Surname, Phone, Email). Original contact fields remain. Option to remove the additional contact is available |
| **Actual Result** | — |
| **Status** | Not Run |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Post-conditions** | Two contact forms visible |
| **Notes** | — |

---

## Summary

| Type | Count |
|---|---|
| Positive | 17 |
| Negative | 4 |
| Boundary | 0 |
| Edge case | 0 |
| **Total** | **22** |

| Priority | Count |
|---|---|
| Critical | 4 |
| High | 8 |
| Medium | 8 |
| Low | 0 |
| **Total** | **22** |

**Note:** TC-M06-011 and TC-M06-013 require clicking "Book with..." button. These should be executed with caution — the expectation is that validation fires BEFORE any payment processing. If validation does not prevent submission, STOP and do NOT proceed with payment.
