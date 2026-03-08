# Ship-It-Right

A structured project management tool for Claude Code that helps teams ship software the right way - with proper planning, execution, and verification.

## Installation

Install globally to Claude Code:

```bash
npx ship-it-right --claude --global
```

## Usage

After installation, you'll have access to these commands in Claude Code:

- `/sir:init` - Initialize a new project with structured planning
- `/sir:status` - Check project progress and current state
- `/sir:plan` - Create detailed phase plans
- `/sir:execute` - Execute phases with tracking

## Philosophy

Ship-It-Right emphasizes:
- **Structure over "vibe coding"** - Proper planning and execution phases
- **Team collaboration** - Shared workflows and standards
- **Quality delivery** - Built-in verification and progress tracking
- **Claude Code integration** - Seamless workflow within your development environment

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test installation locally
npm link
npx ship-it-right --claude --global
```

## License

MIT