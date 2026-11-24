# Cloudflare Workers

Two independent workers live here. Each folder has its own `wrangler.toml`, so you can deploy either one on its own whenever you want.

```
workers/
  medium-feed/   Medium RSS -> JSON. Powers the Writing page and home article list.
  x-feed/        X RSS -> JSON. Powers the "On X" widget on the home page.
```

## One-time setup

```bash
npm install -g wrangler
wrangler login
```

## Deploy one worker

Change into the folder you want, then deploy:

```bash
cd workers/medium-feed
wrangler deploy
```

or:

```bash
cd workers/x-feed
wrangler deploy
```

`wrangler deploy` reads the `wrangler.toml` in the current folder, so deploying one never touches the other. From this `workers/` directory you can also use `wrangler deploy --config medium-feed/wrangler.toml` or `wrangler deploy --config x-feed/wrangler.toml` without changing directories.

## Deployed endpoints

| Folder | Worker name | URL |
| --- | --- | --- |
| `medium-feed` | `medium-api-worker` | `https://medium-api-worker.rohitsh.workers.dev/` |
| `x-feed` | `x-feed-worker` | `https://x-feed-worker.rohitsh.workers.dev/` |

Both return JSON with `status: "ok"` and an `items` array. Both cache responses for 15 minutes.

## Verify after deploy

```bash
curl https://medium-api-worker.rohitsh.workers.dev/ | head -c 300
curl https://x-feed-worker.rohitsh.workers.dev/ | head -c 300
```

## Frontend references

- Medium: `src/utils/articleLoader.js`
- X: `src/utils/tweetLoader.js`

Neither frontend file needs to change when you redeploy with the same worker name. If you rename a worker in `wrangler.toml`, update the matching URL in the frontend file too.
