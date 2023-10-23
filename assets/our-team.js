let added = false

document.addEventListener('DOMContentLoaded', () => {
    if(added) {
        return;
    }
    // We make an active slider on mobile devices in the block .our-team__container
    const ourTeam = document.querySelectorAll('.our-team');

    if (ourTeam.length >= 1) {
        added = true;
        ourTeam.forEach(section => {
            const sectionId = section.getAttribute('id');
            const mdl = window.matchMedia("(max-width: 1023.98px)");
            let teamSlide;

            function initSlider() {
                teamSlide = new Swiper(`#${sectionId} .js-our-team-slider`, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: `#our-team__swiper-pagination-${sectionId}`,
                        clickable: true
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,

                        },
                        576: {
                            slidesPerView: 2,
                        }
                    }
                })
            }

            function handlerSliderMob(media) {
                if (media.matches) {
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


            handlerSliderMob(mdl)
            mdl.addEventListener('change', handlerSliderMob)
        })


        // We make a function to open a pop-up, this function will also work for all pop-ups with this string HTML.
         function activePopup() {
             let popupBtn = document.querySelectorAll('.js-popup-btn')

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

                                 let popupShadow = popup.closest('.popup-shadow')

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
    }
})