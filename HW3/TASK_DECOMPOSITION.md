# HW3 — Resilient Event Hub & AI Failure Audit

## Task Decomposition

### Objective

Build a resilient landing page using three required implementation slices and document AI-induced defects discovered during development.

The project must be developed incrementally using atomic Git commits.

---

## Project Structure

```text
HW3/
├── index.html
├── style.css
├── script.js
├── TASK_DECOMPOSITION.md
└── AI_FAILURE_AUDIT.md
```

---

## Development Flow

```text
Build Basic Landing Page
        ↓
SLICE 1 — Drift-Free Countdown Engine
        ↓
SLICE 2 — State-Machine Form
        ↓
SLICE 3 — Double-Submit Prevention + Input Sanitization
        ↓
AI Failure Audit
        ↓
Git History Review
        ↓
Live Defense Preparation
        ↓
Final Review
```

---

# Step 1 — Build Basic Landing Page

## Goal

Create the basic HTML, CSS, and JavaScript structure before implementing the three required slices.

## Tasks

- [ ] Create `index.html`
- [ ] Create `style.css`
- [ ] Create `script.js`
- [ ] Link CSS correctly
- [ ] Link JavaScript correctly
- [ ] Create the basic landing page structure
- [ ] Create an area for the countdown
- [ ] Create the form interface
- [ ] Make sure the page loads correctly

## Suggested Commit

```bash
git add .
git commit -m "feat(hw3): build landing page structure"
git push
```

---

# Step 2 — Slice 1: Drift-Free Countdown Engine

## Requirement

Implement a:

```text
Drift-Free Countdown Engine
```

using:

```text
UTC ISO 8601 timestamps
```

---

## Goal

The countdown must calculate the remaining time from the actual target timestamp instead of depending only on decrementing a counter every second.

---

## Timestamp Format

Use a UTC ISO 8601 timestamp.

Example:

```text
2026-10-10T10:00:00Z
```

---

## Tasks

- [ ] Define the target time using an ISO 8601 timestamp
- [ ] Convert the target timestamp into a JavaScript date/time value
- [ ] Get the current time
- [ ] Calculate the remaining time
- [ ] Display the countdown
- [ ] Recalculate remaining time during each update
- [ ] Avoid countdown drift caused by depending only on `seconds--`

---

## Example Logic

```javascript
const targetTime = new Date("2026-10-10T10:00:00Z").getTime();

function updateCountdown() {
  const now = Date.now();
  const remaining = targetTime - now;

  // Convert remaining time
  // Update the countdown UI
}
```

The important idea is:

```text
Target Time - Current Time = Remaining Time
```

instead of:

```text
remainingSeconds--
```

---

## Slice 1 Checklist

- [ ] UTC ISO 8601 timestamp used
- [ ] Current time is recalculated
- [ ] Remaining time is calculated from timestamps
- [ ] Countdown updates correctly
- [ ] Countdown does not depend only on decrementing a counter

## Suggested Commit

```bash
git add .
git commit -m "feat(hw3): implement drift-free countdown"
git push
```

---

# Step 3 — Slice 2: State-Machine Form

## Requirement

Implement a form using the following states:

```text
Idle
  ↓
Submitting
  ↓
Success / Error
```

---

## State Flow

```text
IDLE
  ↓
User submits form
  ↓
SUBMITTING
  ↓
 ┌───────────┐
 │           │
SUCCESS     ERROR
```

---

## Tasks

- [ ] Create the form
- [ ] Define the form state
- [ ] Start with the `idle` state
- [ ] Change to `submitting` when the form is submitted
- [ ] Change to `success` when submission succeeds
- [ ] Change to `error` when submission fails
- [ ] Update the interface based on the current state

---

## Possible State Representation

```javascript
let formState = "idle";
```

Possible values:

```text
idle
submitting
success
error
```

---

## Example Flow

```text
Page loaded
    ↓
idle

Submit clicked
    ↓
submitting

Request successful
    ↓
success
```

or:

```text
Submit clicked
    ↓
submitting

Request failed
    ↓
error
```

---

## Slice 2 Checklist

- [ ] `idle` state implemented
- [ ] `submitting` state implemented
- [ ] `success` state implemented
- [ ] `error` state implemented
- [ ] UI responds correctly to state changes

## Suggested Commit

```bash
git add .
git commit -m "feat(hw3): implement form state machine"
git push
```

---

# Step 4 — Slice 3: Double-Submit Prevention & Input Sanitization

## Requirement

Implement:

```text
Double-submit prevention
```

and:

```text
Input sanitization
```

with:

```text
zero XSS
```

---

# Part A — Double-Submit Prevention

## Goal

Prevent the user from submitting the same form multiple times while a submission is already in progress.

## Tasks

- [ ] Detect when the form is already submitting
- [ ] Prevent another submission during the `submitting` state
- [ ] Disable the submit button while submitting
- [ ] Restore the appropriate UI after completion

Example:

```javascript
submitButton.disabled = true;
```

---

# Part B — Input Sanitization / XSS Prevention

## Goal

Do not insert untrusted user input into the page as executable HTML.

Avoid unsafe usage such as:

```javascript
output.innerHTML = userInput;
```

Prefer safe text rendering when displaying plain user input:

```javascript
output.textContent = userInput;
```

---

## Tasks

- [ ] Review all user input
- [ ] Avoid unsafe rendering of user-controlled HTML
- [ ] Use safe output methods for plain text
- [ ] Test form input handling
- [ ] Check that user input cannot inject executable markup

---

## Slice 3 Checklist

### Double Submit

- [ ] Multiple rapid submissions are prevented
- [ ] Submit button is controlled during submission
- [ ] Form state prevents duplicate actions

### Input Handling

- [ ] User input is reviewed
- [ ] Unsafe `innerHTML` usage with user input is avoided
- [ ] Plain user input is rendered safely
- [ ] XSS-related behavior is checked

## Suggested Commit

```bash
git add .
git commit -m "fix(hw3): prevent duplicate submission and unsafe input rendering"
git push
```

---

# Step 5 — Git Audit

## Requirement

The assignment requires:

```text
Minimum 5 atomic commits corresponding to slices
```

Do not complete the entire HW3 project and create only one final commit.

Each commit should represent one clear development step.

---

## Suggested Commit Flow

```text
1. feat(hw3): build landing page structure

2. feat(hw3): implement drift-free countdown

3. feat(hw3): implement form state machine

4. fix(hw3): prevent duplicate form submission

5. security(hw3): sanitize user input

6. docs(hw3): document AI failure audit
```

Minimum required:

```text
5 atomic commits
```

---

# Step 6 — One-Shot Prompting Ban

## Requirement

The assignment states:

```text
ONE-SHOT PROMPTING BAN
```

Do not treat the entire homework as one single implementation step.

The work should be divided into the required slices:

```text
Slice 1
Countdown
    ↓
Slice 2
State-Machine Form
    ↓
Slice 3
Double Submit + Input Sanitization
```

Each slice should be reviewed and tested separately.

---

# Step 7 — AI Failure Mode Report

## Requirement

Create the mandatory file:

```text
AI_FAILURE_AUDIT.md
```

This report is worth:

```text
15%
```

The report must document:

```text
3 AI-induced defects
```

that were caught during review.

---

## Each Defect Must Contain

### 1. Defect Description

Describe the AI-induced problem.

Examples mentioned by the assignment include:

```text
setInterval drift
innerHTML vulnerability
```

---

### 2. Diagnostic Method

Explain how the defect was found.

Examples from the assignment:

```text
Git diff inspection
DevTools breakpoint
```

---

### 3. Refactored Solution

Explain the clean engineering fix used to solve the problem.

---

# AI_FAILURE_AUDIT.md Structure

Create:

```text
HW3/AI_FAILURE_AUDIT.md
```

Use a structure like:

```markdown
# AI Failure Mode Report

## Defect 1

### Defect Description

Describe the first AI-induced defect.

### Diagnostic Method

Describe how the defect was discovered.

### Refactored Solution

Describe how the problem was fixed.

---

## Defect 2

### Defect Description

Describe the second AI-induced defect.

### Diagnostic Method

Describe how the defect was discovered.

### Refactored Solution

Describe how the problem was fixed.

---

## Defect 3

### Defect Description

Describe the third AI-induced defect.

### Diagnostic Method

Describe how the defect was discovered.

### Refactored Solution

Describe how the problem was fixed.
```

---

# Step 8 — Live Defense Preparation

## Requirement

The assignment states:

```text
Be prepared to explain any line from your Git history.
```

---

## Preparation Checklist

- [ ] Understand the countdown implementation
- [ ] Understand why the countdown is drift-free
- [ ] Understand the UTC ISO 8601 timestamp
- [ ] Understand the form states
- [ ] Understand double-submit prevention
- [ ] Understand input sanitization
- [ ] Understand why unsafe `innerHTML` can be dangerous with user input
- [ ] Understand each Git commit
- [ ] Be able to explain why each important code change was made

---

# Final HW3 Checklist

## Slice 1

- [ ] Drift-free countdown implemented
- [ ] UTC ISO 8601 timestamp used

## Slice 2

- [ ] `idle` state works
- [ ] `submitting` state works
- [ ] `success` state works
- [ ] `error` state works

## Slice 3

- [ ] Double-submit prevention implemented
- [ ] Input handling reviewed
- [ ] XSS-related unsafe rendering avoided

## Git

- [ ] Minimum 5 atomic commits
- [ ] Commits correspond to development slices
- [ ] Git history is clear

## AI Failure Audit

- [ ] `AI_FAILURE_AUDIT.md` created
- [ ] Defect 1 documented
- [ ] Defect 2 documented
- [ ] Defect 3 documented
- [ ] Each defect includes Defect Description
- [ ] Each defect includes Diagnostic Method
- [ ] Each defect includes Refactored Solution

## Live Defense

- [ ] Can explain code
- [ ] Can explain Git history
- [ ] Can explain each important engineering decision

---

# Final Development Flow

```text
STEP 1
Build Basic Landing Page
        ↓
Commit

STEP 2
SLICE 1
Drift-Free Countdown
        ↓
Commit

STEP 3
SLICE 2
State-Machine Form
        ↓
Commit

STEP 4
SLICE 3
Double-Submit Prevention
        ↓
Commit

STEP 5
Input Sanitization / XSS Review
        ↓
Commit

STEP 6
AI_FAILURE_AUDIT.md
        ↓
Document 3 AI-Induced Defects
        ↓
Commit

STEP 7
Review Git History
        ↓
Prepare Live Defense
        ↓
Final Push
```

---

# Progress

```text
[ ] Basic Landing Page

[ ] Slice 1 — Drift-Free Countdown

[ ] Slice 2 — State-Machine Form

[ ] Slice 3 — Double-Submit Prevention

[ ] Slice 3 — Input Sanitization / XSS Review

[ ] Minimum 5 Atomic Commits

[ ] AI_FAILURE_AUDIT.md

[ ] 3 AI-Induced Defects Documented

[ ] Live Defense Preparation

[ ] Final Review

[ ] Push Complete
```
