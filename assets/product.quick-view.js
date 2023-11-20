document.addEventListener('DOMContentLoaded', handlerQuickView);
// We cut out the width of the scroll in order to add it for the body and there were no snags when revealing the popup.
const widthScroll = window.innerWidth - document.documentElement.offsetWidth;
function handlerQuickView() {
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
    })

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
}

// A function that opens a popup.
async function handlerClickBtn() {
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
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const newPopupContent = doc.querySelector('.quick-view');

            section.append(newPopupContent);

            const section1 = document.querySelector('.quick-view');

            setTimeout(() => {
                section1.classList.add('active-popup');
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
                let section = document.querySelector('.quick-view');

                if (section.classList.contains('active-popup')) {
                    section.classList.remove('active-popup');
                    document.body.classList.remove('look');
                    document.body.style.paddingRight = `0px`;

                    setTimeout(() => {
                        section.remove();
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

    // When adapting, we move the blocks so that it is as per the design.
    function handlerFlipBlocksOver(media) {
        const innerContent = document.querySelector('.quick-view__inner');

        if (innerContent) {
            const boxInfo = innerContent.querySelector('.quick-view__info-box');
            const boxTitle = innerContent.querySelector('.quick-view__info-title-box');

            if (media.matches) {
                innerContent.insertBefore(boxTitle, innerContent.firstChild);
            } else {
                boxInfo.insertBefore(boxTitle, boxInfo.firstChild);
            }
        }

    }
    handlerFlipBlocksOver(mql);
    mql.addEventListener("change", handlerFlipBlocksOver);
}