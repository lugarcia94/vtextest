
import 'slick-carousel';
import './style.styl';

function loadCarousel() {
    $('.instagram__main').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        responsive: [   
            {
                breakpoint    : 992,
                settings      : {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint    : 768,
                settings      : {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint    : 500,
                settings      : {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}