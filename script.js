document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn");
    const addBtn = document.getElementById("add-btn");
    const closeModalBtn = document.querySelector('.close-modal-btn');
    let currentProductInput;

    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            currentProductInput = button.previousElementSibling;
            document.querySelector('.modal-quantity-input').value = 1; // Restablecer a 1
            modal.style.display = "block";
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    addBtn.addEventListener('click', () => {
        const quantityInput = document.querySelector('.modal-quantity-input');
        const quantity = parseInt(quantityInput.value);
        currentProductInput.value = quantity;
        modal.style.display = "none";
        updateOrderButton();
    });

    document.querySelector('.modal-increase-btn').addEventListener('click', () => {
        const input = document.querySelector('.modal-quantity-input');
        input.value = parseInt(input.value) + 1;
    });

    document.querySelector('.modal-decrease-btn').addEventListener('click', () => {
        const input = document.querySelector('.modal-quantity-input');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });

    const cancelAlert = document.getElementById("cancel-alert");
    const cancelAlertClose = document.getElementById("cancel-alert-close");
    const cancelYesBtn = document.querySelector(".cancel-yes-btn");
    const cancelNoBtn = document.querySelector(".cancel-no-btn");

    cancelAlertClose.addEventListener('click', () => {
        cancelAlert.style.display = 'none';
    });

    cancelYesBtn.addEventListener('click', () => {
        document.querySelectorAll('.quantity-input').forEach(input => input.value = 0);
        updateOrderButton();
        cancelAlert.style.display = 'none';
    });

    cancelNoBtn.addEventListener('click', () => {
        document.querySelectorAll('.quantity-input').forEach(input => input.value = 1);
        updateOrderButton();
        cancelAlert.style.display = 'none';
    });

    function showCancelAlert() {
        cancelAlert.style.display = 'block';
    }

    function updateOrderButton() {
        const placeOrderBtn = document.querySelector('.place-order-btn');
        const menuItems = document.querySelectorAll('.menu-item');
        let distinctDishCount = 0;

        menuItems.forEach(item => {
            const quantityInput = item.querySelector('.quantity-input');
            if (parseInt(quantityInput.value) > 0) {
                distinctDishCount++;
            }
        });

        placeOrderBtn.textContent = `Realizar Pedido (${distinctDishCount})`;
        if (distinctDishCount > 0) {
            placeOrderBtn.classList.add('active');
        } else {
            placeOrderBtn.classList.remove('active');
        }
    }

    // Bloqueo de zoom en dispositivos móviles solo en la ventana modal
    modal.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    let lastTouchEnd = 0;
    modal.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const deleteModal = document.getElementById("delete-modal");
    const deleteModalClose = document.getElementById("delete-modal-close");
    const closeDeleteModalBtn = document.querySelector('.close-delete-modal-btn');
    const confirmDeleteAlert = document.getElementById("confirm-delete-alert");
    const confirmDeleteAlertClose = document.getElementById("confirm-delete-alert-close");
    const confirmYesBtn = document.querySelector(".confirm-yes-btn");
    const confirmNoBtn = document.querySelector(".confirm-no-btn");
    let currentProductToDelete;

    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (hasProductsInOrder()) {
                const input = button.previousElementSibling;
                if (parseInt(input.value) > 0) {
                    input.value = parseInt(input.value) - 1;
                    if (parseInt(input.value) === 0) {
                        showDeleteModal();
                    }
                } else {
                    showDeleteModal();
                }
            }
        });
    });

    deleteModalClose.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    closeDeleteModalBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    confirmDeleteAlertClose.addEventListener('click', () => {
        confirmDeleteAlert.style.display = 'none';
    });

    confirmYesBtn.addEventListener('click', () => {
        const quantityInput = currentProductToDelete.querySelector('.quantity-input');
        quantityInput.value = parseInt(quantityInput.value) - 1;
        if (parseInt(quantityInput.value) < 0) {
            quantityInput.value = 0;
        }
        confirmDeleteAlert.style.display = 'none';
        updateOrderButton();
    });

    confirmNoBtn.addEventListener('click', () => {
        confirmDeleteAlert.style.display = 'none';
    });

    function showDeleteModal() {
        deleteModal.style.display = 'block';
        const productList = document.getElementById("product-list");
        productList.innerHTML = '';
        document.querySelectorAll('.menu-item').forEach(item => {
            const quantityInput = item.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                for (let i = 1; i <= quantity; i++) {
                    const productButton = document.createElement('button');
                    productButton.textContent = `${item.querySelector('h3').textContent} ${i}`;
                    productButton.addEventListener('click', () => {
                        currentProductToDelete = item;
                        document.getElementById('delete-product-name').textContent = productButton.textContent;
                        confirmDeleteAlert.style.display = 'block';
                        deleteModal.style.display = 'none';
                    });
                    productList.appendChild(productButton);
                }
            }
        });
    }

    function hasProductsInOrder() {
        const totalQuantity = Array.from(document.querySelectorAll('.quantity-input'))
            .reduce((acc, input) => acc + parseInt(input.value), 0);
        return totalQuantity > 0;
    }

    function updateOrderButton() {
        const placeOrderBtn = document.querySelector('.place-order-btn');
        const menuItems = document.querySelectorAll('.menu-item');
        let distinctDishCount = 0;

        menuItems.forEach(item => {
            const quantityInput = item.querySelector('.quantity-input');
            if (parseInt(quantityInput.value) > 0) {
                distinctDishCount++;
            }
        });

        placeOrderBtn.textContent = `Realizar Pedido (${distinctDishCount})`;
        if (distinctDishCount > 0) {
            placeOrderBtn.classList.add('active');
        } else {
            placeOrderBtn.classList.remove('active');
        }
    }

    // Bloqueo de zoom en dispositivos móviles solo en la ventana modal de eliminación
    deleteModal.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    let lastTouchEndDelete = 0;
    deleteModal.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEndDelete <= 300) {
            event.preventDefault();
        }
        lastTouchEndDelete = now;
    }, false);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const filterLinks = document.querySelectorAll('.filter-menu .filter');
    const sections = document.querySelectorAll('.menu-items-section');

    filterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const filter = event.target.getAttribute('data-filter');

            // Remover la clase active de todas las secciones primero
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Aplicar la clase active solo a la sección correspondiente
            if (filter === '*') {
                document.getElementById('todos-los-platos').classList.add('active');
            } else {
                document.querySelector(filter).classList.add('active');
            }

            // Actualizar la clase active en los enlaces de filtro
            filterLinks.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        });
    });

    // Mostrar solo "Todos los platos" por defecto
    sections.forEach(section => {
        if (section.id === 'todos-los-platos') {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    // Bloqueo de zoom en dispositivos móviles
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const placeOrderBtn = document.querySelector('.place-order-btn');

    placeOrderBtn.addEventListener('click', () => {
        const totalQuantity = Array.from(document.querySelectorAll('.quantity-input'))
            .reduce((acc, input) => acc + parseInt(input.value), 0);

        if (totalQuantity > 0) {
            redirectToOrderSummary();
        } else {
            alert('No hay productos en el pedido.');
        }
    });

    function redirectToOrderSummary() {
        const menuItems = document.querySelectorAll('.menu-item');
        const orderItems = [];

        menuItems.forEach(item => {
            const quantityInput = item.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                const itemName = item.querySelector('h3').textContent;
                const itemPrice = item.querySelector('.menu-item-price').textContent;
                orderItems.push({ name: itemName, quantity: quantity, price: itemPrice });
            }
        });

        const queryString = orderItems.map(item => `name=${encodeURIComponent(item.name)}&quantity=${item.quantity}&price=${encodeURIComponent(item.price)}`).join('&');
        window.location.href = `pedido.html?${queryString}`;
    }

   
});

