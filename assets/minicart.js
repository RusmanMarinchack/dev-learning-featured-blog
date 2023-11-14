document.addEventListener('DOMContentLoaded', () => {
    const minicart = document.querySelector('.minicart');

    if (minicart) {
        const btnCard = document.querySelector('.minicart-btn');
        const cartContent = minicart.querySelector('.minicart__content');

        btnCard.addEventListener('click', function() {
            minicart.classList.add('active-minicart');
            cartContent.classList.add('active-minicart');
        });

        minicart.addEventListener('click', function() {
            minicart.classList.remove('active-minicart');
            cartContent.classList.remove('active-minicart');
        });
    }
});