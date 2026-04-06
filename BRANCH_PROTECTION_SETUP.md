# Branch Protection Setup - GitHub Rulesets Configuration

GitHub uses the modern **Rulesets** system for branch protection. Follow these exact steps to create three rulesets for dev → qa → main promotion workflow.

## Setup Instructions

### Step 1: Main Branch Ruleset (Production)

1. Go to: https://github.com/natebutlerexplains-droid/SecureAZ/settings/rules/new
2. **Ruleset Name**: `main`
3. **Enforcement status**: Leave as default (Active)

#### Target Branches Configuration
- Click **"Add target"** or select **"By branch name pattern"**
- Enter: `main` (exact match, no wildcards)

#### Enable These Rules

**Branch Rules:**
- ✅ **Restrict creations** — Only allow users with bypass permission to create matching refs
- ✅ **Restrict updates** — Only allow users with bypass permission to update matching refs
- ✅ **Restrict deletions** — Only allow users with bypass permissions to delete matching refs

**Pull Request Requirements:**
- ✅ **Require a pull request before merging**
  - ✅ Required approvals: **2**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners
  - ✅ Require approval of the most recent reviewable push
  - ✅ Require conversation resolution before merging

**Status & Quality Checks:**
- ✅ **Require status checks to pass** (leave empty for now, can add specific checks later)
- ✅ **Require branches to be up to date before merging**
- ✅ **Block force pushes** — Prevent all force pushes

**Allowed Merge Methods:**
- ✅ **Allow Squash and merge** (recommended for clean history)
- ❌ Merge commits (leave unchecked)
- ❌ Rebase and merge (leave unchecked)

4. Scroll down and click **"Create"** button

---

### Step 2: QA Branch Ruleset (Staging)

1. Go to: https://github.com/natebutlerexplains-droid/SecureAZ/settings/rules/new
2. **Ruleset Name**: `qa`
3. **Enforcement status**: Leave as default (Active)

#### Target Branches Configuration
- Click **"Add target"** or select **"By branch name pattern"**
- Enter: `qa` (exact match)

#### Enable These Rules

**Branch Rules:**
- ✅ **Restrict deletions** — Only allow users with bypass permissions to delete matching refs

**Pull Request Requirements:**
- ✅ **Require a pull request before merging**
  - ✅ Required approvals: **1**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require conversation resolution before merging

**Status & Quality Checks:**
- ✅ **Require status checks to pass**
- ✅ **Require branches to be up to date before merging**
- ✅ **Block force pushes** — Prevent all force pushes

**Allowed Merge Methods:**
- ✅ Allow **Create a merge commit**
- ✅ Allow **Squash and merge**
- ✅ Allow **Rebase and merge** (useful for flexibility)

4. Scroll down and click **"Create"** button

---

### Step 3: Dev Branch Ruleset (Development)

1. Go to: https://github.com/natebutlerexplains-droid/SecureAZ/settings/rules/new
2. **Ruleset Name**: `dev`
3. **Enforcement status**: Leave as default (Active)

#### Target Branches Configuration
- Click **"Add target"** or select **"By branch name pattern"**
- Enter: `dev` (exact match)

#### Enable These Rules

**Branch Rules:**
- ✅ **Restrict deletions** — Only allow users with bypass permissions to delete matching refs

**Pull Request Requirements:**
- ✅ **Require a pull request before merging**
  - ✅ Required approvals: **1**

**Status & Quality Checks:**
- ✅ **Require status checks to pass**

**Allowed Merge Methods:**
- ✅ Allow **Create a merge commit**
- ✅ Allow **Squash and merge**
- ✅ Allow **Rebase and merge** (essential for dev branch work)

*Note: Dev branch does NOT block force pushes to allow flexible development practices*

4. Scroll down and click **"Create"** button

---

## Verification

After completing all three rulesets, verify by:

1. Go to: https://github.com/natebutlerexplains-droid/SecureAZ/settings/rules
2. You should see **3 rulesets** listed:
   - `main` (Production - highest protection)
   - `qa` (Staging - medium protection)
   - `dev` (Development - lower protection)

3. Click each ruleset to expand and confirm all settings are correct

---

## Testing the Rules

### Test PR Workflow

1. Create a test feature branch:
   ```bash
   git checkout dev
   git checkout -b feature/test-protection
   echo "test" > test.txt
   git add test.txt
   git commit -m "test: verify branch protection"
   git push origin feature/test-protection
   ```

2. Open a PR against `dev`
3. Verify:
   - ✅ Require 1 approval (dev) / 2 approvals (main)
   - ✅ Status checks show (if CI configured)
   - ✅ Cannot merge without approval

### Test Force Push Prevention

1. Try to force push to any protected branch:
   ```bash
   git push origin main --force
   ```
2. Should see error: "Remote: Permission to push to this ref was denied"

### Test Deletion Prevention

1. Try to delete a protected branch:
   ```bash
   git push origin :main
   ```
2. Should see error: "Cannot delete protected branch 'main'"

---

## Troubleshooting

### "Rules not appearing"
- Refresh the page (F5)
- Clear browser cache
- Try in a different browser

### "Cannot add rule - pattern invalid"
- Ensure you use exact branch names: `main`, `qa`, `dev` (lowercase)
- No wildcards for these specific branches

### "Status checks not showing"
- GitHub Actions workflow must be configured
- See `.github/workflows/ci.yml` in the repository
- Workflow name must match in branch protection rules

### "Still can push without approval"
- Verify rule is saved (show in the list)
- Confirm you're on the right branch
- May need to log out and log in again

---

## What Each Setting Does

| Setting | Purpose | Value |
|---------|---------|-------|
| **Require a pull request** | Can't push directly to branch | Enabled for all 3 |
| **Require approvals** | Must have reviews before merge | 2 (main), 1 (qa/dev) |
| **Dismiss stale reviews** | Old reviews invalid if new commits | Yes (main/qa) |
| **Code Owner reviews** | Must have code owner approval | Yes (main) |
| **Status checks** | Must pass tests/linting | Yes (all 3) |
| **Branches up to date** | Must rebase before merge | Yes (main/qa) |
| **Restrict push access** | Only admins can push directly | main only |
| **Allow force pushes** | Can rewrite history | No (main/qa), Optional (dev) |
| **Allow deletions** | Can delete the branch | No (all 3) |

---

## Documentation References

- Branch protection docs: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets
- Required reviews: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule

---

**Status**: Manual configuration required  
**Time to complete**: ~5 minutes  
**Difficulty**: Easy (just checking boxes)

After completing these steps, your dev → qa → main promotion workflow will be fully protected with appropriate approval requirements and CI checks.
