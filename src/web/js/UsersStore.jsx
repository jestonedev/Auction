/**
 * Created by Ignatov on 19.06.2015.
 */
import { Store } from 'flummox';

class UsersStore extends Store {
    constructor(flux)
    {
        super();
        let actions = flux.getActionIds('Users');

        this.register(actions.getUsers, this.getUsers);
        this.register(actions.deleteUser, this.deleteUser);
        this.register(actions.createUser, this.createUser);
        this.register(actions.updateUser, this.updateUser);
    }

    getUsers(users)
    {
        this.setState(
            {
                users: users ? users : []
            }
        );
    }

    deleteUser(user)
    {
        let id = user.id;
        this.setState(
            {
                users: this.state.users.filter( user => {
                    return user.id != id;
                } )
            }
        );
    }

    createUser(user)
    {
        if (user && user.id)
        {
            this.setState(
                {
                    users: this.state.users.concat([ user ])
                }
            );
        }
    }

    updateUser(user)
    {
        let id = user.id;
        this.setState(
            {
                users: this.state.users.map( u => {
                    return u.id == id ? user : u;
                } )
            }
        );
    }
}

export default UsersStore;
