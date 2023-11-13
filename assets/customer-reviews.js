document.addEventListener('DOMContentLoaded', () => {
    const customerReviews = document.querySelectorAll('.customer-reviews');

    if (customerReviews.length >= 1) {
        customerReviews.forEach(section => {
            const sectionId = section.getAttribute('id');
            const customerReviewsContent = document.querySelector(`#${sectionId} .customer-reviews__content`);
            const lengthSlideDesktop = customerReviewsContent.dataset.lengthSlide;
            let minMac;
            let table;
            let mobile;

            // Depending on the choice of settings "Reviews layout", we display the number of slides when adaptive.
            if (lengthSlideDesktop === '3') {
                minMac = 3;
                table = 3;
                mobile = 2;
            } else if (lengthSlideDesktop === '2') {
                minMac = 2;
                table = 1.5;
                mobile = 1;
            } else {
                minMac = 1;
                table = 1;
                mobile = 1;
            }

            const customerReviewsSlider = new Swiper(`#${sectionId} .js-customer-reviews-slider`, {
                slidesPerView: 1,
                spaceBetween: 16,
                pagination: {
                    el: '.customer-reviews__swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    767.98: {
                        slidesPerView: mobile,
                    },
                    991.98: {
                        slidesPerView: table,
                    },
                    1279.98: {
                        slidesPerView: minMac,
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