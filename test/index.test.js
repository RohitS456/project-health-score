// Minimal, dependency-free sanity tests for the scoring logic.
// Run with: node test/index.test.js
const assert = require('assert');

// We import the raw checklist + pure functions from src, not dist,
// so tests exercise the source directly.
const { runChecks, CHECKS } = require('../src/index.js');

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`❌ ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

test('CHECKS weights sum to 100', () => {
  const total = CHECKS.reduce((sum, c) => sum + c.weight, 0);
  assert.strictEqual(total, 100, `Expected weights to sum to 100, got ${total}`);
});

test('runChecks respects skip-checks', () => {
  const { totalCount } = runChecks(['readme', 'license']);
  assert.strictEqual(totalCount, CHECKS.length - 2);
});

test('runChecks returns a score between 0 and 100', () => {
  const { score } = runChecks([]);
  assert.ok(score >= 0 && score <= 100, `Score out of range: ${score}`);
});
