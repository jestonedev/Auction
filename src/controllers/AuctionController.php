<?php

namespace app\controllers;

class AuctionController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

}
