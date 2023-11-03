document.addEventListener('DOMContentLoaded', () => {
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp( "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)" ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const newsletterPopup = document.querySelectorAll('.newsletter-popup');

    if (newsletterPopup.length >= 1) {
        newsletterPopup.forEach(popup => {
            const popupWrapper = popup.querySelector('.newsletter-popup__wrapper');

            if (popupWrapper) {
                const closes = document.querySelectorAll('._close');

                popupWrapper.addEventListener('click', function (e) {
                    e.stopPropagation()
                });

                if (!getCookie('popup')) {
                    setTimeout(() => {
                        popup.classList.add('_active');
                        popupWrapper.classList.add('_active');
                    }, 4000);
                }


                closes.forEach(close => {
                    close.addEventListener('click', function () {
                        if (popup.classList.contains('_active')) {
                            popup.classList.remove('_active');
                            popupWrapper.classList.remove('_active');

                            document.cookie = 'popup=hidden; max-age=10';
                        }
                    });
                });
            }
        });
    }
});