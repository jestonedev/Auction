/**
 * Created by Ignatov on 22.06.2015.
 */

import React from 'react';
import { ListItem, IconButton, Avatar, FontIcon } from 'material-ui';

class UsersItem extends React.Component {
    constructor()
    {
        super();
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(e)
    {
        this.props.deleteUser(this.props.user.id);
        e.stopPropagation();
    }


    render() {
        let deleteButton = <IconButton iconClassName="icomoon-icon-delete"
                                onClick={this.deleteUser}>
                            </IconButton>;

        return  <ListItem className="user-item" secondaryText={this.props.user.description}
                    leftAvatar={<Avatar src="./web/images/avatar.jpg" />} rightIconButton={deleteButton}
                    secondaryTextLines={2}>
                tt { this.props.user.name }
                </ListItem>
    }
}

export default UsersItem;