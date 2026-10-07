const paymentSettings = {
  cardCheckoutUrl: "",
  paypalCheckoutUrl: "",
  revolutCheckoutUrl: "",
  bankIban: "",
  bankBeneficiary: "Άσυλο Ανιάτων Πατρών"
};

const donationDetails = {
  bank: { title: "Τραπεζική κατάθεση", text: "Κάντε τη δωρεά σας απευθείας στον επίσημο λογαριασμό του Ασύλου. Η απόδειξη εκδίδεται για κάθε δωρεά.", detail: "IBAN και δικαιούχος", actionLabel: "Αντιγραφή IBAN", action: "copy-iban" },
  card: { title: "Δωρεά με κάρτα", text: "Ολοκληρώστε τη δωρεά σας με χρεωστική ή πιστωτική κάρτα σε πιστοποιημένο περιβάλλον πληρωμών.", detail: "Τα στοιχεία της κάρτας δεν καταχωρίζονται ποτέ σε αυτή την ιστοσελίδα.", actionLabel: "Συνέχεια με κάρτα", action: "checkout", checkoutKey: "cardCheckoutUrl", provider: "κάρτας" },
  paypal: { title: "Ασφαλής ηλεκτρονική δωρεά", text: "Ολοκληρώστε τη δωρεά σας σε ασφαλές περιβάλλον PayPal, χωρίς να στείλετε email ή στοιχεία πληρωμής.", detail: "Η πληρωμή ολοκληρώνεται στη σελίδα του PayPal.", actionLabel: "Δωρεά με PayPal", action: "checkout", checkoutKey: "paypalCheckoutUrl", provider: "PayPal" },
  revolut: { title: "Δωρεά με Revolut", text: "Ολοκληρώστε τη δωρεά σας με ασφάλεια μέσω του επίσημου συνδέσμου Revolut του Ασύλου.", detail: "Η πληρωμή ολοκληρώνεται στη σελίδα της Revolut.", actionLabel: "Συνέχεια με Revolut", action: "checkout", checkoutKey: "revolutCheckoutUrl", provider: "Revolut" },
  visit: { title: "Δωρεά στον χώρο μας", text: "Πραγματοποιήστε τη δωρεά σας στη γραμματεία του Ασύλου και λάβετε άμεσα τη νόμιμη απόδειξη.", detail: "Πλατεία Παντοκράτορος, Πάτρα 26225", actionLabel: "Προβολή διαδρομής", action: "map" }
};

function renderDonation(method) {
  const item = donationDetails[method];
  const panel = document.querySelector("#donation-details");
  const checkoutUrl = item.checkoutKey ? paymentSettings[item.checkoutKey] : "";
  const isCheckoutReady = Boolean(checkoutUrl);
  const isBankReady = Boolean(paymentSettings.bankIban);
  const actionMarkup = item.action === "checkout"
    ? `<a class="button button-light payment-action ${isCheckoutReady ? "" : "is-unavailable"}" ${isCheckoutReady ? `href="${checkoutUrl}" target="_blank" rel="noreferrer"` : "aria-disabled=\"true\""}>${item.actionLabel} <span aria-hidden="true">→</span></a>${isCheckoutReady ? "" : `<small class="setup-note">Προσθέστε τον επίσημο σύνδεσμο πληρωμών ${item.provider} στις ρυθμίσεις πριν τη δημοσίευση.</small>`}`
    : item.action === "copy-iban"
      ? `<button class="button button-light payment-action ${isBankReady ? "" : "is-unavailable"}" type="button" data-copy-iban ${isBankReady ? "" : "disabled"}>${item.actionLabel} <span aria-hidden="true">→</span></button>${isBankReady ? "" : "<small class=\"setup-note\">Προσθέστε το επιβεβαιωμένο IBAN στις ρυθμίσεις πληρωμών πριν τη δημοσίευση.</small>"}`
      : `<a class="button button-light payment-action" href="https://www.google.com/maps/search/?api=1&query=Πλατεία+Παντοκράτορος,+Πάτρα" target="_blank" rel="noreferrer">${item.actionLabel} <span aria-hidden="true">→</span></a>`;
  const bankDetails = method === "bank" && isBankReady ? `<strong>${item.detail}: ${paymentSettings.bankIban}<br />Δικαιούχος: ${paymentSettings.bankBeneficiary}</strong>` : `<strong>${item.detail}</strong>`;
  panel.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>${bankDetails}${actionMarkup}`;
}

document.querySelectorAll(".donation-tab").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll(".donation-tab").forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-selected", "false");
  });
  tab.classList.add("active");
  tab.setAttribute("aria-selected", "true");
  renderDonation(tab.dataset.method);
}));

document.querySelector("#donation-details").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-iban]");
  if (!button || !paymentSettings.bankIban) return;
  await navigator.clipboard.writeText(paymentSettings.bankIban);
  button.firstChild.textContent = "Το IBAN αντιγράφηκε ";
});

renderDonation("card");
