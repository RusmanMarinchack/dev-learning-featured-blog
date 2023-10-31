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
                const linkAnchors = section.querySelectorAll('._btn-anchor');

                if(linkAnchors.length > 0) {
                    linkAnchors.forEach(link => {
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            removeActiveClass();
                            this.classList.add('_active');

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
                                btn.classList.remove('_active')
                            })
                        }
                    });
                }
            }
            goAnchor();


            // We make accordions.
            function accordionsSite() {
                let accordions = section.querySelectorAll('.accordions')

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
                                        this.classList.add('_active');
                                        body.classList.add('_active');
                                        body.style.height = `${bodyHeight}px`;
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