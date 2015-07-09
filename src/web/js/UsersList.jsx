/**
 * Created by Ignatov on 19.06.2015.
 */

import React from 'react';
import { List, Paper } from 'material-ui';
import UserItem from './UserItem.jsx';

class UsersList extends React.Component {
    render()
    {
        return <Paper zDepth={1} className="users-list"><List>
            {this.props.users.map(user => {
               return <UserItem key={user.id} updateUser={this.props.updateUser}
               deleteUser={this.props.deleteUser} user={user}/>
            })}
        </List></Paper>;
    }
}

export default UsersList;