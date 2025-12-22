const productos = [
    // OLD MONEY (6)
    { id: 1, nombre: "Polo Tejido Premium", precio: 86.64, categoria: "old-money", coleccion: "nuevos", img: "https://old-money.com/cdn/shop/files/ribbed_16b.png?v=1757781960&width=960" },
    { id: 2, nombre: "Jersey Verbier con media cremallera", precio: 47.99, categoria: "old-money", coleccion: "destacados", img: "https://old-money.com/cdn/shop/files/3_711b7d8b-bf8b-4a84-b7fa-6f879ac7fe38.png?v=1732758631&width=960" },
    { id: 3, nombre: "Gstaad Fall Turtleneck", precio: 41.00, categoria: "old-money", coleccion: "promociones", img: "https://old-money.com/cdn/shop/files/16_93c589a6-0bd5-4267-97cd-e5b5745b9ec0.png?v=1732760089&width=960" },
    { id: 4, nombre: "Pantalones chinos Porto", precio: 40.0, categoria: "old-money", coleccion: "nuevos", img: "https://old-money.com/cdn/shop/files/1_0509c4da-2a95-45dd-921c-17091177f9c9.jpg?v=1732878153&width=1280" },
    { id: 5, nombre: "Cannes Ribbed Cotton Polo", precio: 35.10, categoria: "old-money", coleccion: "destacados", img: "https://old-money.com/cdn/shop/files/2_68d77782-0457-4378-9735-127c55c57b10.png?v=1732956187&width=1280" },
    { id: 6, nombre: "Textured Knit Polo Sweater", precio: 41.99, categoria: "old-money", coleccion: "promociones", img: "https://old-money.com/cdn/shop/files/4_48d57670-7a54-437e-8327-068e9f4552b7.jpg?v=1757003783&width=960" },

    // URBANA (6)
    { id: 7, nombre: "Hoodie Oversize", precio: 49.99, categoria: "urbana", coleccion: "nuevos", img: "https://img4.dhresource.com/webp/m/0x0/f3/albu/ys/h/14/507f2cf7-be2c-4ad0-bc8a-926af6f14489.jpg" },
    { id: 8, nombre: "Cargo Pants", precio: 59.99, categoria: "urbana", coleccion: "destacados", img: "https://m.media-amazon.com/images/I/71eNHMk8gkL._AC_UF894,1000_QL80_.jpg" },
    { id: 9, nombre: "Polera Hombre Print Oversize Negro", precio: 12.10, categoria: "urbana", coleccion: "promociones", img: "https://fashionspark.com/cdn/shop/files/P-970809402-1_2048x2048.webp?v=1765394162" },
    { id: 10, nombre: "Chaqueta Bomber", precio: 85.00, categoria: "urbana", coleccion: "nuevos", img: "https://m.media-amazon.com/images/I/41BSyLXI6PL._AC_.jpg" },
    { id: 11, nombre: "Jeans Hombre Doble Cargo Gris", precio: 20.90, categoria: "urbana", coleccion: "destacados", img: "https://fashionspark.com/cdn/shop/files/P-670715002-1_2048x2048.webp?v=1757442310" },
    { id: 12, nombre: "Bermuda Hombre Calce Recto Verde Militar", precio: 16.00, categoria: "urbana", coleccion: "promociones", img: "https://fashionspark.com/cdn/shop/files/p-970011503-1_2048x2048.webp?v=1764262586" },

    // ZAPATOS (6)
    { id: 13, nombre: "Tenis Kong Blanco", precio: 72.89, categoria: "zapatos", coleccion: "nuevos", img: "https://calzadokadosh.com/cdn/shop/files/096A5E7D-3F07-474F-868D-3E273A9C1ED3.jpg?v=1742007360&width=1946" },
    { id: 14, nombre: "Pantufla Hombre Rapport Regalable Negro", precio: 7.00, categoria: "zapatos", coleccion: "destacados", img: "https://fashionspark.com/cdn/shop/files/p-910064603-1_2048x2048.jpg?v=1758820318" },
    { id: 15, nombre: "Mocasines de ante Old Money", precio: 51.30, categoria: "zapatos", coleccion: "promociones", img: "https://old-money.com/cdn/shop/files/Loafer-orange_9.jpg?v=1745929917&width=1280" },
    { id: 16, nombre: "ZAPATILLAS RIGEL VERDE - HOMBRE", precio: 56.20, categoria: "zapatos", coleccion: "nuevos", img: "https://batabolivia.vtexassets.com/arquivos/ids/213020-1200-auto?v=638962257083270000&width=1200&height=auto&aspect=true" },
    { id: 17, nombre: "TENIS MODA NEW YORK BLANCO - HOMBRE", precio: 46.16, categoria: "zapatos", coleccion: "destacados", img: "https://batabolivia.vtexassets.com/arquivos/ids/196687-1200-auto?v=638306620336230000&width=1200&height=auto&aspect=true" },
    { id: 18, nombre: "Pantufla Hombre Casual Marengo", precio: 10.00, categoria: "zapatos", coleccion: "promociones", img: "https://fashionspark.com/cdn/shop/files/p-910064702-1.jpg?v=1758820217&width=360" },

    // ACCESORIOS (6)
    { id: 19, nombre: "Anillo Cronos P950", precio: 20.52, categoria: "accesorios", coleccion: "nuevos", img: "https://menfashionbox.com/wp-content/uploads/2024/12/Cronos-P950-1.jpg" },
    { id: 20, nombre: "Set Pulseras Micro Lomo y Lomo de Corvina", precio: 18.00, categoria: "accesorios", coleccion: "destacados", img: "https://menfashionbox.com/wp-content/uploads/2025/11/Pack-Pulseras-Micro-Lomo-y-Lomo-de-Corvina-1-1000x1000.jpg" },
    { id: 21, nombre: "Set Franco (Collar + Pulsera)", precio: 23.00, categoria: "accesorios", coleccion: "promociones", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmARMyCo1NKCmTEsge6h86D5fg2N18McGqIA&s" },
    { id: 22, nombre: "Collar Lomo Doble Malla 6MM P950", precio: 19.00, categoria: "accesorios", coleccion: "nuevos", img: "https://menfashionbox.com/wp-content/uploads/2023/06/lomo-collar-plata-1000x1000.jpg" },
    { id: 23, nombre: "Billetera para Hombre Lad con RFID Blocker Azul", precio: 42.53, categoria: "accesorios", coleccion: "destacados", img: "https://tottobo.vtexassets.com/arquivos/ids/408659/AC51IND943-2526B-ZN0_1.jpg?v=638972837625670000" },
    { id: 24, nombre: "COLLAR HORIZONTE HOMBRE", precio: 53.21, categoria: "accesorios", coleccion: "promociones", img: "https://ilariape.vtexassets.com/arquivos/ids/169902-1200-auto?v=638869817841000000&width=1200&height=auto&aspect=true" }
];

function crearCardProducto(prod) {
    return `
        <div class="product-card">
            <div class="card-image">
                <img src="${prod.img}" alt="${prod.nombre}">
            </div>
            <div class="card-content">
                <h4>${prod.nombre}</h4>
                <p>$${prod.precio.toFixed(2)}</p>
                <a href="#" class="buy-button" data-id="${prod.id}">Comprar</a>
            </div>
        </div>
    `;
}