<purpose>
Initialize a new Ship-It-Right project with structured planning directory and templates.
</purpose>

<process>

## 1. Check Prerequisites

**Check if project already exists:**

```bash
if [ -d ".planning" ]; then
  echo "Error: Project already initialized. Use /sir:status to check progress."
  exit 1
fi
```

## 2. Initialize Project

**Run the initialization:**

```bash
node "$HOME/.claude/ship-it-right/bin/sir-tools.js" init
```

## 3. Guide Next Steps

**Display completion message:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SIR ► PROJECT INITIALIZED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Ship-It-Right Project**

| Artifact       | Location                    |
|----------------|-----------------------------|
| Project        | `.planning/PROJECT.md`      |
| State          | `.planning/STATE.md`        |

**Next Steps:**
1. Edit `.planning/PROJECT.md` with your project details
2. Use `/sir:status` to check progress
3. Begin structured planning and execution

Ready to ship it right! ✓
```

</process>

<output>
- `.planning/PROJECT.md`
- `.planning/STATE.md`
</output>

<success_criteria>
- [ ] .planning/ directory created
- [ ] PROJECT.md created with template
- [ ] STATE.md created with initial status
- [ ] User knows next steps
</success_criteria>