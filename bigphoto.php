<?php
session_start();
set_time_limit(60);
include 'function.php';

if ($_SESSION['PhotoList'] == "") {
	implode_image(ExplodeArray('|photo.php?PhotoURL=pngs/LINE/LINE%20內置表情/270@2x.png&Text1=還沒有東西哦，去首頁試試&Text2=&Text3=&posy=360&posy2=0&posy3=0'));
} else {
	implode_image(ExplodeArray($_SESSION['PhotoList']), 'V');
}