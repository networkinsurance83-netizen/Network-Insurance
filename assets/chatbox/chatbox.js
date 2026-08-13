(function () {
  "use strict";
  var config = window.InsuranceChatboxConfig;
  if (!config || document.querySelector("[data-insurance-chatbox]")) return;
  var api = (config.apiBase || "").replace(/\/$/, "");
  var session = null;
  var root = document.createElement("div");
  var advisorStyles = document.createElement("style");
  advisorStyles.textContent = ".icb__advisor-bar{position:sticky;bottom:0;z-index:2;padding:.65rem 1rem;background:#fff;border-top:1px solid #dde2e8;border-bottom:1px solid #dde2e8}.icb__advisor-button{width:100%;border:0;border-radius:6px;background:var(--icb-accent);color:#172033;padding:.7rem .85rem;font:inherit;font-weight:700;cursor:pointer}.icb__booking{padding:1rem;border-top:1px solid #dde2e8}.icb__booking h3{margin:0 0 .25rem}.icb__booking p{font-size:.82rem}.icb__booking label{display:block;margin:.55rem 0;font-size:.82rem;font-weight:700}.icb__booking-actions{display:grid;gap:.45rem}.icb__booking-actions button{border:1px solid var(--icb-brand);border-radius:6px;background:#fff;color:var(--icb-brand);padding:.65rem;font:inherit;font-weight:700;cursor:pointer}.icb__booking-actions button[data-cancel]{border-color:#9b2c2c;color:#9b2c2c}";
  document.head.appendChild(advisorStyles);
  root.dataset.insuranceChatbox = "";
  root.className = "icb";
  if (config.brandColor) root.style.setProperty("--icb-brand", config.brandColor);
  if (config.accentColor) root.style.setProperty("--icb-accent", config.accentColor);
  root.innerHTML = '<button class="icb__launcher" type="button" aria-expanded="false" aria-controls="insurance-chat-panel"><span aria-hidden="true">?</span><span>Chat with us</span></button>' +
    '<section class="icb__panel" id="insurance-chat-panel" role="dialog" aria-modal="false" aria-labelledby="insurance-chat-title" hidden>' +
      '<header class="icb__header"><div><strong id="insurance-chat-title">' + escapeHtml(config.brandName) + ' Chat Bot</strong></div><button class="icb__close" type="button" aria-label="Close chat">×</button></header>' +
      '<div class="icb__messages" aria-live="polite" aria-label="Chat messages"></div>' +
      '<div class="icb__quick" aria-label="Common questions"><button type="button" data-question="What coverage types can I ask about?">Coverage types</button><button type="button" data-question="How does term life insurance work?">Life insurance</button><button type="button" data-question="What should I understand about health insurance?">Health insurance</button><button type="button" data-question="What is an annuity?">Annuities</button><button type="button" data-question="I want to speak with an advisor">Contact an advisor</button><button type="button" data-question="How is my information protected?">Privacy</button></div>' +
      '<form class="icb__message-form"><label class="icb__sr" for="icb-message">Your question</label><input id="icb-message" name="message" maxlength="1000" placeholder="Ask a general question" autocomplete="off" required><button type="submit">SEND</button></form>' +
      '<div class="icb__advisor-bar"><button class="icb__advisor-button" type="button" aria-expanded="false">Contact an advisor</button></div>' +
      '<form class="icb__contact" hidden><h3>Request advisor follow-up</h3><p>Complete the required fields. An advisor will review your request.</p>' +
        '<div class="icb__grid"><label>First name<input name="first_name" maxlength="80" required></label><label>Last name<input name="last_name" maxlength="80" required></label></div>' +
        '<label>Email<input name="email" type="email" maxlength="254" required></label><label>Phone<input name="phone" type="tel" maxlength="20" required></label>' +
        '<div class="icb__grid"><label>State<input name="state" maxlength="2" pattern="[A-Za-z]{2}" required></label><label>Interest<select name="coverage_category" required><option value="">Select</option><option>Life insurance</option><option>Health insurance</option><option>Annuity</option><option>Long-term care</option><option>Supplemental insurance</option><option>Other</option></select></label></div>' +
        '<label>Preferred follow-up<select name="preferred_contact" required><option value="Email">Email</option><option value="Phone">Phone</option><option value="Text" data-sms-option hidden disabled>Text</option></select></label><label>Question or goal<textarea name="message" maxlength="500"></textarea></label>' +
        '<label class="icb__check"><input name="contact_consent" type="checkbox" required> I authorize ' + escapeHtml(config.brandName) + ' to respond to this request by email or phone. This does not authorize promotional messages.</label>' +
        '<label class="icb__check" data-sms-consent hidden><input name="sms_service_consent" type="checkbox"> Optional: I agree to receive text messages from ' + escapeHtml(config.brandName) + ' regarding this request, customer-requested follow-ups, and appointment confirmations or reminders at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase. This does not authorize promotional messages.</label>' +
        '<label class="icb__trap" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>' +
        '<p class="icb__legal">By submitting, you acknowledge the <a href="' + safeUrl(config.privacyUrl) + '" target="_blank" rel="noopener">Privacy Policy</a>. Do not submit sensitive medical or financial information.</p>' +
        '<button type="submit">Send request</button></form>' +
      '<section class="icb__booking" hidden><h3>Book an appointment</h3><p>Live availability is shown in Eastern Time. Times include a buffer to prevent back-to-back or overlapping appointments.</p><form class="icb__booking-form"><label>Available time<select name="starts_at" required><option value="">Loading times…</option></select></label><button type="submit" data-book>Book appointment</button></form><div class="icb__booking-actions" data-manage hidden><button type="button" data-reschedule>Reschedule to selected time</button><button type="button" data-cancel>Cancel appointment</button></div></section>' +
      '<p class="icb__status" role="status"></p>' +
      '<footer class="icb__safety-footer">Educational information only. Do not share Social Security number, payment information, password, or detailed medical information.</footer>' +
    '</section>';
  document.body.appendChild(root);

  var launcher = root.querySelector(".icb__launcher");
  var panel = root.querySelector(".icb__panel");
  var close = root.querySelector(".icb__close");
  var messages = root.querySelector(".icb__messages");
  var status = root.querySelector(".icb__status");
  var messageForm = root.querySelector(".icb__message-form");
  var contactForm = root.querySelector(".icb__contact");
  var advisorButton = root.querySelector(".icb__advisor-button");
  var bookingPanel = root.querySelector(".icb__booking");
  var bookingForm = root.querySelector(".icb__booking-form");
  var slotSelect = bookingForm.elements.starts_at;
  var bookingButton = bookingForm.querySelector("[data-book]");
  var bookingManage = root.querySelector("[data-manage]");
  var bookedAppointment = null;

  function escapeHtml(value) { var div = document.createElement("div"); div.textContent = value || ""; return div.innerHTML; }
  function safeUrl(value) { try { var url = new URL(value, location.href); return url.protocol === "https:" || url.protocol === "http:" ? url.href : "#"; } catch { return "#"; } }
  function addMessage(body, role) { var item = document.createElement("p"); item.className = "icb__bubble icb__bubble--" + role; item.textContent = body; messages.appendChild(item); messages.scrollTop = messages.scrollHeight; }
  function setStatus(body, error) { status.textContent = body || ""; status.classList.toggle("is-error", Boolean(error)); }
  function setContactFormVisible(visible) {
    contactForm.hidden = !visible;
    advisorButton.setAttribute("aria-expanded", String(visible));
    advisorButton.textContent = visible ? "Hide advisor form" : "Contact an advisor";
    if (visible) contactForm.scrollIntoView({ block: "nearest" });
  }
  function updateSmsConsent() {
    var selected = contactForm.elements.preferred_contact.value === "Text";
    var consent = root.querySelector("[data-sms-consent]");
    consent.hidden = !selected;
    consent.querySelector("input").required = selected;
    if (!selected) consent.querySelector("input").checked = false;
  }
  function updateFeatures(features) {
    var smsEnabled = Boolean(features && features.sms);
    var smsOption = root.querySelector("[data-sms-option]");
    smsOption.hidden = !smsEnabled; smsOption.disabled = !smsEnabled;
    if (!smsEnabled && contactForm.elements.preferred_contact.value === "Text") contactForm.elements.preferred_contact.value = "Email";
    updateSmsConsent();
  }
  async function post(path, body) { var response = await fetch(api + path, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) }); var result = await response.json().catch(function () { return {}; }); if (!response.ok || !result.ok) throw new Error(result.message || "The request could not be completed."); return result; }
  async function start() {
    if (session) return session;
    setStatus("Starting secure chat…");
    session = await post("/api/chat/session", { source_site: config.sourceSite, landing_page: location.href.split("#")[0], website: "" });
    addMessage(session.message, "assistant"); updateFeatures(session.features); setStatus(""); return session;
  }
  function appointmentPayload(extra) { return Object.assign({ source_site: config.sourceSite, session_id: session.session_id, session_token: session.session_token }, extra || {}); }
  async function loadAvailability(appointmentId) {
    setStatus("Loading live appointment times…");
    var result = await post("/api/chat/appointments/availability", appointmentPayload(appointmentId ? { appointment_id: appointmentId } : {}));
    slotSelect.innerHTML = '<option value="">Select a time</option>' + result.slots.map(function (slot) { return '<option value="' + escapeHtml(slot.startsAt) + '">' + escapeHtml(slot.label) + '</option>'; }).join("");
    bookingPanel.hidden = false; setStatus(result.slots.length ? "" : "No online times are currently available. An advisor will follow up.", !result.slots.length);
  }
  async function openPanel() { panel.hidden = false; launcher.setAttribute("aria-expanded", "true"); try { await start(); root.querySelector("#icb-message").focus(); } catch (error) { setStatus(error.message, true); } }
  function closePanel() { panel.hidden = true; launcher.setAttribute("aria-expanded", "false"); launcher.focus(); }
  launcher.addEventListener("click", function () { if (panel.hidden) openPanel(); else closePanel(); });
  close.addEventListener("click", closePanel);
  root.addEventListener("keydown", function (event) { if (event.key === "Escape" && !panel.hidden) closePanel(); });
  root.querySelector(".icb__quick").addEventListener("click", function (event) { var button = event.target.closest("button[data-question]"); if (button) sendMessage(button.dataset.question); });
  advisorButton.addEventListener("click", function () { setContactFormVisible(contactForm.hidden); });
  async function sendMessage(body) {
    if (!body || !body.trim()) return;
    try { await start(); addMessage(body.trim(), "visitor"); setStatus("Sending…"); var result = await post("/api/chat/message", { source_site: config.sourceSite, session_id: session.session_id, session_token: session.session_token, message: body.trim() }); addMessage(result.message, "assistant"); if (result.show_contact_form) setContactFormVisible(true); setStatus(""); } catch (error) { setStatus(error.message, true); }
  }
  messageForm.addEventListener("submit", function (event) { event.preventDefault(); var input = messageForm.elements.message; var body = input.value; input.value = ""; sendMessage(body); });
  contactForm.elements.preferred_contact.addEventListener("change", updateSmsConsent);
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); if (!contactForm.reportValidity()) return;
    try {
      await start(); setStatus("Saving your request…"); var form = new FormData(contactForm); var payload = Object.fromEntries(form.entries());
      payload.contact_consent = form.has("contact_consent"); payload.sms_service_consent = form.has("sms_service_consent"); payload.source_site = config.sourceSite; payload.session_id = session.session_id; payload.session_token = session.session_token;
      var lead = await post("/api/chat/lead", payload); addMessage(lead.message, "assistant");
      var handoff = await post("/api/chat/handoff", { source_site: config.sourceSite, session_id: session.session_id, session_token: session.session_token, reason: payload.message || "Advisor follow-up requested through website chat" });
      addMessage(handoff.message, "assistant"); setContactFormVisible(false); contactForm.reset(); setStatus("");
      if (session.features && session.features.booking) await loadAvailability();
    } catch (error) { setStatus(error.message, true); }
  });
  bookingForm.addEventListener("submit", async function (event) {
    event.preventDefault(); if (!bookingForm.reportValidity() || bookedAppointment) return;
    try { setStatus("Confirming your appointment…"); var result = await post("/api/chat/appointments/book", appointmentPayload({ starts_at: slotSelect.value })); bookedAppointment = result.appointment; addMessage(result.message, "assistant"); bookingButton.hidden = true; bookingManage.hidden = false; await loadAvailability(bookedAppointment.id); } catch (error) { setStatus(error.message, true); await loadAvailability().catch(function () {}); }
  });
  root.querySelector("[data-reschedule]").addEventListener("click", async function () {
    if (!bookedAppointment || !slotSelect.value) { setStatus("Select a new available time first.", true); return; }
    try { setStatus("Rescheduling your appointment…"); var result = await post("/api/chat/appointments/reschedule", appointmentPayload({ appointment_id: bookedAppointment.id, starts_at: slotSelect.value })); bookedAppointment = result.appointment; addMessage(result.message, "assistant"); await loadAvailability(bookedAppointment.id); } catch (error) { setStatus(error.message, true); }
  });
  root.querySelector("[data-cancel]").addEventListener("click", async function () {
    if (!bookedAppointment) return;
    try { setStatus("Cancelling your appointment…"); var result = await post("/api/chat/appointments/cancel", appointmentPayload({ appointment_id: bookedAppointment.id })); addMessage(result.message, "assistant"); bookedAppointment = null; bookingManage.hidden = true; bookingButton.hidden = false; await loadAvailability(); } catch (error) { setStatus(error.message, true); }
  });
})();
