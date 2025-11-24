<!-- Copilot instructions for the Rightsolution_site repository -->
# Copilot / AI Agent Guidance

This is a small, static single-page site for RightSolution Windows & Doors. The guidance below is focused on patterns and actionable edits that let an AI coding agent be immediately productive in this repo.

- **Big picture:** Single static page served from `index.html` with styling in `style.css` and images in the `images/` folder. There is no build system, package manager, or server-side code in this repository.

- **Primary entry points:**
  - `index.html` — main markup, contains the visible DOM, the header/nav, slideshow markup, the contact form, and an inline slideshow script near the bottom.
  - `script.js` — an alternative slider + form handler implementation that is present but not currently referenced from `index.html` (structure mismatch). Treat it as a potential refactor target or remove if unused.
  - `style.css` — site styles; class names like `slide`, `slideshow-container`, `services-grid`, `service-box`, `section` are used across the markup.

- **Why things are structured this way:** Lightweight, static delivery is the goal — no build step. The inline script in `index.html` is the active slideshow implementation. `script.js` appears to implement a different slider API (`.slides`, `.slider-nav`) and a `submitForm` function; this suggests either an earlier refactor or an unused alternate implementation.

- **Concrete patterns and pointers for edits:**
  - Slideshow behavior: `index.html` exposes `plusSlides(n)` and `showSlides(n)` and uses a `slideIndex` global plus `setInterval(() => plusSlides(1), 5000)`. If you change DOM structure for slides, update these functions or consolidate into `script.js`.
  - `script.js` expects a container with class `.slides` and navigation dots `.slider-nav div`. If you consolidate slider code, update `index.html` to match those selectors or adapt `script.js` selectors to the existing markup.
  - Contact form: markup uses `<form class="contact-form">` but currently has no `onsubmit` attribute. `script.js` contains a `submitForm(e)` helper — attach it via: `<form class="contact-form" onsubmit="submitForm(event)">` or add an event listener in `script.js`.
  - Navigation markup uses `<button><li><a>...` nested elements — leave structure intact when making CSS/JS changes because selectors and layout may depend on it.

- **Developer workflows (how to test locally):**
  - No build step. Open `index.html` directly in a browser, or run a local static server for correct asset loading and to test AJAX/Forms if added.
  - Quick local server (PowerShell):
    - `cd` into the repo root, then run `python -m http.server 8000; Start-Process "http://localhost:8000"` (requires Python). Alternatively use the VS Code Live Server extension for live reload.

- **Conventions & gotchas discovered:**
  - Two slideshow implementations co-exist: inline in `index.html` (active) vs `script.js` (unused/mismatched). Before changing slideshow markup, pick one implementation to avoid duplicated behavior.
  - Minimal JS: prefer small, DOM-manipulating functions (no frameworks). Keep changes simple and avoid adding a toolchain unless the repo is intentionally migrated.
  - Accessibility hooks: the menu toggle button uses `aria-label` — preserve or extend ARIA attributes when modifying header behavior.

- **Integration points you may touch:**
  - If integrating a backend/contact endpoint, update the contact form `action` and change the `submitForm` logic in `script.js` to `fetch()` or `XMLHttpRequest` as appropriate.
  - Image assets live in `images/` and root-level image files (e.g., `project1.jpg`, `rswd-logo.png`) — updating paths requires no build change.

- **When to refactor vs minimal edits:**
  - Minimal change: edit `index.html` and `style.css` directly; attach `submitForm` if you only need form client-side behavior.
  - Refactor: consolidate slider code by choosing the `script.js` implementation or migrating the inline script into `script.js` and updating `index.html` selectors. If you do this, update or remove the `setInterval` duplicate and the inline functions to avoid conflicts.

If anything in this file is unclear or you'd like me to merge the two slideshow implementations into a single, well-documented module, tell me which behavior (inline functions in `index.html` vs `script.js`) you want kept and I will proceed.
