import React, { Component } from "react";
import Countdown from 'react-countdown-now';

const Completionist = () => <span>You are good to go!</span>;
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        return <div className="countdown">
            { days > 0 && <span className="countdown__item countdown__item--days">
                <span className="countdown__number">{ days }</span>
                <span className="countdown__label">dias</span>
            </span> } 
            <span className="countdown__item countdown__item--hours">
                <span className="countdown__number">{String(hours).padStart(2, '0')}</span>
                <span className="countdown__label">Horas</span>
            </span> 
            <span className="countdown__item countdown__item--minutes">
                <span className="countdown__number">{String(minutes).padStart(2, '0')}</span>
                <span className="countdown__label">Minutos</span>
            </span> 
            <span className="countdown__item countdown__item--seconds">
                <span className="countdown__number">{String(seconds).padStart(2, '0')}</span>
                <span className="countdown__label">Segundos</span>    
            </span>
        </div>;
    }
};

export default class CountDown extends Component {

    render() {
        const { valid } = this.props;

        return <React.Fragment>
            <Countdown date={ valid } renderer={ renderer } />
        </React.Fragment>;
    }
}