document.addEventListener('DOMContentLoaded', handlerQuickView);
// We cut out the width of the scroll in order to add it for the body and there were no snags when revealing the popup.
const widthScroll = window.innerWidth - document.documentElement.offsetWidth;
function handlerQuickView() {
    // Function for formatting the currency into the desired format.
    function formatCurrency(price) {

        const result = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price / 100);

        return result;
    }
    // Slider swiper.
    const quickViewSlider = new Swiper('.quick-view__swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.quick-view__swiper-button-next',
            prevEl: '.quick-view__swiper-button-prev',
        },
        thumbs: {
            swiper: {
                el: '.quick-view__mini-swiper',
                slidesPerView: 6,
                spaceBetween: 8
            }
        }
    });

    // When you click on the button, we call a function that opens a pop-up with the product.
    let btnsOpenQuickView = document.querySelectorAll('.trend-products__popup-link');

    btnsOpenQuickView.forEach(btn => {
        // We delete the event so that no more than one pop-up is added during subsequent clicks
        btn.removeEventListener('click', handlerClickBtn);
        // ==
        btn.addEventListener('click', handlerClickBtn);
    });

    // When clicking, plus minus changes the input value, and if necessary, we add a class for the minus button.
    function handlerCount() {
        const countBox = document.querySelector('.quick-view__item-count-box');

        if (countBox) {
            const plus = document.querySelector('.quick-view__item-plus');
            const minus = document.querySelector('.quick-view__item-minus');
            const count = document.querySelector('.quick-view__item-count');

            count.addEventListener('change', function () {
                if (Number(count.value) !== 1) {
                    minus.classList.remove('disabled');
                } else {
                    minus.classList.add('disabled');
                }

                if (Number(count.value) < 1) {
                    count.value = 1;
                    minus.classList.add('disabled');
                }
            });

            plus.addEventListener('click', function () {
                count.value++;

                if (Number(count.value) !== 1) {
                    minus.classList.remove('disabled');
                }
            });

            minus.addEventListener('click', function () {
                count.value--;

                if (Number(count.value) === 1) {
                    this.classList.add('disabled')
                }
            });

            if (Number(count.value) === 1) {
                minus.classList.add('disabled');
            } else {
                minus.classList.remove('disabled');
            }
        }
    }
    handlerCount();


    // We get json of the product.
    function handlerJsonProduct() {
        const productJson = document.getElementById('product-json');

        if (productJson) {
            const productsObject = JSON.parse(productJson.innerHTML);
            const variantsObject = productsObject.variants;
            const price = document.querySelector('.quick-view__info-price');
            const innerVariant = document.querySelectorAll('.quick-view__info-variant-inner');
            const variantsItem = document.querySelectorAll('.quick-view__info-variant-item');
            // We create a variable and pass the index to the options block.
            let indexInner;

            innerVariant.forEach((inner, index) => {

                const variantsItem = inner.querySelectorAll('.quick-view__info-variant-item');

                variantsItem.forEach(item => {
                    const btnRadio = item.querySelector('.quick-view__info-variant-input');

                    btnRadio.addEventListener('change', () => {
                        // We transfer the index of the block to the change.
                        indexInner = index;
                        handlerRadioBtn(btnRadio.value)

                        // We call a function that deletes the class in options 'disabled'.
                        removeClass()
                        // Let's go through the options.
                        variantsObject.forEach(variant => {

                            if (variant.option1 === btnRadio.value) {
                                const innerVariant = document.querySelectorAll('.quick-view__info-variant-inner');

                                if (innerVariant.length >= 1) {
                                    innerVariant.forEach(inner => {
                                        const variantsItem = inner.querySelectorAll('.quick-view__info-variant-item');

                                        variantsItem.forEach(radioItem => {

                                            const btnRadio = radioItem.querySelector('.quick-view__info-variant-input');
                                            const label = radioItem.querySelector('.quick-view__info-variant-label');

                                            if (btnRadio.value === variant.option2 && variant.available) {
                                                label.classList.remove('disabled')
                                            }
                                        });
                                    });
                                }
                            } else if (variant.option2 === btnRadio.value) {
                                const innerVariant = document.querySelectorAll('.quick-view__info-variant-inner');

                                if (innerVariant.length >= 1) {
                                    innerVariant.forEach(inner => {
                                        const variantsItem = inner.querySelectorAll('.quick-view__info-variant-item');

                                        variantsItem.forEach(radioItem => {

                                            const btnRadio = radioItem.querySelector('.quick-view__info-variant-input');
                                            const label = radioItem.querySelector('.quick-view__info-variant-label');

                                            if (btnRadio.value === variant.option1 && variant.available) {
                                                label.classList.remove('disabled')
                                            }
                                        });
                                    });
                                }

                            }
                        });

                        function removeClass() {
                            innerVariant.forEach((inner, index) => {

                                if (indexInner !== index ) {
                                    const variantsItem = inner.querySelectorAll('.quick-view__info-variant-item');
                                    variantsItem.forEach(radioItem => {
                                        const label = radioItem.querySelector('.quick-view__info-variant-label');
                                        label.classList.add('disabled');
                                    });
                                }
                            });
                        }
                    });
                });
            });



            // A function to process product options and change content depending on the selected options.
            function handlerRadioBtn(inputValue) {
                const radioValue = inputValue;
                let listOption = [];
                let option;
                let radioCheckedColor;

                variantsItem.forEach(radio => {
                    const btnRadio = radio.querySelector('.quick-view__info-variant-input');

                    if (btnRadio.checked) {
                        listOption.push(btnRadio.value);

                        option = listOption.join(' / ');

                        radioCheckedColor = listOption[0];

                        variantsObject.forEach(variant => {
                            if (radioValue === variant.option1) {
                                if (btnRadio.value === variant.option2) {
                                    btnRadio.checked = true;
                                }
                            }

                            if (variant.public_title === option) {
                                price.innerHTML = `₴${formatCurrency(variant.price)}`;
                                activeBtnAddCart(variant.available);

                                // If there is an image, the slider slides to the image.
                                if (variant.featured_image !== null) {
                                    const positionImageSlider = variant.featured_image.position - 1;
                                    quickViewSlider.slideTo(positionImageSlider);
                                }
                            }
                        });
                    }
                });
            }
            // handlerRadioBtn();

            // The function to check whether the product is active and dependencies from this, we make an active button.
            function activeBtnAddCart(available) {
                const btnAddCart = document.querySelector('.quick-view__bottom-btn');
                const btnActive = btnAddCart.dataset.activeLabel;
                const btnNotActive = btnAddCart.dataset.notactiveLabel;

                if (available) {
                    btnAddCart.innerHTML = btnActive;
                    btnAddCart.classList.remove('not-available');
                } else {
                    btnAddCart.innerHTML = btnNotActive;
                    btnAddCart.classList.add('not-available');
                }

            }
        }
    }
    handlerJsonProduct();
}

// A function that opens a popup.
async function handlerClickBtn() {
    const parser = new DOMParser();
    const section = document.querySelector('.trend-products');
    const dataHandle = this.dataset.handle;
    const btnsSpots = document.querySelectorAll('.js-btn-plus');
    const spotsPopup = document.querySelectorAll('.js-popup');
    const mql = window.matchMedia("(max-width: 991.98px)");


    await fetch(`/products/${dataHandle}?view=quick-view`)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
        })
        .then(data => {
            const doc = parser.parseFromString(data, 'text/html');
            const newPopupContent = doc.querySelector('.quick-view');

            document.body.append(newPopupContent);

            const newSection = document.querySelector('.quick-view');
            const newSectionPopupContent = newSection.querySelector('.quick-view__content');

            setTimeout(() => {
                newSection.classList.add('active-popup');
                newSectionPopupContent.classList.add('active-popup');
                document.body.classList.add('look');
                document.body.style.paddingRight = `${widthScroll}px`;
            }, 30)

            handlerQuickView();
        });

    // When clicking on these classes, close the pop-up and remove them from the layout.
    const closePopup = document.querySelectorAll('.js-close');

    if (closePopup.length >= 1) {
        closePopup.forEach(close => {
            close.addEventListener('click', function () {
                const sectionPopup = document.querySelector('.quick-view');
                const newSectionPopupContent = sectionPopup.querySelector('.quick-view__content');

                if (sectionPopup.classList.contains('active-popup')) {
                    sectionPopup.classList.remove('active-popup');
                    newSectionPopupContent.classList.remove('active-popup');
                    document.body.classList.remove('look');
                    document.body.style.paddingRight = `0px`;

                    setTimeout(() => {
                        sectionPopup.remove();
                    }, 1000);

                    btnsSpots.forEach(spot => {
                        spot.classList.remove('spot-active');
                    });

                    spotsPopup.forEach(spot => {
                        spot.classList.remove('popup-active');
                    });
                }
            });
        });
    }

    // When clicking on the content so that the popup does not close.
    const contentPopup = document.querySelector('.quick-view__content');
    contentPopup.addEventListener('click', (e) => e.stopPropagation());
}