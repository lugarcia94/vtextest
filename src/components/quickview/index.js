import './index.styl';
const body = $vtex('body');

if(body.hasClass('quickview')) {
    const linkProduct = sessionStorage.getItem('linkProduct');
    $('.product__content-inner').append(`<a class="product__more-link" href="${ linkProduct }">Veja o Produto</a>`);
}

$('.showcase__quickview a').click(function(){
    const link = $(this).closest('.showcase__item').find('.showcase__link');
    sessionStorage.setItem('linkProduct', '');
    if(link.length) {
        sessionStorage.setItem('linkProduct', link.attr('href'));
    }
});