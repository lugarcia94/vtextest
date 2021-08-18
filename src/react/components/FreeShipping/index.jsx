import React, { Component } from "react";

import { Container, Progressbar, ProgressbarFill, Label, LabelPrice, LabelDescription } from './styled';
import Icon from '../Icon';

export default class FreeShipping extends Component {

    render() {
        const { limit, current } = this.props;
        const shipping = (limit - ( current / 100 ));
        const progressbar = ((current / 100) * 100) / limit;

        return <React.Fragment>
            <Container>
                { shipping <= 0 
                    ? <Label>Você ganhou <LabelDescription>Frete Grátis!</LabelDescription></Label> 
                    : <Label>Faltam <LabelPrice>{ shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }) }</LabelPrice> para <LabelDescription>você ganhar Frete Grátis!</LabelDescription></Label> }
                <Progressbar >
                    <ProgressbarFill width={ `${ progressbar > 100 ? 100 : progressbar.toFixed(3) }%` }>
                        <Icon name="heart" />
                    </ProgressbarFill>
                </Progressbar>
            </Container>
        </React.Fragment>;
    }
}