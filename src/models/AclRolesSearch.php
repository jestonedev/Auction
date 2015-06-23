<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\AclRoles;

/**
 * AclRolesSearch represents the model behind the search form about `app\models\AclRoles`.
 */
class AclRolesSearch extends AclRoles
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id_role'], 'integer'],
            [['role_name'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = AclRoles::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id_role' => $this->id_role,
        ]);

        $query->andFilterWhere(['like', 'role_name', $this->role_name]);

        return $dataProvider;
    }
}
