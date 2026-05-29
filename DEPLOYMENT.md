# Deeksha Gowda Portfolio Deployment Guide

## Folder Structure

```text
client/
  public/Deeksha_Gowda_Resume.pdf
  src/components/layout
  src/components/sections
  src/components/ui
  src/data
  src/hooks
  src/services
  src/utils
server/
  src/config
  src/controllers
  src/middleware
  src/models
  src/routes
  src/utils
```

## API Architecture

```text
POST /api/contact
  Saves contact message to MongoDB
  Sends owner notification email
  Sends visitor thank-you email

POST /api/analytics/visit
  Stores visitor id, country, device, path

POST /api/analytics/resume-download
  Tracks resume download events

GET /api/analytics/summary
  Returns visitor count, countries, devices, resume downloads
```

## Database Schemas

`ContactMessage`: name, email, subject, message, ipAddress, userAgent, createdAt, updatedAt.

`VisitorEvent`: eventType, visitorId, country, device, path, ipAddress, userAgent, createdAt, updatedAt.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `server/.env` from `server/.env.example`.

3. Create `client/.env` from `client/.env.example`.

4. Start both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000/api/health`

## MongoDB Atlas

1. Create a free MongoDB Atlas cluster.
2. Create a database user.
3. Add your IP address or `0.0.0.0/0` for Render access.
4. Copy the connection string into `MONGO_URI`.

## Render Backend

1. Create a new Render Web Service.
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `MONGO_URI`
   - `CLIENT_ORIGIN=https://your-vercel-domain.vercel.app`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `MAIL_FROM`
   - `PORTFOLIO_OWNER_EMAIL`

## Vercel Frontend

1. Import the repository into Vercel.
2. Root directory: `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://your-render-service.onrender.com/api`

## Performance Notes

- Vite production build minifies and chunks assets.
- Resume is served from `public` and tracked through API events.
- Animations use Framer Motion and CSS transforms for GPU-friendly motion.
- Analytics calls fail silently so the portfolio still works if the backend sleeps.
