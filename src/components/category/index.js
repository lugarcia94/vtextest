import './style.styl';

const body = $('body');

if (body.hasClass('category') || body.hasClass('department') || body.hasClass('brand') || body.hasClass('resultado-busca')) {
    let sub = $('.sub');
    let resultTimer = $('.searchResultsTime');
    sub.first().append($('.pager.top')).prepend(resultTimer.first());
    sub.last().append($('.pager.bottom')).prepend(resultTimer.last());
}

$('.category__showcase .tags__filter').appendTo('.category__showcase .main');

let url = window.location.origin + window.location.pathname;

$('.tags__filter-list li').each(function () {
    let paramUrl = $(this).find('a').attr('href');
    let newUrl = url + '?' + paramUrl;
    $(this).find('a').attr("href", newUrl);
});

$('.title__seoCategory').appendTo('.main .sub');