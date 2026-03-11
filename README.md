# 🚀 M D AWAZE — Modern Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-7600bc?style=for-the-badge&logo=github)](https://awaze03.github.io/my-portfolio/)
[![GitHub Stars](https://img.shields.io/github/stars/AWAZE03/my-portfolio?style=for-the-badge&color=7600bc)](https://github.com/AWAZE03/my-portfolio/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A **fully modern, responsive, animated portfolio** built with vanilla HTML, Tailwind CSS, and JavaScript — no build step, deploys directly to GitHub Pages. Projects are **auto-loaded live from GitHub** via the GitHub REST API.

---

## ✨ Features

| Feature                       | Details                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| 🐙 **GitHub API Integration** | Auto-fetches all public repos with name, description, language badges, stars, forks    |
| 🎨 **Modern Dark Theme**      | Deep purple (`#7600bc`) gradient design with glassmorphism cards                       |
| ⌨️ **Typing Animation**       | Cycles through your roles in the hero section                                          |
| 🏗️ **All Sections**           | Hero · About · Skills · Projects · Experience · Contact · Footer                       |
| 📱 **Fully Responsive**       | Mobile-first, hamburger nav, adaptive grid                                             |
| ⚡ **Performance**            | SessionStorage API caching, lazy images, CDN-only dependencies                         |
| 🎬 **Animations**             | Scroll-triggered fade-ins, skill bars, counter roll-up, timeline reveal, floating orbs |
| 🔍 **SEO Ready**              | Full meta tags, Open Graph, Twitter Card, JSON-LD structured data                      |
| 🔎 **Project Filters**        | Filter cards by All · HTML/CSS · JavaScript · Other                                    |
| ♿ **Accessible**             | Semantic HTML5, ARIA labels, keyboard navigation                                       |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, SEO-optimised
- **Tailwind CSS** — via CDN (no build step)
- **Vanilla JavaScript** — ES2020+, no frameworks needed
- **Font Awesome 6** — Icons
- **Google Fonts** — Inter + Fira Code
- **GitHub REST API v3** — Live repo data

---

## 📁 Project Structure

```
my-portfolio/
├── index.html              # Main HTML — all sections
├── style.css               # Custom CSS (dark theme, animations, components)
├── script.js               # All JavaScript (GitHub API, animations, etc.)
├── README.md               # This file
└── html_finalprojimages/   # Legacy local images (kept for compatibility)
```

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/AWAZE03/my-portfolio.git
cd my-portfolio
```

### 2. Open locally

Just open `index.html` in any browser — no server or `npm install` needed:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

---

## ⚙️ Customization Guide

### 🔧 Change Your GitHub Username

Open `script.js` and update the `CONFIG` object at the top:

```javascript
const CONFIG = {
  githubUsername: 'YOUR_GITHUB_USERNAME',  // ← change this
  email: 'you@example.com',                // ← change this
  excludeRepos: ['my-portfolio'],          // ← repos to hide
  ...
};
```

### 🎨 Change Your Name / Info

In `index.html`, search for `M D AWAZE` and replace with your name throughout.

### ✍️ Update the Typing Phrases

```javascript
typingPhrases: [
  'Full Stack Developer',
  'Your Custom Role',
  'Another Title Here',
],
```

### 🚫 Exclude Repos from Projects Section

```javascript
excludeRepos: ['my-portfolio', 'some-other-repo'],
```

### 🎨 Change the Primary Color

In `style.css`, update `--primary`, `--primary-dark`, `--primary-light`:

```css
:root {
  --primary: #7600bc; /* Main purple — change here */
  --primary-dark: #5a0090;
  --primary-light: #9b30d9;
}
```

Also update the Tailwind config in `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#YOUR_COLOR',
        ...
      }
    }
  }
}
```

### 📬 Update Contact Email

Replace `awaze@example.com` with your real email in:

1. `script.js` → `CONFIG.email`
2. `index.html` → all `href="mailto:..."` links

### 🖼️ Update Profile Image

The portfolio uses your GitHub avatar automatically:

```
https://avatars.githubusercontent.com/YOUR_USERNAME
```

To use a custom image, replace the `src` attributes on the `<img>` tags in the About and Hero sections.

---

## 🌐 Deploying to GitHub Pages

### Method 1: Via GitHub UI

1. Push your changes to the `main` branch
2. Go to **Settings → Pages**
3. Under **Source**, select `main` branch, root folder `/`
4. Click **Save** — your site will be live at `https://USERNAME.github.io/my-portfolio/`

### Method 2: Via GitHub CLI

```bash
# Push changes
git add .
git commit -m "✨ Modernize portfolio"
git push origin main

# Enable Pages (if not already done via UI)
gh api repos/:owner/:repo/pages -X POST -f source.branch=main -f source.path=/
```

### ⚠️ After Deploy

Update the canonical URL and Open Graph URL in `index.html` to your live URL:

```html
<link rel="canonical" href="https://YOUR_USERNAME.github.io/my-portfolio/" />
<meta
  property="og:url"
  content="https://YOUR_USERNAME.github.io/my-portfolio/"
/>
```

---

## 🔒 GitHub API Rate Limiting

The GitHub API allows **60 requests/hour** for unauthenticated requests per IP.

The portfolio uses **sessionStorage caching** (10-minute TTL) to minimize API calls:

- Repo list is cached under key `gh_repos`
- Languages per repo cached under `gh_langs_{repoName}`

If rate-limited, visitors see a friendly error message with a retry button.

---

## 🧩 Adding / Editing Sections

### Add a new Experience item

In `index.html`, copy an existing `.timeline-item` block inside the Experience section and update the content:

```html
<div class="timeline-item">
  <div
    class="bg-dark-2/80 border border-purple-900/50 rounded-xl p-6 backdrop-blur"
  >
    <div class="flex items-start gap-4">
      <div
        class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl flex-shrink-0"
      >
        🎯
      </div>
      <div>
        <div class="flex flex-wrap items-center gap-3 mb-2">
          <h3 class="text-white font-bold text-lg">Your Achievement Title</h3>
          <span
            class="text-xs font-mono bg-primary/20 text-primary-light border border-primary/30 px-2 py-1 rounded-full"
            >2025</span
          >
        </div>
        <p class="text-slate-400 text-sm leading-relaxed">Description here.</p>
      </div>
    </div>
  </div>
</div>
```

### Add a skill

In `index.html`, inside one of the `.skill-category-card` blocks:

```html
<div>
  <div class="flex justify-between mb-1">
    <span class="text-slate-300 text-sm font-medium">Your Skill</span>
    <span class="text-primary-light text-sm font-mono">75%</span>
  </div>
  <div class="skill-bar">
    <div class="skill-bar-fill" data-width="75"></div>
  </div>
</div>
```

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 🙏 Credits

- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [Font Awesome](https://fontawesome.com) — Icon library
- [Google Fonts](https://fonts.google.com) — Inter & Fira Code typefaces
- [GitHub REST API](https://docs.github.com/en/rest) — Live project data

---

<div align="center">
  <strong>M D AWAZE</strong><br/>
  <a href="https://github.com/AWAZE03">@AWAZE03</a>
</div>
