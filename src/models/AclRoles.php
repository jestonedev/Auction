<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "acl_roles".
 *
 * @property integer $id_role
 * @property string $role_name
 *
 * @property AclRolePrivileges[] $aclRolePrivileges
 * @property AclPrivileges[] $idPrivileges
 * @property AclUserRoles[] $aclUserRoles
 * @property AclUsers[] $idUsers
 */
class AclRoles extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'acl_roles';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['role_name'], 'required'],
            [['role_name'], 'string', 'max' => 50]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id_role' => 'Id Role',
            'role_name' => 'Role Name',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAclRolePrivileges()
    {
        return $this->hasMany(AclRolePrivileges::className(), ['id_role' => 'id_role']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIdPrivileges()
    {
        return $this->hasMany(AclPrivileges::className(), ['id_privilege' => 'id_privilege'])->viaTable('acl_role_privileges', ['id_role' => 'id_role']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAclUserRoles()
    {
        return $this->hasMany(AclUserRoles::className(), ['id_role' => 'id_role']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIdUsers()
    {
        return $this->hasMany(AclUsers::className(), ['id_user' => 'id_user'])->viaTable('acl_user_roles', ['id_role' => 'id_role']);
    }
}
