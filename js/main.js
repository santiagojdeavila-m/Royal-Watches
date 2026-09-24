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
        nombre: "Rolex Submariner",
        precio: 0,
        imagen: "img/Productos-Destacados/Rolex_Submariner.png",
        descripcion: "Icónico reloj de buceo, resistente al agua hasta 300 metros."
    },
    {
        nombre: "Rolex Datejust",
        precio: 0,
        imagen: "img/img-catalogo/Rolex_Datejust.png",
        descripcion: "Clásico atemporal con ventanilla de fecha, símbolo de elegancia."
    },
    {
        nombre: "Rolex GMT-Master II",
        precio: 0,
        imagen: "img/img-catalogo/Rolex_GMT-Master2.png",
        descripcion: "Diseñado para viajeros, muestra dos husos horarios a la vez."
    },
    {
        nombre: "Rolex Daytona",
        precio: 0,
        imagen: "img/img-catalogo/Rolex_Daytona.png",
        descripcion: "Cronógrafo de precisión, inspirado en el mundo del automovilismo."
    },
    {
        nombre: "Hublot Big Bang Unico",
        precio: 0,
        imagen: "img/img-catalogo/Hublot_BigBangUnico.png",
        descripcion: "Fusión de materiales de vanguardia con diseño audaz y deportivo."
    },
    {
        nombre: "Hublot Classic Fusion",
        precio: 0,
        imagen: "img/img-catalogo/Hublot_ClassicFusion.png",
        descripcion: "Líneas minimalistas y elegantes, con un toque contemporáneo."
    },
    {
        nombre: "Hublot Spirit of Big Bang",
        precio: 0,
        imagen: "img/img-catalogo/Hublot_SpiritBigBang.png",
        descripcion: "Caja tonneau distintiva, potencia visual y carácter deportivo."
    },
    {
        nombre: "Richard Mille RM011",
        precio: 0,
        imagen: "img/img-catalogo/RichardMille_RM011.png",
        descripcion: "Alta relojería de edición limitada, precisión y diseño de vanguardia."
    },
    {
        nombre: "Richard Mille RM035",
        precio: 0,
        imagen: "img/img-catalogo/RichardMille_RM035.png",
        descripcion: "Ultraligero y resistente, pensado para el máximo rendimiento."
    },
    {
        nombre: "Richard Mille RM27-02",
        precio: 0,
        imagen: "img/img-catalogo/RichardMille_RM27-02.png",
        descripcion: "Ingeniería extrema en un reloj de altísima gama deportiva."
    },
    {
        nombre: "Patek Philippe Nautilus",
        precio: 0,
        imagen: "img/img-catalogo/PatekPhilippe_Nautilus.webp",
        descripcion: "Elegancia atemporal con el icónico bisel octagonal y brazalete integrado."
    },
    {
        nombre: "Patek Philippe Aquanaut",
        precio: 0,
        imagen: "img/img-catalogo/PatekPhilippe_Aquanaut.webp",
        descripcion: "Estilo deportivo y moderno, con correa de caucho característica."
    },
    {
        nombre: "Patek Philippe Calatrava",
        precio: 0,
        imagen: "img/img-catalogo/PatekPhilippe_Calatrava.webp",
        descripcion: "El reloj de vestir por excelencia, pura elegancia clásica."
    },
    {
        nombre: "Cartier Santos",
        precio: 0,
        imagen: "img/img-catalogo/Cartier_Santos.png",
        descripcion: "Diseño cuadrado inconfundible, símbolo de estilo desde 1904."
    },
    {
        nombre: "Cartier Tank",
        precio: 0,
        imagen: "img/img-catalogo/Cartier_Tank.png",
        descripcion: "Silueta rectangular icónica, un ícono absoluto de la relojería."
    },
    {
        nombre: "Cartier Ballon Bleu",
        precio: 0,
        imagen: "img/img-catalogo/Cartier_BallonBleu.png",
        descripcion: "Caja redondeada y corona protegida, elegancia con carácter."
    },
    {
        nombre: "Curren 8329",
        precio: 0,
        imagen: "img/img-catalogo/Curren_8329.webp",
        descripcion: "Reloj de diseño moderno con detalles elegantes y funcionalidad avanzada."
    },
    {
        nombre: "Curren 8380",
        precio: 0,
        imagen: "img/img-catalogo/Curren_8380.webp",
        descripcion: "Estilo deportivo y casual, ideal para el uso diario."
    },
    {
        nombre: "Curren 8404",
        precio: 0,
        imagen: "img/img-catalogo/Curren_8404.webp",
        descripcion: "Diseño robusto en acero, con gran legibilidad."
    },
    {
        nombre: "Curren 8225",
        precio: 0,
        imagen: "img/img-catalogo/Curren_8225.webp",
        descripcion: "Reloj clásico y versátil, fácil de combinar con cualquier estilo."
    }
]; console.log(productos); 
productos.forEach(function(producto) {
    console.log(producto.nombre);
});
function renderizarProductos(selectorContenedor) {
    const contenedor = document.querySelector(selectorContenedor);

    if (!contenedor) {
        return;
    }

    productos.forEach(function(producto) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("product-card");

        let descripcionHTML = "";

if (selectorContenedor === ".catalogo-grid") {
    descripcionHTML = `<p class="description">${producto.descripcion}</p>`;
}
let rutaImagen = producto.imagen;

if (selectorContenedor === ".catalogo-grid") {
    rutaImagen = "../" + producto.imagen;
}
tarjeta.innerHTML = `
    <img src="${rutaImagen}" alt="${producto.nombre}" loading="lazy">
    <h3>${producto.nombre}</h3>
    ${descripcionHTML}
    <p class="price">$${producto.precio},00</p>
    <a href="#" class="btn-primary">Agregar al carrito</a>
`;
        contenedor.appendChild(tarjeta);
    });
}

renderizarProductos(".products-grid");
renderizarProductos(".catalogo-grid");