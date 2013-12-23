<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$VarID = '1.1.4.1224 Beta';
$rand = rand ( 1 , 40 );
?>
<!DOCTYPE html>
<html xmlns:wb=“http://open.weibo.com/wb”>
<head>
  <title>Mama，Hit me again!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="favicon.ico" />
  <!-- Bootstrap -->
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
      <![endif]-->

    </head>
    <body>

      <? if ($rand == 1) : ?>
      <div class="alert alert-warning fade in" style="margin-top: 15px;" >
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <strong>Sorry!</strong> 媽媽和女兒打得有些慘烈，需要搶救…… (伺服器有所緩慢。請耐心等待。)
      </div>

    <? endif; ?>

    <div class="opa isAni clearfix" >

      <div class="right">
        <ul class="nav nav-pills">
          <li class="index"><a href="index.php">構建器</a></li>
          <li class="update"><a href="update.php">更新日誌</a></li>
          <li class="about"><a href="about.php">關於</a></li>
          <li class=""><a href="http://llqoli.com">庫倪先生</a></li>
        </ul>
      </div>
      <div class="left">
        <h2><a href="index.php" ><img src="assets/logo_min.png" /></a></h2>
        <h6>「漫畫和表情圖案」的構建器 <?=$VarID?> </h6>
      </div>
    </div>