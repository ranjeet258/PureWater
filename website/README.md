# PureWater website

Marketing site for PureWater, built with Next.js (App Router), TypeScript, Tailwind CSS v4,
Lucide icons and Framer Motion.

## Run locally

```bash
cd website
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Without email settings, the contact form still works in development and logs enquiries to the
terminal. In production it returns a clear "not configured" error until the variables are set.

## Things to edit before launch

| What | Where |
| --- | --- |
| Contact email, phone, social links | `lib/site.ts` |
| Feature status badges (prototype / planned / working) | `steps` and `tech` arrays in `app/page.tsx` |
| Hero product image (concept render) | `public/images/purewater-machine.jpg`, used in `app/page.tsx` |
| Social share preview image | `app/opengraph-image.jpg` |
| Privacy Policy and Terms (placeholder drafts) | `app/privacy`, `app/terms` |

Only set a feature to `"working"` once it is implemented and tested. Don't add purity,
certification or live-payment claims until they are verified.

## Contact form

`POST /api/contact` validates input on the server (shared rules in `lib/validation.ts`), uses a
honeypot field and a basic per-IP rate limit, and sends email through [Resend](https://resend.com).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for metadata, sitemap and robots.txt |
| `RESEND_API_KEY` | Resend API key (secret) |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | Sender, which must be on a domain verified in Resend |

## Deploy to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repo. Set **Root Directory** to
   `website` (Settings → Build and Deployment). The Next.js preset is then detected automatically.
3. Under **Settings → Environment Variables**, add the variables above.
4. Deploy. Then add your custom domain and update `NEXT_PUBLIC_SITE_URL` to match.

Or use the CLI from inside `website/`: `npm i -g vercel && vercel` (and `vercel --prod` for production).
