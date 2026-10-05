# AI Failure Audit

This document records three defects identified during the review of the
AI-assisted implementation of HW3.

The defects were identified through code review, browser testing,
Git diff inspection, and DevTools debugging.

---

## Defect 1 — Double Submission

### Defect Description

The initial form implementation did not prevent the user from submitting
the registration form multiple times while a previous submission was still
being processed.

Because the simulated submission takes approximately one second, repeated
clicks on the Register button could trigger the submit handler multiple times
before the first submission completed.

This violated the requirement for double-submit prevention.

### Diagnostic Method

The defect was detected through manual browser testing.

The Register button was clicked repeatedly while the form was in the
`Submitting` state.

The submit handler could still be triggered before the previous submission
finished.

A DevTools breakpoint inside the submit event handler can also be used to
verify repeated executions.

### Refactored Solution

A state guard was added at the beginning of the submit handler:

```js
if (formState === FORM_STATES.SUBMITTING) {
  return;
}
```

The submit button is also disabled while the form is submitting:

```js
submitBtn.disabled = true;
```

After the submission completes, the button is enabled again.

This provides two layers of protection:

1. The state check prevents the submit logic from running again.
2. The disabled button prevents another submission from the user interface.

---

## Defect 2 — Countdown Interval Initialization Issue

### Defect Description

The initial countdown implementation called `updateCountdown()` before the
`countdownInterval` variable had been initialized.

The original execution order was similar to:

```js
updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);
```

Inside `updateCountdown()`, the code attempted to clear the interval when the
event had already expired:

```js
clearInterval(countdownInterval);
```

If the target event time was already in the past when the page loaded,
`updateCountdown()` could access `countdownInterval` before initialization.

This could cause a runtime error.

### Diagnostic Method

The defect was identified during code review by checking the execution order
of the countdown initialization.

The problem can also be reproduced by changing the event timestamp to a date
in the past and reloading the page.

DevTools Console can then be used to inspect the runtime error.

### Refactored Solution

The interval variable was declared before the first countdown update:

```js
let countdownInterval;
```

The countdown was then initialized using:

```js
updateCountdown();

countdownInterval = setInterval(updateCountdown, 1000);
```

The cleanup logic was also protected:

```js
if (countdownInterval) {
  clearInterval(countdownInterval);
}
```

This prevents the countdown from trying to clear an interval before the
interval has been initialized.

The countdown still remains drift-free because every update recalculates the
remaining time using:

```js
const remainingTime = eventTime - Date.now();
```

instead of decrementing a counter once every second.

---

## Defect 3 — Unsafe User Input Handling / XSS Risk

### Defect Description

The form accepts user-controlled values such as the user's name and email.

During review, the input handling needed additional protection before user
data could safely be reused in the interface.

Untrusted input must not be inserted into the page as executable HTML.

For example, using code such as:

```js
element.innerHTML = userInput;
```

would create an XSS risk if the user supplied malicious markup.

Example malicious input:

```html
<script>
  alert("XSS");
</script>
```

or:

```html
<img src="x" onerror="alert(1)" />
```

### Diagnostic Method

The issue was reviewed by inspecting the form input flow and testing the form
with HTML-like input.

Test values such as:

```html
<script>
  alert("XSS");
</script>
```

were entered into the Name field.

Browser testing and DevTools were used to verify that the supplied input was
treated as text and did not execute JavaScript.

### Refactored Solution

User input is normalized before being processed:

```js
function sanitizePlainText(value) {
  return value
    .trim()
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "");
}
```

The Name and Email fields are processed using:

```js
const safeName = sanitizePlainText(nameInput.value);

const safeEmail = sanitizePlainText(emailInput.value);
```

When user-controlled content is displayed in the interface, `textContent`
is used instead of `innerHTML`.

Example:

```js
formStatus.textContent = `Status: Success — Registration completed for ${submittedName}.`;
```

Using `textContent` ensures that user-controlled values are rendered as text
rather than interpreted as HTML or JavaScript.

This prevents the tested input from executing as an XSS payload.

---

## Final Review Summary

The three defects identified during the AI-assisted implementation were:

1. Duplicate form submissions during the `Submitting` state.
2. Unsafe countdown interval initialization when the event had already expired.
3. Insufficiently protected user input that required sanitization and safe text rendering.

The defects were detected through:

- Manual browser testing
- Code review
- Git diff inspection
- Chrome DevTools
- Input validation testing

Each issue was refactored and verified before the final version of HW3.
