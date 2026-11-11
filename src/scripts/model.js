import { channels, models, customCredits } from "../data/site.js";

const buttons = [...document.querySelectorAll("[data-model]")];
if (buttons.length) {
  const bars = [...document.querySelectorAll("[data-credit-bar]")];
  const labels = [...document.querySelectorAll("[data-credit-label]")];
  const status = document.querySelector("[data-model-status]");
  const customBox = document.querySelector("[data-custom-controls]");
  const clickWeight = document.querySelector("[data-click-weight]");
  const lookback = document.querySelector("[data-lookback]");
  const clickOutput = document.querySelector("[data-click-output]");
  const lookbackOutput = document.querySelector("[data-lookback-output]");
  const table = document.querySelector("[data-roas]");
  const roas = {
    last: [["Apple Search Ads","3.8×","+0.0","positive"],["Google Ads","2.9×","−0.4","negative"],["Meta","2.4×","+0.3","positive"],["TikTok","1.8×","+0.2","positive"]],
    first: [["Meta","3.0×","+0.9","positive"],["TikTok","2.4×","+0.8","positive"],["Google Ads","2.6×","−0.7","negative"],["Apple Search Ads","2.1×","−1.7","negative"]],
    linear: [["Meta","2.8×","+0.7","positive"],["Google Ads","2.7×","−0.2","negative"],["Apple Search Ads","2.6×","−1.2","negative"],["TikTok","2.3×","+0.7","positive"]],
    decay: [["Google Ads","3.3×","+0.4","positive"],["Meta","2.8×","+0.7","positive"],["Apple Search Ads","3.1×","−0.7","negative"],["TikTok","2.1×","+0.5","positive"]],
    position: [["Meta","3.2×","+0.8","positive"],["Apple Search Ads","3.2×","−0.6","negative"],["Google Ads","2.5×","−0.4","negative"],["TikTok","2.2×","+0.4","positive"]],
    custom: [["Google Ads","3.1×","+0.2","positive"],["Meta","2.9×","+0.5","positive"],["Apple Search Ads","3.0×","−0.8","negative"],["TikTok","2.0×","+0.4","positive"]]
  };

  function render(key) {
    const model = models[key];
    if (!model) return;
    const credits = key === "custom" ? customCredits(Number(clickWeight.value), Number(lookback.value)) : model.credits;
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.model === key)));
    bars.forEach((bar, index) => bar.style.setProperty("--credit", `${credits[index]}%`));
    labels.forEach((label, index) => label.textContent = `${credits[index]}%`);
    customBox.hidden = key !== "custom";
    clickOutput.value = `${clickWeight.value}%`;
    lookbackOutput.value = `${lookback.value} ${lookback.value === "1" ? "day" : "days"}`;
    table.innerHTML = roas[key].map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td class="${row[3]}">${row[2]}</td></tr>`).join("");
    status.textContent = `${model.label} selected. ${channels.map((channel, i) => `${channel}: ${credits[i]} percent`).join(". ")}. Total: ${credits.reduce((sum, value) => sum + value, 0)} percent.`;
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => render(button.dataset.model));
    button.addEventListener("keydown", event => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = buttons.length - 1;
      else return;
      event.preventDefault();
      buttons[next].focus();
      render(buttons[next].dataset.model);
    });
  });
  clickWeight.addEventListener("input", () => render("custom"));
  lookback.addEventListener("input", () => render("custom"));
  render("last");
}
