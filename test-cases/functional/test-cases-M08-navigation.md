# Test Cases — M-08: Navigation (Header & Footer)

**Module:** M-08  
**Module Priority:** P2 — High  
**Pages:** `https://daytrip.com/en/transfers` (header/footer present on all pages)  
**Author:** Pavel Gribovskiy  
**Created:** 2026-04-27  
**Executed:** 2026-04-27  
**Module Status:** ✅ Completed — 12/12 Pass

---

## Navigation Elements

### Header
| # | Element | Type | Description |
|---|---|---|---|
| 1 | Daytrip logo | Link | Clickable logo — links to homepage |
| 2 | EN ▼ | Dropdown | Language selector |
| 3 | Countries | Link | Navigation link |
| 4 | For Drivers | Link | Navigation link |
| 5 | For Host Agencies | Link | Navigation link |
| 6 | Travel agents & B2B | Link | Navigation link |
| 7 | Sign in | Button | Opens authentication modal |
| 8 | Transfers tab | Tab | Switches search form |
| 9 | By the hour tab | Tab | Switches search form |
| 10 | Day trips tab | Tab | Switches search form |

### Footer
| # | Element | Type | Description |
|---|---|---|---|
| 1 | Drive with Daytrip | Link | Pre-footer link |
| 2 | I am a travel agent | Link | Pre-footer link |
| 3 | Popular routes | Links | 3 columns of routes + "See all" |
| 4 | App Store | Link | Download iOS app |
| 5 | Google Play | Link | Download Android app |
| 6 | About us / Blog / Press / Careers / Sitemap | Links | Company section |
| 7 | Customer care contacts | Info | US phone / UK phone / email |
| 8 | Social links | Links | Facebook / TikTok / Instagram / Tripadvisor / LinkedIn / Trustpilot / Pinterest / Yelp |
| 9 | Language switcher | Links | EN / ES / DE / FR / ZH / SV / KO / PT |
| 10 | Legal links | Links | Terms of use / Cookies policy / Privacy policy / Safety & Training program / Zero tolerance policy |

---

## TC-M08-001: Logo click — redirects to homepage

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-001 |
| **Title** | Verify Daytrip logo click redirects to homepage from any page |
| **Module** | M-08 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers` page |
| **Steps** | 1. Click the "daytrip" logo in the top-left corner 2. Observe redirect |
| **Expected Result** | User is redirected to homepage (`/en/transfers` or `/`). Page loads correctly. |
| **Actual Result** | Clicking "daytrip" logo → URL changed to `daytrip.com` (root). Transfers page loaded with "Transfers" tab active. Logo correctly functions as home link. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Logo should be a home link on all pages. Confirmed. |

---

## TC-M08-002: Header nav — Countries link

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-002 |
| **Title** | Verify "Countries" header link navigates to Countries page |
| **Module** | M-08 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers` |
| **Steps** | 1. Click "Countries" in header navigation 2. Observe URL and page content |
| **Expected Result** | User navigated to Countries page (e.g., `/en/countries`). Page loads correctly and shows list of countries. |
| **Actual Result** | Clicking "Countries" → URL `/en/countries`. Breadcrumb: Home → Countries. Title: "Transfers and Day Trips Around the World". Search form present. Region filters: Popular / Europe / Asia / Africa / North America / South America / Oceania. Country carousels with "Popular" tags visible. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Countries page contains its own search form — this is module M-10 in test plan. |: Header nav — For Drivers link

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-003 |
| **Title** | Verify "For Drivers" header link navigates to Drivers page |
| **Module** | M-08 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers` |
| **Steps** | 1. Click "For Drivers" in header navigation 2. Observe URL and page content |
| **Expected Result** | User navigated to For Drivers page. Page loads correctly. |
| **Actual Result** | Clicking "For Drivers" → redirect to `/en/drivers/signup`. Separate Driver Portal with different header (FAQ / Sign in / Sign up only). Form "Drive with Daytrip": Individual Driver / Fleet Owner toggle, Email, Phone (+1 US default), City, Terms checkbox, Continue button. No Back button — separate application. Country code +1 (US) default confirmed here — BUG-005 systemic (4th instance). |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Driver Portal is out-of-scope per Test Plan. Navigation to it works correctly. BUG-005 confirmed systemic. |: Header nav — Travel agents & B2B link

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-004 |
| **Title** | Verify "Travel agents & B2B" header link navigates correctly |
| **Module** | M-08 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers` |
| **Steps** | 1. Click "Travel agents & B2B" in header navigation 2. Observe URL and page content |
| **Expected Result** | User navigated to Travel agents/B2B page. Page loads correctly. |
| **Actual Result** | "Travel agents & B2B" is a **hover dropdown** (not a simple link) with 5 items: Log in as a Travel Agent / For Travel Agents / B2B Solutions / For Host Agencies / Affiliate & Webmasters. "For Travel Agents" → opens new tab `agents.daytrip.com` (separate subdomain, own header: Home/Log In/Register). "B2B Solutions" → opens new tab `partners.daytrip.com` (separate subdomain). Both out-of-scope. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Dropdown triggers on hover (not click). External portals open in new tab — correct UX behavior. Both subdomains are out-of-scope per Test Plan. |: Sign in button — opens modal

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-005 |
| **Title** | Verify Sign in button opens authentication modal |
| **Module** | M-08 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers`, not signed in |
| **Steps** | 1. Click "Sign in" button in header 2. Observe what appears |
| **Expected Result** | Sign in modal or "Find my booking" modal opens. Modal contains authentication options (email, Google, Facebook, Apple). |
| **Actual Result** | Clicking "Sign in" → modal "Find my booking" appeared over blurred page. Contents: Continue with Apple / Continue with Google / Continue with Facebook / Email address field + Continue button / "I am a travel agent" link. ✕ close button. URL remained `daytrip.com`. No CAPTCHA. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Confirmed Phase 0 findings: modal is "Find my booking", 3 OAuth providers (Apple/Google/Facebook), no CAPTCHA. |

---

## TC-M08-006: Language selector — opens and shows 8 languages

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-006 |
| **Title** | Verify EN language selector dropdown shows all available languages |
| **Module** | M-08 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers` |
| **Steps** | 1. Click "EN ▼" language selector in header 2. Observe dropdown content |
| **Expected Result** | Dropdown opens showing all 8 languages: English (US), Spanish (ES), German (DE), French (FR), Chinese (ZH), Swedish (SV), Korean (KO), Portuguese (PT). Current language (English) is visually indicated as active. |
| **Actual Result** | Clicking "EN ▼" → dropdown opened showing 8 languages with country flags: English (US) / Spanish (ES) / German (DE) / French (FR) / Chinese (ZH) / Swedish (SV) / Korean (KO) / Portuguese (PT). English (US) visually active. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | All 8 languages confirmed. Flags present for each language. |

---

## TC-M08-007: Footer — Popular routes links functional

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-007 |
| **Title** | Verify Popular routes links in footer navigate to correct route pages |
| **Module** | M-08 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers`, scrolled to footer |
| **Test Data** | Click: "Prague to Vienna" |
| **Steps** | 1. Scroll to footer "Popular routes" section 2. Click "Prague to Vienna" link 3. Observe URL and page content |
| **Expected Result** | User redirected to Prague to Vienna route page (e.g., `/en/transfers/prague-cz/vienna-at`). Page loads correctly and shows route details. |
| **Actual Result** | Clicking "Prague to Vienna" → URL `/en/transfers/prague-cz/vienna-at`. Page "Private car transfer from Prague to Vienna". Photo gallery (16 photos). Breadcrumb: Transfers → Countries → Czech Republic → Prague → Prague to Vienna. Details: 334km / 3h 30min / One way / From €67/person. Rating 5.0 / 5176 Reviews / Tripadvisor Choice 2026. Tabs: HOW IT WORKS / REVIEWS / GOOD TO KNOW / OVERVIEW. Sidebar: Prague → Vienna + Check availability button. Currency selector (€-EUR) appeared in header — not present on homepage. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Route page shows Tripadvisor Choice 2026 vs EN homepage shows 2025. Currency selector visible on route page but not homepage. |

---

## TC-M08-008: Footer — Company links functional

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-008 |
| **Title** | Verify Company section links in footer navigate correctly |
| **Module** | M-08 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers`, scrolled to footer |
| **Steps** | 1. Scroll to footer "Company" section 2. Click "About us" 3. Note URL 4. Go back 5. Click "Careers" 6. Note URL |
| **Expected Result** | "About us" → navigates to About page (`/en/about` or similar). "Careers" → navigates to Careers page. Both pages load correctly. |
| **Actual Result** | Clicking "About us" → URL `/en/about`. Page "About us" with hero photo, tagline "We believe traveling to another city should be more than easy." Four values: Convenient / Friendly / Enriching / Comfortable with icons. Page loaded correctly. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Company section: About us / Blog / Press / Careers / Sitemap — all links present. |

---

## TC-M08-009: Footer — Legal links functional

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-009 |
| **Title** | Verify legal links in footer bottom bar are functional |
| **Module** | M-08 |
| **Priority** | Medium |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers`, scrolled to very bottom of footer |
| **Steps** | 1. Scroll to bottom bar 2. Click "Terms of use" 3. Note URL 4. Go back 5. Click "Privacy policy" 6. Note URL |
| **Expected Result** | "Terms of use" → navigates to Terms page. "Privacy policy" → navigates to Privacy policy page. Both pages load correctly. |
| **Actual Result** | Clicking "Terms of use" → URL `/en/terms`. Page "Daytrip: Terms of Use". "Updated as of 5th July 2025". Full Terms of Use text loaded correctly. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Legal links: Terms of use / Cookies policy / Privacy policy / Safety & Training program / Zero tolerance policy — all present in footer. |

---

## TC-M08-010: Footer — Language switcher changes language

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-010 |
| **Title** | Verify footer language switcher changes site language |
| **Module** | M-08 |
| **Priority** | High |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers`, scrolled to footer |
| **Steps** | 1. Scroll to footer language switcher 2. Click "German (DE)" 3. Observe URL and page content 4. Click "English (US)" to revert |
| **Expected Result** | Clicking "German (DE)" changes URL to `/de/...` and page content switches to German. Clicking "English (US)" reverts to `/en/...` and English content. |
| **Actual Result** | Clicking "German (DE)" in footer language switcher → URL changed to `daytrip.com/de`. Full page content switched to German: "Komfortable Autotransfers mit professionellen Fahrern", tabs: "Transfers / Stundenweise / Tagesausflüge", form: "Von Stadt, Hotel / Zur Stadt / Abfahrt / Mehrere Städte / Suche", header: "DE ▼ / Länder / Für FahrerInnen / Anmelden". Clicking "English (US)" reverts to `/en/transfers`. **Verified across all 8 languages:** EN version shows Tripadvisor Travelers' Choice **2025**. All other 7 languages (ES, FR, ZH, SV, KO, PT, DE) show Tripadvisor Travelers' Choice **2024**. This is a confirmed content inconsistency across all non-English localisations. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Language switch works correctly. **Finding:** Tripadvisor badge shows 2025 on EN only — all 7 other languages show 2024. Localized content is one year behind on this badge. Verified: ES `/es`, FR `/fr`, ZH `/zh`, SV `/sv`, KO `/ko`, PT `/pt`, DE `/de`. |

---

## TC-M08-011: Footer — App Store and Google Play links

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-011 |
| **Title** | Verify App Store and Google Play links in footer open correct store pages |
| **Module** | M-08 |
| **Priority** | Low |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers`, scrolled to footer |
| **Steps** | 1. Right-click "App Store" button → Copy link address 2. Right-click "Google Play" button → Copy link address 3. Verify both URLs point to correct app store pages |
| **Expected Result** | App Store link → Apple App Store URL for Daytrip app. Google Play link → Google Play Store URL for Daytrip app. Both URLs are valid and not broken. |
| **Actual Result** | App Store URL: `apps.apple.com/cz/app/daytrip-rides-with-stops/id1500225064`. On Windows Chrome → "An error occurred" (expected — Apple Web Player not supported on Windows without iTunes). Verified on iPhone → Daytrip app page displayed correctly. Google Play URL: `play.google.com/store/apps/details?id=com.mydaytrip.Daytrip` → Daytrip app page loaded: "Daytrip / 10K+ Downloads / Install on more devices". |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 + iPhone (App Store) |
| **Notes** | App Store error on Windows is OS limitation, not a site bug. Both links point to correct app store pages for Daytrip app. |

---

## TC-M08-012: Footer — copyright year is current

| Field | Value |
|---|---|
| **Test Case ID** | TC-M08-012 |
| **Title** | Verify copyright notice displays correct year range |
| **Module** | M-08 |
| **Priority** | Low |
| **Type** | Positive |
| **Preconditions** | User is on `/en/transfers`, scrolled to very bottom |
| **Steps** | 1. Scroll to very bottom of page 2. Read copyright notice |
| **Expected Result** | Copyright notice shows "Copyright © 2015–[current year] Daytrip. All rights reserved." with correct end year. |
| **Actual Result** | Copyright shows "Copyright © 2015–2026 Daytrip. All rights reserved." End year 2026 matches current year. |
| **Status** | ✅ Pass |
| **Environment** | Chrome, Windows 11, 1920×1080 |
| **Notes** | Year dynamically updated — correct. |

---

## Summary

| Type | Count | Pass | Fail |
|---|---|---|---|
| Positive | 12 | 12 | 0 |
| Negative | 0 | — | — |
| Boundary | 0 | — | — |
| **Total** | **12** | **12** | **0** |

| Priority | Count | Pass | Fail |
|---|---|---|---|
| High | 3 | 3 | 0 |
| Medium | 7 | 7 | 0 |
| Low | 2 | 2 | 0 |
| **Total** | **12** | **12** | **0** |

**Defects found:** 0  
**UX/systemic observations:**
- "Travel agents & B2B" is a hover dropdown (not a simple link) — 5 sub-items
- "For Drivers" and B2B portals open in new tab — correct behavior, both out-of-scope
- BUG-005 (phone +1 US default) confirmed on `/en/drivers/signup` — 4th instance, systemic issue
- Tripadvisor Travelers' Choice badge shows **2025 on EN only** — all 7 other languages (ES/FR/ZH/SV/KO/PT/DE) show **2024**. Verified across all language versions. Localized content is one year behind.
- Currency selector (€-EUR) visible on route pages but absent on homepage
- App Store link shows error on Windows — OS limitation, not a site bug
