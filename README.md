# Beginner CSE Portfolio

A static personal portfolio for a first-year Computer Science Engineering student specializing in AI and Data Science. It uses only `index.html`, `style.css`, and `script.js`.

## Features

- Semantic sections: Home, About Me, Education, Skills, Projects, Contact, and AI Chatbot
- Navy blue, white, and gold theme
- Light and dark mode toggle (saved in the browser)
- Project search that filters by title, description, or technology
- Local demo chatbot UI (not connected to an AI API)
- Placeholders for personal details and links so you do not publish invented URLs

## Setup

1. Install a current web browser (Chrome, Edge, Firefox, or Safari).
2. Copy or clone this folder to your computer.
3. Open `index.html` in the browser:
   - File Explorer / Finder: double-click `index.html`, or
   - Drag `index.html` onto a browser window, or
   - In the browser, use File → Open File and choose `index.html`.
4. Optional local server (helpful if you later add more files):

```bash
npx --yes serve .
```

Then open the address shown in the terminal, usually `http://localhost:3000`.

## Customize

Replace every placeholder wrapped in square brackets, for example:

- `[YOUR FULL NAME]`
- `[YOUR EMAIL ADDRESS]`
- `[ADD YOUR REPOSITORY URL]`
- `[ADD YOUR LIVE APP URL]`

If a project does not have a repository or live demo yet, remove that link instead of inventing a URL.

## Chatbot and API keys

The chatbot is a **local demo only**. It replies with preset text in `script.js`. Do not add API keys to this website. If you connect a real AI later, send messages to your own backend and keep secrets on the server.

## Files

- `index.html` — page structure and content
- `style.css` — layout, colors, and responsive styles
- `script.js` — theme toggle, mobile menu, project search, and demo chatbot
- `page-audit.md` — checklist before you share the site
