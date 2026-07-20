# Project Health Score

A GitHub Action that scans your repository for common best-practice files
(README, LICENSE, tests, CONTRIBUTING guide, and more), calculates a health
score out of 100, and posts a report as a PR comment and job summary.

```
## Project Health Score: 82/100

✅ README exists
✅ License found
✅ Tests detected
❌ CONTRIBUTING.md exists
❌ Code of Conduct exists
✅ GitHub Actions configured
❌ Security Policy exists
✅ Dependabot enabled
```

## Usage

Add this to a workflow file (e.g. `.github/workflows/health-score.yml`):

```yaml
name: Health Score

on:
  pull_request:

permissions:
  pull-requests: write

jobs:
  health-score:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: RohitS456/project-health-score@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Name | Required | Default | Description |
|---|---|---|---|
| `github-token` | **Yes** | — | Pass `${{ secrets.GITHUB_TOKEN }}` (see usage example above) |
| `skip-checks` | No | `''` | Comma-separated check ids to skip, e.g. `security-policy,code-of-conduct` |
| `post-comment` | No | `'true'` | Set to `'false'` to only generate the job summary, without commenting |

### Available check ids (for `skip-checks`)

`readme`, `license`, `tests`, `contributing`, `code-of-conduct`,
`actions-configured`, `security-policy`, `dependabot`

## Outputs

| Name | Description |
|---|---|
| `score` | Overall health score (0-100) |
| `passed-count` | Number of checks passed |
| `total-count` | Total number of checks run (after `skip-checks` is applied) |

### Example: fail the build if score is too low

```yaml
      - uses: RohitS456/project-health-score@v1
        id: health
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Enforce minimum score
        if: steps.health.outputs.score < 50
        run: |
          echo "Health score too low: ${{ steps.health.outputs.score }}"
          exit 1
```

## License

MIT
