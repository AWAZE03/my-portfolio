/**
 * M D AWAZE — Portfolio Script
 * ─────────────────────────────────────────────────────────
 * Features:
 *   - GitHub API integration with sessionStorage caching
 *   - Typing animation (multi-phrase cycling)
 *   - Navbar scroll-spy using IntersectionObserver
 *   - Mobile hamburger menu
 *   - Scroll-to-top button
 *   - Skill bar animations (triggered on scroll)
 *   - Stats counter animation
 *   - Timeline scroll animations
 *   - Floating particle generator
 *   - Contact form (mailto)
 *   - General fade-in-on-scroll animations
 * ─────────────────────────────────────────────────────────
 *
 * HOW TO CUSTOMIZE:
 *   1. Change CONFIG.githubUsername to your GitHub username
 *   2. Change CONFIG.email to your real email address
 *   3. Add/remove repos from CONFIG.excludeRepos
 *   4. Update CONFIG.typingPhrases with your roles
 */

// ============================================================
// ⚙️  CONFIGURATION
// ============================================================
const CONFIG = {
  /* Your GitHub username */
  githubUsername: 'AWAZE03',

  /* Your contact email — TODO: replace with real email */
  email: 'awaze@example.com',

  /* Repos to exclude from the Projects section (e.g. the portfolio repo itself) */
  excludeRepos: ['my-portfolio'],

  /* Cache duration: 10 minutes in milliseconds */
  cacheDuration: 10 * 60 * 1000,

  /* Phrases for the hero typing animation */
  typingPhrases: [
    'Full Stack Developer',
    'Web Developer',
    'JavaScript Developer',
    'Open Source Enthusiast',
    'UI/UX Enthusiast',
  ],
};

// ============================================================
// ⌨️  TYPING ANIMATION
// ============================================================
(function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let speed       = 110;

  function type() {
    const phrase = CONFIG.typingPhrases[phraseIndex];

    if (!isDeleting) {
      // Type forward
      el.textContent = phrase.substring(0, charIndex + 1);
      charIndex++;
      speed = 110;

      if (charIndex === phrase.length) {
        // Pause at end before deleting
        speed = 2200;
        isDeleting = true;
      }
    } else {
      // Delete backward
      el.textContent = phrase.substring(0, charIndex - 1);
      charIndex--;
      speed = 55;

      if (charIndex === 0) {
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % CONFIG.typingPhrases.length;
        speed = 300;
      }
    }

    setTimeout(type, speed);
  }

  // Start after a short delay so the page has loaded
  setTimeout(type, 800);
})();

// ============================================================
// 🔝  NAVBAR — Scroll effect + Scroll-spy + Mobile menu
// ============================================================
(function initNavbar() {
  const navbar        = document.getElementById('navbar');
  const mobileBtn     = document.getElementById('mobileMenuBtn');
  const mobileMenu    = document.getElementById('mobileMenu');
  const navLinks      = document.querySelectorAll('.nav-link');
  const sections      = document.querySelectorAll('section[id]');
  const mobileLinks   = document.querySelectorAll('.mobile-nav-link');

  if (!navbar) return;

  // ── Navbar shadow on scroll ──────────────────────────────
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 40
      ? '0 4px 30px rgba(0, 0, 0, 0.4)'
      : 'none';
  }, { passive: true });

  // ── Mobile hamburger toggle ───────────────────────────────
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close on mobile link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // ── Scroll-spy using IntersectionObserver ────────────────
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const matches = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', matches);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach(s => spyObserver.observe(s));
})();

// ============================================================
// ⬆️  SCROLL-TO-TOP BUTTON
// ============================================================
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================================================
// 📊  SKILL BAR ANIMATIONS (triggered when bars scroll into view)
// ============================================================
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width  = target.getAttribute('data-width') || '0';
          // Small delay so user sees the animation start
          setTimeout(() => { target.style.width = `${width}%`; }, 200);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
})();

// ============================================================
// 🔢  STATS COUNTER ANIMATION
// ============================================================
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';

        animateCount(el, 0, target, 2000, suffix);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));

  /**
   * Animate a number from start to end over `duration` ms.
   * Uses ease-out cubic easing.
   */
  function animateCount(el, start, end, duration, suffix) {
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(start + (end - start) * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
})();

// ============================================================
// 📅  TIMELINE SCROLL ANIMATIONS
// ============================================================
(function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay for each item
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(item => observer.observe(item));
})();

// ============================================================
// ✨  GENERAL SCROLL FADE-IN ANIMATIONS
// ============================================================
(function initScrollAnimations() {
  const els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  els.forEach(el => observer.observe(el));
})();

// ============================================================
// 🌟  FLOATING PARTICLES (Hero section background)
// ============================================================
(function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const COUNT = 18;

  for (let i = 0; i < COUNT; i++) {
    const p    = document.createElement('div');
    const size = Math.random() * 5 + 2; // 2–7 px

    p.className = 'particle';
    p.style.cssText = `
      width:              ${size}px;
      height:             ${size}px;
      left:               ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 14 + 8}s;
      animation-delay:    ${Math.random() * 8}s;
      opacity:            ${(Math.random() * 0.4 + 0.1).toFixed(2)};
    `;
    container.appendChild(p);
  }
})();

// ============================================================
// 🐙  GITHUB API — Fetch repos & render project cards
// ============================================================

/**
 * Map a language name to its CSS badge class.
 * @param {string} lang
 * @returns {string}
 */
function getBadgeClass(lang) {
  const map = {
    HTML:       'badge-html',
    CSS:        'badge-css',
    JavaScript: 'badge-js',
    TypeScript: 'badge-ts',
    Python:     'badge-python',
    React:      'badge-react',
    'Node.js':  'badge-node',
  };
  return map[lang] || 'badge-default';
}

/**
 * Format a repo name for display:
 *   "my-cool-project" → "My Cool Project"
 * @param {string} name
 * @returns {string}
 */
function formatRepoName(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Return a human-readable relative time string.
 * @param {string} dateStr  ISO date string
 * @returns {string}
 */
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const d    = Math.floor(diff / 86400000); // days

  if (d === 0)   return 'today';
  if (d === 1)   return 'yesterday';
  if (d < 7)     return `${d} days ago`;
  if (d < 30)    return `${Math.floor(d / 7)} week${Math.floor(d / 7) > 1 ? 's' : ''} ago`;
  if (d < 365)   return `${Math.floor(d / 30)} month${Math.floor(d / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(d / 365)} year${Math.floor(d / 365) > 1 ? 's' : ''} ago`;
}

/**
 * Read a value from sessionStorage cache.
 * Returns null if missing or expired.
 * @param {string} key
 */
function getCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    return (Date.now() - ts > CONFIG.cacheDuration) ? (sessionStorage.removeItem(key), null) : data;
  } catch { return null; }
}

/**
 * Write a value to sessionStorage cache with a timestamp.
 * @param {string} key
 * @param {*}      data
 */
function setCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch { /* storage full — skip silently */ }
}

/**
 * Fetch language breakdown for a single repo.
 * Results are cached per-repo.
 * @param {string} repoName
 * @returns {Promise<Object>}  e.g. { JavaScript: 4500, HTML: 1200 }
 */
async function fetchLanguages(repoName) {
  const cacheKey = `gh_langs_${repoName}`;
  const cached   = getCache(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${CONFIG.githubUsername}/${repoName}/languages`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) return {};
    const langs = await res.json();
    setCache(cacheKey, langs);
    return langs;
  } catch { return {}; }
}

/**
 * Determine the filter category for a repo based on its languages.
 * @param {Object} langs  e.g. { JavaScript: 4500, HTML: 1200 }
 * @returns {'js'|'html'|'other'}
 */
function detectFilter(langs) {
  const keys = Object.keys(langs);
  if (keys.includes('JavaScript') || keys.includes('TypeScript')) return 'js';
  if (keys.includes('HTML')       || keys.includes('CSS'))        return 'html';
  return 'other';
}

/**
 * Build a project card DOM element.
 * @param {Object} repo   GitHub repo object
 * @param {Object} langs  Language bytes map
 * @param {number} index  Position in list (for stagger delay)
 * @returns {HTMLElement}
 */
function createProjectCard(repo, langs, index) {
  // Top 3 languages sorted by byte count
  const topLangs = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang);

  const badgeHTML = topLangs.length
    ? topLangs.map(l =>
        `<span class="badge-base ${getBadgeClass(l)}">${l}</span>`
      ).join('')
    : `<span class="badge-base badge-default">General</span>`;

  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.animationDelay = `${index * 0.08}s`;
  card.setAttribute('data-filter', detectFilter(langs));

  card.innerHTML = `
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-2 min-w-0">
        <i class="fa-brands fa-github text-purple-400 text-xl flex-shrink-0"></i>
        <h3 class="font-bold text-white text-base leading-tight truncate">
          ${formatRepoName(repo.name)}
        </h3>
      </div>
      <div class="flex items-center gap-3 text-xs text-slate-400 flex-shrink-0 ml-2">
        <span title="Stars">⭐ ${repo.stargazers_count}</span>
        <span title="Forks">🍴 ${repo.forks_count}</span>
      </div>
    </div>

    <p class="text-slate-400 text-sm mb-4 leading-relaxed" style="min-height:40px">
      ${repo.description ? repo.description : '<em class="opacity-50">No description available.</em>'}
    </p>

    <div class="flex flex-wrap gap-1 mb-4">
      ${badgeHTML}
    </div>

    <div class="flex items-center justify-between pt-3 border-t border-purple-900/30">
      <span class="text-xs text-slate-500">
        <i class="fa-regular fa-clock mr-1"></i>Updated ${timeAgo(repo.updated_at)}
      </span>
      <a href="${repo.html_url}"
         target="_blank"
         rel="noopener noreferrer"
         class="btn-outline"
         style="padding:5px 14px;font-size:0.78rem;">
        <i class="fa-brands fa-github"></i> View
      </a>
    </div>
  `;

  return card;
}

/**
 * Apply filter to project cards (show/hide).
 * Also updates the active state on filter buttons.
 * @param {string} filter  'all' | 'js' | 'html' | 'other'
 */
function filterProjects(filter) {
  document.querySelectorAll('.project-card[data-filter]').forEach(card => {
    const match = filter === 'all' || card.getAttribute('data-filter') === filter;
    card.style.display = match ? '' : 'none';
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
  });
}

/**
 * Main function: fetch repos from GitHub API and render cards.
 * Called on DOMContentLoaded.
 */
async function loadGitHubProjects() {
  const grid    = document.getElementById('projects-grid');
  const loading = document.getElementById('projects-loading');
  const errBox  = document.getElementById('projects-error');

  if (!grid) return;

  // ── 1. Fetch repos (with cache) ──────────────────────────
  let repos = getCache('gh_repos');

  if (!repos) {
    try {
      const res = await fetch(
        `https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=30&type=public`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      );

      if (!res.ok) {
        throw new Error(
          res.status === 403
            ? '⚠️ GitHub API rate limit hit. Please wait a few minutes and refresh.'
            : `GitHub API error ${res.status}: ${res.statusText}`
        );
      }

      repos = await res.json();
      setCache('gh_repos', repos);
    } catch (err) {
      if (loading) loading.style.display = 'none';
      if (errBox) {
        errBox.style.display = 'flex';
        const msg = errBox.querySelector('.error-msg');
        if (msg) msg.textContent = err.message;
      }
      console.error('[Portfolio] GitHub API error:', err);
      return;
    }
  }

  // ── 2. Filter out excluded repos and forks ───────────────
  const filtered = repos.filter(r =>
    !CONFIG.excludeRepos.includes(r.name) && !r.fork
  );

  if (loading) loading.style.display = 'none';

  if (!filtered.length) {
    grid.innerHTML = `
      <p class="text-slate-400 text-center col-span-full py-10">
        No public repositories found. <a href="https://github.com/${CONFIG.githubUsername}" class="text-primary-light underline" target="_blank">View GitHub Profile</a>
      </p>`;
    return;
  }

  // ── 3. Fetch languages in parallel batches ───────────────
  const BATCH = 5;
  const results = [];

  for (let i = 0; i < filtered.length; i += BATCH) {
    const batch = filtered.slice(i, i + BATCH);
    const batchResults = await Promise.all(
      batch.map(repo => fetchLanguages(repo.name).then(langs => ({ repo, langs })))
    );
    results.push(...batchResults);
  }

  // ── 4. Render cards ──────────────────────────────────────
  grid.innerHTML = '';
  results.forEach(({ repo, langs }, idx) => {
    grid.appendChild(createProjectCard(repo, langs, idx));
  });

  // ── 5. Wire up filter buttons ────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterProjects(btn.getAttribute('data-filter') || 'all');
    });
  });
}

// ============================================================
// 📬  CONTACT FORM (mailto fallback)
// ============================================================
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]')?.value    || '';
    const email   = form.querySelector('[name="email"]')?.value   || '';
    const subject = form.querySelector('[name="subject"]')?.value || 'Portfolio Contact';
    const message = form.querySelector('[name="message"]')?.value || '';

    const body = `From: ${name}\nEmail: ${email}\n\n${message}`;
    const href = `mailto:${CONFIG.email}`
      + `?subject=${encodeURIComponent(subject + ' — via Portfolio')}`
      + `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  });
})();

// ============================================================
// 🚀  DOM READY — Kick everything off
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Load GitHub projects
  loadGitHubProjects();
});
