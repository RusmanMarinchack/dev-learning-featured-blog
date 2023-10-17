'use strict'

document.addEventListener('DOMContentLoaded', () => {
    // We make an active slider on mobile devices in the block .out-team__container
    const sliderContent = document.querySelector('.out-team__container')

    if (sliderContent) {
        let teamSlide

        function initSlider() {
            teamSlide = new Swiper('.out-team__container', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: '.out-team__swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,

                    },
                    575.98: {
                        slidesPerView: 2,
                    }
                }
            })
        }

        function handlerActiveSlider() {
            if (window.innerWidth <= 1023.98) {
                if (!teamSlide) {
                    initSlider();
                }
            } else {
                if (teamSlide) {
                    teamSlide.destroy(true, true);
                    teamSlide = undefined;
                }
            }
        }

        handlerActiveSlider()
        window.addEventListener('resize', handlerActiveSlider)
    }


    // We make a function to open a pop-up, this function will also work for all pop-ups with this string HTML.
    function activePopup() {
        let popupBtn = document.querySelectorAll('._popup-btn')

        if(popupBtn.length > 0) {
            popupBtn.forEach(btn => {
                btn.addEventListener('click', function() {
                    let widthScroll = window.innerWidth - document.documentElement.offsetWidth
                    let idPopup = this.dataset.id

                    if(idPopup) {
                        let popup = document.querySelector(`#${idPopup}`)

                        if(popup) {
                            popup.classList.add('active')
                            document.body.classList.add('look')
                            document.body.style.marginRight = `${widthScroll}px`

                            let btnClose = popup.querySelector('.popup-team__close')

                            popup.addEventListener('click', function(e) {
                                e.stopPropagation()
                            })

                            let popupShadow = popup.parentNode

                            if(popupShadow) {
                                popupShadow.classList.add('active')

                                popupShadow.addEventListener('click', popupHidden)
                                btnClose.addEventListener('click', popupHidden)

                                function popupHidden() {
                                    popupShadow.classList.remove('active')
                                    popup.classList.remove('active')
                                    document.body.classList.remove('look')
                                    document.body.style.marginRight = `0px`
                                }
                            }
                        }
                    }
                })
            })
        }
    }
    activePopup()
})