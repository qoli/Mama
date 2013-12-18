<?php
session_start();
set_time_limit(60);
include 'function.php';

if ($_SESSION['PhotoList'] == "") {
	implode_image(ExplodeArray('|photo.php?PhotoID=2&Text1=别玩你妈，加入的内容呢？&Text2=3'));
} else {
	implode_image(ExplodeArray($_SESSION['PhotoList']), 'V');
}