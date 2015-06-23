<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "acl_user_roles".
 *
 * @property integer $id_user
 * @property integer $id_role
 *
 * @property AclRoles $idRole
 * @property AclUsers $idUser
 */
class AclUserRoles extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'acl_user_roles';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id_user', 'id_role'], 'required'],
            [['id_user', 'id_role'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id_user' => 'Id User',
            'id_role' => 'Id Role',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIdRole()
    {
        return $this->hasOne(AclRoles::className(), ['id_role' => 'id_role']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIdUser()
    {
        return $this->hasOne(AclUsers::className(), ['id_user' => 'id_user']);
    }
}
