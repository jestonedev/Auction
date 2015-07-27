/**
 * Created by Ignatov on 19.06.2015.
 */

import React from 'react';
import Auth from './Auth.js';
import {TextField, FlatButton, Paper } from 'material-ui';

class Login extends React.Component {
    state = {
        login: '',
        password: '',
        error_message: '',
        transition: undefined
    }

    static willTransitionTo(transition, params, query, callback)
    {
        if (Auth.loggedIn())
            transition.abort();
        if (callback)
            callback();
    }

    _handleNameChange = (e) =>
    {
        this.setState({login: e.target.value});
    }

    _handleHashChange = (e) =>
    {
        this.setState({password: e.target.value});
    }

    _submit = () =>
    {
        Auth.login(this.state.login, this.state.password, (loggined) => {
            if (!loggined)
            {
                this.setState({error_message: 'Не удалось войти в систему'});
            } else
            {

            }
        });
    }

    render() {
        return <Paper zDepth={1} className="login-paper">
                <div className="login-error">
                        {this.state.error_message}
                </div>
                <div className="login-input-wrapper">
                <TextField onEnterKeyDown={this._submit}
                hintText="Введите логин"
                floatingLabelText="Логин"
                onChange={this._handleNameChange}
                maxLength={20}/>
                <TextField onEnterKeyDown={this._submit}
                hintText="Введите пароль"
                floatingLabelText="Пароль"
                onChange={this._handleHashChange}
                maxLength={255} type="password"/>
                </div>
                <div className="login-submit-wrapper">
                    <FlatButton label="Войти" primary={true} onClick={this._submit} />
                </div>
             </Paper>;
    }
};

export default Login;