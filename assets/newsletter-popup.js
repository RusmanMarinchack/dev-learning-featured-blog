document.addEventListener('DOMContentLoaded', () => {
    const newsletterPopup = document.querySelectorAll('.newsletter-popup');

    // We get the value of the cookie.
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp( "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)" ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    if (newsletterPopup.length >= 1) {
        newsletterPopup.forEach(popup => {
            const popupWrapper = popup.querySelector('.newsletter-popup__wrapper');
            const popupGratitude = popup.querySelector('.gratitude__messages');
            const popupError = popup.querySelector('.newsletter-popup__form-error');
            const cookieTime = popupWrapper.dataset.cookieTime;
            const date = new Date;
            let time;


            // Assign the desired date of the cookie, which is selected from the settings.
            if (cookieTime === '1 year') {
                time = new Date(date.setFullYear(date.getFullYear() + 1));
            } else if (cookieTime === '3 month') {
                time = new Date(date.setMonth(date.getMonth() + 3));
            } else if (cookieTime === '1 month') {
                time = new Date(date.setMonth(date.getMonth() + 1));
            } else if (cookieTime === '1 week') {
                time = new Date(date.setTime(date.getTime() + (24 * 60 * 60 * 1000 * 7)));
            } else {
                time = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
            }

            if (popupWrapper) {
                const closes = document.querySelectorAll('.js-close');

                popupWrapper.addEventListener('click', function (e) {
                    e.stopPropagation()
                });

                // We open a popup when the page is loaded.
                if (!getCookie('popup')) {
                    setTimeout(() => {
                        popup.classList.add('active');
                        popupWrapper.classList.add('active');
                    }, 4000);
                }

                // We also pop up when there is an error or a thank you message.
                if (popupGratitude || popupError) {
                    popup.classList.add('active');
                    popupWrapper.classList.add('active');
                }

                // We delete the class of active.
                closes.forEach(close => {
                    close.addEventListener('click', function (e) {
                        e.preventDefault();

                        if (popup.classList.contains('active')) {
                            popup.classList.remove('active');
                            popupWrapper.classList.remove('active');
                        }

                        if (popupGratitude || popupError) {
                            window.location.href = '/';
                        }

                        // We record cookies.
                        document.cookie = `popup=${cookieTime}; expires="${time}"`;
                    });
                });
            }

            // A function to remove cookie.
            function deleteCookie(name) {
                setCookie(name, "", {
                    'max-age': -1
                })
            }

            // A function to edite cookie, with the help of this function, we delete the cookie value.
            function setCookie(name, value, options = {}) {

                if (options.expires instanceof Date) {
                    options.expires = options.expires.toUTCString();
                }

                let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

                for (let optionKey in options) {
                    updatedCookie += "; " + optionKey;
                    let optionValue = options[optionKey];
                    if (optionValue !== true) {
                        updatedCookie += "=" + optionValue;
                    }
                }

                document.cookie = updatedCookie;
            }

            // Delete the cookie values if they are not valid.
            if (cookieTime !== getCookie("popup") || popupError) {
                deleteCookie("popup");
            }
        });
    }
});