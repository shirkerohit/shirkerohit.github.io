# X feed worker

Free RSS-to-JSON proxy for the "On X" widget on the site. No X API key, no paid tier. The X account must be public.

The worker reads `https://fxtwitter.com/rohit_p_shirke/feed.xml`, keeps only posts authored by `@rohit_p_shirke`, extracts the quoted-post context, and returns JSON.

## Deploy

```bash
npm install -g wrangler
wrangler login
cd workers/x-feed
wrangler deploy
```

With a `rohitsh` Cloudflare account and the default name, the endpoint will be:

```
https://x-feed-worker.rohitsh.workers.dev/
```

## Response shape

```json
{
  "status": "ok",
  "handle": "rohit_p_shirke",
  "count": 10,
  "items": [
    {
      "text": "post text",
      "date": "2026-11-24",
      "time": "24 NOV · 7:10 PM IST",
      "url": "https://x.com/rohit_p_shirke/status/...",
      "quote": {
        "text": "quoted post text",
        "url": "https://x.com/.../status/..."
      }
    }
  ]
}
```

`quote` is omitted when the post is not a quote post. On upstream failure the worker returns HTTP 502 with `{"status":"error","message":"..."}`. Successful responses are cached for 15 minutes.

## Verify

```bash
curl https://x-feed-worker.rohitsh.workers.dev/ | head -c 500
```

Or open the URL in a browser. It should return JSON, not XML and not an error.

## Update

Change `HANDLE` or `MAX_POSTS` in `index.js`, then run `wrangler deploy` again. The site's frontend reads this endpoint through `src/utils/tweetLoader.js` and caches results in localStorage for 15 minutes. No frontend change is needed when the feed content updates.
