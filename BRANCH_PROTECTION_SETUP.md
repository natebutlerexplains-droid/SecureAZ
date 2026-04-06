# Branch Protection Setup - Manual Configuration

Due to API limitations on public repositories, branch protection rules must be configured via GitHub's web UI. Follow these exact steps.

## Setup Instructions

### Step 1: Main Branch (Production)

1. Go to: https://github.com/natebutlerexplains-droid/SecureAZ/settings/branches
2. Click **"Add rule"** button
3. Fill in **Branch name pattern**: `main`
4. Enable the following checkboxes:

   ✅ **Require a pull request before merging**
   - ✅ Require approvals: **2**
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging

   ✅ **Restrict who can push to matching branches**
   - Search and select: **natebutler-sudo** (or your admin account)

   ✅ **Allow force pushes**
   - Select: **Deny force pushes**

   ✅ **Allow deletions**
   - Unchecked (disallow deletions)

5. Click **"Create"** button

---

### Step 2: QA Branch (Staging)

1. Click **"Add rule"** again
2. Fill in **Branch name pattern**: `qa`
3. Enable the following checkboxes:

   ✅ **Require a pull request before merging**
   - ✅ Require approvals: **1**
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

   ✅ **Restrict who can push to matching branches**
   - Leave empty (all developers can push)

   ✅ **Allow force pushes**
   - Select: **Deny force pushes**

   ✅ **Allow deletions**
   - Unchecked (disallow deletions)

4. Click **"Create"** button

---

### Step 3: Dev Branch (Development)

1. Click **"Add rule"** again
2. Fill in **Branch name pattern**: `dev`
3. Enable the following checkboxes:

   ✅ **Require a pull request before merging**
   - ✅ Require approvals: **1**
   - ✅ Require status checks to pass before merging

   ✅ **Allow force pushes**
   - Select: **Allow force pushes** → **Everyone** (optional, for rebasing)

   ✅ **Allow deletions**
   - Unchecked (disallow deletions)

4. Click **"Create"** button

---

## Verification

After completing all three rules, verify by:

1. Go to https://github.com/natebutlerexplains-droid/SecureAZ/settings/branches
2. You should see **3 rules** listed:
   - `main` (Production)
   - `qa` (Staging)
   - `dev` (Development)

3. Expand each rule to confirm all settings are correct

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
