/**
 * Created by Ignatov on 19.06.2015.
 */
import {Flux} from 'flummox';
import UsersActions from './UsersActions';
import UsersStore from './UsersStore';


export default class extends Flux {
    constructor()
    {
        super();
        this.createActions('Users', UsersActions);
        this.createStore('Users', UsersStore, this);
    }
}