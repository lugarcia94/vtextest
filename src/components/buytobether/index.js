import './style.styl';

const buytobether = $('.buytobether');
if(buytobether.length) {
    const container = $('<div class="buytobether__container actived">');
    const button = $('<button type="button" class="buytobether__close">Close</button>');
    const table = buytobether.find('table');
    const title = buytobether.find('h4#divTitulo');
    container.prepend(button);
    title.click((evt)=>$(evt.target).closest('.buytobether').toggleClass('on'));
    button.click((evt)=>$(evt.target).closest('.buytobether').removeClass('on'))
    if(table) {
        container.append(table);
        buytobether.append(container);
    }
}