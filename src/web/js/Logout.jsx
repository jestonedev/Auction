/**
 * Created by Ignatov on 19.06.2015.
 */

import React from 'react';
import Auth from './Auth.js';

class Logout extends React.Component {

    static willTransitionTo(transition, params, query, callback)
    {
        Auth.logout();
        transition.abort();
        if (callback)
            callback();
    }

    render() {
        return null;
    }
};

export default Logout;