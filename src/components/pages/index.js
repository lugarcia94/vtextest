import './style.styl';

$('[data-toggle=modal]').click(function(){
    const id = $(this).attr('href');
    modal($(id));
});

function modal(element) {
    const hide = element.attr('aria-hidden');

    if(hide == 'true')
        element.attr('aria-hidden', false);
    else
        element.attr('aria-hidden', true);
}