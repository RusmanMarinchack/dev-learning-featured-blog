document.addEventListener("DOMContentLoaded", () => {
    const customVideo = document.querySelectorAll('.custom-video');

    if (customVideo.length >= 1) {
        customVideo.forEach(section => {
            const sectionId = section.getAttribute('id');
            const banner = document.querySelector(`#${sectionId} .custom-video__banner`);
            const btnPlay = document.querySelector(`#${sectionId} .custom-video__banner-btn`);
            const boxVideo = document.querySelector(`#${sectionId} .custom-video__box-video`);
            const videoContent = document.querySelector(`#${sectionId} .custom-video__content`);
            const video = document.querySelector(`#${sectionId} .custom-video__video`);
            const dataSrc = video.dataset.src;
            const body = document.body;
            const widthScroll = window.innerWidth - document.documentElement.offsetWidth;

            // When you click on the button 'Play video', we start the video.
            if (btnPlay) { 
                btnPlay.addEventListener('click', function() {

                    // We hide the picture when boxVideo has no class .video-popup.
                    if (boxVideo.classList.contains('video-popup') === false) {
                        // We add a class when clicking on the button to hide the picture and play the video.
                        banner.classList.add('hidden-image');
                    }

                    if (boxVideo) {
                        // The video is initially hidden using this class to make it visible.
                        boxVideo.classList.add('video-play');
                        
                        if (boxVideo.classList.contains('video-popup')) {
                            body.classList.add('look');
                            body.style.paddingRight = `${widthScroll}px`;

                            // We start the video when the animation ends.
                            videoContent.addEventListener('transitionend', () => {
                                if (boxVideo.classList.contains('video-play')) {
                                    handlerPlayVideo();
                                }
                            }); 
                        } else {
                            handlerPlayVideo();
                        }
                        
                        // Function to launch video.
                        function handlerPlayVideo() {
                            if (video.classList.contains('js-add-link')) {
                                video.src = dataSrc;
                            } else {
                                video.play(); 
                            }
                        }

                        // Close the pop-up by clicking on the shadow.
                        boxVideo.addEventListener('click', function() {
                            this.classList.remove('video-play');
                            body.classList.remove('look');
                            body.style.paddingRight = `0px`;

                            if (video.classList.contains('js-add-link')) {
                                video.src = '';
                            } else {
                                video.pause(); 
                            }
                        });
                    }
                });
            }
        });
    }
});