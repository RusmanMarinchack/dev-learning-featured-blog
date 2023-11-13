document.addEventListener('DOMContentLoaded', () => {
    const btnCard = document.querySelector('.minicart-btn');

    if (btnCard) {
        const minicart = document.querySelector('.minicart');
        console.log(btnCard)
        btnCard.addEventListener('click', function() {
            console.log(1)
        });
    }
});