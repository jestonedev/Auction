/**
 * Created by Ignatov on 25.06.2015.
 */
export default class Auth {

    static login(login, password, callback) {
        callback = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (callback)
                callback(true);
            Auth.onChange(true);
            return;
        }

        Auth._pretendRequest(login, password, (result) => {
            if (result.authenticated) {
                localStorage.token = result.token;
                if (callback)
                    callback(true);
                Auth.onChange(true);
            } else {
                if (callback) callback(false);
                Auth.onChange(false);
            }
        });
    }

    static _pretendRequest(login, password, callback) {
        setTimeout(() => {
            if (login === 'test' && password === 'password1') {
                callback({
                    authenticated: true,
                    token: Math.random().toString(36).substring(7)
                });
            } else {
                callback({authenticated: false});
            }
        }, 0);
    }

    static logout(callback) {
        delete localStorage.token;
        if (callback)
            callback();
        Auth.onChange(false);
    }

    static getToken() {
        return localStorage.token;
    }

    static loggedIn() {
        return !!localStorage.token;
    }

    static onChange() {
        Auth._callbacks = Auth._callbacks || [];
        for (let i = 0; i < Auth._callbacks.length; i++)
            Auth._callbacks[i]();
    }

    static addCallback(callback)
    {
        Auth._callbacks = Auth._callbacks || [];
        Auth._callbacks.push(callback);
    }
}