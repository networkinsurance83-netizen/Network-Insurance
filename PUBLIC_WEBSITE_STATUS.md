# Public Website Status

Updated: 2026-05-05

## Temporary Public Preview URL

`https://vhs-sources-discharge-dare.trycloudflare.com`

Verification:

- Public HTTPS URL created with Cloudflare Tunnel.
- `curl -I` returned `HTTP/2 200`.
- Homepage HTML loaded successfully.

## Important Limitation

This is a temporary public preview URL. It depends on the local Mac staying awake and the `tmux` session staying active. It is useful for review, testing, and sharing short-term, but it should not be treated as the permanent Facebook funnel URL.

## Running Services

`tmux` session:

`network-insurance-site`

Windows:

- `0`: local Python web server on `127.0.0.1:8088`
- `1`: Cloudflare Tunnel to the local server

Stop command:

```bash
tmux kill-session -t network-insurance-site
```

## Permanent Deployment

GitHub repository:

`https://github.com/networkinsurance83-netizen/Network-Insurance`

Files uploaded to GitHub:

- `index.html`
- `styles.css`
- `script.js`
- `README.md`
- `VIDEO_CONTENT_PLAN.md`
- `SARAH_WEBSITE_FUNNEL_PROMPT.md`
- `PUBLIC_WEBSITE_STATUS.md`
- `assets/network-insurance-logo.png`
- `assets/network-insurance-logo-cropped.png`

GitHub branch created:

`gh-pages`

GitHub Pages URL:

`https://networkinsurance83-netizen.github.io/Network-Insurance/`

Current GitHub Pages status:

`LIVE_VERIFIED`

Verification:

- `git ls-remote` confirms `main` and `gh-pages` branches exist.
- `curl -I https://networkinsurance83-netizen.github.io/Network-Insurance/` returned `HTTP/2 200`.

## Facebook CTA Rule

Use this public website URL as the CTA link on Network Insurance Facebook posts and Brad Smith Facebook posts about health coverage:

`https://networkinsurance83-netizen.github.io/Network-Insurance/`

Do not use the direct Google Calendar booking link in Facebook post copy. The booking link remains inside the website.
