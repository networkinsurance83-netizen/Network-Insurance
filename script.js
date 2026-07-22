const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");
const coverageCategory = document.querySelector("#coverageCategory");
const categoryPanels = document.querySelectorAll("[data-category-panel]");

function setStatus(message, type = "info") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = `form-status ${type === "error" ? "error-message" : type === "success" ? "success-message" : ""}`;
}

leadForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!leadForm.checkValidity()) {
    leadForm.reportValidity();
    setStatus("Please complete the required fields.", "error");
    return;
  }

  const endpoint = leadForm.getAttribute("action") || "";
  const honeypot = leadForm.querySelector('input[name="_gotcha"]');

  if (honeypot?.value) {
    setStatus("Thank you. Your request has been received.", "success");
    leadForm.reset();
    return;
  }

  const submitButton = leadForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  setStatus("Sending your request...");

  try {
    const formData = new FormData(leadForm);
    const payload = Object.fromEntries(formData.entries());
    payload.sms_service_consent = formData.has("sms_service_consent");
    payload.sms_marketing_consent = formData.has("sms_marketing_consent");
    payload.website = String(formData.get("_gotcha") || "");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) throw new Error(result.message || "Form submission failed");

    setStatus("Thank you. Your request was sent. Brad will follow up using your preferred contact method.", "success");
    leadForm.reset();

    const thankYou = leadForm.dataset.thankYouUrl;
    if (thankYou && !thankYou.includes("REPLACE_WITH_THANK_YOU_URL")) {
      window.location.href = thankYou;
    }
  } catch (error) {
    setStatus("The form could not be sent right now. Please schedule an appointment or try again later.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send My Request";
  }
});

function updateCategoryPanels() {
  if (!coverageCategory) return;
  const value = coverageCategory.value.toLowerCase();
  categoryPanels.forEach((panel) => {
    const type = panel.getAttribute("data-category-panel");
    const show =
      (type === "health" && value.includes("health")) ||
      (type === "life" && (value.includes("life") || value.includes("family protection"))) ||
      (type === "annuity" && (value.includes("annuit") || value.includes("retirement income")));
    panel.hidden = !show;
  });
}

coverageCategory?.addEventListener("change", updateCategoryPanels);
updateCategoryPanels();
