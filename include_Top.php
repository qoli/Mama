<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$VarID = '1.1.2.1206';
$rand = rand ( 1 , 15 );
?>
<!DOCTYPE html>
<html>
<head>
  <title>Mama，Hit me again!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Google 分析代碼 -->
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-19058553-1', 'llqoli.com');
  ga('send', 'pageview');

  </script>

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

    <div class="clearfix" >

      <div class="right">
        <ul class="nav nav-pills">
          <li class="index"><a href="index.php">主頁</a></li>
          <li class="preview disabled"><a href="###">預覽</a></li>
          <li class="about"><a href="about.php">關於</a></li>
        </ul>
      </div>
      <div class="left">
        <h2>媽媽，再打我一次．Beta</h2>
        <p><b>「媽媽，再打我一次」</b>的圖像構建器 <?=$VarID?> </p>
      </div>
    </div>