/**
 * Created by Ignatov on 22.06.2015.
 */

import React from 'react';
import {Dialog, TextField} from 'material-ui';

class UserDialog extends React.Component {
    state = {user: {
                id: '',
                name: '',
                description: '',
                hash: '',
                hash_check: ''
            }, errorUserText: '', errorHashText: '', errorHashCheckText: ''
        }

    _onDialogSubmit = () =>
    {
        if (this.state.user.name == undefined || this.state.user.name.length == 0) {
            this.setState({errorUserText : 'Имя пользователя обязательно'});
            return;
        }
        if (this.state.user.hash == undefined || this.state.user.hash.length < 8) {
            this.setState({errorHashText : 'Слишком короткий пароль'});
            return;
        }
        if (this.state.user.hash_check == undefined || this.state.user.hash != this.state.user.hash_check) {
            this.setState({errorHashCheckText : 'Пароли не совпадают'});
            return;
        }
        this.props.submit(this.state.user);
        this.refs.Dialog.dismiss();
    }

    _handleNameChange  = (e) =>
    {
        let user = this.state.user;
        let errorUserText = '';
        user.name = e.target.value;
        if (user.name.length == 0)
            errorUserText = 'Имя пользователя обязательно';
        this.setState({user: user, errorUserText: errorUserText});
    }

    _handleDescriptionChange = (e) =>
    {
        let user = this.state.user;
        user.description = e.target.value;
        this.setState({user: user});
    }

    _handleHashChange = (e) =>
    {
        let user = this.state.user;
        let errorHashText = '';
        user.hash = e.target.value;
        if (user.hash.length < 8)
            errorHashText = 'Слишком короткий пароль';
        this.setState({user: user, errorHashText: errorHashText});
    }

    _handleHashCheckChange = (e) =>
    {
        let user = this.state.user;
        let errorHashCheckText = '';
        user.hash_check = e.target.value;
        if (user.hash != user.hash_check)
            errorHashCheckText = 'Пароли не совпадают';
        this.setState({user: user, errorHashCheckText: errorHashCheckText});
    }

    show()
    {
        this.refs.Dialog.show();
    }

    render() {
        let actions = [
            { text: 'Сохранить', onTouchTap: this._onDialogSubmit, ref: 'submit' },
            { text: 'Отменить' }
        ];
        let title = this.state.user.id == undefined ? 'Новый пользователь' : this.state.user.name

        return <Dialog ref="Dialog" title={title} actions={actions} modal={true}>
            <div className="user-dialog">
                <TextField onEnterKeyDown={this._onDialogSubmit}
                    hintText="Введите имя"
                    floatingLabelText="Имя пользователя"
                    errorText={this.state.errorUserText}
                    value={this.state.user.name}
                    onChange={this._handleNameChange}
                    maxLength={20}/>
                <TextField onEnterKeyDown={this._onDialogSubmit}
                    hintText="Введите описание"
                    floatingLabelText="Описание пользователя"
                    value={this.state.user.description}
                    onChange={this._handleDescriptionChange}
                    maxLength={255}/>
                <TextField onEnterKeyDown={this._onDialogSubmit}
                    hintText="Введите пароль"
                    floatingLabelText="Пароль"
                    errorText={this.state.errorHashText}
                    value={this.state.user.hash}
                    onChange={this._handleHashChange}
                    maxLength={255} type="password"/>
                <TextField onEnterKeyDown={this._onDialogSubmit}
                    hintText="Введите пароль еще раз"
                    floatingLabelText="Пароль еще раз"
                    errorText={this.state.errorHashCheckText}
                    value={this.state.user.hash_check}
                    onChange={this._handleHashCheckChange}
                    maxLength={255} type="password"/>
            </div>
        </Dialog>
    }
}

export default UserDialog;