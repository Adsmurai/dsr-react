# Claude Instructions for dsr-react

Project-specific instructions for Claude when working on this codebase.

## Documentation Update Rules

When updating components, **always** check and update these files if necessary:

### 1. AI-INSTRUCTIONS.md
Update when:
- Adding new components → Add to Component Reference table
- Changing component API (props, behavior) → Update table entry
- Adding new restrictions/gotchas → Add to "Critical Restrictions" or "Special Prop Patterns"
- New usage patterns → Add to "Minimal Examples"

### 2. PATTERNS.md
Update when:
- New common use case pattern emerges
- Existing pattern changes significantly
- New component combination that users will frequently need

### 3. CHANGELOG.md
Always note documentation updates:
```markdown
### Improved
- **AI-INSTRUCTIONS.md**: Updated [component] documentation with [what changed]
- **PATTERNS.md**: Added [pattern name] pattern
```

## Checklist for Component Updates

When modifying a component:

- [ ] Update component JSDoc if API changed
- [ ] Update AI-INSTRUCTIONS.md if:
  - [ ] New props added
  - [ ] Behavior changed
  - [ ] New restrictions/gotchas
  - [ ] New example needed
- [ ] Update PATTERNS.md if:
  - [ ] Common pattern affected
  - [ ] New recommended pattern
- [ ] Update CHANGELOG.md with all changes
- [ ] Run `npm run typecheck` and `npm run build`

## Component Documentation Standards

### JSDoc Format
```tsx
/**
 * @fileoverview Component description
 *
 * @description
 * Detailed description of what the component does.
 *
 * @ai-note IMPORTANT: Any critical gotchas for AI tools
 *
 * @when_to_use
 * - Use case 1
 * - Use case 2
 *
 * @when_not_to_use
 * - Alternative 1 → use X instead
 *
 * @example Title
 * ```tsx
 * // Code example
 * ```
 */
```

### AI-INSTRUCTIONS.md Entry Format
```markdown
| `ComponentName` | Brief description | `key`, `props`, `here` | Restrictions or gotchas |
```

## Commit Message Format

```
feat/fix/docs: brief description

- Bullet points of changes
- Include doc updates

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```
