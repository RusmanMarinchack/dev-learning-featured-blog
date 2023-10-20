'use strict'

document.addEventListener('DOMContentLoaded', () => {

    // We create working tabs, this code will also work on all tabs with such classes.
    function handlerTabs() {
        const tabs = document.querySelectorAll('.tabs')

        if (tabs.length >= 1) {
            tabs.forEach(tab => {
                const tabBts = tab.querySelectorAll('.tabs-btn')

                if (tabBts.length >= 1) {
                    tabBts.forEach(btn => {
                        btn.addEventListener('click', function () {
                            const index = this.dataset.tabIndex
                            const tabBody = tab.querySelector(`.tabs-body--${index}`)

                            removeClassActive()
                            this.classList.add('active-tab')
                            tabBody.classList.add('active-tab-body')
                        })
                    })
                }

                function removeClassActive() {
                    tabBts.forEach(btn => {
                        const index = btn.dataset.tabIndex

                        btn.classList.remove('active-tab')
                        tab.querySelector(`.tabs-body--${index}`).classList.remove('active-tab-body')
                    })
                }
            })
        }
    }
    handlerTabs()
})