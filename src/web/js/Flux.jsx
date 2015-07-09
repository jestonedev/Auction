/**
 * Created by Ignatov on 19.06.2015.
 */
import {Flux} from 'flummox';
import UsersActions from './UsersActions.jsx';
import UsersStore from './UsersStore.jsx';
import AuctionsActions from './AuctionsActions.jsx';
import AuctionsStore from './AuctionsStore.jsx';


export default class extends Flux {
    constructor()
    {
        super();
        this.createActions('Users', UsersActions);
        this.createStore('Users', UsersStore, this);
        this.createActions('Auctions', AuctionsActions);
        this.createStore('Auctions', AuctionsStore, this);
    }
}