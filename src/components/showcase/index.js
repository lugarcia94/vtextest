import './style.styl';

$('.showcase').each(function(){
    let title = $(this).find('h2');

    if( title.length ) {
        let text = title.text().split('-');

        if(text.length > 1) {
            title.html(`<strong>${text[0]}</strong> ${text[1]}`);
        }
    }

    title
        .addClass('showcase__title')
        .addClass('showcase__title--actived');
});

$(".showcase-tabs__tabs-item").click(function() {
    $(".showcase-tabs__tabs-item").removeClass("showcase-tabs__tabs-item--active")
    $(this).addClass("showcase-tabs__tabs-item--active")
    const showcase = "."+$(this).attr("data-showcase")
    $(".showcase-tabs__showcase .showcase").removeClass("showcase--active")
    $(showcase).addClass("showcase--active")
});

if($('body').hasClass('quickview')) {
    const linkProduct = sessionStorage.getItem('linkProduct');
    $( "div.product__page>a" ).attr( "href", linkProduct );
}

$('.showcase').on('click', '.showcase__quickview', function(){
    const link = $(this).closest('.showcase__item').find('.showcase__link');
    sessionStorage.setItem('linkProduct', '');
    if(link.length) {
        sessionStorage.setItem('linkProduct', link.attr('href'));
    }
    $(this).find('a').trigger('click');
});