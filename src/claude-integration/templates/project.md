# {{PROJECT_NAME}}

## Overview
{{PROJECT_DESCRIPTION}}

## Goals
{{#each GOALS}}
- [ ] {{this}}
{{/each}}

## Success Criteria
{{SUCCESS_CRITERIA}}

## Technical Approach
{{TECHNICAL_APPROACH}}

## Timeline
{{TIMELINE}}

## Team
{{#each TEAM_MEMBERS}}
- {{this}}
{{/each}}

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
{{#each DECISIONS}}
| {{this.decision}} | {{this.rationale}} | {{this.outcome}} |
{{/each}}

## Constraints
{{#each CONSTRAINTS}}
- {{this}}
{{/each}}

## Risks & Mitigation
{{#each RISKS}}
- **{{this.risk}}** - {{this.mitigation}}
{{/each}}

---
*Last updated: {{LAST_UPDATED}} after {{UPDATE_REASON}}*