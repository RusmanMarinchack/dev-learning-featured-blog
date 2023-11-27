document.addEventListener('DOMContentLoaded', handlerSearch);

function handlerSearch() {
    const headerBtnSearch = document.querySelector('.predictive-search1__btn');

    if (headerBtnSearch) {
        // Function to open the search window and close it.
        function handlerSearchPopup() {
            headerBtnSearch.addEventListener('click', () => {
                const shadow = document.querySelector('.js-shadow');

                if (shadow) {
                    const content = shadow.querySelector('.js-search-content');
                    const btnCloses = document.querySelectorAll('.js-close');

                    shadow.classList.add('active-search');
                    content.classList.add('active-search');

                    btnCloses.forEach(close => {
                        close.addEventListener('click', function () {
                            shadow.classList.remove('active-search');
                            content.classList.remove('active-search');
                        });
                    });

                    content.addEventListener('click', (e) => e.stopPropagation());
                }
            });
        }
        handlerSearchPopup();


        function handlerFormSearch() {
            const boxForm = document.querySelector('.predictive-search1__box-form');

            if (boxForm) {
                const formSearch = document.querySelector('.predictive-search1__form');
                const inputSearch = document.querySelector('#predictive-search1-input');

                async function handlerFormSubmit(e) {
                    e.preventDefault();
                    await handlerFetchGetLayout(inputSearch.value);
                }

                formSearch.addEventListener('submit', handlerFormSubmit);
            }
        }
        handlerFormSearch();

        async function handlerFetchGetLayout(searchValue) {
            const result = document.querySelector('.js-tabs-result');

            if (searchValue !== '') {
                await fetch(`/search/suggest?q=${searchValue}&section_id=predictive-search-1`)
                    .then((response) => response.text())
                    .then((text) => {
                        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('.js-tabs-result').innerHTML;
                        result.innerHTML = resultsMarkup;
                        handlerTabs()
                    })
                    .catch((error) => {
                        throw error;
                    });
            } else {
                result.innerHTML = '';
            }



            // await fetch(`/search/suggest.json?q=${searchValue}`)
            //     .then((response) => response.json())
            //     .then((text) => {
            //         console.log(text)
            //     })
            //     .catch((error) => {
            //         throw error;
            //     });
        }

        // Let's make tabs.
        function handlerTabs() {
            const tabsBox = document.querySelector('.js-tabs-result');

            if (tabsBox) {
                const headerBtns = tabsBox.querySelectorAll('.js-tabs-btn');
                if (headerBtns.length >= 1) {
                    headerBtns.forEach(btn => {
                        btn.addEventListener("click", function () {
                            handlerTabBtns()
                        });

                        function handlerTabBtns() {
                            setTimeout(() => {
                                console.log(btn.classList.contains('tab-active'))
                            }, 1000)
                            if (btn.classList.contains('tab-active')) {
                                const tabIndex = btn.dataset.indexTab;
                                console.log(tabIndex)
                                const tabBody = document.querySelector(`.js-tabs-body--${tabIndex}`);

                                tabBody.classList.add('tab-active');
                            }
                        }
                        handlerTabBtns();
                    });
                }
            }
        }
        handlerTabs();
    }
}