import './style.styl';

$('.qtds').each(function(){
    const more = $('.qtds__button--more', this);
    const less = $('.qtds__button--less', this);
    const input = $('.qtds__input', this);
    const valueDefault = 1;

    input.val(valueDefault);
    input
        .trigger('qtds.change', [valueDefault])
        .change(function(evt){
            let value = parseInt(evt.target.value) || 0;
            if(value <= 0) {
                input.val(valueDefault);
                input.trigger('qtds.change', [valueDefault]);
            }
        }).keyup(function(){  input.trigger('qtds.change', [input.val()]); });

    more.click(function(evt){
        evt.preventDefault();
        let value = parseInt(input.val()) || 0;
        input.val(++value);
        input.trigger('qtds.change', [value]);
    });
    less.click(function(evt){
        evt.preventDefault();
        let value = parseInt(input.val()) || 0;
        if((value - 1) > 0) {
            input.val(--value);
            input.trigger('qtds.change', [value]);
        }
    });
});