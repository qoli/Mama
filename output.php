<?php

include 'function.php';

$BaseDir     = dirname(__FILE__);
$Folder      = $BaseDir . "/pngs";
$o           = get_files($Folder);
$i           = array();
$type_org[0] = 1; //類型
$type_org[1] = 0; //posx
$type_org[2] = 390; //posy
$type_org[3] = -10;
$type_org[4] = -10;
$baseid      = NULL;
$type        = $type_org;

asort($o);
dump(count($o), '總計');

echo "<hr/><h5>特殊設定：</h5>";

foreach ($o as $v) {
    
    $imageArray = getimagesize($v);
    $wwww_path  = $v;
    $wwww_path  = str_replace($BaseDir . '/', '', $wwww_path);
    $v_org      = $v;
    $v          = str_replace($Folder, '', $v);
    $v          = explode('/', $v);
    
    if ($v[3] == '_baseset.txt') {
        $type_set = file_get_contents($v_org);
        $type     = explode('|', $type_set);
        $baseid   = $v[2];
        dump($type, $baseid . '=' . $v[2]);
    }
    
    if ($baseid != $v[2]) {
        $type = $type_org;
    }
    
    if ($v[3] != "" and $v[3] != '.DS_Store' and strstr($v[3], '.txt') != '.txt') {
        
        $text = explode('.', $v[3]);
        
        if (file_exists($v_org . '.txt')) {
            $type_set = file_get_contents($v_org . '.txt');
            $type     = explode('|', $type_set);
        }
        
        $i[$v[1]][$v[2]][$v[3]]['path']   = $wwww_path;
        $i[$v[1]][$v[2]][$v[3]]['name']   = $v[3];
        $i[$v[1]][$v[2]][$v[3]]['text']   = $text[0];
        $i[$v[1]][$v[2]][$v[3]]['width']  = $imageArray[0];
        $i[$v[1]][$v[2]][$v[3]]['height'] = $imageArray[1];
        $i[$v[1]][$v[2]][$v[3]]['type']   = $type[0];
        $i[$v[1]][$v[2]][$v[3]]['posx']   = $type[1];
        $i[$v[1]][$v[2]][$v[3]]['posy']   = $type[2];
        $i[$v[1]][$v[2]][$v[3]]['posy2']  = $type[3];
        $i[$v[1]][$v[2]][$v[3]]['posy3']  = $type[4];
    }
}

dump($i, 'Photo JSON');

$json     = json_encode($i);
$jsonPath = $Folder . '/photos.json';
$chmod    = chmod($jsonPath, 777);
$fp       = fopen($jsonPath, 'wb');
$o        = fwrite($fp, $json);
fclose($fp);