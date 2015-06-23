/**
 * Created by Ignatov on 18.06.2015.
 */

import React from 'react';
import {AppBar, LeftNav, Styles, MenuItem } from 'material-ui';
import {Router, RouteHandler} from 'react-router';

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
        let title = this.context.router.isActive('auctions') ? 'Аукционы' :
                    this.context.router.isActive('auction') ? 'Аукцион' :
                    this.context.router.isActive('users') ? 'Пользователи' :
                    this.context.router.isActive('user') ? 'Пользователь' :
                    this.context.router.isActive('home') ? 'Главная' : '';
        return <div>
            <AppBar title={title} onLeftIconButtonTouchTap={this._toggleNavBar}/>
            <LeftNav id='left-nav' ref='LeftNav' menuItems={menuItems} docked={false} onChange={this._routePage}
                selectedIndex={this._selectedNavPage(menuItems)} />
            <RouteHandler {...this.props}/>
        </div>;
    }
}

export default App;