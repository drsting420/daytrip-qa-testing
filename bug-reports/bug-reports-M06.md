# Bug Reports — M-06: Booking Flow

---

## BUG-004

| Field | Value |
|---|---|
| **Bug ID** | BUG-004 |
| **Title** | [Checkout] Email field does not validate format on blur — invalid input accepted without inline error |
| **Severity** | Major |
| **Priority** | High |
| **Environment** | Chrome 147, Windows 11, 1920×1080, `https://daytrip.com/en/checkout?c={id}` |
| **Module** | M-06 |
| **Preconditions** | User is on Step 3 "Details & Payment", Contact information section is visible |
| **Steps to Reproduce** | 1. Fill in Name: "John", Surname: "Doe", Phone: "5551234567" 2. In the Email field, enter "not-an-email" 3. Click outside the Email field (blur event) 4. Observe the Email field — is there any validation error? |
| **Expected Result** | Email field shows inline validation error on blur (e.g., red border, error message "Please enter a valid email address") when the entered value does not match email format (missing @ symbol, no domain) |
| **Actual Result** | Email field accepts "not-an-email" without any visual feedback. No red border, no error message on blur. Field looks identical to a valid email input. Validation only triggers when user clicks the "Book" button at the bottom of the page |
| **Reproducibility** | Always |
| **Screenshot / Video** | See TC-M06-010 execution screenshot — "not-an-email" in Email field with no error indication |
| **Workaround** | Validation does trigger on form submission (clicking "Book now"), so invalid emails cannot be submitted. However, the user gets no immediate feedback while filling the form |
| **Status** | Open |
| **Found Date** | 2026-04-26 |
| **Found By** | Pavel Gribovskiy |

---

## BUG-005

| Field | Value |
|---|---|
| **Bug ID** | BUG-005 |
| **Title** | [Checkout] Phone country code defaults to US (+1) instead of auto-detecting user location |
| **Severity** | Minor |
| **Priority** | Medium |
| **Environment** | Chrome 147, Windows 11, 1920×1080, `https://daytrip.com/en/checkout?c={id}`, User location: Prague, Czech Republic |
| **Module** | M-06 |
| **Preconditions** | User is on Step 3 "Details & Payment", user is located in Prague, Czech Republic |
| **Steps to Reproduce** | 1. Navigate to Step 3 "Details & Payment" 2. Observe the phone country code selector in the Contact information section |
| **Expected Result** | Phone country code auto-detects user's location and defaults to Czech Republic (+420) with Czech flag, since the user is browsing from Prague. Alternatively, the code could match the departure country of the booking |
| **Actual Result** | Phone country code defaults to United States (+1) with US flag, regardless of user's actual location (Prague, Czech Republic). User must manually scroll through the country list to find Czech Republic (+420) |
| **Reproducibility** | Always |
| **Screenshot / Video** | See TC-M06-012 execution screenshot — US flag with +1 shown as default, dropdown list starting with United States |
| **Workaround** | User can manually click the country code dropdown and select the correct country. Popular countries (US, Canada, Australia, France, Germany, Italy, Mexico, Spain, UK, Singapore, Philippines) are listed at the top for quicker access |
| **Status** | Open |
| **Found Date** | 2026-04-26 |
| **Found By** | Pavel Gribovskiy |
