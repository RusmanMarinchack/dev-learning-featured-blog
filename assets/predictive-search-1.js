document.addEventListener('DOMContentLoaded', handlerSearch);

function handlerSearch() {
    const headerBtnSearch = document.querySelector('.predictive-search1__btn');

    if (headerBtnSearch) {
        // We get a spinner and during search when we wait for data we show it when we get data we hide it.
        const preloader = document.querySelector('.predictive-search1__results-preloader');

        // Function to open the search window and close it.
        function handlerSearchPopup() {
            headerBtnSearch.addEventListener('click', () => {
                const shadow = document.querySelector('.js-shadow');

                if (shadow) {
                    const content = shadow.querySelector('.js-search-content');
                    const btnCloses = document.querySelectorAll('.js-close');

                    shadow.classList.add('active-search');
                    content.classList.add('active-search');
                    document.body.classList.add('look');

                    btnCloses.forEach(close => {
                        close.addEventListener('click', function () {
                            shadow.classList.remove('active-search');
                            content.classList.remove('active-search');
                            document.body.classList.remove('look');
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
                const wrapperResult = document.querySelector('.js-tabs-result')

                inputSearch.addEventListener('input', async function () {
                    // wrapperResult.innerHTML = '';
                    // We start the spinner.
                    preloader.classList.add('preloader-active');
                    await handlerFetchGetLayout(this.value);
                });
            }
        }
        handlerFormSearch();

        async function handlerFetchGetLayout(searchValue) {
            const content = document.querySelector('.js-search-content');
            const result = document.querySelector('.js-tabs-result');

            // We set a minimum height for the search content so that the height is not greater than the content.
            content.style.minHeight = '0';

            if (searchValue !== '') {
                await fetch(`/search/suggest?q=${searchValue}&section_id=predictive-search-1`)
                    .then((response) => response.text())
                    .then((text) => {
                        // We get the page from the server, convert it page DOM element and get the desired element in the element.
                        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('.js-tabs-result');
                        // We receive a block with a message that is displayed if there is no result.
                        const messageNoResult = resultsMarkup.querySelector('.predictive-search1__no-result');

                        // We change the content of the search result.
                        result.innerHTML = resultsMarkup.innerHTML;

                        const tabsBtns1 = document.querySelectorAll('.js-tabs-btn');
                        tabsBtns1.forEach((btn, index) => {
                            if (btn.classList.contains('tab-active')) {
                                console.log(btn)
                            }
                        });

                        // We hide the spinner.
                        preloader.classList.remove('preloader-active');

                        // We set a minimum height for content search, so that content can be reached on small devices, even if the content is not contained entirely on the screen.
                        if (!messageNoResult) {
                            content.style.minHeight = '550px';
                        } else {
                            content.style.minHeight = '300px';
                        }

                        // const activeBtn = handlerActiveBtn();
                        // const index = activeBtn !== undefined ? activeBtn : 0;

                        // console.log(index)

                        // Call the function so that the tabs work when the search content is changed.
                        handlerTabs();
                    })
                    .catch((error) => {
                        console.error(error)
                    });
            } else {
                // We clear the search result block so that when the search is empty, it returns an empty result block.
                result.innerHTML = '';
                // We hide the spinner.
                preloader.classList.remove('preloader-active');
            }
        }

        // Let's make tabs.
        function handlerTabs() {
            const tabsBox = document.querySelector('.js-tabs-result');

            if (tabsBox) {
                const headerBtns = tabsBox.querySelectorAll('.js-tabs-btn');
                if (headerBtns.length >= 1) {

                    headerBtns.forEach((btn, index) => {
                        btn.addEventListener("click", function () {
                            removeClassActive();
                            this.classList.add('tab-active');
                            indexBtn = index;
                            handlerTabBtns();
                        });

                        function handlerTabBtns() {
                            if (btn.classList.contains('tab-active')) {
                                const tabIndex = btn.dataset.indexTab;
                                const tabBody = document.querySelector(`.js-tabs-body--${tabIndex}`);

                                if (tabBody) {
                                    tabBody.classList.add('tab-active');
                                }
                            }
                        }

                        handlerTabBtns();
                    });

                    function removeClassActive() {
                        const tabBody = document.querySelectorAll(`.predictive-search1__results-body`);

                        headerBtns.forEach(btn => {
                            btn.classList.remove("tab-active");
                        });

                        tabBody.forEach(body => {
                            body.classList.remove("tab-active");
                        });
                    }
                }
            }


        }
        handlerTabs();
    }
}