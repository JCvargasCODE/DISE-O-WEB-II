document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Actualizar contador del icono al cargar
    updateCartCount();

    // 1. Lógica para añadir productos (index.html)
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            const existingProduct = cart.find(item => item.id === id);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            saveCart();
            updateCartCount();
            alert(`${name} añadido al carrito`);
        });
    });

    // 2. Lógica para mostrar y gestionar el carrito (carrito.html)
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
                        ${item.quantity}
                        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
                    </td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td><button onclick="removeFromCart('${item.id}')" style="background:none; border:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button></td>
                </tr>
            `;
        });

        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    }

    // Funciones globales para botones dinámicos
    window.changeQty = (id, delta) => {
        const product = cart.find(item => item.id === id);
        if (product) {
            product.quantity += delta;
            if (product.quantity <= 0) {
                removeFromCart(id);
            } else {
                saveCart();
                renderCart();
                updateCartCount();
            }
        }
    };

    window.removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
        updateCartCount();
    };

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const countElement = document.getElementById('cart-count');
        if (countElement) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            countElement.textContent = totalItems;
        }
    }
});