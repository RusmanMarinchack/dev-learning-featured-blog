'use strict'

document.addEventListener('DOMContentLoaded', () => {
    let mql = window.matchMedia("(max-width: 991.98px)");
    function handlerRowImageGallery(media) {
        const imageGalleryWrapper = document.querySelector('.image-gallery__wrapper')

        if (imageGalleryWrapper) {
            let listItemGallery = imageGalleryWrapper.querySelectorAll('.image-gallery__item')
            let countDecRow = imageGalleryWrapper.dataset.rowDecstop
            let countRowMobile = imageGalleryWrapper.dataset.rowMobile

            listItemGallery.forEach(item => {
                if (media.matches) {
                    item.classList.remove(`image-gallery__item-row--${countDecRow}`)
                    item.classList.add(`image-gallery__item-row--${countRowMobile}`)
                } else {
                    item.classList.remove(`image-gallery__item-row--${countRowMobile}`)
                    item.classList.add(`image-gallery__item-row--${countDecRow}`)
                }
            })
        }
    }
    handlerRowImageGallery(mql)
    mql.addEventListener('change', handlerRowImageGallery)
})