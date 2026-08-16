# Watify

Internal communications platform for [[Wateen Telecom]]. 5,000+ employees.
I engineered the backend.

## What I did

- REST + GraphQL APIs
- PostgreSQL schema and migrations
- JWT authentication
- WebSockets for realtime
- Lazy loading for scale

Stack: PERN.

## How HR reads it

**Your strongest single item.** "Shipped to 5,000 real users" beats every
side project on the page, because it's the only thing that proves other
people depended on your code.

But right now it's a **claim, not evidence**. There is no repo, no
architecture write-up, and one number (5,000) that describes the company,
not the system. A technical interviewer cannot verify any of it, so it
gets discounted to "he says he did some backend."

## The fix — highest priority in [[Gaps]]

Answer four questions in writing:
- How many tables? What was the hardest relationship to model?
- Requests/day, or concurrent users at peak?
- What did lazy loading actually change — load time, payload size?
- Why GraphQL *and* REST? That's a real decision; defending it makes you
  sound senior.

Even a single README with a schema diagram converts this from a claim into
proof.

Serves: [[Lane - Product Engineer]] (primary), [[Lane - DevRel]] (the
credibility half)
