/**
 * Desconto no Boleto
 */
import {onlyFloat, percentPrice} from "./index";

function descount() {
    let labels = Array.from(document.querySelectorAll('.showcase__item [class*=desconto-avista-]'));
    labels.forEach(label => {
        let item            = label.parentElement.parentElement.parentElement.parentElement;

        if(!item.classList.contains('has--discount')) {
            let percent = onlyFloat(label.innerHTML);
            let price = onlyFloat(item.querySelector('.valor-por').innerHTML);

            item.querySelector('.price__in-cash').innerHTML = 'preço à vista <strong>' + percentPrice(price, percent) + '</strong> ';
            item.classList.add('has--discount');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    descount();
});

$(document).ajaxStop(function(){
    descount();
});


