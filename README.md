# Network Insurance Website Funnel

Created: 2026-05-05

## Goal

Create a low-cost lead funnel for Network Insurance that can be used from Facebook posts, ads, QR codes, and social profiles.

## Recommended Zero-Cost Stack

- Website: static HTML/CSS/JS in this folder.
- Hosting: Cloudflare Pages or GitHub Pages free static hosting.
- Lead capture: Google Forms connected to Google Sheets.
- Facebook CTA: `https://networkinsurance83-netizen.github.io/Network-Insurance/`.
- Appointment CTA inside website: Google Calendar booking page.
- CRM: existing `Network Insurance CRM` Google Sheet under `networkinsurance83@gmail.com`.

## Files

- `index.html` - landing page and lead funnel.
- `styles.css` - responsive visual design.
- `script.js` - lead-form guard until Google Forms endpoint is connected.
- `VIDEO_CONTENT_PLAN.md` - first video topics and scripts.
- `SARAH_WEBSITE_FUNNEL_PROMPT.md` - prompt Sarah should save and follow.
- `assets/network-insurance-logo.png` - original brand logo supplied by Brad.
- `assets/network-insurance-logo-cropped.png` - cropped website-use version of the brand logo.

## Brand Colors

The website uses the Network Insurance logo as its color base:

- Navy: `#173f73`
- Dark navy: `#0e294d`
- Charcoal: `#504e4e`
- Silver/off-white background: `#f6f7f9`

## Current Status

- Website draft: complete.
- Lead form design: complete.
- Real form submission endpoint: blocked until Google Form is created/connected.
- Appointment link: active, using `https://calendar.app.google/1ixxjwaF9GHC75rNA`.
- Temporary public preview URL: `https://vhs-sources-discharge-dare.trycloudflare.com`.
- Permanent public website URL for Facebook posts: `https://networkinsurance83-netizen.github.io/Network-Insurance/`.
- Deployment: GitHub Pages live.

## Facebook CTA Rule

Network Insurance Facebook posts and Brad Smith Facebook posts about health coverage should send viewers to:

`https://networkinsurance83-netizen.github.io/Network-Insurance/`

The website should then offer both:

- Lead form for help/review requests.
- Appointment booking through `https://calendar.app.google/1ixxjwaF9GHC75rNA`.

Do not use the local `file://` website path, temporary Cloudflare Tunnel URL, or direct Google Calendar link in Facebook posts.

The Google Calendar booking link stays inside the website only.

## Google Form Fields

Create a Google Form named `Network Insurance Lead Request` with these fields:

1. Full name
2. Phone number
3. Email
4. State
5. ZIP code
6. What do you want help with?
7. Preferred appointment time
8. Consent checkbox: `I agree to be contacted by Network Insurance about health coverage options. Message and data rates may apply.`
9. Source URL or source post, optional hidden/manual field if automation supports it.

Connect responses to the active `Network Insurance CRM` workbook:

`https://docs.google.com/spreadsheets/d/1Zh0Xp050Rm0KWbPbPcTgqjbaa--hL079n6EBrzjHXQ0/edit`

## Deployment Recommendation

Best low-cost route: Cloudflare Pages free plan or GitHub Pages. Cloudflare Pages is preferred if Brad later wants a custom domain, analytics, and fast global delivery.

## Compliance Notes

- Do not promise savings, approval, eligibility, or specific coverage.
- Do not ask for Social Security numbers, payment details, passwords, or medical records on the lead form.
- Use `may`, `can help`, `options vary`, and `if eligible`.
- Include the website disclaimer on every public page.
