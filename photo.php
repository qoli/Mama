<?php
header('Content-type: image/jpeg');

sleep(5);

$p  = dirname(__FILE__) . '/assets/mama_' . $_GET['PhotoID'] . '.png';
$t1 = $_GET['Text1'];
$t2 = $_GET['Text2'];
$t3 = $_GET['Text3'];

switch ($_GET['PhotoID']) { 
	case 1:
	case 15:
	case 6:
	case 18:
	$posY1 = 280;
	$posY2 = 555;
	break;

	case 21:
	$posY1 = 120;
	$posY2 = 162;
	$posY3 = 202;
	break;

	case 2:
	case 3:
	case 7:
	$posY1 = 260;
	$posY2 = 9999;
	break;
	case 9:
	case 10:
	case 11:
	case 12:
	case 13:
	case 14:
	case 16:
	case 17:
	case 20:
	case 22:
	case 23:
	case 24:
	case 25:
	case 26:
	case 27:
	case 29:
	case 30:
	case 31:
	$posY1 = 300;
	$posY2 = 9999;
	break;

	case 4:
	$posY1 = 295;
	$posY2 = 9999;
	break;

	case 8:
	case 19:
	$posY1 = 283;
	$posY2 = 9999;
	break;

	default:
	$posY1 = 9999;
	$posY2 = 9999;
	break;
}

// Create Image From Existing File
$jpg_image = imagecreatefrompng($p);
$photosize = getimagesize($jpg_image);

// Allocate A Color For The Text
$rgb = imagecolorallocate($jpg_image, 148, 28, 56);

// Set Path to Font File
$font_path = dirname(__FILE__) . '/assets/Font.ttf';


$text = mb_convert_encoding($t1, 'HTML-ENTITIES', 'auto');
$temp = imagettfbbox(ceil(18), 0, $font_path, $text);
$w    = $temp[2] - $temp[6];
unset($temp);
$posX = (imagesx($jpg_image) - $w) / 2;
//var_dump( $w);
imagettftext($jpg_image, 18, 0, $posX, $posY1, $rgb, $font_path, $text);

$text = mb_convert_encoding($t2, 'HTML-ENTITIES', 'auto');
$temp = imagettfbbox(18, 0, $font_path, $text);
$w    = $temp[2] - $temp[6];
unset($temp);
$posX = (imagesx($jpg_image) - $w) / 2;

imagettftext($jpg_image, 18, 0, $posX, $posY2, $rgb, $font_path, $text);

$text = mb_convert_encoding($t3, 'HTML-ENTITIES', 'auto');
$temp = imagettfbbox(18, 0, $font_path, $text);
$w    = $temp[2] - $temp[6];
unset($temp);
$posX = (imagesx($jpg_image) - $w) / 2;

imagettftext($jpg_image, 18, 0, $posX, $posY3, $rgb, $font_path, $text);

imagejpeg($jpg_image);

// Clear Memory
imagedestroy($jpg_image);
?>