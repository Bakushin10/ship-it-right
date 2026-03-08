<purpose>
Display current Ship-It-Right project status, progress, and next recommended actions.
</purpose>

<process>

## 1. Check Project Exists

**Verify project is initialized:**

```bash
if [ ! -d ".planning" ]; then
  echo "Error: No Ship-It-Right project found. Run /sir:init first."
  exit 1
fi
```

## 2. Display Status

**Show project status:**

```bash
node "$HOME/.claude/ship-it-right/bin/sir-tools.js" status
```

## 3. Show Available Actions

**Display next steps:**

```
───────────────────────────────────────────────────────────────

## ▶ Available Actions

**Project Management:**
- /sir:init — Initialize new project (if needed)
- /sir:status — Show current status (you are here)

**Planning:**
- Edit `.planning/PROJECT.md` — Update project details
- Edit `.planning/STATE.md` — Update project state

───────────────────────────────────────────────────────────────
```

</process>

<output>
- Project status display
- Available actions list
</output>

<success_criteria>
- [ ] Project existence verified
- [ ] Status information displayed
- [ ] Next actions presented clearly
</success_criteria>