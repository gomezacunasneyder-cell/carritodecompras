const productos = [
    { id: 1, nombre: "Manzanas", precio: 2.50, categoria: "Frutas" },
    { id: 2, nombre: "Leche", precio: 3.20, categoria: "Lácteos" },
    { id: 3, nombre: "Pan", precio: 1.80, categoria: "Panadería" },
    { id: 4, nombre: "Queso", precio: 5.00, categoria: "Lácteos" },
    { id: 5, nombre: "Tomates", precio: 2.00, categoria: "Verduras" },
    { id: 6, nombre: "Huevos", precio: 4.50, categoria: "Lácteos" },
    { id: 7, nombre: "Arroz", precio: 3.00, categoria: "Granos" },
    { id: 8, nombre: "Aceite", precio: 6.00, categoria: "Aceites" }
];

let carrito = [];
function mostrarProductos() {
    const productosLista = document.getElementById("productosLista");
    productosLista.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "producto-card";

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;

        productosLista.appendChild(div);
    });
}
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    
    const productoEnCarrito = carrito.find(p => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}
function actualizarCarrito() {
    const carritoLista = document.getElementById("carritoLista");
    
    if (carrito.length === 0) {
        carritoLista.innerHTML = "<p>El carrito está vacío</p>";
        document.getElementById("totalPrecio").innerText = "0.00";
        document.getElementById("totalCantidad").innerText = "0";
        return;
    }

    carritoLista.innerHTML = "";

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.className = "carrito-item";

        div.innerHTML = `
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p>Precio: $${item.precio.toFixed(2)} x ${item.cantidad}</p>
            </div>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;

        carritoLista.appendChild(div);
    });

    calcularTotales();
}
function calcularTotales() {
    const totalPrecio = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);
    
    const totalCantidad = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);

    document.getElementById("totalPrecio").innerText = totalPrecio.toFixed(2);
    document.getElementById("totalCantidad").innerText = totalCantidad;
}
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}
document.addEventListener('DOMContentLoaded', function() {
    mostrarProductos();
    actualizarCarrito();

    const btnLimpiar = document.getElementById("limpiarCarrito");
    btnLimpiar.addEventListener("click", limpiarCarrito);
});

function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
}