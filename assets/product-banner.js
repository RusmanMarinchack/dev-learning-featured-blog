document.addEventListener("DOMContentLoaded", () => {
    // Background slider.
    const bgSlider = new Swiper('.js-bg-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 1000,
        effect: 'fade',
        allowTouchMove: false,
    });
    // Product slider.
    const productSlider = new Swiper('.js-product-swiper', {
        spaceBetween: 10,
        slidesPerView: 1,
        autoHeight: true,
        navigation: {
            nextEl: '.product-banner__product-button-next',
            prevEl: '.product-banner__product-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        on: {
            slideChange() {
                // We call the function when changing slides and pass the slider.
                handlerSliders(this);
            }
        }
    });

    // Background slider processing function.
    function handlerSliders(slider) {
        // We transfer it to the slider in the background and flip it.
        bgSlider.slideTo(slider.activeIndex);

        const bgSlides = document.querySelectorAll('.product-banner__bg-swiper-slide');

        if (bgSlides.length >= 1) {
            // When you click the slider, we pause all videos.
            videoPause();

            bgSlides.forEach(slide => {

                // If the slide is active, start the video in it.
                if (slide.classList.contains('swiper-slide-active')) {
                    const videoActive = slide.querySelector('.product-banner__bg-video');

                    if (videoActive) {
                        videoActive.play();
                    }
                }
            });

            // We pause all videos.
            function videoPause() {
                bgSlides.forEach(slide => {
                    const video = slide.querySelector('.product-banner__bg-video');

                    if (video) {
                        video.pause();
                    }
                });
            }
        }
    }
    // We turn on the function so that after downloading the video, playback begins and pass the slider to the function.
    handlerSliders(productSlider);
});