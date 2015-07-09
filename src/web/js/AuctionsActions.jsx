/**
 * Created by Ignatov on 19.06.2015.
 */

import { Actions } from 'flummox';
import fetch from 'isomorphic-fetch';

const API_HOST = 'http://itc28/yii/build/web';

class AuctionsActions extends Actions {
    getAuctions()
    {
        return [
            { id: 1, name: "Аукцион № 151", description: "Предмет аукциона: Право заключения договора на установку и эксплуатацию рекламной конструкции сроком на 5 лет по адресу: Иркутская область, город Братск, жилой район Центральный, 190 метров юго-западнее здания № 7 по улице Курчатова",
                startDate: "2013-05-22",
                startTime: "10:00:00",
                endDate: "2013-05-22",
                endTime: "10:05:00",
                startPrice: "7581.60",
                stepPrice: "1000",
                images: [ { filename: "151_1.jpg" }, { filename: "151_2.jpg" } ],
                users: [ {id: 1, name: "Василий"}, {id: 2, name: "Константин"} ]},
            { id: 2, name: "Аукцион № 152", description: "Предмет аукциона: Право заключения договора на установку и эксплуатацию рекламной конструкции сроком на 5 лет по адресу: Иркутская область, город Братск, жилой район Энергетик, 86 метров северо-западнее здания № 6 по улице Пирогова",
                startDate: "2013-05-22",
                startTime: "14:00:00",
                endDate: "2013-05-22",
                endTime: "10:05:00",
                startPrice: "8748.00",
                stepPrice: "1000",
                images: [ { filename: "152_1.jpg" }, { filename: "152_2.jpg" } ],
                users: [ {id: 1, name: "Василий"}, {id: 3, name: "Алексей"} ]}
        ];
    }

    deleteAuction(id)
    {
        return { id: id };
    }

    createAuction(auction)
    {
        auction.id = Math.random();
        return auction;
    }

    updateAuction(auction)
    {
        return auction;
    }
}

export default AuctionsActions;