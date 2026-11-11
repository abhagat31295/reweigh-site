const logicButtons = [...document.querySelectorAll("[data-logic-view]")];
if (logicButtons.length) {
  const kicker = document.querySelector("[data-view-kicker]");
  const source = document.querySelector("[data-view-source]");
  const reason = document.querySelector("[data-view-reason]");
  const views = {
    mmp: {
      kicker: "MMP ATTRIBUTION",
      source: "Facebook Ads",
      reason: "MMP’s recorded attribution is shown as provided."
    },
    company: {
      kicker: "COMPANY-DEFINED ATTRIBUTION",
      source: "Referral",
      reason: "Referral code was present at signup. The configured rule classified this signup as Referral."
    }
  };

  logicButtons.forEach(button => {
    button.addEventListener("click", () => {
      const view = views[button.dataset.logicView];
      if (!view) return;
      logicButtons.forEach(option => option.setAttribute("aria-pressed", String(option === button)));
      kicker.textContent = view.kicker;
      source.textContent = view.source;
      reason.textContent = view.reason;
    });
  });
}
