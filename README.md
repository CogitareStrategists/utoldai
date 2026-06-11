# UtoldAI Landing Page - Next.js

This is a Next.js App Router version of the UtoldAI landing page.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Google Sheets setup

1. Create a Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Paste the code from `google-apps-script.js`.
4. Deploy as a Web App:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL ending in `/exec`.
6. Add it to `.env.local` locally and to Vercel environment variables:

```env
NEXT_PUBLIC_GOOGLE_SHEET_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel or connect it to your existing `www.utoldai.com` project.
3. Add the environment variable above in Vercel.
4. Deploy.

## Notes

- The rotating hero text is implemented in `app/page.tsx`.
- Styling is in `app/globals.css`.
- The form uses Google Apps Script and Google Sheets.
