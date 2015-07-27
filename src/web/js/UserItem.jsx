/**
 * Created by Ignatov on 22.06.2015.
 */

import React from 'react';
import { ListItem, IconButton, FontIcon } from 'material-ui';

class UserItem extends React.Component {
    constructor()
    {
        super();
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    deleteUser = (e) =>
    {
        this.props.deleteUser(this.props.user.id);
    }

    updateUser = (e) =>
    {
        this.props.updateUser(this.props.user);
    }


    render() {
        let deleteButton = <IconButton tooltip="Удалить" className="user-delete-button" iconClassName="icomoon-icon-delete"
                                onClick={this.deleteUser}>
                            </IconButton>;
        let updateButton = <IconButton tooltip="Изменить" className="user-update-button" iconClassName="icomoon-icon-edit"
        onClick={this.updateUser}></IconButton>;
        let leftIcon = <FontIcon className="icomoon-icon-user"/>;

        return  <ListItem className="user-item" secondaryText={this.props.user.description}
                    leftIcon={leftIcon} secondaryTextLines={1}>
                { deleteButton }
                { updateButton }
                { this.props.user.name }
                </ListItem>
    }
}

export default UserItem;