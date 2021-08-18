import './style.styl';
import { slug } from 'Core/functions';

const body = $('body');
const cores = $('.sidebar .Cores a');
const h5 = $('.sidebar h5');

$('.sidebar__button--open').click(function(){
    body.addClass('sidebar--open');
});

$(".sidebar__button--close").click(function(){
    body.removeClass('sidebar--open');
});

$('.sidebar__container').click(function(evt){
    if($(evt.target).hasClass('sidebar__container')) {
        body.removeClass('sidebar--open');
    }
});
(async () => {
    if(cores.length) {
        await cores.each(function(){
            const url = '/arquivos/' + slug($(this).attr('title')) + '.jpg';
            const image = new Image();
            const text = $(this).text();

            $(this).html('');
            $(this).prepend(`<span>${ text }</span>`);

            image.onload = () => {
                $(this).prepend(image);
                $(this).closest('li').addClass('thumb');
            };
            image.onerror = () => {
                $(this).closest('li').addClass('not-thumb');
            };
            image.src = url;
        });
    }
    if(h5.length) {
        await h5.each(function(){
            const fieldset = $(this).closest('fieldset');
            fieldset.find('label').each(function(){
                const text = $(this).text();
                $(this).html($(this).html().replace(text, ''));
                $(this).append($('<span>').append(text));
            });
            if($(this).text() == 'Cores') {
                $(this).next().addClass('fields-thumbs');
                
                fieldset.find('label:not(.thumb) input').each(function(){
                    const url = '/arquivos/' + slug($(this).val()) + '.jpg';
                    const image = new Image();
                    const html = $(this).closest('label');

                    image.onload = () => {
                        html.find('input').after($('<span class="image">').append(image));
                        html.addClass('thumb');
                    };
                    image.onerror = () => {
                        html.addClass('not-thumb');
                    };
                    image.src = url;
                });
            }
        });
    }


    $('.fields-thumbs .filtro-ativo').each(function(){
        const url = '/arquivos/' + slug($(this).text()) + '.jpg';
        const image = new Image();
        const text = $(this).text();


        $(this).html($(this).html().replace(text, ''));
        $(this).append(`<span>${ text }</span>`);

        image.onload = () => {
            $(this).append(image);
            $(this).addClass('thumb');
        };

        image.src = url;
    });

    $('.search-multiple-navigator .fields-thumbs .ver-filtros').not('.thumb').not('.not-thumb').each(function(){
        const label = $(this).closest('.fields-thumbs').find('label');
        const url = '/arquivos/' + slug(label.text()) + '.jpg';
        const image = new Image();

        image.onload = () => {
            label.append(image);
            label.addClass('thumb');
        };

        image.src = url;

    });
})();
