/**
 * Created by Ignatov on 22.06.2015.
 */

import React from 'react';
import { ListItem, IconButton, Avatar, FontIcon } from 'material-ui';

class AuctionItem extends React.Component {
    constructor()
    {
        super();
        this.deleteAuction = this.deleteAuction.bind(this);
        this.updateAuction = this.updateAuction.bind(this);
    }

    deleteAuction(e)
    {
        this.props.deleteAuction(this.props.auction.id);
    }

    updateAuction(e)
    {
        this.props.updateAuction(this.props.auction);
    }

    render() {
        let updateButton = <IconButton tooltip="Изменить" className="auction-update-button"
            iconClassName="icomoon-icon-edit" onClick={this.updateAuction}></IconButton>;
        let insertButton = <IconButton className="auction-delete-button" iconClassName="icomoon-icon-delete" tooltip="Удалить"
                    onClick={this.deleteAuction}></IconButton>;
        let leftIcon = <FontIcon className="icomoon-icon-hammer2"/>;
        return  <ListItem className="auction-item"
            secondaryText={this.props.auction.description}
            secondaryTextLines={2} leftIcon={leftIcon}>
            { insertButton }
            { updateButton }
            { this.props.auction.name }
        </ListItem>
    }
}

export default AuctionItem;