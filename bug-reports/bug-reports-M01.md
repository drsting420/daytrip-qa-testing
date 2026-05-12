# Bug Reports — M-01: Search — City-to-City Transfer

---

## BUG-001

| Field | Value |
|---|---|
| **Bug ID** | BUG-001 |
| **Title** | [Search] Cursor does not auto-focus on To field after selecting city in From autocomplete |
| **Severity** | Minor |
| **Priority** | Low |
| **Environment** | Chrome 147, Windows 11, 1920×1080, `https://daytrip.com/` |
| **Module** | M-01 |
| **Preconditions** | User is on daytrip.com homepage, Transfers tab is active, From and To fields are empty |
| **Steps to Reproduce** | 1. Click on "From city, hotel, airport" field 2. Type "Prague" 3. Click "Prague, Czechia" in the autocomplete dropdown 4. Observe cursor position after selection |
| **Expected Result** | After selecting a city in From field, cursor automatically moves (auto-focuses) to the To field, allowing the user to immediately start typing the destination without an extra click |
| **Actual Result** | "Prague, Czechia" is selected in From field, dropdown closes, but cursor does NOT move to the To field. User must manually click on the To field to continue. This requires an additional click in the booking flow |
| **Reproducibility** | Always |
| **Screenshot / Video** | See TC-M01-002 execution screenshots |
| **Workaround** | User can manually click on the To field after selecting the origin city |
| **Status** | Open |
| **Found Date** | 2026-04-26 |
| **Found By** | Pavel Gribovskiy |

---

## BUG-002

| Field | Value |
|---|---|
| **Bug ID** | BUG-002 |
| **Title** | [Search] From field lacks clear (✕) button — inconsistent with To and Departure fields |
| **Severity** | Minor |
| **Priority** | Low |
| **Environment** | Chrome 147, Windows 11, 1920×1080, `https://daytrip.com/` |
| **Module** | M-01 |
| **Preconditions** | User is on daytrip.com homepage, a city is selected in From field (e.g., "Prague, Czechia") |
| **Steps to Reproduce** | 1. Select "Prague" in From field 2. Select "Vienna" in To field 3. Select a departure date 4. Observe clear (✕) buttons across all fields |
| **Expected Result** | All fields with selected values should have a clear (✕) button for consistency. From, To, and Departure fields should all provide the same mechanism to clear the selection |
| **Actual Result** | To field has ✕ (clear) button. Departure field has ✕ (clear) button. From field does NOT have ✕ (clear) button — only the Swap (⇄) icon is present. To clear the From field, user must click on the text, select all (Ctrl+A), and delete manually |
| **Reproducibility** | Always |
| **Screenshot / Video** | See TC-M01-026 execution screenshots |
| **Workaround** | Click on the From field text, select all (Ctrl+A), and press Delete/Backspace |
| **Status** | Open |
| **Found Date** | 2026-04-26 |
| **Found By** | Pavel Gribovskiy |

---

## BUG-003

| Field | Value |
|---|---|
| **Bug ID** | BUG-003 |
| **Title** | [Search] Inconsistent country name display: "Czechia" vs "Czech Republic" in From field |
| **Severity** | Trivial |
| **Priority** | Low |
| **Environment** | Chrome 147, Windows 11, 1920×1080, `https://daytrip.com/` |
| **Module** | M-01 |
| **Preconditions** | User is on daytrip.com homepage, From field is empty |
| **Steps to Reproduce** | 1. Click on From field, type "Prague" 2. Select "Prague, Czechia" from autocomplete dropdown 3. Observe the text displayed in the From field 4. Fill in To field (e.g., Vienna) and complete a search 5. On the results page, observe the origin city name in the sidebar 6. Return to homepage and repeat the search — observe the From field text |
| **Expected Result** | Country name for Prague should be displayed consistently across all instances — either always "Czechia" or always "Czech Republic" |
| **Actual Result** | Country name alternates between "Czechia" and "Czech Republic" across different sessions and pages. Examples observed: From field shows "Prague, Czechia" after initial selection (TC-M01-002), but "Prague, Czech Republic" after swap operation (TC-M01-011) and on the results page sidebar. The inconsistency appears across the same session |
| **Reproducibility** | Intermittent |
| **Screenshot / Video** | Compare TC-M01-002 screenshot (Prague, Czechia) with TC-M01-011 screenshot (Prague, Czech Republic) |
| **Workaround** | None needed — cosmetic issue, does not affect functionality |
| **Status** | Open |
| **Found Date** | 2026-04-26 |
| **Found By** | Pavel Gribovskiy |
