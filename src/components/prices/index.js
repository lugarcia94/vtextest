import './style.styl';

function checkTicket() {
    const labels = $('.labels [class*=desconto-a-vista]:not(.on)');
    const numberPattern = /\D/g;
    labels.each(function(){
        const label     = $(this);
        const showcase  = label.closest('.showcase__item');
        const discount  = $.trim(label.text().replace( numberPattern, '' ));
        const price     = $.trim($('.valor-por', showcase).text().replace('R$', '').replace(',', '.'));
        const total     = price * ((100-discount) / 100);
        const html      = `<div class="prices__discount"><span class="price">R$ ${ total.toFixed(2).replace('.', ',') }</span>  á vista com desconto</div>`;
        $('.showcase__prices',showcase).append(html);   
        label.addClass('on');
    });
}

checkTicket();

$vtex(document).ajaxComplete(function(){
    checkTicket();
});

$('.product__btn-other-payment').on("click", function(){
    $(this).parent().toggleClass('on-payment');
});