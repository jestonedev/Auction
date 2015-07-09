/**
 * Created by Ignatov on 18.06.2015.
 */
import React from 'react';
import Flux from 'flummox/component';
import Auth from './Auth.js';
import AuctionsList from './AuctionsList.jsx';
import AuctionDialog from './AuctionDialog.jsx';
import AuctionsToolbar from './AuctionsToolbar.jsx';

class Auctions extends React.Component {
    static routerWillRun ({state, flux}) {
        let auctionActions = flux.getActions('Auctions');
        auctionActions.getAuctions();
    }

    constructor()
    {
        super();
        this.showAddAuctionDialog = this.showAddAuctionDialog.bind(this);
        this.showUpdateAuctionDialog = this.showUpdateAuctionDialog.bind(this);
        this.addAuction = this.addAuction.bind(this);
        this.updateAuction = this.updateAuction.bind(this);
        this.deleteAuction = this.deleteAuction.bind(this);
        this.refreshAuctions = this.refreshAuctions.bind(this);
    }

    static willTransitionTo(transition, params, query, callback)
    {
        if (!Auth.loggedIn())
            transition.redirect('login', params, query);
        if (callback)
            callback();
    }

    showAddAuctionDialog()
    {
        this.refs.AddAuctionDialog.setState({ auction: {}});
        this.refs.AddAuctionDialog.show();
    }

    showUpdateAuctionDialog(auction)
    {
        this.refs.UpdateAuctionDialog.setState({auction: auction });
        this.refs.UpdateAuctionDialog.show();
    }

    refreshAuctions()
    {
        this.props.flux.getActions('Auctions').getAuctions();
    }

    addAuction(auction)
    {
        this.props.flux.getActions('Auctions').createAuction(auction);
    }

    updateAuction(auction)
    {
        this.props.flux.getActions('Auctions').updateAuction(auction);
    }

    deleteAuction(id)
    {
        this.props.flux.getActions('Auctions').deleteAuction(id);
    }

    render() {
        return <div>
            <header>
                <AuctionsToolbar addAuction={this.showAddAuctionDialog} refreshAuctions={this.refreshAuctions}/>
            </header>
            <section>
                <Flux connectToStores={['Auctions']}>
                    <AuctionsList updateAuction={this.showUpdateAuctionDialog} deleteAuction={this.deleteAuction}  />
                </Flux>
            </section>
            <footer></footer>
            <AuctionDialog ref="AddAuctionDialog" submit={this.addAuction}/>
            <AuctionDialog ref="UpdateAuctionDialog" submit={this.updateAuction}/>
        </div>;
    }
};

export default Auctions;