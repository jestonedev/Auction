<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "acl_users".
 *
 * @property integer $id_user
 * @property string $user_name
 *
 * @property AclUserPrivileges[] $aclUserPrivileges
 * @property AclPrivileges[] $idPrivileges
 * @property AclUserRoles[] $aclUserRoles
 * @property AclRoles[] $idRoles
 */
class AclUsers extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'acl_users';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_name'], 'required'],
            [['user_name'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id_user' => 'Id User',
            'user_name' => 'User Name',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAclUserPrivileges()
    {
        return $this->hasMany(AclUserPrivileges::className(), ['id_user' => 'id_user']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIdPrivileges()
    {
        return $this->hasMany(AclPrivileges::className(), ['id_privilege' => 'id_privilege'])->viaTable('acl_user_privileges', ['id_user' => 'id_user']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAclUserRoles()
    {
        return $this->hasMany(AclUserRoles::className(), ['id_user' => 'id_user']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIdRoles()
    {
        return $this->hasMany(AclRoles::className(), ['id_role' => 'id_role'])->viaTable('acl_user_roles', ['id_user' => 'id_user']);
    }
}
