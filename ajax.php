<?php
session_start();
$_SESSION['PhotoList'] = $_POST['SRC'];

var_dump($_SESSION['PhotoList']);