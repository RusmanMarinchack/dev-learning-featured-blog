document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll(".page-faq");

    if (sections.length >= 1) {
        sections.forEach(section => {
            const sectionId = section.getAttribute("id");

            // We make a smooth scroll to the anchors.
            function goAnchor() {
                const btnAnchors = section.querySelectorAll('._btn-anchor');

                if(btnAnchors.length > 0) {
                    btnAnchors.forEach(btn => {
                        btn.addEventListener('click', function(e) {
                            removeActiveClass()
                            this.classList.add('_active')

                            const id = btn.dataset.id;
                            const block = section.querySelector(`#${id}`);

                            if(block) {
                                window.scrollBy({
                                    top: (block.getBoundingClientRect().top),
                                    behavior: 'smooth'
                                });
                            }
                        });

                        // delete the active class.
                        function removeActiveClass() {
                            btnAnchors.forEach(btn => {
                                btn.classList.remove('_active')
                            })
                        }
                    });
                }
            }
            goAnchor();


            // Робимо акардеони по сайту.
            function accardeonsSite() {
                let accordions = document.querySelectorAll('.accordions')

                if (accordions.length > 0) {
                    accordions.forEach(accordion => {
                        let accordionHeader = accordion.querySelectorAll('.accordions-header')

                        if (accordionHeader.length > 0) {
                            accordionHeader.forEach(header => {
                                header.addEventListener('click', function () {
                                    let body = this.nextElementSibling
                                    let bodyHeight = body.scrollHeight

                                    if (this.classList.contains('_active')) {
                                        this.classList.remove('_active');
                                        body.classList.remove('_active');
                                        body.style.height = `0px`;
                                    } else {
                                        removeClassActive();
                                        this.classList.add('_active');
                                        body.classList.add('_active');
                                        body.style.height = `${bodyHeight}px`;
                                    }
                                });
                            });

                            // delete the active class.
                            function removeClassActive() {
                                accordionHeader.forEach(header => {
                                    header.classList.remove('active');
                                    let body = header.nextElementSibling;
                                    if (body) {
                                        body.classList.remove('active');
                                        body.style.height = `0px`;
                                    }
                                });
                            }
                        }
                    });
                }
            }
            accardeonsSite()
        });
    }
});