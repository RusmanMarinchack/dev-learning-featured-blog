document.addEventListener('DOMContentLoaded', () => {
    const minicart = document.querySelector('.minicart');
    const btnsClose = document.querySelectorAll('.js-close');

    if (minicart) {
        const btnCard = document.querySelector('.minicart-btn');
        const cartConten = document.querySelector('.minicart__content');
        const cartContenTitle = document.querySelector('.minicart__header-count');
        const btnsAddCard = document.querySelectorAll('.product-form__submit');
        const spanCount = document.querySelector('.minicart-btn-count');
        const miniCartItem = document.querySelectorAll('.minicart__item');
        const productsWrapper = document.querySelector('.minicart__products');


        btnCard.addEventListener('click', function() {
            minicart.classList.add('active-minicart');
            cartConten.classList.add('active-minicart');
        });

        btnsClose.forEach(btn => {
            btn.addEventListener('click', function() {
                minicart.classList.remove('active-minicart');
                cartConten.classList.remove('active-minicart');
            });
        })

        cartConten.addEventListener('click', (e) => e.stopPropagation())


        async function handlerPostFetch(id) {
            let formData = {
                'items': [{
                    'id': id,
                    'quantity': 1
                }]
            };

            await fetch(window.Shopify.routes.root + 'cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())

                .catch((error) => {
                    console.error('Error:', error);
                });
        }


        // We get the basket object.
        async function handlerGetFetch() {
            let dataCart;

            await fetch('/cart.js')
                .then(response => response.json())
                .then(data => dataCart = data)
                .catch((error) => console.error('Error:', error));

            return dataCart;
        }


        btnsAddCard.forEach(btn => {
            btn.addEventListener('click', async function () {
                const dataIdProduct = document.querySelector('.global-media-settings').dataset.mediaId


                await handlerPostFetch(dataIdProduct)
                const dataCart = await handlerGetFetch()

                spanCount.innerText = dataCart.item_count
            });
        });

        if (miniCartItem.length >= 1) {
            miniCartItem.forEach(element => {
                const productId = element.dataset.productId;
                const plus = element.querySelector('.minicart__item-plus');
                const minus = element.querySelector('.minicart__item-minus');
                const count = element.querySelector('.minicart__item-count');
                const btnRemove = element.querySelector('.minicart__item-remove');
                const price = element.querySelector('.minicart__item-prices');

                if (plus && minus) {
                    plus.addEventListener('click', async function () {
                        const dataCart = await handlerGetFetch()

                        // We add the product.
                        dataCart.items.forEach(item => {
                            if (item.id === Number(productId)) {
                                handlerbtns(productId, (item.quantity + 1), element, count);
                            }
                        });
                    });

                    minus.addEventListener('click', async function () {
                        const dataCart = await handlerGetFetch()

                        // We take away the goods
                        dataCart.items.forEach(item => {
                            if (item.id === Number(productId)) {
                                handlerbtns(productId, (item.quantity - 1), element, count);
                            }
                        });
                    });
                }

                if (btnRemove) {
                    btnRemove.addEventListener('click', async function () {
                        const dataCart = await handlerGetFetch()

                        dataCart.items.forEach(item => {
                            if (item.id === Number(productId)) {
                                handlerbtns(productId, 0, element, count);
                            }
                        });
                    });
                }


                // Product subtraction and addition function.
                async function handlerbtns(id, number, product, elementCount) {
                    let dataCart;

                    await fetch(window.Shopify.routes.root + 'cart/change.js', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            {
                                id: id,
                                quantity: number,
                            }
                        ),
                    })
                        .then(response => response.json())
                        .then(data => dataCart = data)
                        .catch(error => {
                            console.error('Помилка з\'єднання:', error);
                        });

                    if (dataCart.item_count === 0) {
                        spanCount.innerText = dataCart.item_count
                        elementCount = dataCart.item_count
                        productsWrapper.innerHTML = '<div class="minicart__item-empty">Your cart is empty</div>';
                        elementCount.innerText = dataCart.item_count;
                        cartContenTitle.innerText = dataCart.item_count;
                    }

                    dataCart.items.forEach(item => {
                        // We update the number of products on the elements.
                        if (item.id === Number(id)) {
                            spanCount.innerText = dataCart.item_count
                            elementCount.innerText = item.quantity;
                            cartContenTitle.innerText = dataCart.item_count;
                            price.innerHTML = (item['final_line_price']);
                        }

                        // remove the element from the DOM tree
                        if (number <= 0) {
                            product.remove();
                            spanCount.innerText = dataCart.item_count
                            elementCount.innerText = item.quantity;
                            cartContenTitle.innerText = dataCart.item_count;
                        }
                    });
                }
            });
        }


        // We add a note.
        function createNotes() {
            const textarea = document.querySelector('.minicart__notes-input');
            const text = localStorage.getItem("note")

            textarea.value = text;
            textarea.addEventListener('change', function () {
                localStorage.setItem("note", this.value)
            })
        }
        createNotes()
    }
});