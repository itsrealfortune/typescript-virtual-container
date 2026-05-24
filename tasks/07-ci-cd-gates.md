# Task: CI/CD — gates and checks

**Priority:** P2
**Estimated effort:** 1 week
**Dependencies:** None

## Context

Current CI (`.github/workflows/test-battery.yml`) checks `typecheck` (Biome check), `lint` (Biome lint), and `tests` (bun test). Essential gates are missing for a project of this maturity.

## Subtasks

### 1. Coverage threshold
- [ ] Add `bun test --coverage` to the workflow
- [ ] Configure a minimum coverage threshold (e.g., 70% lines)
- [ ] Fail the build if coverage drops below the threshold
- [ ] Generate an HTML or machine-readable report in artifacts

### 2. Build verification
- [ ] Add a build step: `bun run build` (tsc)
- [ ] Verify that `dist/` is generated correctly
- [ ] Verify that `.d.ts` files are complete

### 3. Web build test
- [ ] Verify that `node build.js` (web bundle) compiles without errors
- [ ] Check web bundle size (35KB minified currently)
- [ ] Alert if bundle exceeds 50KB

### 4. Bundle size gate
- [ ] Add size checks for `builds/` artifacts
- [ ] Compare with the main branch to detect regressions
- [ ] Store baseline in a file (e.g., `builds/.sizes.json`)

### 5. Security audit
- [ ] Add `bun audit` or `npm audit`
- [ ] Check dependency vulnerabilities
- [ ] Block if a critical vulnerability is found (CVSS >= 7)

### 6. Benchmark regression
- [ ] Run `bun run bench` on PRs
- [ ] Compare results with the main branch
- [ ] Fail if degradation > 10%

### 7. TypeScript strictness
- [ ] Add `tsc --noEmit --strict` (independent of build config)
- [ ] Verify `noUnusedLocals` and `noUnusedParameters` are respected

### 8. Dependencies
- [ ] Verify `package-lock.json` or `pnpm-lock.yaml` is up to date
- [ ] Detect unjustified dependency additions
- [ ] Check licenses of new dependencies

### 9. Documentation
- [ ] Verify TypeDoc compiles (`npx typedoc --treatWarningsAsErrors`)
- [ ] Verify the wiki can be generated (`node scripts/generate-wiki.mjs`)

### 10. Test matrix
- [ ] Add Node.js matrix: 18.x, 20.x, 22.x
- [ ] Add Bun: latest
- [ ] Add OS: ubuntu, macos (optional)

## Acceptance Criteria

- All new gates pass green on PRs
- Total CI time doesn't increase by more than 3 minutes
- Developers can bypass gates with a specific label (e.g., `ci-skip-gates`)

## Notes

- Existing workflows: `test-battery.yml`, `publish.yml`, `create-pull-request.yml`
- Use existing GitHub Actions when possible (actions/upload-artifact, actions/download-artifact)
- Coverage report can be uploaded as an artifact
- For benchmarks, store results in `.benchmark-baseline.json`
- See `PERFORMANCE.md` and `benchmark-virtualshell.ts` for benchmarks
