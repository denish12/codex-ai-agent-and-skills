---
name: karpathy-guidelines
description: Behavioral guidelines to reduce common LLM mistakes across all tasks — code, design, analytics, product. Apply always.
license: MIT
source: https://x.com/karpathy/status/2015883857489522876
---

# Karpathy Guidelines

Behavioral guidelines to reduce common LLM mistakes, derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876).

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### Example: Hidden Assumptions

**Request:** "Add a feature to export user data"

❌ **What LLMs do** — silently assume format, fields, scope:

```python
def export_users(format='json'):
    users = User.query.all()
    with open('users.json', 'w') as f:
        json.dump([u.to_dict() for u in users], f)
    return f"Exported {len(users)} users"
```

✅ **What should happen** — surface assumptions and ask:

```
Before implementing, I need to clarify:

1. Scope: Export all users or filtered subset? (privacy implications)
2. Format: "export" — download file, background job, or API endpoint?
3. Fields: Which user fields? (some might be sensitive)
4. Volume: How many users? (affects approach)

What's your preference?
```

### Example: Multiple Interpretations

**Request:** "Make the search faster"

❌ **What LLMs do** — silently pick one interpretation and write 200 lines of optimization.

✅ **What should happen:**

```
"Make the search faster" could mean:

1. Faster response time (< 100ms instead of 500ms)
   → database indexes, cache | ~2h

2. Handle more concurrent searches (throughput)
   → async/await, connection pooling | ~4h

3. Faster perceived speed (UX)
   → show partial results immediately | ~3h

Current search takes ~500ms. Which aspect matters most?
```

---

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### Example: Over-abstraction

**Request:** "Add a function to calculate discount"

❌ **What LLMs do** — Strategy pattern, ABC, dataclass, configurator:

```python
class DiscountStrategy(ABC):
    @abstractmethod
    def calculate(self, amount: float) -> float: pass

class PercentageDiscount(DiscountStrategy):
    def __init__(self, percentage: float):
        self.percentage = percentage
    def calculate(self, amount: float) -> float:
        return amount * (self.percentage / 100)

@dataclass
class DiscountConfig:
    strategy: DiscountStrategy
    min_purchase: float = 0.0
    max_discount: float = float('inf')

# 40 more lines to use one formula
```

✅ **What should happen:**

```python
def calculate_discount(amount: float, percent: float) -> float:
    """Calculate discount amount. percent should be 0-100."""
    return amount * (percent / 100)
```

When to add complexity: only when multiple discount types are actually needed.

### Example: Speculative Features

**Request:** "Save user preferences to database"

❌ **What LLMs do** — cache, validator, merge flag, notifications:

```python
class PreferenceManager:
    def __init__(self, db, cache=None, validator=None):
        ...
    def save(self, user_id, prefs, merge=True, validate=True, notify=False):
        # 50 lines for what could be 3
```

✅ **What should happen:**

```python
def save_preferences(db, user_id: int, preferences: dict):
    db.execute(
        "UPDATE users SET preferences = ? WHERE id = ?",
        (json.dumps(preferences), user_id)
    )
```

Add caching, validation, merging later — only when actually needed.

---

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

**The test:** Every changed line should trace directly to the user's request.

### Example: Drive-by Refactoring

**Request:** "Fix the bug where empty emails crash the validator"

❌ **What LLMs do** — improve email validation beyond the bug fix, add username validation, change comment style, add docstring.

✅ **What should happen — only the lines that fix empty email:**

```diff
  def validate_user(user_data):
      # Check email format
-     if not user_data.get('email'):
+     email = user_data.get('email', '')
+     if not email or not email.strip():
          raise ValueError("Email required")

      # Basic email validation
-     if '@' not in user_data['email']:
+     if '@' not in email:
          raise ValueError("Invalid email")

      # Check username  ← untouched, not in scope
      if not user_data.get('username'):
          raise ValueError("Username required")

      return True
```

### Example: Style Drift

**Request:** "Add logging to the upload function"

❌ **What LLMs do** — add type hints, change single quotes to double quotes, add docstring, reformat whitespace.

✅ **What should happen — match existing style:**

```diff
+ import logging
+
+ logger = logging.getLogger(__name__)
+
  def upload_file(file_path, destination):
+     logger.info(f'Starting upload: {file_path}')
      try:
          with open(file_path, 'rb') as f:
              data = f.read()

          response = requests.post(destination, files={'file': data})

          if response.status_code == 200:
+             logger.info(f'Upload successful: {file_path}')
              return True
          else:
+             logger.error(f'Upload failed: {file_path}, status={response.status_code}')
              return False
      except Exception as e:
-         print(f"Error: {e}")
+         logger.exception(f'Upload error: {file_path}')
          return False
```

Matched: single quotes, no type hints, existing boolean pattern, spacing style.

---

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

### Example: Incremental with Verification

**Request:** "Add rate limiting to the API"

❌ **What LLMs do** — implement Redis, multiple strategies, config system, and monitoring in one 300-line commit with no clear verification steps.

✅ **What should happen:**

```
Plan for rate limiting:

1. Basic in-memory rate limiting (single endpoint)
   Verify: 100 requests → first 10 succeed, rest get 429

2. Extract to middleware (all endpoints)
   Verify: existing endpoint tests still pass

3. Redis backend (multi-server)
   Verify: rate limit persists across app restarts

4. Configuration (rates per endpoint)
   Verify: /search allows 10/min, /users allows 100/min

Start with step 1?
```

### Example: Reproduce Before Fixing

**Request:** "The sorting breaks when there are duplicate scores"

❌ **What LLMs do** — immediately change sort logic without reproducing the bug.

✅ **What should happen:**

```python
# 1. First, write a test that reproduces the bug
def test_sort_with_duplicate_scores():
    scores = [
        {'name': 'Alice', 'score': 100},
        {'name': 'Bob', 'score': 100},
        {'name': 'Charlie', 'score': 90},
    ]
    result = sort_scores(scores)
    assert result[0]['score'] == 100
    assert result[2]['score'] == 90
    assert result[0]['name'] < result[1]['name']  # stable sort

# Verify: test fails → bug reproduced

# 2. Now fix with stable sort
def sort_scores(scores):
    return sorted(scores, key=lambda x: (-x['score'], x['name']))

# Verify: test passes
```

---

## Anti-Patterns Summary

| Principle | Anti-Pattern | Fix |
|---|---|---|
| Think Before Coding | Silently assumes file format, fields, scope | List assumptions explicitly, ask for clarification |
| Simplicity First | Strategy pattern for single discount calculation | One function until complexity is actually needed |
| Surgical Changes | Reformats quotes, adds type hints while fixing bug | Only change lines that fix the reported issue |
| Goal-Driven | "I'll review and improve the code" | "Write test for bug X → make it pass → verify no regressions" |

## Key Insight

The "overcomplicated" examples aren't obviously wrong — they follow design patterns and best practices. The problem is **timing**: they add complexity before it's needed.

**Good code is code that solves today's problem simply, not tomorrow's problem prematurely.**
