---
name: run-dev-server-preference
description: User runs the dev server themselves; don't launch it in the background
metadata:
  type: feedback
---

The user wants to start/run the Next.js dev server themselves (they prefer port 3003). Do NOT start `next dev` in the background from a tool call — it occupies the port (e.g. 3001) and blocks the user's own `npm run dev`, producing "Another next dev server is already running."

**Why:** they need direct control of the running app in their own terminal.

**How to apply:** when verification needs a running server, either give the user the exact commands to run (e.g. `npm run dev -- -p 3003`), or use a one-off production `next build` instead. If a background server must be started, stop it before handing back. To free a stuck port: `netstat -ano | findstr :PORT` then `taskkill /PID <pid> /F`.
