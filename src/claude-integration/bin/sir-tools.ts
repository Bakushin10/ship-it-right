#!/usr/bin/env node

/**
 * SIR Tools — CLI utility for Ship-It-Right workflow operations
 *
 * Inspired by get-shit-done but customized for structured team workflows.
 * Centralizes: config parsing, project state, phase management, template processing.
 *
 * Usage: node sir-tools.js <command> [args]
 *
 * Commands:
 *   init                           Initialize new project with .planning/ structure
 *   state load                     Load project config + state
 *   state update <field> <value>   Update a STATE.md field
 *   phase add <description>        Add new phase to roadmap
 *   status                         Show project progress
 */

import * as fs from 'fs';
import * as path from 'path';

// Basic error handling
function error(message: string): void {
  console.error(`Error: ${message}`);
  process.exit(1);
}

// Basic project initialization
function cmdInit(cwd: string): void {
  const planningDir = path.join(cwd, '.planning');

  if (fs.existsSync(planningDir)) {
    error('Project already initialized. Use `sir-tools status` to check progress.');
  }

  // Create .planning directory
  fs.mkdirSync(planningDir, { recursive: true });

  // Create basic PROJECT.md
  const projectTemplate = `# Project

## Overview
Brief description of what we're building.

## Goals
- [ ] Primary goal
- [ ] Secondary goal

## Success Criteria
How we'll know we've succeeded.

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| | | |

---
*Last updated: ${new Date().toISOString().split('T')[0]} after initialization*
`;

  fs.writeFileSync(path.join(planningDir, 'PROJECT.md'), projectTemplate);

  // Create basic STATE.md
  const stateTemplate = `# Project State

## Current Phase
Phase 1 - Planning

## Progress
- [x] Project initialized
- [ ] Requirements defined
- [ ] Roadmap created

## Active Tasks
- Define requirements
- Create roadmap

## Blockers
None

## Next Steps
1. Define project requirements
2. Create phase roadmap
3. Begin Phase 1

---
*Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  fs.writeFileSync(path.join(planningDir, 'STATE.md'), stateTemplate);

  console.log('✓ Project initialized');
  console.log(`✓ Created .planning/ directory`);
  console.log(`✓ Created PROJECT.md`);
  console.log(`✓ Created STATE.md`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Edit .planning/PROJECT.md with your project details');
  console.log('2. Run sir-tools status to check progress');
}

// Load and display project state
function cmdStateLoad(cwd: string): void {
  const statePath = path.join(cwd, '.planning', 'STATE.md');

  if (!fs.existsSync(statePath)) {
    error('No project found. Run `sir-tools init` first.');
  }

  const stateContent = fs.readFileSync(statePath, 'utf8');
  console.log(stateContent);
}

// Show project status
function cmdStatus(cwd: string): void {
  const planningDir = path.join(cwd, '.planning');

  if (!fs.existsSync(planningDir)) {
    error('No project found. Run `sir-tools init` first.');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' SIR ► PROJECT STATUS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const files = fs.readdirSync(planningDir);
  console.log('\\nProject files:');
  files.forEach(file => {
    console.log(`  ✓ ${file}`);
  });

  // Check if STATE.md exists and show current phase
  const statePath = path.join(planningDir, 'STATE.md');
  if (fs.existsSync(statePath)) {
    const stateContent = fs.readFileSync(statePath, 'utf8');
    const phaseMatch = stateContent.match(/## Current Phase\\n(.+)/);
    if (phaseMatch) {
      console.log(`\\nCurrent phase: ${phaseMatch[1]}`);
    }
  }
}

// CLI Router
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const cwd = process.cwd();
  const command = args[0];

  if (!command) {
    error('Usage: sir-tools <command> [args]\\nCommands: init, state, status');
  }

  switch (command) {
    case 'init':
      cmdInit(cwd);
      break;

    case 'state':
      const subcommand = args[1];
      if (subcommand === 'load' || !subcommand) {
        cmdStateLoad(cwd);
      } else {
        error('Unknown state subcommand. Available: load');
      }
      break;

    case 'status':
      cmdStatus(cwd);
      break;

    default:
      error(`Unknown command: ${command}`);
  }
}

main();