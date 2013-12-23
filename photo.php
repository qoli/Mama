<?php
include 'function.php';

$p     = dirname(__FILE__) . '/' . $_GET['PhotoURL'];
$t1    = $_GET['Text1'];
$t2    = $_GET['Text2'];
$t3    = $_GET['Text3'];
$posY1 = $_GET['posy'];
$posY2 = $_GET['posy2'];
$posY3 = $_GET['posy3'];

//dump($_GET);

// 獲得圖片數據
$image     = imagecreatefrompng($p);
$photosize = getimagesize($p);

$rgb = imagecolorallocate($image, 148, 28, 56);

// 判斷是否大於 440
if ($photosize[0] < 440) {
    
    $color = imagecolorallocatealpha($image, 255, 255, 255, 127);
    imagealphablending($image, false); //关闭混合模式，以便透明颜色能覆盖原画布
    imagesavealpha($image, true);
    imagecolortransparent($image, $color);
    
    $w = 440 - $photosize[0];
    $h = 440 - $photosize[1];
    
    $dst_im = imagecreatetruecolor(440, 440);
    imagealphablending($dst_im, false); //关闭混合模式，以便透明颜色能覆盖原画布
    imagesavealpha($dst_im, true);
    
    imagefill($dst_im, 0, 0, $color); //填充
    imagecopyresampled($dst_im, $image, $w / 2, $h / 2, 0, 0, $photosize[0], $photosize[1], $photosize[0], $photosize[1]);
    $image = $dst_im;

    // Allocate A Color For The Text
    $rgb = imagecolorallocate($image, 80, 80, 80);
}

$image = OutputPNG($image, $posY1, $rgb, $t1);
$image = OutputPNG($image, $posY2, $rgb, $t2);
$image = OutputPNG($image, $posY3, $rgb, $t3);

header('Content-type: image/png');
imagepng($image);

// Clear Memory
imagedestroy($image);
?>
