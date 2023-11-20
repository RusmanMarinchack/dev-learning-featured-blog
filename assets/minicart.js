document.addEventListener('DOMContentLoaded', createFunctionalMinicart);

const widthScroll = window.innerWidth - document.documentElement.offsetWidth
function createFunctionalMinicart() {
    const minicart = document.querySelector('.minicart');
    const btnsClose = document.querySelectorAll('.js-close');

    if (minicart) {
        const btnCard = document.querySelector('.minicart-btn');
        const cartConten = document.querySelector('.minicart__content');
        const miniCartItem = document.querySelectorAll('.minicart__item');
        const btnsAddCard = document.querySelectorAll('.product-form__submit');
        const spanCount = document.querySelector('.minicart-btn-count');

        // When clicking on the basket icon, we add classes for elements and open a popup.
        btnCard.addEventListener('click', function() {
            minicart.classList.add('active-minicart');
            cartConten.classList.add('active-minicart');
            document.body.classList.add('look');
            document.body.style.paddingRight = `${widthScroll}px`;
        });

        // When clicking on a shadow or a cross, we delete the classes and close the popup.
        btnsClose.forEach(btn => {
            btn.addEventListener('click', function() {
                minicart.classList.remove('active-minicart');
                cartConten.classList.remove('active-minicart');
                document.body.classList.remove('look');
                document.body.style.paddingRight = `0px`;
            });
        })

        // So that the pop-up does not close when you click on the pop-up content.
        cartConten.addEventListener('click', (e) => e.stopPropagation())


        async function handlerPostFetch(id) {
            await fetch(window.Shopify.routes.root + 'cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': id,
                    'quantity': 1
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
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
                getSectionMinicart()
                const dataCart = await handlerGetFetch()

                spanCount.innerText = dataCart.item_count
            });
        });

        if (miniCartItem.length >= 1) {
            miniCartItem.forEach((element, index) => {
                const productId = element.dataset.productId;
                const plus = element.querySelector('.minicart__item-plus');
                const minus = element.querySelector('.minicart__item-minus');
                const btnRemove = element.querySelector('.minicart__item-remove');
                const inputCount = element.querySelector('.minicart__item-count');
                const preloader = element.querySelector('.minicart__item-preloader');

                if (plus && minus && inputCount) {
                    inputCount.addEventListener('change',  async function () {

                        preloader.classList.add('hidden');
                        const dataCart = await handlerGetFetch();

                        dataCart.items.forEach(item => {
                            if (item.id === Number(productId)) {
                                handlerbtns(productId, this.value, index);
                            }
                        });
                    });

                    // // We add the product.
                    plus.addEventListener('click', async function () {
                        preloader.classList.add('hidden');
                        const dataCart = await handlerGetFetch();

                        dataCart.items.forEach(item => {
                            if (item.id === Number(productId)) {
                                handlerbtns(productId, (item.quantity + 1), index);
                            }
                        });
                    });

                    // We subtract this.
                    minus.addEventListener('click', async function () {
                        preloader.classList.add('hidden');
                        const dataCart = await handlerGetFetch();

                        // We take away the goods
                        dataCart.items.forEach(item => {
                            if (item.id === Number(productId)) {
                                handlerbtns(productId, (item.quantity - 1), index);
                            }
                        });
                    });
                }

                if (btnRemove) {
                    // We remove the product.
                    btnRemove.addEventListener('click', async function () {
                        preloader.classList.add('hidden');
                        const dataCart = await handlerGetFetch();

                        dataCart.items.forEach(item => {
                            if (item.id === Number(productId)) {
                                handlerbtns(productId, 0, index);
                            }
                        });
                    });
                }


                // Product subtraction and addition function.
                async function handlerbtns(id, number, i) {
                    let dataCart;

                    await fetch(window.Shopify.routes.root + 'cart/change.js', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'id': id,
                            'quantity': number
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.message) {
                                getSectionMinicart(i, data.message);

                            } else {
                                dataCart = data;
                                getSectionMinicart();
                            }

                            spanCount.innerText = dataCart.item_count;
                            preloader.classList.remove('hidden');
                        })
                        .catch(error => {
                            console.log('Помилка з\'єднання:', error.message);
                        });
                }
            });
        }


        // We get an updated layout of the section.
        async function getSectionMinicart(i = null, message = '') {
            let section;

            await fetch('/?sections=minicart')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Помилка запиту: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Обробка отриманих даних
                    section = data.minicart;
                })
                .catch(error => {
                    console.error('Помилка з\'єднання:', error);
                });

            const parser = new DOMParser();
            const doc = parser.parseFromString(section, 'text/html');

            const newMinicart = doc.querySelector('#minicart .minicart__content');
            const content = minicart.querySelector('.minicart__content')

            // We update the content on a regular basis.
            content.innerHTML = newMinicart.innerHTML;

            // We derive an error for the product that there are no such quantities of products.
            if (i !== null) {
                const blockMessage = document.querySelectorAll('.minicart__item-message')[i];
                blockMessage.classList.add('error');
                blockMessage.innerText = message;
            }

            // We call the function so that the functionality works
            createFunctionalMinicart();
        }


        // We add a note.
        async function createNotes() {
            const textarea = document.querySelector('.minicart__notes-input');
            const dataCart = await handlerGetFetch();

            textarea.value = dataCart.note;
            textarea.addEventListener('change', async function () {

                const response = await fetch('/cart/update.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'note=' + encodeURIComponent(this.value),
                });

                if (response.ok) {
                    console.log('Примітка оновлена.');
                } else {
                    console.error('Помилка примітки кошика:', response.statusText);
                }
            });
        }
        createNotes();


        // Function for opening and closing a note.
        function handlerBtnNote() {
            const notesBox = document.querySelector('.minicart__notes-box');

            if (notesBox) {
                const noteBtn = notesBox.querySelector('.minicart__notes-btn');
                const noteBtnPlus = notesBox.querySelector('.ninicart__notes-plus');
                const noteBody = notesBox.querySelector('.minicart__notes-body');

                // Shows and hides the contents of my note when clicked.
                noteBtn.addEventListener('click', function () {
                    const noteBodyHeight = noteBody.scrollHeight;

                    if (noteBtnPlus.classList.contains('active')) {
                        noteBtnPlus.classList.remove('active');
                        noteBody.style.height = `0px`;
                    } else {
                        noteBtnPlus.classList.add('active');
                        noteBody.style.height = `${noteBodyHeight}px`;
                    }
                });
            }
        }
        handlerBtnNote();
    }
}