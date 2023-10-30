document.addEventListener('DOMContentLoaded', () => {
    const customerReviews = document.querySelectorAll('.customer-reviews');

    if (customerReviews.length >= 1) {
        customerReviews.forEach(section => {
            const sectionId = section.getAttribute('id');

            const customerReviewsSlider = new Swiper(`#${sectionId} .js-customer-reviews-slider`, {
                slidesPerView: 1,
                spaceBetween: 16,
                pagination: {
                    el: '.customer-reviews__swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    991.98: {
                        slidesPerView: 1.5,
                    },
                    1279.98: {
                        slidesPerView: 2,
                    }
                },
                on: {
                    init: function () {
                        if (this.slides.length <= 1) {
                            this.params.spaceBetween = 0;
                        }
                    }
                }
            });
        });
    }
});