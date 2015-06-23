/**
 * Created by Ignatov on 18.06.2015.
 */
import React from 'react';
import Flux from 'flummox/component';
import UsersList from './UsersList';
import UsersToolbar from './UsersToolbar';
import UserDialog from './UserDialog';

class Users extends React.Component {
    static routerWillRun ({state, flux}) {
        let userActions = flux.getActions('Users');
        userActions.getUsers();
    }

    constructor()
    {
        super();
        this.showAddUserDialog = this.showAddUserDialog.bind(this);
        this.showUpdateUserDialog = this.showUpdateUserDialog.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.refreshUsers = this.refreshUsers.bind(this);
    }

    showAddUserDialog()
    {
        this.refs.AddUserDialog.setState({ user: {}, errorUserText: '', errorHashText: '', errorHashCheckText: ''});
        this.refs.AddUserDialog.show();
    }

    showUpdateUserDialog(user)
    {
        this.refs.UpdateUserDialog.setState({ user: user, errorUserText: '', errorHashText: '', errorHashCheckText: '' });
        this.refs.UpdateUserDialog.show();
    }

    addUser(user)
    {
        this.props.flux.getActions('Users').createUser(user);
    }

    updateUser(user)
    {
        this.props.flux.getActions('Users').updateUser(user);
    }

    deleteUser(id)
    {
        this.props.flux.getActions('Users').deleteUser(id);
    }


    refreshUsers()
    {
        this.props.flux.getActions('Users').getUsers();
    }

    render() {
        return <div>
            <header>
                <UsersToolbar addUser={this.showAddUserDialog} refreshUsers={this.refreshUsers}/>
            </header>
            <section>
                <Flux connectToStores={['Users']}>
                    <UsersList updateUser={this.showUpdateUserDialog} deleteUser={this.deleteUser} />
                </Flux>
            </section>
            <footer></footer>
            <UserDialog ref="AddUserDialog" submit={this.addUser}/>
            <UserDialog ref="UpdateUserDialog" submit={this.updateUser}/>
        </div>;
    }
};

export default Users;