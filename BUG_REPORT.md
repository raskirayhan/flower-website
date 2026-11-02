# 📋 Flower Market - System Bug & Quality Assurance Report

**Project Name:** Flower Market & Botanical Services Platform  
**Repository:** https://github.com/raskirayhan/flower-website  
**Testing Environment:** Chrome / Edge / Firefox / Safari (Desktop, Tablet & Mobile)  
**Report Date:** November 2026  
**QA Tester / Reporter:** Rayhan Raski  

---

## 📌 Executive Summary
During the end-to-end user experience (UX) and functional testing phase of the Flower Market application, multiple cross-platform scenarios, edge cases, and layout responsiveness behaviors were evaluated. This document details the identified bugs, severity levels, reproduction steps, expected vs. actual outcomes, root cause analyses, and the applied resolution status.

---

## 🐞 Bug Log Table

| Bug ID | Title | Module | Severity | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | Navbar Menu Overlapping on Medium Desktop Screen (1024px–1220px) | Navigation UI | High | P1 | ✅ Resolved |
| **BUG-002** | Form Submission Triggering Without Valid Email Format in Newsletter | Forms / Feedback | Medium | P2 | ✅ Resolved |
| **BUG-003** | Inconsistent Dark Mode Contrast in Filter Pills & Meta Details | Theming (CSS) | Medium | P2 | ✅ Resolved |
| **BUG-004** | Cart Subtotal Calculation Desync on Zero Quantity | Cart Drawer | High | P1 | ✅ Resolved |
| **BUG-005** | Search Input Auto-complete Triggering Excessive Re-renders | AI Concierge | Low | P3 | ✅ Resolved |

---

## 📝 Detailed Bug Reports & Resolution

### 1. Bug ID: BUG-001
- **Title:** Navbar elements overlapping on laptop viewports (1024px - 1220px).
- **Component:** Header / Navigation Bar (`site-header`, `theme-toggle-btn`)
- **Severity:** High (Impacts navigation usability and visual appeal)
- **Steps to Reproduce:**
  1. Open the website on a screen resolution between 1024px and 1220px.
  2. Switch the theme to "Light Mode".
  3. Observe the spacing between `FAQ`, the theme button, and the user profile dropdown.
- **Actual Result:** The multi-line text `Light \n Mode` in the theme toggle expanded the button width by ~90px, causing it to overlap with the adjacent navigation routes.
- **Expected Result:** All navigation items and buttons should maintain at least 8px clean padding and never collide.
- **Resolution:** Refactored the theme toggle into a sleek 40x40px icon-only button with smooth 360-degree rotation animation, added `white-space: nowrap !important` to all navigation links, and adjusted the responsive drawer breakpoint to <=1023px.

---

### 2. Bug ID: BUG-002
- **Title:** Newsletter and Contact forms accepting malformed email addresses.
- **Component:** Newsletter & Modal Forms (`#newsletter-form`, `#contact-form`)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Navigate to Section 11 (Greenhouse Club Newsletter).
  2. Type `testuser@` or `invalid-email` into the email input.
  3. Click "Subscribe".
- **Actual Result:** Form submission proceeded without blocking client-side validation.
- **Expected Result:** Form should display an inline validation warning alert and block submission until a valid RFC-5322 email string is entered.
- **Resolution:** Added strict regex validation `^[^\s@]+@[^\s@]+\.[^\s@]+$`, inline red error helper text, and button spinner loader state.

---

### 3. Bug ID: BUG-003
- **Title:** Dark mode contrast on secondary botanical tags below WCAG AAA standards.
- **Component:** Color Tokens & Typography (`[data-theme="dark"]`)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Click the theme toggle button to switch to Dark Mode.
  2. Inspect the product origin location badge and subtitle text.
- **Actual Result:** Contrast ratio on muted text against `#0F172A` was ~4.5:1.
- **Expected Result:** Text contrast should exceed 7:1 for WCAG AAA compliance.
- **Resolution:** Updated dark mode secondary text token `--text-secondary` to `#CBD5E1` (8.5:1 contrast) and enhanced category tags to `#4ADE80` (vibrant green).

---

### 4. Bug ID: BUG-004
- **Title:** Cart subtotal desynchronization on rapid item decrement.
- **Component:** Shopping Cart State (`scripts/app.js` / `useBookings.ts`)
- **Severity:** High
- **Steps to Reproduce:**
  1. Add a botanical product to the cart (e.g. Peace Lily $38.00).
  2. Open the cart drawer and rapidly click the minus button.
- **Actual Result:** Subtotal occasionally displayed floating decimal anomalies (e.g. `$0.0000000001`).
- **Expected Result:** Cart count should gracefully drop to zero and trigger the empty cart state with subtotal `$0.00`.
- **Resolution:** Implemented `Math.max(0, qty)` boundary guard and formatted all currency through `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`.

---

### 5. Bug ID: BUG-005
- **Title:** Flora AI search popover debounce delay.
- **Component:** AI Search Bar (`scripts/ai-concierge.js` / `AISearchBar.tsx`)
- **Severity:** Low
- **Steps to Reproduce:**
  1. Type continuous letters rapidly in the explore catalog search bar.
- **Actual Result:** Suggestions dropdown re-calculated on every single keystroke.
- **Expected Result:** Suggestions should compute after a 200ms debounce idle window to optimize client CPU cycles.
- **Resolution:** Integrated a 250ms debounce timer before querying the suggestion pool.

---

## 🎯 Verification & Sign-off
All 5 identified issues have been resolved, re-tested across Chrome, Firefox, Safari, and mobile browsers, and confirmed fully operational.
