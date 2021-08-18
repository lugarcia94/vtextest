import './descount';
import config from '../config.json';

/**
 * Console Log
 * @param msg
 * @param debug
 */
export function log(msg, debug = true) {
    if(config.debug && debug) console.log(msg);
}

/**
 * ScrollTop
 * - Adiciona class no body na movimentação do scroll da pagina
 */
 export function scrollTop() {
    let currentScrollTop = 0;

    let scrolling = () => {
       let body        = $('body');
       let scrollTop   = $(window).scrollTop();
       let startTop    = $('#header').outerHeight();

       log(['// ---- Scrolling Active Start ---- //'], config.scrollTop.debug);

       if(scrollTop > startTop)    body.addClass('scrolling');
       else                        body.removeClass('scrolling');

       log(['Scrolling Top: ', config.scrollTop.scrollingTop], config.scrollTop.debug);

       if(config.scrollTop.scrollingTop)
           if(scrollTop < currentScrollTop && scrollTop > 0) {
               body.addClass('scrolling--top');
               log(['Scrolling Top Add '], config.scrollTop.debug);
           } else {
               body.removeClass('scrolling--top');
               log(['Scrolling Top Remove '], config.scrollTop.debug);
           }

       if(config.scrollTop.scrollingDown)
           if(scrollTop > currentScrollTop && scrollTop > 0) {
               body.addClass('scrolling--down');
               log(['Scrolling Down Add '], config.scrollTop.debug);
           } else {
               body.removeClass('scrolling--down');
               log(['Scrolling Down Remove '], config.scrollTop.debug);
           }

       currentScrollTop = scrollTop;

       log(['Scrolling Current: ', currentScrollTop], config.scrollTop.debug);
       log(['// ---- Scrolling Active End ---- //'], config.scrollTop.debug);
    };

    $(window).scroll(scrolling);

    scrolling();
}

/**
 * Slug
 * - Troca caracteres especiais
 * @param str
 * @returns {*}
 */
export function slug(str){
    str = str.toString();
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    let from = "àáäâãèéëêìíïîõòóöôùúüûñç·/_,:;";
    let to   = "aaaaaeeeeiiiiooooouuuunc------";

    for (let i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    return str;
}

/**
 * Currency
 * - Transforma o valor em moeda
 * @param value
 * @returns {string}
 */

export function currency(value) {
    let tmp = value.toString().replace(/[^0-9]/g,'');

    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");

    if( tmp.length > 6 ) {
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    return 'R$ ' + tmp;
}

/**
 * Only Float
 * - em uma string pega o valor e transforma em float
 * @param string
 * @returns {number}
 */
export function onlyFloat(string) {
    string = string.toString().replace(/[^0-9]/g,'').replace(/([0-9]{2})$/g, ",$1");
    if( string.length > 6 )  string = string.replace(/([0-9]{3}),([0-9]{2}$)/g, "$1.$2");

    return parseFloat(string.match(/\d+/g)[0] + '.' + string.match(/\d+/g)[1]);
}

/**
 * Params
 * - Retorna um objeto com os valores do parametros de uma url
 * @param url
 * @returns {{}}
 */
export function params(url) {
    let vars = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
}

/**
 * urlParameter
 * - Troca o valor do parametro da url
 * @param url
 * @param paramName
 * @param paramValue
 * @returns {string}
 */
function urlParameter(url, paramName, paramValue) {
    let hash = location.hash;
    url = url.replace(hash, '');

    if(typeof url !== 'string')
        return url;

    if (url.indexOf(paramName + "=") >= 0) {
        let prefix = url.substring(0, url.indexOf(paramName));
        let suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    } else {
        if (url.indexOf("?") < 0)
            url += "?" + paramName + "=" + paramValue;
        else
            url += "&" + paramName + "=" + paramValue;
    }
    return url + hash;
}

/**
 * Percent Price
 * - Retorna o valor calculado de acordo com a porcentagem passada
 * @param price
 * @param percent
 * @returns {string}
 */
export function percentPrice(price, percent) {
    let perc = 100 - percent;
    let priceNew = ((price * perc) / 100).toFixed(2);
    return currency(priceNew);
}

/**
 * Buy Button
 * - Botão de compra
 */
export function buttonBuy(buttonsClass = '.product__left', buyClass=".buy-button", inputClass = '.buy-button__input') {
    let buttons = Array.from(document.querySelectorAll(buttonsClass));
    const body = document.querySelector('body');

    buttons.forEach(box => {
        let button = box.querySelector(buyClass);
        let qtd    = box.querySelector(inputClass);

        if(button) {
            button.addEventListener('click', e => {
                if (button.getAttribute('href').indexOf('javascript') === -1) {
                    e.preventDefault();
                    let href = urlParameter(button.getAttribute('href'), 'qty', qtd.value ? qtd.value : 1);
                    if(body.classList.contains('quickview'))
                        window.parent.location.href = href;
                    else 
                        window.location.href = href;
                }
            });
        }
    });
}

/**
 *  buttonMoreLess
 *  - Botão de Quantidade Mais e Menos
 */
export function buttonMoreLess(boxClass=".buy-button__qtd", inputClass='.buy-button__input', moreClass='.buy-button__more', lessClass='.buy-button__less') {
    let buttons = Array.from(document.querySelectorAll(boxClass));
    buttons.forEach(box => {
        let qtd    = box.querySelector(inputClass);
        let more   = box.querySelector(moreClass);
        let less   = box.querySelector(lessClass);

        onlyNumber(qtd);

        more.addEventListener('click', () => {
            qtd.value++;
            $(qtd).trigger('input');
        });
        less.addEventListener('click', () => {
            if(qtd.value > 1) qtd.value--;
            $(qtd).trigger('input');
        });
    });
}

/**
 *  Only Number
 */
export function onlyNumber(input) {
    input.addEventListener('keydown', e => { if(!(Number.isInteger(parseInt(e.key)) || [8, 37, 38, 39, 40].indexOf(e.keyCode) !== -1)) e.preventDefault(); });
    input.addEventListener('change', () => { if(input.value.trim() == '' || input.value.trim() < 1) input.value = 1; $(input).trigger('input');});
}


export function ajustPercent() {
    $('.labels__item--percent:not(.on)').each(function(){
         $(this).addClass('on');
         let perc = $.trim($(this).text());

         perc = perc
                    .replace('%', '')
                    .replace(',', '.');

        if(perc) {
            perc = parseFloat(perc);

            if(perc) {
                perc = Math.round(perc);
                $(this).html(perc + '%');
            }
        }

    });
}