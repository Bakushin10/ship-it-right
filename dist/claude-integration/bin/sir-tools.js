#!/usr/bin/env node
"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Basic error handling
function error(message) {
    console.error(`Error: ${message}`);
    process.exit(1);
}
// Basic project initialization
function cmdInit(cwd) {
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
function cmdStateLoad(cwd) {
    const statePath = path.join(cwd, '.planning', 'STATE.md');
    if (!fs.existsSync(statePath)) {
        error('No project found. Run `sir-tools init` first.');
    }
    const stateContent = fs.readFileSync(statePath, 'utf8');
    console.log(stateContent);
}
// Show project status
function cmdStatus(cwd) {
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
async function main() {
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
            }
            else {
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
//# sourceMappingURL=sir-tools.js.map