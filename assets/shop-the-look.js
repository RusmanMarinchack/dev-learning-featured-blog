document.addEventListener('DOMContentLoaded', () => {
    const shopLook = document.querySelectorAll('.shop-look')

    if (shopLook.length >= 1) {
        shopLook.forEach(section => {
            const sectionId = section.getAttribute('id')

            // initialize the slider swiper.
            const shopLookSlider = new Swiper(`#${sectionId} .js-shop-look-slider`, {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: `#${sectionId} .shop-look__swiper-button-next`,
                    prevEl: `#${sectionId} .shop-look__swiper-button-prev`,
                },
                pagination: {
                    el: `#${sectionId} .shop-look__swiper-pagination`,
                    clickable: true
                },
            });


            // We add a class for activity '.shop-look__spot'.
            function handlerSpotActiveSlide() {
                const spots = document.querySelectorAll('.shop-look__spot');

                if (spots.length >= 1) {
                    spots.forEach(spot => {
                        spot.addEventListener('click', function () {
                            const slideIndex = this.dataset.slideIndex;


                            if (this.classList.contains('spot-active')) {
                                this.classList.remove('spot-active')
                            } else {
                                removeActiveClass()
                                this.classList.add('spot-active')
                            }

                            shopLookSlider.slideTo(slideIndex);
                        })
                    })

                    // remove the class '.spot-active' from all elements in '.shop-look__spot'.
                    function removeActiveClass() {
                        spots.forEach(spot => {
                            spot.classList.remove('spot-active')
                        })
                    }
                }
            }
            handlerSpotActiveSlide()

            // We transfer the element to the desired block when adaptive.
            const mql = window.matchMedia("(max-width: 991.98px)")
            function processedForTransferAnotherSection(media) {
                const shopLookContainer = document.querySelector('.shop-look__container')

                if (shopLookContainer) {
                    const shopLookBoxSlider = shopLookContainer.querySelector('.shop-look__box-slider')
                    const title = shopLookContainer.querySelector('.shop-look__title')
                    const shopLookWrapper = shopLookContainer.querySelector('.shop-look__wrapper')
                    const shopLookSlider = shopLookContainer.querySelector('.shop-look__slider')

                    if (media.matches) {
                        shopLookContainer.insertBefore(title, shopLookWrapper)
                    } else {
                        shopLookBoxSlider.insertBefore(title, shopLookSlider)
                    }
                }
            }

            processedForTransferAnotherSection(mql)
            mql.addEventListener('change', processedForTransferAnotherSection)
        })
    }
})