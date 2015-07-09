/**
 * Created by Ignatov on 22.06.2015.
 */

import React from 'react';
import {Dialog, TextField} from 'material-ui';

class AuctionDialog extends React.Component {
    constructor()
    {
        super();
        this._onDialogSubmit = this._onDialogSubmit.bind(this);
        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
        this.state = {auction:  { id: 1,
            name: '',
            description: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            startPrice: '0',
            stepPrice: '100',
            images: [ ],
            users: [ ]},
            errorAuctionText: ''};
    }

    _onDialogSubmit()
    {
        if (this.state.auction.name == undefined || this.state.auction.name.length == 0) {
            this.setState({errorUserText : 'Название аукциона обязательно'});
            return;
        }
        this.props.submit(this.state.auction);
        this.refs.Dialog.dismiss();
    }

    _handleNameChange(e)
    {
        let auction = this.state.auction;
        let errorAuctionText = '';
        auction.name = e.target.value;
        if (auction.name.length == 0)
            errorAuctionText = 'Название аукциона обязательно';
        this.setState({auction: auction, errorAuctionText: errorAuctionText});
    }

    _handleDescriptionChange(e)
    {
        let auction = this.state.auction;
        auction.description = e.target.value;
        this.setState({auction: auction});
    }

    show()
    {
        this.refs.Dialog.show();
    }

    render() {
        let actions = [
            { text: 'Сохранить', onTouchTap: this._onDialogSubmit, ref: 'submit' },
            { text: 'Отменить' }
        ];
        let title = this.state.auction.id == undefined ? 'Новый аукцион' : this.state.auction.name

        return <Dialog ref="Dialog" title={title} actions={actions} modal={true}>
            <div className="auction-dialog">
                <TextField
                hintText="Введите название"
                floatingLabelText="Название аукциона"
                errorText={this.state.errorAuctionText}
                value={this.state.auction.name}
                onChange={this._handleNameChange}
                maxLength={20}/>
                <TextField
                hintText="Введите описание"
                floatingLabelText="Описание аукциона"
                value={this.state.auction.description}
                onChange={this._handleDescriptionChange}
                maxLength={255}/>
            </div>
        </Dialog>
    }
}

export default AuctionDialog;