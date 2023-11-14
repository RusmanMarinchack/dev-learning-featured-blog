document.addEventListener('DOMContentLoaded', () => {
    const minicart = document.querySelector('.minicart');

    if (minicart) {
        const btnCard = document.querySelector('.minicart-btn');
        const cartContent = minicart.querySelector('.minicart__content');
        const btnsAddCard = document.querySelectorAll('.product-form__submit');
        const spanCount = document.querySelector('.minicart-btn-count');
        const miniCartItem = document.querySelectorAll('.minicart__item');

        btnCard.addEventListener('click', function() {
            minicart.classList.add('active-minicart');
            cartContent.classList.add('active-minicart');
        });

        minicart.addEventListener('click', function() {
            minicart.classList.remove('active-minicart');
            cartContent.classList.remove('active-minicart');
        });

        cartContent.addEventListener('click', (e) => e.stopPropagation())


        function handlerPostFetch() {
            let formData = {
                'items': [{
                    'id': 41056062046262,
                    'quantity': 1
                }]
            };

            fetch(window.Shopify.routes.root + 'cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    handlerGetFetch()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        async function handlerGetFetch() {
            let dataCart;

            await fetch('/cart.js')
                .then(response => response.json())
                .then(data => dataCart = data)
                .catch((error) => console.error('Error:', error));

            spanCount.innerText = dataCart.item_count;
        }

        btnsAddCard.forEach(btn => {
            btn.addEventListener('click', async function () {

                await handlerPostFetch()
            });
        });

        if (miniCartItem.length >= 1) {
            miniCartItem.forEach(item => {
                const productId = Number(item.dataset.productId);
                const plus = item.querySelector('.minicart__item-plus');
                const minus = item.querySelector('.minicart__item-minus');
                console.log(productId);

                // handlerPostFetch(productId)
                plus.addEventListener('click', async function () {
                    await fetch(window.Shopify.routes.root + 'cart/add.js', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'items': [{
                                'id': productId,
                                'quantity': -1
                            }]
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        handlerGetFetch()
                    })

                })



            });
        }
    }
});