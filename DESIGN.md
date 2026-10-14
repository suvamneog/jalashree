---
name: Jalashree Anglers Retreat
description: White page with a red bar, centered red wordmark, and a woven gamosa border, in the Temps shop theme.
colors:
  red: "#c62828"
  red-dark: "#8e1515"
  ink: "#222"
  muted: "#666"
  line: "#e6e6e6"
  white: "#ffffff"
typography:
  brand:
    fontFamily: "\"Anek Bangla\", \"Nirmala UI\", sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  banner:
    fontFamily: "\"Anek Bangla\", \"Nirmala UI\", sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  headline:
    fontFamily: "\"Anek Bangla\", \"Nirmala UI\", sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  nav:
    fontFamily: "\"Anek Bangla\", \"Nirmala UI\", sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "\"Anek Bangla\", \"Nirmala UI\", sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  label:
    fontFamily: "\"Anek Bangla\", \"Nirmala UI\", sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
rounded:
  radius: "0"
spacing:
  page: "1360px"
  gutter: "32px"
components:
  topbar:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
  wordmark:
    textColor: "{colors.red}"
    typography: "{typography.brand}"
  banner-cap:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.banner}"
  button-primary:
    backgroundColor: "{colors.red-dark}"
    textColor: "{colors.white}"
    typography: "{typography.body}"
    padding: "12px 22px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
  gamosa:
    height: "32px"
---

# Design System: Jalashree Anglers Retreat

## Overview

**Creative North Star: "The Temps Bar"**

The page uses the Temps shop theme: a white field, Anek Bangla, a red top bar, a centered red wordmark, and the woven gamosa border from that demo. Jalashree’s own name, photographs, and address stay. Temps products, prices, cart, and Kamrup copy do not.

The hero is a full-width grounds photograph under the gamosa strip, then a red caption band and one dark-red “Plan your visit” button.

**Key Characteristics:**

- White ground, ink `#222`, red `#c62828`
- Anek Bangla for every line
- Centered circular mark and red wordmark
- One full-width gamosa border, 32px, from `images/gamosa.png`
- Square corners
- One filled action, dark red `#8e1515`

## Colors

### Primary

- **Red** (`colors.red`): Top bar, wordmark, place line, caption band, selection, focus ring, footer wordmark. Hover on navigation turns this red.
- **Dark red** (`colors.red-dark`): The “Plan your visit” button. Hover goes to `#6e1010`.

### Neutral

- **Ink** (`colors.ink`): Body text and headings.
- **Muted** (`colors.muted`): Gallery captions.
- **Line** (`colors.line`): Header and footer rules. Disclosures use `#e4e4e4`.
- **White** (`colors.white`): Page background, top-bar text, caption-band text, button text.

## Typography

**Font:** Anek Bangla, with Nirmala UI and sans-serif behind it. Weights 400 and 700, self-hosted.

- **Brand** (700, 34px): “Jalashree”. 30px below 760px.
- **Place** (700, 20px, red): “Kaliabor, Assam” under the wordmark.
- **Banner** (700, 26px): The red-band title. 22px below 760px.
- **Headline** (700, 26px): Section headings. The questions heading is 22px. The address is 20px.
- **Nav** (700, 18px): Section links. 16px below 760px.
- **Body** (400, 16px, line-height 1.45): Reading text.
- **Label** (400, 13px): The top bar. “Anglers Retreat” under the wordmark is 14px.

## Layout

Content in the lower page is `min(1360px, 100% - 32px)`. The top bar, wordmark, gamosa, photograph, and red caption run the full viewport width. The photograph is 280px tall, 180px below 760px, cover-cropped. Photo sections are two columns from 761px up and one column below that, with the photograph first.

## Components

- **Top bar:** Red strip. Preview note on the left, “Kaliabor, Assam” on the right.
- **Wordmark:** 76px circular logo, then Jalashree, Anglers Retreat, Kaliabor, Assam, all centered.
- **Navigation:** Three text links, centered, red on hover. No search, cart, or shop menu.
- **Gamosa:** `images/gamosa.png` repeated at 32px height, once, between the header and the photograph.
- **Caption band:** Red, centered white type.
- **Plan your visit:** Uppercase, letter-spacing 0.08em, dark-red fill, square corners.
- **Disclosures:** Native `details`, hairline rows, chevron marker.
- **Footer:** Red “Jalashree”, then Anglers Retreat and the address. No shop columns.

## Do's and Don'ts

### Do

- Keep the white field, red bar, and Anek Bangla.
- Use the supplied gamosa border once under the header.
- Keep Jalashree photographs and the Baruah Chuk address.

### Don't

- Don’t bring over Temps products, prices, cart, wishlist, search, or Kamrup Spice copy.
- Don’t publish a phone number, WhatsApp link, or map until those are confirmed.
- Don’t add a second filled action.
