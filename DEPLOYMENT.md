# Deployment & Release Strategy

This document outlines the deployment workflow for Securaz across different environments.

## Branch Strategy

```
main (Production)
  ↑
  └─ qa (Staging/QA Testing)
      ↑
      └─ dev (Development Integration)
          ↑
          └─ feature/* (Feature Branches)
```

### Branch Purposes

| Branch | Purpose | Status | Deployment |
|--------|---------|--------|------------|
| `main` | Production-ready code | Stable | Auto-deploy to production |
| `qa` | QA testing & validation | Semi-stable | Deploy to staging/QA env |
| `dev` | Integration of features | Unstable | Auto-deploy to dev env |
| `feature/*` | Individual features | WIP | Local testing only |

## Development Workflow

### 1. Create Feature Branch
```bash
# Start from dev
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/your-feature-name

# Develop locally
npm run dev
```

### 2. Commit & Push
```bash
# Make commits with clear messages
git add .
git commit -m "feat(reports): add export PDF functionality"

# Push to your fork (or origin if you have write access)
git push origin feature/your-feature-name
```

### 3. Create Pull Request
- Open PR against `dev` branch
- Use PR template (auto-filled)
- Link related issues
- Request review from team
- Include screenshots for UI changes

### 4. Code Review & Testing
- At least one approval required
- CI checks must pass
- Verify locally on reviewer's machine
- Request changes if needed
- Rebase if conflicts exist

### 5. Merge to Dev
```bash
# Maintain linear history
git checkout dev
git pull origin dev
git merge --ff-only origin/feature/your-feature
git push origin dev
```

After merge, feature branch is deleted.

## Promotion Workflow

### Dev → QA (Weekly)
When a feature set is complete and tested locally:

1. **Create PR**: `dev` → `qa`
2. **Changelog**: Update CHANGELOG.md with changes
3. **Testing checklist**: Verify all features work
4. **Merge**: Merge to `qa` branch
5. **Deploy**: QA environment updates automatically
6. **Test**: QA team runs full regression tests
7. **Sign-off**: QA approval required before next step

### QA → Main (On Release)
After QA testing is complete and approved:

1. **Create PR**: `qa` → `main`
2. **Release notes**: Write release notes
3. **Version bump**: Update `package.json` version
4. **Create tag**: Create git tag `v1.0.0`
5. **Merge**: Merge to `main` branch
6. **Deploy**: Production deployment triggers automatically
7. **Verify**: Confirm features in production

## Environment Details

### Development (Dev Branch)
- **URL**: `dev.securaz.example.com` (or local `localhost:3000`)
- **Data**: Mock data only
- **Frequency**: Continuous deployment (on every dev merge)
- **Audience**: Developers, designers
- **Stability**: Low - breaking changes expected

### Staging/QA (QA Branch)
- **URL**: `qa.securaz.example.com`
- **Data**: Mock data + test fixtures
- **Frequency**: Weekly or on-demand
- **Audience**: QA team, stakeholders
- **Stability**: Medium - should be mostly working
- **Testing**: Full regression testing

### Production (Main Branch)
- **URL**: `securaz.example.com`
- **Data**: Real data (when connected)
- **Frequency**: Monthly or on-demand release
- **Audience**: End users
- **Stability**: High - must be production-ready
- **Testing**: All tests must pass + QA sign-off

## Version Numbering

Follow semantic versioning: `MAJOR.MINOR.PATCH`

```
1.0.0
│ │ └─ PATCH: Bug fixes, small improvements
│ └─── MINOR: New features, backward compatible
└───── MAJOR: Breaking changes, significant refactors
```

Examples:
- `1.0.0` → `1.0.1`: Bug fix
- `1.0.1` → `1.1.0`: New feature (Reports section)
- `1.1.0` → `2.0.0`: Major rewrite

## Release Checklist

Before promoting to main/production:

- [ ] All features merged and tested in qa
- [ ] QA team sign-off received
- [ ] No critical bugs
- [ ] CHANGELOG.md updated
- [ ] Version number bumped in package.json
- [ ] Git tag created
- [ ] Documentation updated if needed
- [ ] Previous version backed up
- [ ] Rollback plan documented

## Rollback Procedure

If production has critical issues:

```bash
# Identify previous stable version
git log --oneline main | head -5

# Revert to previous version
git revert <commit-hash>
git push origin main

# Or reset (if not yet public)
git reset --hard <commit-hash>
git push origin main --force
```

Then create an issue to fix the problem in dev branch.

## CI/CD Pipeline (GitHub Actions)

### On Feature Branch
- ✅ Lint check (`npm run lint`)
- ✅ TypeScript check (`tsc --noEmit`)
- ✅ Build check (`npm run build`)

### On PR to Dev
- ✅ All of the above
- ✅ Merge conflict check
- ✅ Minimum review requirement

### On Merge to Dev
- ✅ Build and test
- 🚀 Auto-deploy to dev environment
- 📝 Post deployment test

### On Merge to QA
- ✅ All checks
- 🚀 Auto-deploy to qa environment
- 📧 Notify QA team

### On Merge to Main
- ✅ All checks
- 🚀 Auto-deploy to production
- 📊 Monitor for errors
- 📧 Send release notification

## Local Development

### Setup
```bash
git clone <repository>
cd securaz
npm install
npm run dev
```

### Before Pushing
```bash
# Run all checks locally
npm run lint     # Linting
npm run build    # Build check
npm run dev      # Visual verification
```

### Staying Updated
```bash
# Keep your feature branch updated
git fetch origin
git rebase origin/dev
```

## Monitoring & Alerts

### Post-Deployment
- Monitor error logs in production
- Check performance metrics
- Watch for unusual user behavior
- Be ready to rollback if critical issues

### Communication
- Post announcements in team Slack
- Update status page if applicable
- Document any issues encountered
- Share release notes with users

## FAQ

**Q: How long does deployment take?**
A: Typically 5-10 minutes per environment.

**Q: Can I push directly to main?**
A: No. All changes must go through dev → qa → main workflow.

**Q: What if I need a hotfix?**
A: Create hotfix branch from main, test in qa first, then deploy.

**Q: How often do we release?**
A: Monthly cadence, or as-needed for critical fixes.

**Q: Who can approve PRs?**
A: Code owners and maintainers listed in CODEOWNERS file.

---

**Document Version**: 1.0  
**Last Updated**: 2026-04-06
