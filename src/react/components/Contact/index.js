import React, { Component } from 'react';
import axios from 'axios';

import './style.styl';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valided: true,
            error: false,
            success: false,
            form: {
                firstName: {
                    value: '',
                    valid: '',
                    required: true
                },
                lastName: {
                    value: '',
                    valid: '',
                    required: true
                },
                email: {
                    value: '',
                    valid: '',
                    required: true
                },
                phone: {
                    value: '',
                    valid: '',
                    required: false
                },
                celular: {
                    value: '',
                    valid: '',
                    required: false
                },
                type: {
                    value: '',
                    valid: '',
                    required: true
                },
                description: {
                    value: '',
                    valid: '',
                    required: true
                }
            }
        };

    }

    validate() {
        let stateChange = this.state.form;

        Object.keys(stateChange)
            .forEach(key => {
                if(stateChange[key].value.trim() == '' && stateChange[key].required)
                    stateChange[key].valid = 'error';
                else
                    stateChange[key].valid = 'valid';
            });

        this.setState({ form: stateChange });

        let valided = Object.keys(stateChange)
            .filter(item => stateChange[item].valid == 'error');

        this.setState({
            valided: valided.length ? false : true
        });

        return valided.length ? false : true;

    }

    sendEmail() {
        let form = this.state.form;
        axios.post('//api.vtex.com/likecosmeticos/dataentities/CT/documents', {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            phone: form.phone.value,
            celular: form.celular.value,
            type: form.type.value,
            description: form.description.value
        }, {
            headers: {
                'accept': 'application/vnd.vtex.ds.v10+json',
                'content-type': 'application/json'
            }
        })
            .then(request => this.setState({success: true}))
            .catch(error => this.setState({error: true}));
    }
    
    handleSubmit() {
        if(this.validate()) {
            this.sendEmail();
        }
    }

    handleChange(event) {
        let name = event.target.getAttribute('name');
        let stateChange = this.state.form;

        stateChange[name] = {
            value: event.target.value,
            valid: ''
        };

        this.setState({ form: stateChange });
    }

    componentWillMount() {

    }

    render() {
        let form = this.state.form;

        return <div className="contact-us__component-form">
            <div className="contact-us__item">
                <label className="contact-us__label" htmlFor="firstName">Nome: </label>
                <input name="firstName" id="firstName" type="text"
                       className    = {form.firstName.valid + ' contact-us__input'}
                       value        = {form.firstName.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="contact-us__item">
                <label className="contact-us__label" htmlFor="lastName">Sobrenome</label>
                <input name="lastName" id="lastName" type="text"
                       className    = {form.lastName.valid  + ' contact-us__input'}
                       value        = {form.lastName.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="contact-us__item">
                <label className="contact-us__label" htmlFor="email">E-Mail</label>
                <input name="email" id="email" type="mail" placeholder="Ex. nome@teste.com"
                       className    = {form.email.valid  + ' contact-us__input'}
                       value        = {form.email.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="contact-us__item">
                <label className="contact-us__label" htmlFor="phone">Telefone</label>
                <input name="phone" id="phone" type="text" placeholder="(00) 0000-0000"
                       className    = {form.phone.valid  + ' contact-us__input'}
                       value        = {form.phone.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="contact-us__item">
                <label className="contact-us__label" htmlFor="celular">Celular</label>
                <input name="celular" id="celular" type="text" placeholder="(00) 00000-0000"
                       className    = {form.celular.valid  + ' contact-us__input'}
                       value        = {form.celular.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="contact-us__item">
                <label className="contact-us__label" htmlFor="type">Tipo</label>
                <div class="select-fake">
                    <span class="select-fake__value">{form.type.value == '' ? 'Selecionar motivo' : form.type.value }</span>
                    <select name="type" id="type"
                            className   = {form.type.valid  + ' contact-us__select'}
                            value       = {form.type.value}
                            onChange    = {this.handleChange.bind(this)} >
                        <option value="">Selecionar motivo</option>
                        <option value="Sugestão">Sugestão</option>
                        <option value="Dúvida">Dúvida</option>
                        <option value="Reclamação">Reclamação</option>
                    </select>
                </div>
            </div>
            <div className="contact-us__item">
                <label className="contact-us__label" htmlFor="description">Mensagem</label>
                <textarea name="description" id="description" cols="30" rows="10"
                          className = {form.description.valid  + ' contact-us__text'}
                          value     = {form.description.value}
                          onChange  = {this.handleChange.bind(this)}></textarea>
            </div>
            <div className="contact-us__actions">
                <button className="contact-us__send" type="button"
                    onClick     = {(e)=>this.handleSubmit(e)} >Enviar
                </button>
            </div>

            <div className="contact-us__msgs">
                {!this.state.valided && <span className="contact-us__msg contact-us__msg--warning">Verifique os campos selecionados são obrigatórios.</span>}
                {this.state.error && <span className="contact-us__msg contact-us__msg--error">Erro de envio, tente novamente</span>}
                {this.state.success && <span className="contact-us__msg contact-us__msg--success">Sua mensagem foi enviada com sucesso!</span>}
            </div>

        </div>
    }

}


export default Contact;
