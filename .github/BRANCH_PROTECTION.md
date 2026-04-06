# Branch Protection Rules

This document outlines the branch protection policies for the Securaz repository.

## Overview

The repository uses a three-tier promotion strategy with increasing protection levels:

```
dev (Low protection) → qa (Medium protection) → main (High protection)
```

## Protection by Branch

### Main Branch (`main`)
**Status**: Production — Highest protection

#### Requirements
- ✅ At least 2 code owner approvals required
- ✅ All status checks must pass (lint, build, tests)
- ✅ All conversations must be resolved
- ✅ Required: QA sign-off via pull request label `qa-approved`
- ✅ Dismiss stale PR approvals before merge
- ✅ Require branches to be up to date before merging
- ✅ Restrict who can push: Only admins
- ✅ Allow force pushes: NO
- ✅ Allow deletions: NO

#### Merge Strategy
- Squash and merge (keep history clean)
- Delete head branch after merge

#### Allowed Mergers
- Release manager only
- Requires signed commits

### QA Branch (`qa`)
**Status**: Staging — Medium protection

#### Requirements
- ✅ At least 1 code owner approval required
- ✅ All status checks must pass (lint, build)
- ✅ All conversations must be resolved
- ✅ Require branches to be up to date before merging
- ✅ Allow force pushes: NO (for non-admins)
- ✅ Allow deletions: NO

#### Merge Strategy
- Create a merge commit
- Delete head branch after merge

#### Allowed Mergers
- Code owners
- QA team lead

### Dev Branch (`dev`)
**Status**: Development — Low protection

#### Requirements
- ✅ At least 1 approval required (can be self-approval)
- ✅ All status checks must pass (lint, build)
- ⚠️  No requirement to resolve conversations
- ✅ No requirement to be up to date
- ✅ Allow force pushes: YES (for admins only)
- ✅ Allow deletions: NO

#### Merge Strategy
- Create a merge commit or rebase
- Delete head branch after merge

#### Allowed Mergers
- All developers
- Can self-approve for minor changes

## Feature Branches
**Status**: No protection

#### Rules
- No requirements
- Can be deleted freely
- Naming convention: `feature/`, `fix/`, `docs/`, `chore/`
- Minimum naming: `feature/your-feature-name`

## GitHub Setup Commands

To apply these rules, use the GitHub CLI:

### Main Branch
```bash
gh repo rules create \
  --branch main \
  --require-status-checks \
  --require-code-review \
  --require-code-review-approval-count 2 \
  --dismiss-stale-reviews \
  --require-branches-up-to-date \
  --restrict-force-push \
  --restrict-deletions
```

### QA Branch
```bash
gh repo rules create \
  --branch qa \
  --require-status-checks \
  --require-code-review \
  --require-code-review-approval-count 1 \
  --require-branches-up-to-date \
  --restrict-deletions
```

### Dev Branch
```bash
gh repo rules create \
  --branch dev \
  --require-status-checks \
  --require-code-review \
  --require-code-review-approval-count 1
```

## Status Checks

All branches require these CI checks to pass:

1. **Lint** (`npm run lint`)
   - ESLint configuration
   - TypeScript rules
   - Code style checks

2. **Build** (`npm run build`)
   - Turbopack compilation
   - No build errors
   - TypeScript compilation

3. **Type Check** (`tsc --noEmit`)
   - TypeScript strict mode
   - Type safety

## Code Review Process

### For Main Branch
- **Required reviewers**: 2 code owners minimum
- **Review time**: 24 hours recommended
- **Before approval**: Reviewer must:
  - Run locally and test
  - Review all changes
  - Check CHANGELOG.md update
  - Verify version bump
  - Check deployment checklist

### For QA Branch
- **Required reviewers**: 1 code owner
- **Review time**: 4 hours recommended
- **Before approval**: Reviewer must:
  - Run locally and test
  - Verify all features work
  - Check for regressions
  - Confirm no breaking changes

### For Dev Branch
- **Required reviewers**: 1 (can be self)
- **Review time**: Immediate
- **Before approval**: Reviewer must:
  - Lint and build pass
  - Quick visual check

## Enforcing Rules

### Via GitHub Web UI
1. Navigate to Settings → Branches
2. Click "Add rule" for each branch
3. Configure protection rules
4. Save rules

### Via GitHub CLI
```bash
# List current rules
gh repo rules list

# View specific rule
gh repo rules view <rule-id>

# Update rule
gh repo rules update <rule-id> --new-setting value

# Delete rule
gh repo rules delete <rule-id>
```

## Exceptions & Override

### Force Push Override (Admin Only)
```bash
git push origin feature-branch --force-with-lease
```

Use only if:
- Accidental commit needs removal
- Sensitive data leaked
- Rebasing before final merge

**Never** force push to `dev`, `qa`, or `main`.

### Skipping Checks (Not Recommended)
Force push can bypass checks (admin only).

```bash
# Dangerous - use only for critical hotfixes
git push origin main --force
```

Document why override was necessary in commit message.

## Automated Enforcement

### Pre-commit Hooks
Developers can set up local hooks:

```bash
# Install husky
npm install husky --save-dev
npx husky install

# Setup lint hook
npx husky add .husky/pre-commit "npm run lint"

# Setup pre-push hook
npx husky add .husky/pre-push "npm run build"
```

### Commit Signing
For main branch:
```bash
# Configure signing
git config user.signingkey <GPG-KEY-ID>
git config commit.gpgsign true

# Or sign specific commits
git commit -S -m "commit message"
```

## Troubleshooting

### "Branch is out of date"
```bash
git fetch origin
git rebase origin/main  # or qa/dev depending on target
git push origin feature-branch
```

### "Status checks pending"
Wait for CI to complete. Check GitHub Actions for details:
```bash
gh run list --branch feature-branch
gh run view <run-id> --log
```

### "Cannot merge - requires review"
Ask a code owner to review. Tagged in CODEOWNERS file.

### "Cannot push - insufficient permissions"
- For main: Only admins/release managers
- For qa: Code owners only
- For dev: All developers with push access

## Policy Updates

To update these policies:

1. Open issue or discussion
2. Discuss with team
3. Update this document
4. Update GitHub settings via CLI/Web UI
5. Commit changes
6. Communicate to team

---

**Version**: 1.0  
**Last Updated**: 2026-04-06  
**Next Review**: 2026-05-06
