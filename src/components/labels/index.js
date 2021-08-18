import './style.styl';
import {ajustPercent} from 'Core/functions';

ajustPercent();

$vtex('window').ajaxComplete(function(){
    ajustPercent();
});
