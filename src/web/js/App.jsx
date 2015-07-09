/**
 * Created by Ignatov on 18.06.2015.
 */

import React from 'react';
import {AppBar, LeftNav, Styles, MenuItem } from 'material-ui';
import {Router, RouteHandler} from 'react-router';
import Auth from './Auth.js';

var InjectTapEventPlugin = require("react-tap-event-plugin");
InjectTapEventPlugin();

class App extends React.Component {
    constructor()
    {
        super();
        this._themeManager = new Styles.ThemeManager();
        this._routePage = this._routePage.bind(this)
        this._toggleNavBar = this._toggleNavBar.bind(this)
        this._selectedNavPage = this._selectedNavPage.bind(this)
        this._setStateOnAuth = this._setStateOnAuth.bind(this)
        this.state = {
            loggedIn: Auth.loggedIn()
        };
    }

    _setStateOnAuth(loggedIn) {
        this.setState({
            loggedIn: loggedIn
        });
    }

    componentWillMount() {
        Auth.addCallback(this._setStateOnAuth);
        Auth.login();
    }

    static get contextTypes()  {
        return {
            router: React.PropTypes.func
        }
    }

    static get childContextTypes() {
        return {
            muiTheme: React.PropTypes.object
        }
    }

    getChildContext() {
        return {
            muiTheme: this._themeManager.getCurrentTheme()
        };
    }

    _toggleNavBar() {
        this.refs.LeftNav.toggle();
    }

    _routePage(e, key, payload) {
        this.context.router.transitionTo(payload.route);
    }

    _selectedNavPage(menuItems) {
        for (let i = 0; i < menuItems.length; i++) {
            let currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
        }
    }

    render() {
        let menuItems = [
            { route: 'home', text: 'Главная' },
            { route: 'auctions', text: 'Аукционы' },
            { route: 'users', text: 'Пользователи' },
            {
                type: MenuItem.Types.LINK,
                payload: 'http://www.bratsk-city.ru',
                text: 'Сайт администрации'
            }
        ];
        if (Auth.loggedIn())
            menuItems.push({route: 'logout', text: 'Выйти'});
        else
            menuItems.push({route: 'login', text: 'Войти'});
        (Auth.loggedIn() ? ['login'] : ['auctions', 'auction', 'users']).forEach((route) => {
            if (this.context.router.isActive(route))
                this.context.router.transitionTo('home');
        });
        let title = this.context.router.isActive('auctions') ? 'Аукционы' :
                    this.context.router.isActive('auction') ? 'Аукцион' :
                    this.context.router.isActive('users') ? 'Пользователи' :
                    this.context.router.isActive('login') ? 'Введите логин и пароль' :
                    this.context.router.isActive('home') ? 'Главная' : '';
        return <div>
            <AppBar title={title} onLeftIconButtonTouchTap={this._toggleNavBar}
                iconClassNameRight="icomoon-icon-home3"
                onRightIconButtonTouchTap={ () => { this.context.router.transitionTo('home'); }} />
            <LeftNav id='left-nav' ref='LeftNav' menuItems={menuItems} docked={false} onChange={this._routePage}
                selectedIndex={this._selectedNavPage(menuItems)} />
            <div className="app-wrapper">
                <RouteHandler {...this.props}/>
            </div>
        </div>;
    }
}

export default App;