document.addEventListener('DOMContentLoaded', () => {
    const banners = document.querySelectorAll('.banner');

    if (banners.length >= 1) {
        banners.forEach(section => {
            const videos = section.querySelectorAll('.banner__bg.video');

            let observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                     if (entry.isIntersecting) {
                         entry.target.play();
                     }
                });
            }, {
                rootMargin: "0px"
            });

            if (videos.length >= 1) {
                videos.forEach(video => {
                    observer.observe(video)
                });
            }
        });
    }
});