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

## Permanent Deployment Still Needed

Best next step for a permanent free URL:

- Cloudflare Pages free static hosting, or
- GitHub Pages free static hosting.

Current permanent production URL:

`PENDING_PERMANENT_DEPLOYMENT`
