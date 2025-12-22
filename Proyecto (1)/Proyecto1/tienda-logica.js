// PROTECCIÓN DE ACCESO
if (!localStorage.getItem('usuarioActivo')) {
    window.location.href = 'login.html';
}

// 1. ESTADO GLOBAL Y CONFIGURACIÓN INICIAL
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');
    const titulo = document.getElementById('main-title');
    
    // Carga inicial de productos (Novedades)
    if (container && typeof productos !== 'undefined') {
        const destacados = productos.filter(p => p.coleccion === 'nuevos');
        titulo.textContent = "Novedades de la Semana";
        container.innerHTML = destacados.map(p => crearCardProducto(p)).join('');
    }

    actualizarContador();

    // 2. INICIALIZACIÓN DE FILTROS UNIFICADOS (Punto 1 de optimización)
    aplicarFiltro('.btn-categoria', 'categoria');
    aplicarFiltro('.btn-coleccion', 'coleccion');

    function ejecutarBusqueda() {
        const termino = document.getElementById('input-buscador')
            .value.toLowerCase().trim();

        if (!termino) return;

        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(termino)
        );

        titulo.textContent = `Resultados para: "${termino}"`;
        container.innerHTML = filtrados.length > 0
            ? filtrados.map(p => crearCardProducto(p)).join('')
            : `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                No se encontraron productos.
            </p>`;
    }

    // 3. BUSCADOR FUNCIONAL
    const btnBuscar = document.getElementById('btn-buscar');
    const inputBuscar = document.getElementById('input-buscador');

    if (btnBuscar && inputBuscar) {

        // Click en el icono
        btnBuscar.addEventListener('click', (e) => {
            e.preventDefault();
            ejecutarBusqueda();
        });

        // ENTER desde el teclado
        inputBuscar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                ejecutarBusqueda();
            }
        });
    }


    // 4. ABRIR CARRITO
    const btnCarrito = document.getElementById('abrir-carrito');
    if (btnCarrito) {
        btnCarrito.onclick = (e) => {
            e.preventDefault();
            verPaginaCarrito();
        };
    }

    // 5. EVENTO DELEGADO PARA BOTÓN COMPRAR
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-button')) {
            e.preventDefault();
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        }
    });
});

/**
 * FUNCIÓN UNIFICADA DE FILTRADO
 * Reemplaza la necesidad de categorias.js y colecciones.js
 */
function aplicarFiltro(selector, propiedad) {
    const botones = document.querySelectorAll(selector);
    const container = document.getElementById('product-container');
    const titulo = document.getElementById('main-title');

    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const valor = e.target.getAttribute(`data-${propiedad}`);
            if (!valor) return;

            titulo.textContent = `Explorando ${propiedad}: ${valor.toUpperCase()}`;
            const filtrados = productos.filter(p => p[propiedad] === valor);
            container.innerHTML = filtrados.map(p => crearCardProducto(p)).join('');
            
            // Scroll suave hacia arriba para ver los resultados en móviles
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// --- LÓGICA DEL CARRITO ---

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    mostrarNotificacion(producto.nombre);
    guardarYActualizar();
}

function mostrarNotificacion(nombre) {
    const toast = document.createElement('div');
    toast.className = 'toast-exito';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${nombre} añadido correctamente`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarYActualizar();
    if (document.querySelector('.carrito-container-page')) verPaginaCarrito();
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            guardarYActualizar();
            verPaginaCarrito();
        }
    }
}

function guardarYActualizar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
}

function actualizarContador() {
    const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const countEl = document.getElementById('cart-count');
    if(countEl) countEl.textContent = count;
}

// --- VISTA DEL CARRITO Y FACTURACIÓN ---

function verPaginaCarrito() {
    const mainArticle = document.querySelector('.main article');
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    
    let html = `
        <div class="carrito-container-page">
            <div class="carrito-header-flex">
                <h2><i class="fas fa-shopping-cart"></i> Carrito</h2>
                <button class="btn-cerrar-vista" onclick="location.reload()">&times;</button>
            </div>
    `;

    if (carrito.length === 0) {
        html += `<div class="carrito-vacio"><p>Tu carrito está vacío.</p><button class="btn-success" onclick="location.reload()">Volver a la tienda</button></div>`;
    } else {
        html += `
            <table class="tabla-carrito-pro">
                <thead>
                    <tr><th>Producto</th><th>Precio</th><th>Cant.</th><th>Subtotal</th><th></th></tr>
                </thead>
                <tbody>
                ${carrito.map(item => `
                    <tr>
                        <td data-label="Producto">
                            <div class="celda-producto">
                                <img src="${item.img}"> 
                                <span>${item.nombre}</span>
                            </div>
                        </td>
                        <td data-label="Precio">$${item.precio.toFixed(2)}</td>
                        <td data-label="Cantidad">
                            <div class="controles-cantidad">
                                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                                <span>${item.cantidad}</span>
                                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                            </div>
                        </td>
                        <td data-label="Subtotal">$${(item.precio * item.cantidad).toFixed(2)}</td>
                        <td>
                            <button class="btn-eliminar-pro" onclick="eliminarDelCarrito(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
                </tbody>
            </table>
            <div class="carrito-resumen-pro">
                <h3>Total: $${total.toFixed(2)}</h3>
                <div class="resumen-botones">
                    <button class="btn-danger" onclick="vaciarCarrito()">Vaciar</button>
                    <button class="btn-finalizar" onclick="generarFactura()">Finalizar</button>
                </div>
            </div>`;
    }
    mainArticle.innerHTML = html + `</div>`;
}

function vaciarCarrito() {
    const modal = document.getElementById('modal-confirmacion');
    modal.style.display = 'flex';
    document.getElementById('confirmar-si').onclick = () => {
        carrito = [];
        guardarYActualizar();
        location.reload();
    };
    document.getElementById('confirmar-no').onclick = () => modal.style.display = 'none';
}

function generarFactura() {
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const fecha = new Date().toLocaleDateString();
    const usuario = localStorage.getItem('usuarioActivo') || 'Cliente';

    // Creamos un contenedor tipo Modal para que no rompa el diseño de la tienda
    const modalFactura = document.createElement('div');
    modalFactura.id = "modal-factura-overlay";
    modalFactura.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); display: flex; justify-content: center;
        align-items: center; z-index: 10000; padding: 20px;
    `;

    modalFactura.innerHTML = `
       <div id="factura-print" class="factura">     
            <div style="text-align: center; border-bottom: 2px solid #3498db; margin-bottom: 20px; padding-bottom: 15px;">
                <h1 style="margin: 0; color: #2c3e50; font-size: 28px; letter-spacing: 2px;">UNIQUE FASHION</h1>
                <p style="margin: 5px 0; color: #3498db; font-weight: bold; font-size: 14px;">COMPROBANTE ELECTRÓNICO</p>
            </div>
            <div class="factura-header-info">

                <div>
                    <p style="margin: 2px 0;"><strong>Fecha:</strong> ${fecha}</p>
                    <p style="margin: 2px 0;"><strong>Cliente:</strong> ${usuario}</p>
                </div>

                <div style="text-align: right;">
                    <p style="margin: 2px 0;"><strong>Orden:</strong> #ORD-${Math.floor(Math.random()*9000+1000)}</p>
                    <p style="margin: 2px 0; color: #27ae60;"><strong>Estado:</strong> Completado</p>
                </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="border-bottom: 2px solid #eee; color: #7f8c8d; font-size: 13px;">
                        <th style="text-align: left; padding: 10px 5px;">DESCRIPCIÓN</th>
                        <th style="text-align: center; padding: 10px 5px;">CANT.</th>
                        <th style="text-align: right; padding: 10px 5px;">SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody style="font-size: 14px;">
                    ${carrito.map(item => `
                        <tr style="border-bottom: 1px solid #f9f9f9;">
                            <td style="padding: 12px 5px; color: #2c3e50;">${item.nombre}</td>
                            <td style="padding: 12px 5px; text-align: center;">${item.cantidad}</td>
                            <td style="padding: 12px 5px; text-align: right; font-weight: bold;">$${(item.precio * item.cantidad).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div style="text-align: right; margin-top: 20px; padding-top: 15px; border-top: 1px double #eee;">
                <p style="margin: 0; font-size: 14px; color: #7f8c8d;">Total Neto:</p>
                <h2 style="margin: 5px 0; color: #2c3e50; font-size: 30px;">$${total.toFixed(2)}</h2>
            </div>

            <p style="text-align: center; color: #bdc3c7; font-size: 11px; margin-top: 30px;">
                Gracias por elegir Unique Fashion Store. <br> 
                Este es un documento oficial de compra.
            </p>

            <div id="controles-factura" style="margin-top: 30px; display: flex; gap: 10px; justify-content: center;">
                <button id="btn-pdf-descargar" style="background: #27ae60; color: white; border: none; padding: 12px 20px; border-radius: 30px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 8px; transition: 0.3s;">
                    <i class="fas fa-file-pdf"></i> Descargar en PDF
                </button>
                <button id="btn-pdf-cerrar" style="background: #ecf0f1; color: #2c3e50; border: none; padding: 12px 20px; border-radius: 30px; cursor: pointer; font-weight: bold;">
                    Cerrar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modalFactura);

    // Acción: Cerrar
    document.getElementById('btn-pdf-cerrar').onclick = () => {
        modalFactura.remove();
        location.reload(); // Recarga para vaciar visualmente el carrito
    };

    // Acción: Descargar PDF
    document.getElementById('btn-pdf-descargar').onclick = function() {
        const area = document.getElementById('factura-print');
        const controles = document.getElementById('controles-factura');

        controles.style.visibility = 'hidden'; // Oculta botones sin mover el diseño

        const config = {
            margin: 10,
            filename: `Factura_Unique_${usuario}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(config).from(area).save().then(() => {
            controles.style.visibility = 'visible';
        });
    };
}

/* ==============================
   ACORDEÓN MÓVIL
   ============================== */
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', () => {
        const activo = acc.classList.toggle('active');
        header.setAttribute('aria-expanded', activo);
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('usuarioActivo');
    const emailSpan = document.getElementById('user-email');
    const logoutBtn = document.getElementById('btn-logout');

    if (email && emailSpan) {
        emailSpan.textContent = email;
    }

    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('usuarioActivo');
            localStorage.removeItem('carrito');
            window.location.href = 'login.html';
        };
    }
});
