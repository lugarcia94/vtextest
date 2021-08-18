import { func } from 'prop-types';
import './style.styl';

$(window).on('load', function () {
    $('.vtexIdUI-close').click(function () {
        window.location.href = '/';
    })
})

setTimeout(function () {
    var htmlAme = '<div id="personAlert" style="text-align: center;"><p style="font-size:0.8em"><span>ou Compre com</span> <img src="/arquivos/ame-digital.png" 50px"="" style="display: inline-block"><span>e receba até 5% de volta</span></p></div>'
    $(htmlAme).insertAfter("p.preco-a-vista.price-cash.has--price-final");

    $('.c-footer__nav-link').on('click',function() {
        $(this).parent().toggleClass("footer-open")
    })
}, 1000);