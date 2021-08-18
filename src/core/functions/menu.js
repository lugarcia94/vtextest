function leftPosition() {
    let menu = $('#menutopbar');
    let viewportWindow = $(window).outerWidth();

    if(menu.length){
        let sub = $('.navbar-categories-nv-1', menu);
        let viewport = menu.outerWidth() + menu.offset().left;

        sub.each(function(){
            let current = ($(this).offset().left + $(this).width());
            let left    =  0 ;

            if(current > viewport) left =  viewport - current;

            if(viewportWindow > 992)
                $(this).css({
                    left: left,
                    maxWidth: menu.outerWidth()
                });
            else $(this).attr('style', '');
        });
    }
}


export function menuAdjustment() {
    leftPosition();
    $(window).resize(leftPosition);
}