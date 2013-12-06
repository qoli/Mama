<?php
header('Content-Disposition: attachment; filename="mamailoveu.jpg"');
session_start();
set_time_limit(60);

$t = $_SESSION['PhotoList'];

$t = explode('|', $t);

foreach ($t as $value) {
	if ($value != "") {
		//$images[] = 'http://192.168.1.235/' . $value;
		$images[] = 'http://tools.llqoli.com/Mama/' . $value;
	}
}

//var_dump($images);

implode_image($images, 'V');

function implode_image($images, $align = 'V') {
	header('Content-type:image/jpeg');
	if(!is_array($images) || count($images) <= 1) {
		return false;
	}
	$images_info = array();
	foreach($images as $image) {
		if($info = getimagesize($image))
			$images_info[] = $info;
		else
			return false;
	}
	unset($info);
	$the_max_width = 0;
	$the_max_height = 0;
	$total_height = 0;
	$total_width = 0;
	foreach($images_info as $info) {
		if($info[0] > $the_max_width) $the_max_width = $info[0];
		if($info[1] > $the_max_height) $the_max_height = $info[1];
		$total_width += $info[0];
		$total_height += $info[1];
	}
	if(strtoupper($align) == 'V') {
		if(function_exists('imagecreatetruecolor')) {
			$dst_im = imagecreatetruecolor($the_max_width, $total_height);
		} else {
			$dst_im = imagecreate($the_max_width, $total_height);
		}
		$startX = 0;
		$startY = 0;
		for($i = 0; $i < count($images); $i++) {
			$src_im = imagecreatefromjpeg($images[$i]);
			imagecopymerge($dst_im, $src_im, $startX , $startY , 0, 0, $images_info[$i][0] , $images_info[$i][1] , 100);
			$startY += $images_info[$i][1];
			imagedestroy($src_im);
		}
		imagejpeg($dst_im);
	} elseif(strtoupper($align) == 'H') {
		if(function_exists('imagecreatetruecolor')) {
			$dst_im = imagecreatetruecolor($total_width, $the_max_height);
		} else {
			$dst_im = imagecreate($total_width, $the_max_height);
		}
		$startX = 0;
		$startY = 0;
		for($i = 0; $i < count($images); $i++) {
			$src_im = imagecreatefromjpeg($images[$i]);
			imagecopymerge($dst_im, $src_im, $startX , $startY , 0, 0, $images_info[$i][0] , $images_info[$i][1] , 100);
			$startX += $images_info[$i][0];
			imagedestroy($src_im);
		}
		imagejpeg($dst_im);
	}
}
?>