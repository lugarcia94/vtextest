import { scrollTop } from './functions';
import './polyfill/addeventlistener';
import './polyfill/closest';
import './polyfill/padStart';
// import './firebase';

// Scroll Top
scrollTop();


$vtex(document).ajaxComplete((evt, xhr, set) => {
    if(set.url.indexOf('/frete/calcula') !== -1) {
        $vtex(document).trigger('[SHIPPING]');
    }
});

