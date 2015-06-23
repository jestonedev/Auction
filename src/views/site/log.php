<?php
use yii\helpers\Html;
use yii\widgets\LinkPager;
?>
    <h1>Logs</h1>
<ul>
<?php foreach ($logs as $log): ?>
    <li>
        <?= Html::encode("{$log->id_record} ({$log->user_name})") ?>:
        <?= $log->operation_time ?>
    </li>
<?php endforeach; ?>
</ul>
<?= LinkPager::widget(['pagination' => $pagination]) ?>