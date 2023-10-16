'use strict'

document.addEventListener("DOMContentLoaded", function () {
    const swiperContainer = document.querySelector('.featured-blog__container')

    if(swiperContainer) {
        let featureBlogSwiper;

        const swiperWrapper = swiperContainer.querySelector('.featured-blog__wrapper')


        function initSwiper() {
            featureBlogSwiper = new Swiper('.featured-blog__container', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: '.featured-blog__swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,

                    },
                    767.98: {
                        slidesPerView: 2,
                    }
                }
            })
        }

        function handlerActiveSliderMob() {
            if (window.innerWidth <= 1023.98) {
                if (!featureBlogSwiper) {
                    initSwiper();
                    // swiperWrapper.classList.add("swiper-wrapper")
                }
            } else {
                if (featureBlogSwiper) {
                    featureBlogSwiper.destroy(true, true);
                    featureBlogSwiper = undefined;
                    // swiperWrapper.classList.remove("swiper-wrapper")
                }
            }
        }

        handlerActiveSliderMob();
        window.addEventListener('resize', handlerActiveSliderMob);
    }

})