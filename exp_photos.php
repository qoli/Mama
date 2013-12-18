<?php

include 'function.php';

$BaseDir = dirname( __FILE__ );
$Folder = $BaseDir."/pngs";

$o = get_files( $Folder );

$i = array();
foreach ( $o as $v ) {

	$imageArray = getimagesize($v);
	$wwww_path = $v;
	$wwww_path = str_replace($BaseDir, '', $wwww_path);
	$v = str_replace( $Folder, '', $v );
	$v = explode( '/', $v );

	//dump($v,'explode');

	if ( $v[3] != "" and $v[3] != '.DS_Store') {
		$i[$v[1]][$v[2]][$v[3]]['path'] = $wwww_path;
		$i[$v[1]][$v[2]][$v[3]]['name'] = $v[3];
		$i[$v[1]][$v[2]][$v[3]]['text'] = $v[3];
		$i[$v[1]][$v[2]][$v[3]]['width'] = $imageArray[0];
		$i[$v[1]][$v[2]][$v[3]]['height'] = $imageArray[1];
		$i[$v[1]][$v[2]][$v[3]]['type'] = $imageArray[2];
		$i[$v[1]][$v[2]][$v[3]]['posx'] = 0;
		$i[$v[1]][$v[2]][$v[3]]['posy'] = $imageArray[1] - 20;
	}
}

dump($i,'Photo JSON');

$json = json_encode($i);
$jsonPath = $Folder.'/photos.json';
$chmod = chmod($jsonPath,777);
$fp = fopen($jsonPath, 'wb');
$o = fwrite($fp, $json);
fclose($fp);