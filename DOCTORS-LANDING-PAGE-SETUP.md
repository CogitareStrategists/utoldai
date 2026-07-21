# Doctors landing page setup

## 1. Create the Neon table

Open the Neon SQL Editor for the database used by Vercel and run:

`database/create-doctor-leads.sql`

## 2. Deploy

Push this project to the same GitHub repository connected to Vercel. The page will be available at:

`https://www.utoldai.com/doctors`

The form submits to `/api/doctors/lead` and uses the existing `DATABASE_URL` environment variable.

## 3. Tracking

After a successful submission, the page fires the GA4/Google Ads event:

`generate_lead`

The API also stores `utm_source`, `utm_medium`, `utm_campaign`, and `gclid` when those parameters are present in the landing-page URL.
