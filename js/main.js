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
        marca: "Rolex",
        precio: 5,
        imagen: "img/img-catalogo/Rolex_Submariner.png",
        descripcion: "Icónico reloj de buceo, resistente al agua hasta 300 metros.",
        destacado: true
    },
    {
        nombre: "Rolex Datejust",
        marca: "Rolex",
        precio: 2,
        imagen: "img/img-catalogo/Rolex_Datejust.png",
        descripcion: "Clásico atemporal con ventanilla de fecha, símbolo de elegancia.",
        destacado: false
    },
    {
        nombre: "Rolex GMT-Master II",
        marca: "Rolex",
        precio: 3,
        imagen: "img/img-catalogo/Rolex_GMT-Master2.png",
        descripcion: "Diseñado para viajeros, muestra dos husos horarios a la vez.",
        destacado: false
    },
    {
        nombre: "Rolex Daytona",
        marca: "Rolex",
        precio: 1,
        imagen: "img/img-catalogo/Rolex_Daytona.png",
        descripcion: "Cronógrafo de precisión, inspirado en el mundo del automovilismo.",
        destacado: false
    },
    {
        nombre: "Hublot Big Bang Unico",
        marca: "Hublot",
        precio: 0,
        imagen: "img/img-catalogo/Hublot_BigBangUnico.png",
        descripcion: "Fusión de materiales de vanguardia con diseño audaz y deportivo.",
        destacado: true
    },
    {
        nombre: "Hublot Classic Fusion",
        marca: "Hublot",
        precio: 4,
        imagen: "img/img-catalogo/Hublot_ClassicFusion.png",
        descripcion: "Líneas minimalistas y elegantes, con un toque contemporáneo.",
        destacado: false
    },
    {
        nombre: "Hublot Spirit of Big Bang",
        marca: "Hublot",
        precio: 6,
        imagen: "img/img-catalogo/Hublot_SpiritBigBang.png",
        descripcion: "Caja tonneau distintiva, potencia visual y carácter deportivo.",
        destacado: false
    },
    {
        nombre: "Richard Mille RM011",
        marca: "Richard Mille",
        precio: 0,
        imagen: "img/img-catalogo/RichardMille_RM011.png",
        descripcion: "Alta relojería de edición limitada, precisión y diseño de vanguardia.",
        destacado: true
    },
    {
        nombre: "Richard Mille RM035",
        marca: "Richard Mille",
        precio: 0,
        imagen: "img/img-catalogo/RichardMille_RM035.png",
        descripcion: "Ultraligero y resistente, pensado para el máximo rendimiento.",
        destacado: false
    },
    {
        nombre: "Richard Mille RM27-02",
        marca: "Richard Mille",
        precio: 0,
        imagen: "img/img-catalogo/RichardMille_RM27-02.png",
        descripcion: "Ingeniería extrema en un reloj de altísima gama deportiva.",
        destacado: false
    },
    {
        nombre: "Patek Philippe Nautilus",
        marca: "Patek Philippe",
        precio: 0,
        imagen: "img/img-catalogo/PatekPhilippe_Nautilus.webp",
        descripcion: "Elegancia atemporal con el icónico bisel octagonal y brazalete integrado.",
        destacado: true
    },
    {
        nombre: "Patek Philippe Aquanaut",
        marca: "Patek Philippe",
        precio: 0,
        imagen: "img/img-catalogo/PatekPhilippe_Aquanaut.webp",
        descripcion: "Estilo deportivo y moderno, con correa de caucho característica.",
        destacado: false
    },
    {
        nombre: "Patek Philippe Calatrava",
        marca: "Patek Philippe",
        precio: 0,
        imagen: "img/img-catalogo/PatekPhilippe_Calatrava.webp",
        descripcion: "El reloj de vestir por excelencia, pura elegancia clásica.",
        destacado: false
    },
    {
        nombre: "Cartier Santos",
        marca: "Cartier",
        precio: 0,
        imagen: "img/img-catalogo/Cartier_Santos.png",
        descripcion: "Diseño cuadrado inconfundible, símbolo de estilo desde 1904.",
        destacado: true
    },
    {
        nombre: "Cartier Tank",
        marca: "Cartier",
        precio: 0,
        imagen: "img/img-catalogo/Cartier_Tank.png",
        descripcion: "Silueta rectangular icónica, un ícono absoluto de la relojería.",
        destacado: false
    },
    {
        nombre: "Cartier Ballon Bleu",
        marca: "Cartier",
        precio: 0,
        imagen: "img/img-catalogo/Cartier_BallonBleu.png",
        descripcion: "Caja redondeada y corona protegida, elegancia con carácter.",
        destacado: false
    },
    {
        nombre: "Curren 8329",
        marca: "Curren",
        precio: 0,
        imagen: "img/img-catalogo/Curren_8329.webp",
        descripcion: "Reloj de diseño moderno con detalles elegantes y funcionalidad avanzada.",
        destacado: true
    },
    {
        nombre: "Curren 8380",
        marca: "Curren",
        precio: 0,
        imagen: "img/img-catalogo/Curren_8380.webp",
        descripcion: "Estilo deportivo y casual, ideal para el uso diario.",
        destacado: false
    },
    {
        nombre: "Curren 8404",
        marca: "Curren",
        precio: 0,
        imagen: "img/img-catalogo/Curren_8404.webp",
        descripcion: "Diseño robusto en acero, con gran legibilidad.",
        destacado: false
    },
    {
        nombre: "Curren 8225",
        marca: "Curren",
        precio: 0,
        imagen: "img/img-catalogo/Curren_8225.webp",
        descripcion: "Reloj clásico y versátil, fácil de combinar con cualquier estilo.",
        destacado: false
    }
]; console.log(productos); 
productos.forEach(function(producto) {
    console.log(producto.nombre);
});

function renderizarProductos(selectorContenedor, listaProductos) {
    const contenedor = document.querySelector(selectorContenedor);

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    listaProductos.forEach(function(producto) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("product-card");

        let descripcionHTML = "";
        let rutaImagen = producto.imagen;
        let rutaDetalle = "pages/detalle.html";

        if (selectorContenedor === ".catalogo-grid") {
            descripcionHTML = `<p class="description">${producto.descripcion}</p>`;
            rutaImagen = "../" + producto.imagen;
            rutaDetalle = "detalle.html";
        }

        const nombreCodificado = encodeURIComponent(producto.nombre);

        tarjeta.innerHTML = `
            <a href="${rutaDetalle}?producto=${nombreCodificado}" class="product-card-link">
                <img src="${rutaImagen}" alt="${producto.nombre}" loading="lazy">
                <h3>${producto.nombre}</h3>
                ${descripcionHTML}
                <p class="price">$${producto.precio},00</p>
            </a>
            <a href="#" class="btn-primary btn-agregar">Agregar al carrito</a>
        `;
        contenedor.appendChild(tarjeta);
    });
}

const destacados = productos.filter(function (producto) {
    return producto.destacado === true;
});

renderizarProductos(".products-grid", destacados);
renderizarProductos(".catalogo-grid", productos);

function buscarProductos(textoBusqueda) {
    return productos.filter(function (producto) {
        return producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    });
}

function filtrarPorMarca(marcaSeleccionada) {
    return productos.filter(function (producto) {
        return producto.marca === marcaSeleccionada;
    });
}

function ordenarPorPrecio(listaProductos, orden) {
    const copia = [...listaProductos];

    if (orden === "asc") {
        return copia.sort(function (a, b) {
            return a.precio - b.precio;
        });
    }

    if (orden === "desc") {
        return copia.sort(function (a, b) {
            return b.precio - a.precio;
        });
    }

    return copia;
}

function filtrarYOrdenarCatalogo() {
    const textoBusqueda = document.querySelector("#input-busqueda").value;

    const checkboxesMarcados = document.querySelectorAll('input[name="marca"]:checked');
    const marcasSeleccionadas = Array.from(checkboxesMarcados).map(function (checkbox) {
        return checkbox.value;
    });

    const ordenSeleccionado = document.querySelector("#orden-precio").value;

    let resultado = buscarProductos(textoBusqueda);

    if (marcasSeleccionadas.length > 0) {
        resultado = resultado.filter(function (producto) {
            return marcasSeleccionadas.includes(producto.marca);
        });
    }

    if (ordenSeleccionado !== "") {
        resultado = ordenarPorPrecio(resultado, ordenSeleccionado);
    }

    renderizarProductos(".catalogo-grid", resultado);
}

const inputBusqueda = document.querySelector("#input-busqueda");
if (inputBusqueda) {
    inputBusqueda.addEventListener("input", filtrarYOrdenarCatalogo);
}

const checkboxesMarca = document.querySelectorAll('input[name="marca"]');
checkboxesMarca.forEach(function (checkbox) {
    checkbox.addEventListener("change", filtrarYOrdenarCatalogo);
});

const selectOrden = document.querySelector("#orden-precio");
if (selectOrden) {
    selectOrden.addEventListener("change", filtrarYOrdenarCatalogo);
}

const contenedorDetalle = document.querySelector(".detalle-producto");

if (contenedorDetalle) {
    const parametros = new URLSearchParams(window.location.search);
    const nombreBuscado = parametros.get("producto");

    const producto = productos.find(function (p) {
        return p.nombre === nombreBuscado;
    });

    if (producto) {
        contenedorDetalle.innerHTML = `
            <img src="../${producto.imagen}" alt="${producto.nombre}">
            <div class="detalle-info">
                <h1>${producto.nombre}</h1>
                <p class="detalle-marca">${producto.marca}</p>
                <p class="detalle-descripcion">${producto.descripcion}</p>
                <p class="price">$${producto.precio},00</p>
                <a href="#" class="btn-primary btn-agregar">Agregar al carrito</a>
            </div>
        `;
    } else {
        contenedorDetalle.innerHTML = `<p>Producto no encontrado.</p>`;
    }
}

const botonVolver = document.querySelector(".btn-volver");

if (botonVolver) {
    botonVolver.addEventListener("click", function () {
        history.back();
    });
}

const carritoToggle = document.querySelector(".carrito-toggle");
const carritoSidebar = document.querySelector(".carrito-sidebar");
const carritoOverlay = document.querySelector(".carrito-overlay");
const carritoCerrar = document.querySelector(".carrito-cerrar");

function abrirCarrito() {
    carritoSidebar.classList.add("activo");
    carritoOverlay.classList.add("activo");
}

function cerrarCarrito() {
    carritoSidebar.classList.remove("activo");
    carritoOverlay.classList.remove("activo");
}

if (carritoToggle) {
    carritoToggle.addEventListener("click", abrirCarrito);
}

if (carritoCerrar) {
    carritoCerrar.addEventListener("click", cerrarCarrito);
}

if (carritoOverlay) {
    carritoOverlay.addEventListener("click", cerrarCarrito);
}