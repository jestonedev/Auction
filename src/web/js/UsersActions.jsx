/**
 * Created by Ignatov on 19.06.2015.
 */

import { Actions } from 'flummox';
import fetch from 'isomorphic-fetch';

const API_HOST = 'http://itc28/yii/build/web';

class UsersActions extends Actions {
    getUsers()
    {
        return [
            { id: 1, name: "Василий", description: "Тут может быть ваша реклама" },
            { id: 2, name: "Константин", description: "Хуяк, хуяк и в продакшен" },
            { id: 3, name: "Алексей", description: "Хто тут?" }
        ]
    }

    deleteUser(id)
    {
        return { id: id }
    }

    createUser(user)
    {
        user.id = Math.random();
        return user;
    }

    updateUser(user)
    {
        return { id: 3, name: "Зигмунд" }
    }
}

export default UsersActions;