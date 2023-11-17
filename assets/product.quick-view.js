document.addEventListener('DOMContentLoaded', handelrQuickView);

function handelrQuickView() {
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

    let btnsOpenQuickView = document.querySelectorAll('.trend-products__popup-link');

    btnsOpenQuickView.forEach(btn => {
        btn.removeEventListener('click', handlerClickBtn);
        btn.addEventListener('click', handlerClickBtn);
    });

    // handlerClickBtn()
}

async function handlerClickBtn() {
    const section = document.querySelector('.trend-products');
    const dataHandle = this.dataset.handle;


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
            }, 30)

            handelrQuickView();
        });

    const closePopup = document.querySelectorAll('.js-close');
    const contentPopup = document.querySelector('.quick-view__content');

    if (closePopup.length >= 1) {
        closePopup.forEach(close => {
            close.addEventListener('click', function () {
                let section = document.querySelector('.quick-view');

                if (section.classList.contains('active-popup')) {
                    section.classList.remove('active-popup');
                    setTimeout(() => {
                        section.remove();
                    }, 1000);
                }
            });
        });
    }

    contentPopup.addEventListener('click', (e) => e.stopPropagation());
}