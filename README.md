# Peter Milimo — Ministry & Leadership Platform

Built with **Astro** · Deployed on **Vercel** · Content managed via **Decap CMS**

---

## Project Structure

```
petermilimo/
├── public/
│   └── admin/
│       ├── index.html        ← Decap CMS editor UI
│       └── config.yml        ← CMS field definitions
├── src/
│   ├── content/
│   │   ├── config.ts         ← Astro content collection schemas
│   │   ├── siteConfig/
│   │   │   └── main.json     ← Hero text, stats, payment details, links
│   │   ├── sermons/
│   │   │   └── *.json        ← One file per sermon
│   │   ├── books/
│   │   │   └── *.json        ← One file per book
│   │   └── resources/
│   │       └── *.json        ← One file per free resource
│   └── pages/
│       └── index.astro       ← Main page (reads all content collections)
├── astro.config.mjs
└── package.json
```

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:4321

---

## Editing Content

### Option A — Edit JSON files directly (GitHub)

1. Go to your GitHub repo
2. Navigate to `src/content/sermons/` (or books / resources / siteConfig)
3. Click any `.json` file → click the pencil icon to edit
4. Change values → click **Commit changes**
5. Vercel auto-deploys within ~30 seconds

### Option B — Use the CMS editor (recommended for non-developers)

1. **First-time setup:** Edit `public/admin/config.yml` line 3:
   ```yaml
   repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
   ```
2. Go to `https://yoursite.vercel.app/admin`
3. Log in with GitHub
4. Edit anything through the form UI — saves commit to GitHub → Vercel deploys

---

## Adding a New Sermon

Create a new file in `src/content/sermons/` named `your-sermon-title.json`:

```json
{
  "title": "Your Sermon Title",
  "speaker": "Peter Milimo",
  "date": "June 2025",
  "category": "Marriage Restoration",
  "duration": "45 min",
  "verse": "\"Your verse here\" — Reference",
  "excerpt": "A short description of the sermon content.",
  "youtubeUrl": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
}
```

Categories: `Marriage Restoration` · `Christian Leadership` · `Spiritual Awakening` · `Youth Empowerment` · `Christian Living`

---

## Adding a New Book

Create `src/content/books/book-slug.json`:

```json
{
  "title": "Book Title",
  "author": "Peter Milimo",
  "cat": "Marriage & Family",
  "sub": "Subtitle here",
  "desc": "Full description of the book.",
  "price": "KSh 1,200",
  "format": "Softcopy (PDF / eBook)",
  "order": 3
}
```

---

## Adding a Free Resource

Create `src/content/resources/resource-slug.json`:

```json
{
  "title": "Resource Title",
  "tag": "Marriage",
  "desc": "What this resource covers.",
  "pages": "20 pages",
  "size": "1.0 MB",
  "url": "/downloads/your-file.pdf",
  "order": 7
}
```

Put the actual PDF in `public/downloads/your-file.pdf` so it's served at that URL.

---

## Updating Payment Details

Edit `src/content/siteConfig/main.json` — change `paybillNumber`, `accountNumber`, `accountName`, `bookPrice`, or `email`.

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. Framework: **Astro** (auto-detected)
4. Click **Deploy** — done!

Every future push to `main` triggers an automatic redeploy.

---

## Setting Up Decap CMS (optional but recommended)

1. Update `public/admin/config.yml` with your repo name
2. In your GitHub repo → **Settings → Developer settings → OAuth Apps** → create a new app:
   - Homepage URL: `https://yoursite.vercel.app`
   - Callback URL: `https://yoursite.vercel.app/api/auth`  
   *(Or use [Netlify Identity](https://docs.netlify.com/visitor-access/identity/) as the OAuth provider — works with Vercel too)*
3. Then visit `https://yoursite.vercel.app/admin` to log in and edit

---

© 2025 Peter Milimo Ministry & Leadership
