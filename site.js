const navigationToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".main-nav");

navigationToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
  navigationToggle.setAttribute("aria-expanded", navigation.classList.contains("open"));
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => navigation.classList.remove("open")));

const contactForm = document.querySelector(".contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = contactForm.querySelector(".form-note");
  note.textContent = "Η φόρμα είναι έτοιμη για σύνδεση με την επίσημη υπηρεσία αποστολής μηνυμάτων.";
});
