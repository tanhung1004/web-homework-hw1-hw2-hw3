# HW2 — Drum Kit Engine

## Task Decomposition

### Objective

Build a Drum Kit Engine using a contract-first architecture.

The HTML sound contract must be defined before JavaScript implementation.

---

## Development Flow

```text
STEP 1 — HTML data-sound Contract
        ↓
STEP 2 — Polyphonic Audio Playback Engine
        ↓
STEP 3 — Keyboard Listener + event.repeat Throttling
        ↓
STEP 4 — FIFO Beat Recorder
        ↓
Live Defense Preparation
        ↓
Final Review
```

---

# Step 1 — HTML Data-Sound Contract

## Requirement

Commit the HTML `data-sound` contract before touching JavaScript.

## Tasks

- [ ] Create the basic Drum Kit HTML structure
- [ ] Create drum buttons / pads
- [ ] Add `data-sound` attributes
- [ ] Define the keyboard binding in HTML
- [ ] Do not implement JavaScript playback yet
- [ ] Commit the HTML contract before continuing

Example structure:

```html
<button data-key="a" data-sound="kick">A</button>

<button data-key="s" data-sound="snare">S</button>
```

The HTML defines the relationship between:

```text
Keyboard Key
     ↓
Drum Sound
```

## Commit

```bash
git add .
git commit -m "feat(hw2): define HTML data-sound contract"
git push
```

---

# Step 2 — Polyphonic Audio Playback Engine

## Requirement

Implement the polyphonic Audio playback engine independently.

## Goal

The engine must allow multiple drum sounds to play without one sound unnecessarily stopping another.

## Tasks

- [ ] Read the sound information from the HTML contract
- [ ] Create the audio playback logic
- [ ] Allow multiple sounds to play
- [ ] Keep the playback engine separate from keyboard handling
- [ ] Test multiple drum sounds

## Important

Do not tightly hard-code keyboard logic inside the audio engine.

The audio engine should focus on:

```text
Sound requested
      ↓
Play sound
```

Keyboard input will be handled separately.

## Commit

```bash
git add .
git commit -m "feat(hw2): implement polyphonic audio engine"
git push
```

---

# Step 3 — Keydown Listener with event.repeat Throttling

## Requirement

Implement a `keydown` listener with `event.repeat` throttling.

## Tasks

- [ ] Listen for `keydown`
- [ ] Read the pressed key
- [ ] Match the key with the HTML data contract
- [ ] Trigger the audio engine
- [ ] Prevent repeated events when a key is held down

Example:

```javascript
document.addEventListener("keydown", (event) => {
  if (event.repeat) return;

  // Find the matching drum sound
  // Trigger playback
});
```

## Why event.repeat Is Needed

When the user holds a key:

```text
A A A A A A A A
```

the browser can fire repeated `keydown` events.

The listener should control this using:

```javascript
event.repeat;
```

## Checklist

- [ ] `keydown` listener works
- [ ] Correct key triggers correct drum sound
- [ ] Holding a key does not create unwanted repeated triggers
- [ ] Keyboard logic is separate from audio playback logic

## Commit

```bash
git add .
git commit -m "feat(hw2): add keyboard input throttling"
git push
```

---

# Step 4 — FIFO Beat Recorder

## Requirement

Implement a FIFO Beat Recorder using a timestamped event queue.

## Goal

Record drum events in the order they occur.

FIFO means:

```text
First In
First Out
```

Example recorded events:

```text
A — 0 ms
S — 320 ms
D — 650 ms
A — 900 ms
```

Possible data representation:

```javascript
[
  { key: "a", time: 0 },
  { key: "s", time: 320 },
  { key: "d", time: 650 },
  { key: "a", time: 900 },
];
```

## Tasks

- [ ] Create an event queue
- [ ] Record drum events
- [ ] Store a timestamp for each event
- [ ] Preserve the order of events
- [ ] Keep recorder logic separate from playback logic
- [ ] Test the recorded event order

## Checklist

- [ ] Events are stored in order
- [ ] Every event contains a timestamp
- [ ] FIFO order is preserved
- [ ] Recorder works with keyboard-triggered drum events

## Commit

```bash
git add .
git commit -m "feat(hw2): implement FIFO beat recorder"
git push
```

---

# Live Defense Preparation

## Requirement

The instructor may change a key binding.

You must be able to refactor it within:

```text
3 minutes
```

## Goal

Key bindings should not be deeply hard-coded inside JavaScript.

Example:

```html
<button data-key="a" data-sound="kick">A</button>
```

If the instructor changes:

```text
Kick: A
```

to:

```text
Kick: Q
```

the architecture should make the change simple.

Example:

```html
<button data-key="q" data-sound="kick">Q</button>
```

The JavaScript should continue reading the contract instead of requiring large code changes.

## Checklist

- [ ] Key bindings are easy to change
- [ ] Sound names are not tightly coupled to keyboard conditions
- [ ] HTML contract drives the key-to-sound mapping
- [ ] Can explain how the architecture is decoupled
- [ ] Can change a key binding quickly during live defense

---

# Final Checklist

## Step 1

- [ ] HTML data-sound contract created
- [ ] HTML contract committed before JavaScript implementation

## Step 2

- [ ] Polyphonic audio playback engine implemented
- [ ] Audio engine works independently

## Step 3

- [ ] `keydown` listener implemented
- [ ] `event.repeat` throttling implemented

## Step 4

- [ ] FIFO Beat Recorder implemented
- [ ] Timestamped event queue works

## Live Defense

- [ ] Key binding can be changed quickly
- [ ] Architecture is not tightly hard-coded
- [ ] Can explain the code and design

---

# Final Progress

```text
[ ] STEP 1 — HTML data-sound Contract

[ ] STEP 2 — Polyphonic Audio Engine

[ ] STEP 3 — keydown + event.repeat

[ ] STEP 4 — FIFO Beat Recorder

[ ] Live Defense Preparation

[ ] Final Review

[ ] Push Complete
```
