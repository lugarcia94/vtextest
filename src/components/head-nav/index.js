import 'Core/plugins/jquery.observe';
import './style.styl';

$('.head-nav').observe('childlist', '.ajax-content-loader', function(record) {
    let logout = record.target.querySelector('[href*=logout]');

    if(logout) {
        $('body').addClass('logout').removeClass('login');
    } else {
        $('body').addClass('login').removeClass('logout');
    }
});