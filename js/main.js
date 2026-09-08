const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

console.log(menuToggle);
console.log(nav);
menuToggle.addEventListener("click", function() {
    nav.classList.toggle("nav-active");
});

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("nav-active");
    });
})