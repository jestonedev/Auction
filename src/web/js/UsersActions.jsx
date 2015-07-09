/**
 * Created by Ignatov on 19.06.2015.
 */

import { Actions } from 'flummox';
import fetch from 'isomorphic-fetch';

const API_HOST = 'http://itc28/auction/build/web';

class UsersActions extends Actions {

    async getUsers()
    {
        return (await fetch(`${API_HOST}/?r=user/index`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                })).json();
    }

    deleteUser(id)
    {
        return { id: id };
    }

    createUser(user)
    {
        user.id = Math.random();
        return user;
    }

    updateUser(user)
    {
        user.hash = undefined;
        user.hash_check = undefined;
        return user;    //TODO - don't save hash password on client
    }
}

export default UsersActions;