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
                const widthScroll = window.innerWidth - document.documentElement.offsetWidth

                if (shadow) {
                    const content = shadow.querySelector('.js-search-content');
                    const btnCloses = document.querySelectorAll('.js-close');

                    shadow.classList.add('active-search');
                    content.classList.add('active-search');
                    document.body.classList.add('look');
                    document.body.style.paddingRight = `${widthScroll}px`;

                    btnCloses.forEach(close => {
                        close.addEventListener('click', function () {
                            shadow.classList.remove('active-search');
                            content.classList.remove('active-search');
                            document.body.classList.remove('look');
                            document.body.style.paddingRight = `0px`;
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
                const inputSearch = document.querySelector('#predictive-search1-input');

                inputSearch.addEventListener('input', async function () {
                    // We start the spinner.
                    preloader.classList.add('preloader-active');
                    await handlerFetchGetLayout(this.value);
                });
            }
        }
        handlerFormSearch();

        async function handlerFetchGetLayout(searchValue) {
            const content = document.querySelector('.js-search-content');
            const wrapperResult = document.querySelector('.js-tabs-result');
            const minHeightContent = 292;

            if (searchValue !== '') {
                // We create a shift in which we transfer the index of the active tabu to the work flow.
                let indexActiveBtn;

                const tabBtns = wrapperResult.querySelectorAll('.js-tabs-btn');
                tabBtns.forEach((btn, index) => {
                    // We check whether the button tab is active and get its index.
                    if (btn.classList.contains('tab-active')) {
                        indexActiveBtn = index;
                    }
                });

                wrapperResult.innerHTML = '';

                await fetch(`/search/suggest?q=${searchValue}&resources[type]=query,product,collection,page,article&section_id=predictive-search-1`)
                    .then((response) => response.text())
                    .then((text) => {
                        // We get the page from the server, convert it page DOM element and get the desired element in the element.
                        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('.js-tabs-result');
                        // We receive a block with a message that is displayed if there is no result.
                        const messageNoResult = resultsMarkup.querySelector('.predictive-search1__no-result');

                        // We change the content of the search result.
                        wrapperResult.innerHTML = resultsMarkup.innerHTML;

                        // We hide the spinner.
                        preloader.classList.remove('preloader-active');

                        // We set a minimum height for content search, so that content can be reached on small devices, even if the content is not contained entirely on the screen.
                        if (!messageNoResult) {
                            content.style.minHeight = '550px';
                        } else {
                            content.style.minHeight = `${minHeightContent}px`;
                        }

                        // Call the function so that the tabs work when the search content changes, and pass the index of the active tab to the function.
                        handlerTabs(indexActiveBtn);
                    })
                    .catch((error) => {
                        console.error(error)
                    });
            } else {
                // We clear the search result block so that when the search is empty, it returns an empty result block.
                wrapperResult.innerHTML = '';
                // We hide the spinner.
                preloader.classList.remove('preloader-active');
                content.style.minHeight = `${minHeightContent}px`;
            }
        }

        // Let's make tabs.
        function handlerTabs(indexBtn = 0) {
            const tabsBox = document.querySelector('.js-tabs-result');

            if (tabsBox) {
                const headerBtns = tabsBox.querySelectorAll('.js-tabs-btn');
                if (headerBtns.length >= 1) {

                    headerBtns.forEach((btn, index) => {
                        btn.addEventListener("click", function () {
                            removeClassActive();
                            this.classList.add('tab-active');
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

                        // When changing the search field, we remain on the same tab where we were.
                        const tabBtns = document.querySelectorAll('.js-tabs-btn');
                        tabBtns[indexBtn].classList.add('tab-active');

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


    fetch(`/search/suggest.json?q=c&resources[type]=query,product,collection,page,article`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.resources.results)
        })
}