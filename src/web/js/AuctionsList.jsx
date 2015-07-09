/**
 * Created by Ignatov on 19.06.2015.
 */

import React from 'react';
import { List, Paper } from 'material-ui';
import AuctionItem from './AuctionItem.jsx';

class AuctionsList extends React.Component {
    render()
    {
        return <Paper zDepth={1} className="auctions-list"><List>
            {this.props.auctions.map(auction => {
                return <AuctionItem key={auction.id} updateAuction={this.props.updateAuction}
                deleteAuction={this.props.deleteAuction} auction={auction}/>
            })}
        </List></Paper>;
    }
}

export default AuctionsList;