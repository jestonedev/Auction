/**
 * Created by Ignatov on 19.06.2015.
 */

import React from 'react';
import { List } from 'material-ui';
import UsersItem from './UsersItem';

class UsersList extends React.Component {
    render()
    {
        return <List>
            {this.props.users.map(user => {
               return <UsersItem key={user.id} deleteUser={this.props.deleteUser} user={user}/>
            })}
        </List>;
    }
}

export default UsersList;