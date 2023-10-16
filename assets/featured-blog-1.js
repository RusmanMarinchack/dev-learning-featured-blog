'use strict'

document.addEventListener("DOMContentLoaded", function () {
    const mql = window.matchMedia("(max-width: 1023.98px)");
    const swiperContainer = document.querySelector('.featured-blog__container')
    let featureBlogSwiper;

    if(swiperContainer) {
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

        function activeSliderMob(e) {
            if(e.matches) {
                if (!featureBlogSwiper) {
                    initSwiper();
                }
            } else {
                if (featureBlogSwiper) {
                    featureBlogSwiper.destroy(true, true);
                    featureBlogSwiper = undefined;
                }
            }
        }

        mql.addEventListener('change', activeSliderMob)
        activeSliderMob(mql)
    }

})