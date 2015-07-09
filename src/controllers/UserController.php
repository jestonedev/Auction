<?php

namespace app\controllers;

use app\models\User;
use yii\helpers\Json;

class UserController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $users = new User();
        return $this->renderAjax('index', ['users' => $users->find()->all()]);
    }
}
