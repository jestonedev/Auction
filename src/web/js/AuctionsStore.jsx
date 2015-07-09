/**
 * Created by Ignatov on 19.06.2015.
 */
import { Store } from 'flummox';

class AuctionsStore extends Store {
    constructor(flux)
    {
        super();
        let actions = flux.getActionIds('Auctions');

        this.register(actions.getAuctions, this.getAuctions);
        this.register(actions.deleteAuction, this.deleteAuction);
        this.register(actions.createAuction, this.createAuction);
        this.register(actions.updateAuction, this.updateAuction);
    }

    getAuctions(auctions)
    {
        this.setState(
            {
                auctions: auctions ? auctions : []
            }
        );
    }

    deleteAuction(auction)
    {
        let id = auction.id;
        this.setState(
            {
                auctions: this.state.auctions.filter( auction => {
                    return auction.id != id;
                } )
            }
        );
    }

    createAuction(auction)
    {
        if (auction && auction.id)
        {
            this.setState(
                {
                    auctions: this.state.auctions.concat([ auction ])
                }
            );
        }
    }

    updateAuction(auction)
    {
        let id = auction.id;
        this.setState(
            {
                auctions: this.state.auctions.map( a => {
                    return a.id == id ? auction : a;
                } )
            }
        );
    }
}

export default AuctionsStore;
