const menu = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll(".nav-link");
menu.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-menu-open");
  mobileMenu.classList.toggle("mobile-menu-close");
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((link) => link.classList.remove("clicked"));
    link.classList.add("clicked");
  });
});
