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

const productos = [
    {
        nombre: "Rolex submariner",
        precio:  0,
        imagen:  "img/Productos-Destacados/Rolex_Submariner.png"
    },
    {
        nombre: "Hublot Big Bang Unico",
        precio: 0,
        imagen: "img/Productos-Destacados/Hublot_BigBangUnico.png"
    },
    {
        nombre: "Richard Mille RM RM011",
        precio: 0,
        imagen: "img/Productos-Destacados/RichardMille_RM011.png"
    },
    {
        nombre: "Patek Philippe Nautilus",
        precio: 0,
        imagen: "img/Productos-Destacados/PatekPhilippe_Nautilus.webp"
    },
    {
        nombre: "Cartier Santos",
        precio: 0,
        imagen: "img/Productos-Destacados/Cartier_Santos.png"
    },
    {
        nombre: "Curren 8329",
        precio: 0,
        imagen: "img/Productos-Destacados/Curren_8329.webp"
    }
]; console.log(productos); 
productos.forEach(function(producto) {
    console.log(producto.nombre);
});
const productsGrid = document.querySelector(".products-grid");

productos.forEach(function(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("product-card");

    tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <h3>${producto.nombre}</h3>
        <p class="price">$${producto.precio},00</p>
        <a href="#" class="btn-primary">Agregar al carrito</a>
    `;

    productsGrid.appendChild(tarjeta);
});