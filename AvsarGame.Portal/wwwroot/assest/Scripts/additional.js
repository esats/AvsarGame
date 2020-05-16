var newsSwiper = new Swiper("#shop-slider", {
    pagination: {
        el: "#shop-slider .swiper-pagination",
        clickable: true
    },
    breakpoints: {
        350: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        500: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10
        },
        560: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 60
        },
        768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 35
        },
        992: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 45
        },
        1140: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 15
        }
    },
    navigation: {
        nextEl: ".news-section .swiper-button-next",
        prevEl: ".news-section .swiper-button-prev"
    }, autoplay: {
        delay: 10000,
    },
});

$('.comment-toggle').on('click', function () {
    $('.comment-wrapper.answer').toggle()
})

$('.nav-item.notifications').on('click', function () {
    $('.dropdown-menu.notification-list').toggle()
})