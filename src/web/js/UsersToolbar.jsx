/**
 * Created by Ignatov on 22.06.2015.
 */

import React from 'react';
import { Toolbar, ToolbarGroup, IconButton  } from 'material-ui';

class UsersToolbar extends React.Component {

    render() {
        return <Toolbar className="users-toolbar">
            <ToolbarGroup>
                <IconButton iconClassName="icomoon-icon-add" tooltip="Добавить" onClick={this.props.addUser}>
                </IconButton>
                <IconButton iconClassName="icomoon-icon-refresh" tooltip="Обновить" onClick={this.props.refreshUsers}>
                </IconButton>
            </ToolbarGroup>
        </Toolbar>
    }
}

export default UsersToolbar;