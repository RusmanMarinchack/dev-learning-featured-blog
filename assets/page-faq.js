document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll(".page-faq");
    const mql = window.matchMedia("(max-width: 991.98px)");

    if (sections.length >= 1) {
        sections.forEach(section => {

            // On mobile devices we get the height of the Group, when clicking on the wire while scrolling we subtract this height and get it in return.
            const group = section.querySelector('.page-faq__group');
            let groupHeight;

            function handlerGroupHeight(media) {
                if (media.matches) {
                    groupHeight = group.clientHeight;
                } else {
                    groupHeight = 0;
                }
            }

            handlerGroupHeight(mql)
            mql.addEventListener('change', handlerGroupHeight);

            // We make a smooth scroll to the anchors.
            function goAnchor() {
                const linkAnchors = section.querySelectorAll('.js-btn-anchor');

                if(linkAnchors.length > 0) {
                    linkAnchors.forEach(link => {
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            removeActiveClass();
                            this.classList.add('active');

                            const id = link.getAttribute('href').substring(1);
                            const block = section.querySelector(`#${id}`);

                            if(block) {
                                window.scrollBy({
                                    top: (block.getBoundingClientRect().top - groupHeight),
                                    behavior: 'smooth'
                                });
                            }
                        });

                        // delete the active class.
                        function removeActiveClass() {
                            linkAnchors.forEach(btn => {
                                btn.classList.remove('active')
                            })
                        }
                    });
                }
            }
            goAnchor();


            // We make accordions.
            function accordionsSite() {
                let accordions = section.querySelectorAll('.js-accordions')

                if (accordions.length > 0) {
                    accordions.forEach(accordion => {
                        let accordionHeader = accordion.querySelectorAll('.js-accordions-header')

                        if (accordionHeader.length > 0) {
                            accordionHeader.forEach(header => {
                                header.addEventListener('click', function () {
                                    let body = this.nextElementSibling
                                    let bodyHeight = body.scrollHeight

                                    if (this.classList.contains('active')) {
                                        this.classList.remove('active');
                                        body.classList.remove('active');
                                        body.style.height = `0px`;
                                    } else {
                                        this.classList.add('active');
                                        body.classList.add('active');
                                        body.style.height = `${bodyHeight - 19}px`;
                                    }
                                });
                            });
                        }
                    });
                }
            }
            accordionsSite()
        });
    }
});