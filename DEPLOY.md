# Deploying jbbc.co.jp on DigitalOcean App Platform

The site is one Node.js web service. App Platform builds it from GitHub and
restarts it on every push to the `rewrite` branch (change the branch in
`.do/app.yaml` when you merge to `main`).

## 1. Before the first deploy

1. **AUTH_SECRET**: generate a fresh one for production, never reuse the local one.
   ```bash
   openssl rand -base64 32
   ```
2. **MongoDB Atlas**: in Network Access, allow connections from anywhere
   (`0.0.0.0/0`) or add App Platform's outbound IPs shown in the app's
   Settings after creation. App Platform has no fixed IP by default.
3. **Resend**: the `jbbc.co.jp` domain is already verified. `EMAIL_FROM`
   stays `JBBC <noreply@jbbc.co.jp>`.
4. **Google Sheets**: the three sheet IDs and the service account key from
   `.env.local`. Paste the private key exactly as in `.env.local`, with the
   literal `\n` sequences.
5. **Spaces**: the access key pair used for uploads.

## 2. Create the app

Dashboard → Create → Apps → GitHub → repo `DevMonkey3/JBBC-heroUi-FullStack`,
branch `rewrite`. When asked, choose **Edit App Spec** and paste
`.do/app.yaml`, or run:

```bash
doctl apps create --spec .do/app.yaml
```

Then open the app → Settings → `web` component → Environment Variables and
fill every variable marked `SECRET`. Save; the app rebuilds.

**Every variable must have Scope = "Build and Run Time"** (the default when
you add one in the Dashboard). Next.js prerenders the home, seminar and blog
pages during the build, so it needs the database and the other keys at build
time too. If a variable is set to "Run Time" only, or left without a value,
the build either fails with `Invalid environment variables` or prerenders
those pages empty until their first revalidation.

Plan: **Basic, 1 GB RAM (basic-xs)** is enough. The Next.js server idles
around 250 MB. If image resizing of the large CDN originals ever runs out of
memory on first visits, move to 2 GB (basic-s); `npm run warm` after a deploy
pre-generates the common sizes.

## 3. Domain

App → Settings → Domains → add `jbbc.co.jp` (primary) and `www.jbbc.co.jp`.
DigitalOcean shows the CNAME/A records to set at the registrar. HTTPS is
automatic (Let's Encrypt). Keep the old server running until the new domain
resolves and you have checked the site, then turn the old one off.

## 4. After the first deploy

```
/api/health                 → {"ok":true}
/sitemap.xml, /robots.txt   → present
/jbbc-console-7h3k9d/login  → admin login
```

- Log in with your admin account and delete the test admin
  (`claude-test@jbbc.local`) under ユーザー.
- Create any staff accounts under ユーザー; each person changes their password
  under プロフィール.
- Submit the contact form once and confirm the email reaches info@jbbc.co.jp
  and the row appears in the inquiry sheet.
- In Google Search Console, submit `https://jbbc.co.jp/sitemap.xml`.
- Set `NEXT_PUBLIC_GA_ID` (Settings → Environment Variables) when you have a
  GA4 measurement ID; analytics is off until then.

## 5. Updating the site

Push to the deployed branch. App Platform builds (about 3–4 minutes) and
switches traffic with zero downtime. Rollback: App → Activity → previous
deployment → Rollback.

## 6. Notes

- Rate limits and the login attempt limit are in-memory per instance. Keep
  `instance_count: 1`, which is all this traffic needs.
- The image optimizer caches resized images on the instance's disk under
  `.next/cache/images`; the cache is rebuilt after each deploy.
- Secrets never go in the repo. `.env.local` is ignored by git.
