import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { customAttributionPage } from "../src/pages/custom-attribution.js";

test("custom attribution page preserves and compares both attribution views", () => {
  const page = customAttributionPage();
  assert.match(page, /Your attribution should reflect/);
  assert.match(page, /Facebook Ads/);
  assert.match(page, /COMPANY LOGIC VIEW/);
  assert.match(page, /Referral code found at signup/);
  assert.match(page, /MMP source record/);
  assert.match(page, /Illustrative values only/);
  assert.match(page, /does not prove causal lift/);
});

test("custom attribution interaction and responsive flow are included", async () => {
  const script = await readFile(new URL("../src/scripts/custom-attribution.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../public/assets/site.css", import.meta.url), "utf8");
  assert.match(script, /data-logic-view/);
  assert.match(script, /Referral code was present at signup/);
  assert.match(script, /aria-pressed/);
  assert.match(css, /\.logic-flow\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /@media\(max-width:700px\)/);
});

test("view toggle updates the result, explanation, and pressed state", async () => {
  const script = await readFile(new URL("../src/scripts/custom-attribution.js", import.meta.url), "utf8");
  const buttons = ["mmp", "company"].map(view => ({
    dataset: { logicView: view },
    attributes: { "aria-pressed": view === "mmp" ? "true" : "false" },
    listeners: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, callback) { this.listeners[name] = callback; }
  }));
  const kicker = { textContent: "" };
  const source = { textContent: "" };
  const reason = { textContent: "" };
  const document = {
    querySelectorAll: () => buttons,
    querySelector: selector => ({ "[data-view-kicker]": kicker, "[data-view-source]": source, "[data-view-reason]": reason })[selector]
  };
  runInNewContext(script, { document });
  buttons[1].listeners.click();
  assert.equal(source.textContent, "Referral");
  assert.match(reason.textContent, /Referral code was present at signup/);
  assert.equal(buttons[1].attributes["aria-pressed"], "true");
  assert.equal(buttons[0].attributes["aria-pressed"], "false");
  buttons[0].listeners.click();
  assert.equal(source.textContent, "Facebook Ads");
  assert.equal(buttons[0].attributes["aria-pressed"], "true");
});
