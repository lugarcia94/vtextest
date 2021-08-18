import './style.styl';

$('.brands__list').slick({
    slidesToShow: 8,
    slidesToScroll: 8,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [   
        {
            breakpoint    : 1200,
            settings      : {
                slidesToShow: 6,
                slidesToScroll: 6
            }
        },
        {
            breakpoint    : 1100,
            settings      : {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint    : 992,
            settings      : "unslick"
        }
    ]
});