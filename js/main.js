const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

console.log(menuToggle);
console.log(nav);menuToggle.addEventListener("click", function() {
    nav.classList.toggle("nav-active");
}); 