const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");

leadForm?.addEventListener("submit", (event) => {
  const action = leadForm.getAttribute("action");

  if (!action || action === "#") {
    event.preventDefault();
    formStatus.textContent = "Lead form is designed and ready. Connect a Google Form endpoint before publishing paid traffic.";
    formStatus.style.color = "#9a5c00";
    return;
  }

  formStatus.textContent = "Sending your request...";
});
