import test from "node:test";
import assert from "node:assert/strict";
import { customCredits, models } from "../src/data/site.js";

test("every built-in attribution model allocates exactly 100 percent", () => {
  for (const [key, model] of Object.entries(models)) {
    if (key === "custom") continue;
    assert.equal(model.credits.reduce((sum, value) => sum + value, 0), 100, key);
  }
});

test("custom allocation remains at 100 percent across the full control range", () => {
  for (const clickWeight of [0, 25, 50, 70, 100]) {
    for (const lookback of [1, 2, 4, 7, 14, 30]) {
      const credits = customCredits(clickWeight, lookback);
      assert.equal(credits.length, 4);
      assert.ok(credits.every(value => value >= 0));
      assert.equal(credits.reduce((sum, value) => sum + value, 0), 100);
    }
  }
});
