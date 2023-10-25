document.addEventListener('DOMContentLoaded', () => {
    const trendProducts = document.querySelectorAll('.trend-products');

    if(trendProducts.length >= 1) {
        trendProducts.forEach(section => {
            const sectionId = section.getAttribute('id');
            let mql = window.matchMedia("(max-width: 767px)");
            let trendProductsSlider;
            function sliderInit() {
                trendProductsSlider = new Swiper(`#${sectionId} .js-trend-products-slider`, {
                    spaceBetween: 20,

                })
            }

            function handlerSliderActiveMob(media) {

                if (media.matches) {
                    if (!trendProductsSlider) {
                        sliderInit()
                    }
                } else {
                    if (trendProductsSlider) {
                        trendProductsSlider.destroy(true, true)
                        trendProductsSlider = undefined
                    }
                }
            }

            handlerSliderActiveMob(mql)
            mql.addEventListener('change', handlerSliderActiveMob)

            function handlerSpotActive() {
                const spots = document.querySelectorAll(`#${sectionId} .trend-products__btn-plus`);

                if (spots.length >= 1) {
                    spots.forEach(spot => {
                        spot.addEventListener('click', function () {
                            const popup = this.closest('.trend-products__box-spot').querySelector('.trend-products__popup');

                            if (this.classList.contains('spot-active')) {
                                this.classList.remove('spot-active');
                                popup.classList.remove('popup-active');
                            } else {
                                removeActiveClass();
                                this.classList.add('spot-active');
                                popup.classList.add('popup-active');
                            }
                        });
                    });

                    // remove the class '.spot-active' from all elements in '.shop-look__spot'.
                    function removeActiveClass() {
                        spots.forEach(spot => {
                            const popup = spot.closest('.trend-products__box-spot').querySelector('.trend-products__popup')

                            spot.classList.remove('spot-active');
                            popup.classList.remove('popup-active');
                        });
                    }
                }
            }
            handlerSpotActive();

            // Read the spot position so that the popup does not go beyond the frame.
            function  handlerPositionSpots() {
                const trendProductsItem = document.querySelectorAll('.trend-products__item')

                if (trendProductsItem.length >= 1) {
                    trendProductsItem.forEach(item => {
                        const itemHeight = item.clientHeight;
                        const itemWidth = item.clientWidth;
                        const spots = item.querySelectorAll('.trend-products__box-spot');

                        spots.forEach((spot) => {
                            const popup = spot.querySelector('.trend-products__popup');
                            const popupHeight = popup.clientHeight;
                            const spotTop = spot.offsetTop;
                            // const spotLeft = spot.offsetLeft

                            if (spotTop <= popupHeight) {
                                popup.classList.add('popup-down')
                            } else {
                                popup.classList.remove('popup-down')
                            }
                        })
                    })
                }
            }
            handlerPositionSpots();

        });
    }
});