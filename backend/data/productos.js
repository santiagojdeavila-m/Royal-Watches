const productosBase = [
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
];

const productos = productosBase.map(function (producto, indice) {
    return { id: indice + 1, ...producto };
});

module.exports = productos;