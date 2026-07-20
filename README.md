# Network Insurance Website

Network Insurance is an insurance education and organic lead-generation website for individuals and families. It helps visitors understand life insurance, health insurance, annuities, supplemental coverage, dental, vision, accident, critical illness, hospital indemnity, and disability income protection, then request a quote or coverage review with Brad Smith.

Live URL after GitHub Pages deployment:

`https://networkinsurance83-netizen.github.io/Network-Insurance/`

## Intended Audience

- People reviewing life insurance needs for family protection, final expenses, mortgage protection, or business planning.
- Individuals and families comparing health coverage.
- People reviewing annuity options for retirement income, interest-crediting, beneficiary planning, or existing-contract questions.
- Visitors comparing supplemental coverage such as dental, vision, accident, critical illness, hospital indemnity, and disability income protection.
- People trying to understand premiums, deductibles, copays, coinsurance, out-of-pocket maximums, HMO/PPO/EPO plan types, provider networks, prescriptions, Marketplace coverage, private coverage, term life, whole life, universal life, indexed universal life, fixed annuities, indexed annuities, income riders, surrender periods, and limited-benefit supplemental policies.
- Visitors coming from Facebook posts, educational videos, referrals, or search results.

## Project Structure

- `index.html` - homepage and primary funnel.
- `health-insurance.html` - health insurance education and quote CTA page.
- `life-insurance.html` - life insurance education and planning CTA page.
- `annuities.html` - annuity education and retirement income review CTA page.
- `supplemental-insurance.html` - supplemental coverage education and review CTA page.
- `about.html` - Brad Smith introduction and trust positioning.
- `learn.html` - insurance education page.
- `videos.html` - video placeholder library with transcript space.
- `contact.html` - launch-ready quote and coverage review request form.
- `thank-you.html` - post-submission destination.
- `privacy-policy.html` - privacy placeholder for legal review.
- `insurance-disclaimer.html` - insurance disclaimer placeholder for legal review.
- `terms.html` - terms placeholder.
- `404.html` - GitHub Pages not-found page.
- `styles.css` - shared responsive styling.
- `script.js` - mobile menu and form behavior.
- `robots.txt` and `sitemap.xml` - SEO discovery files.
- `MARKETING-NOTES.md` - internal campaign notes, not public page content.
- `LAUNCH-CHECKLIST.md` - required placeholders and final review tasks.
- `assets/` - approved logos and images.

## Preview Locally

From this folder:

```bash
python3 -m http.server 8088
```

Then open:

`http://127.0.0.1:8088/`

## Editing Text

Edit the relevant `.html` file directly. Keep public pages customer-focused. Internal campaign notes belong in `MARKETING-NOTES.md`, not in page copy.

## Replacing Images

- Current logo: `assets/network-insurance-logo-cropped.png`
- Add Brad's approved headshot to `assets/` and replace the `headshot-placeholder` section in `about.html` and `index.html`.
- Add image `width` and `height` attributes.
- Use compressed images and avoid Base64-embedded images.

## Updating Contact Information

Replace these placeholders after approval:

- `REPLACE_WITH_PUBLIC_PHONE`
- `REPLACE_WITH_PUBLIC_EMAIL`
- `REPLACE_WITH_PRIVACY_CONTACT_EMAIL`
- `REPLACE_WITH_BRAD_SMITH_APPROVED_TITLE`
- `REPLACE_WITH_APPROVED_STATES_SERVED`
- public license information, if approved for display

## Updating the Scheduling Link

Current appointment URL:

`https://calendar.app.google/1ixxjwaF9GHC75rNA`

Search all files for that URL and replace it if Brad approves a new scheduler. Appointment links should open with `target="_blank"` and `rel="noopener noreferrer"`.

## Connecting Formspree

GitHub Pages cannot process forms by itself.

1. Create a Formspree form.
2. Replace `REPLACE_WITH_FORMSPREE_ENDPOINT` in `contact.html` with the approved endpoint.
3. Replace `REPLACE_WITH_THANK_YOU_URL` with `thank-you.html` or the approved destination.
4. Configure Formspree email notifications to Brad's approved lead email.
5. Submit a test lead using non-sensitive test data.
6. Confirm the email notification arrives.

Do not place API keys, passwords, or secret tokens in frontend JavaScript. Do not collect Social Security numbers, Medicare numbers, payment information, login credentials, sensitive identity documents, or detailed medical information through the public form.

## Google Sheets or CRM Automation

Optional future flow:

- Formspree to Google Sheets through Zapier, Make, n8n, or another approved automation.
- Formspree or future form provider to CRM webhook.
- Future placeholder: `REPLACE_WITH_CRM_WEBHOOK`

Document the automation owner, destination sheet/CRM, and test proof before driving paid traffic.

## Adding Videos

`videos.html` uses clearly labeled placeholders. For each real video, add:

- Approved video URL or embed.
- Accessible title.
- Short summary.
- Transcript or transcript placeholder.
- Date reviewed.

Do not use fake play buttons or fake video links.

## Adding Educational Articles

Future articles should include:

- Plain-language explanation.
- Key questions to ask.
- General examples.
- Credible source placeholders or citations.
- Quote or coverage-review CTA.
- Appointment button.
- Date reviewed or updated.
- Insurance disclaimer.

Do not invent source citations or publish legal/tax/medical/investment/financial advice.

## Main Broker Website Link

Replace `REPLACE_WITH_BRAD_SMITH_MAIN_WEBSITE_URL` after the main insurance broker website URL is approved. Keep Network Insurance focused on insurance education and lead capture for life, health, annuity, and supplemental coverage.

## Legal Pages

`privacy-policy.html`, `insurance-disclaimer.html`, and `terms.html` are placeholders. They must be reviewed by a qualified legal/compliance professional before final launch, especially life insurance illustration/cash-value language, indexed universal life caveats, annuity surrender/liquidity/tax/carrier language, supplemental limited-benefit language, privacy notices, and consent language.

## Deployment Through GitHub Pages

Do not push changes until Brad approves.

Typical flow after approval:

```bash
git status
git add .
git commit -m "Improve Network Insurance website funnel"
git push origin main
```

Then confirm GitHub Pages publishes the expected branch/folder and test:

`https://networkinsurance83-netizen.github.io/Network-Insurance/`

## Testing Checklist

- Home, Life Insurance, Health Insurance, Annuities, Supplemental Coverage, About, Learning Center, Videos, Contact, Thank You, legal pages, and 404.
- Mobile and desktop navigation.
- Required form fields.
- Consent checkbox starts unchecked.
- Placeholder form endpoint blocks submission gracefully.
- Connected Formspree endpoint submits successfully.
- Appointment link opens safely.
- Internal and external links.
- Images load and have alt text where meaningful.
- Browser console has no errors.
- No horizontal overflow on mobile.
- Keyboard focus is visible.
- Sitemap and robots load.

## Placeholders Remaining

See `LAUNCH-CHECKLIST.md`.
