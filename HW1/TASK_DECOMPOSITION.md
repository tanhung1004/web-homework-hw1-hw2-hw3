# HW1 — Production Portfolio

## Task Decomposition

### Objective

Build a production-ready portfolio website and complete all required HW1 milestones step by step.

The project must follow an **atomic development workflow** instead of being completed in one large commit.

---

## Project Structure

```text
HW1/
├── index.html
├── style.css
├── script.js
├── assets/
└── TASK_DECOMPOSITION.md
```

---

## Development Flow

```text
Build Basic Portfolio
        ↓
M1 — WCAG 2.2 AA Audit
        ↓
M2 — Focus Trap / Keyboard Audit
        ↓
M3 — Strict CSP & Zero Inline Handlers
        ↓
M4 — Lighthouse 100 Audit
        ↓
Final Review
        ↓
Push to GitHub
```

---

# Step 1 — Build Basic Portfolio

## Tasks

- [ ] Create `index.html`
- [ ] Create `style.css`
- [ ] Create `script.js`
- [ ] Link CSS correctly
- [ ] Link JavaScript correctly
- [ ] Create the basic portfolio layout
- [ ] Make sure the website runs correctly

Suggested portfolio sections:

- Home
- About
- Projects
- Contact

## Commit

```bash
git add .
git commit -m "feat: build portfolio base layout"
git push
```

---

# Step 2 — M1: WCAG 2.2 AA Audit

## Requirement

Perform a **WCAG 2.2 AA accessibility audit**.

## Tasks

- [ ] Check text and background contrast
- [ ] Use semantic HTML landmarks
- [ ] Check images and `alt` attributes
- [ ] Check form labels if a form is used
- [ ] Check buttons and links
- [ ] Review basic accessibility issues

Semantic landmarks should be used where appropriate:

```html
<header></header>
<nav></nav>
<main></main>
<section></section>
<footer></footer>
```

## Required Commit

```bash
git add .
git commit -m "fix(a11y): contrast & landmarks"
git push
```

---

# Step 3 — M2: Focus Trap / Keyboard Navigation Audit

## Requirement

Perform a **focus trap and keyboard navigation audit**.

## Tasks

Test the website using:

```text
Tab
Shift + Tab
Enter
Escape
```

Check that:

- [ ] Navigation links can be reached
- [ ] Buttons can be reached
- [ ] Form inputs can be reached
- [ ] Focus order is logical
- [ ] Focus is visible
- [ ] Keyboard users do not become trapped
- [ ] Menus or modals can be exited correctly if used

## Required Commit

```bash
git add .
git commit -m "fix(nav): keyboard trap prevention"
git push
```

---

# Step 4 — M3: Strict CSP & Zero Inline Handlers

## Requirement

Use **Strict CSP** and **zero inline JavaScript handlers**.

Inline handlers such as `onclick` are not allowed.

### Do NOT use

```html
<button onclick="openMenu()">Menu</button>
```

### Use instead

```html
<button id="menuBtn">Menu</button>
```

```javascript
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", openMenu);
```

## Tasks

- [ ] No `onclick`
- [ ] No `onchange`
- [ ] No `onsubmit`
- [ ] No `onkeydown`
- [ ] No other inline JavaScript handlers
- [ ] Use `addEventListener()`
- [ ] Keep JavaScript in `script.js`
- [ ] Keep HTML and JavaScript separated

## Suggested Commit

```bash
git add .
git commit -m "refactor: remove inline event handlers"
git push
```

---

# Step 5 — M4: Lighthouse Audit

## Requirement

Run a Lighthouse audit.

Target:

```text
Lighthouse Score: 100
```

## How to Run

```text
Open Website
    ↓
Press F12
    ↓
Open Lighthouse
    ↓
Analyze Page
```

## Review

- [ ] Performance
- [ ] Accessibility
- [ ] Best Practices
- [ ] SEO

## Optimization Tasks

- [ ] Optimize large images
- [ ] Remove unused assets
- [ ] Remove unnecessary JavaScript
- [ ] Fix accessibility warnings
- [ ] Fix Lighthouse issues
- [ ] Run Lighthouse again
- [ ] Check final score

## Required Commit

```bash
git add .
git commit -m "perf: optimize assets"
git push
```

---

# Git Commit Plan

HW1 requires a minimum of **4 commits**.

Recommended commit history:

```text
1. feat: build portfolio base layout

2. fix(a11y): contrast & landmarks

3. fix(nav): keyboard trap prevention

4. refactor: remove inline event handlers

5. perf: optimize assets
```

> Do not complete the entire homework and commit everything at once.

Each commit should represent one clear development step.

---

# Final Checklist

## Portfolio

- [ ] Website runs correctly
- [ ] HTML works correctly
- [ ] CSS works correctly
- [ ] JavaScript works correctly

## M1 — Accessibility

- [ ] WCAG 2.2 AA audit completed
- [ ] Contrast checked
- [ ] Semantic landmarks checked

## M2 — Keyboard Navigation

- [ ] Keyboard navigation tested
- [ ] Focus is visible
- [ ] No focus trap

## M3 — CSP

- [ ] No inline JavaScript handlers
- [ ] Events use `addEventListener()`

## M4 — Lighthouse

- [ ] Lighthouse audit completed
- [ ] Assets optimized
- [ ] Target score checked

## Git

- [ ] Minimum 4 atomic commits
- [ ] Commit history is clear
- [ ] No one-shot / monolithic commit
- [ ] Latest code pushed to GitHub

---

# Progress

```text
[ ] Step 1 — Basic Portfolio

[ ] Step 2 — M1: WCAG 2.2 AA

[ ] Step 3 — M2: Focus Trap / Keyboard Navigation

[ ] Step 4 — M3: Strict CSP / Zero Inline Handlers

[ ] Step 5 — M4: Lighthouse Audit

[ ] Final Review

[ ] Push Complete
```
