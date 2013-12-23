<?php

/**
 * 除错变量
 * @param var $vars 除错目标
 * @param str $label 标题头
 * @param bool $return 返回值而不输出
 */
function dump($vars, $label = '', $return = false)
{
    echo '<hr style="border: none;border-bottom: 1px #ccc solid;" >';
    if (is_bool($vars)) {
        var_dump($vars);
    } else {
        if (ini_get('html_errors')) {
            $content = "<pre style='word-break:break-all;' >\n";
            if ($label != '') {
                $content .= "<strong>{$label} :</strong>\n";
            }
            $content .= htmlspecialchars(print_r($vars, true));
            $content .= "\n</pre>\n";
        } else {
            $content = $label . " :\n" . print_r($vars, true);
        }
        if ($return) {
            return $content;
        }
        echo $content;
    }
    return null;
}

/**
 * 獲得圖片列表
 * @param  [type] $dir [description]
 * @return [type]      [description]
 */
function get_files($dir)
{
    $files = array();
    
    if (!is_dir($dir)) {
        return $files;
    }
    
    $d = dir($dir);
    while (false !== ($file = $d->read())) {
        if ($file != '.' && $file != '..') {
            $filename = $dir . "/" . $file;
            
            if (is_file($filename)) {
                $files[] = $filename;
            } else {
                $files = array_merge($files, get_files($filename));
            }
        }
    }
    $d->close();
    return $files;
}

function ExplodeArray($PhotoArray)
{
    $PhotoArray = explode('|', $PhotoArray);
    
    foreach ($PhotoArray as $value) {
        if ($value != "") {
            //$images[] = 'http://192.168.1.235/' . $value;
            $images[] = 'http://tools.llqoli.com/Mama/' . $value;
        }
    }
    
    return $images;
}

function implode_image($images, $align = 'V')
{
    header('Content-type: image/png');
    if (!is_array($images) || count($images) < 1) {
        return false;
    }
    $images_info = array();
    foreach ($images as $image) {
        if ($info = getimagesize($image))
            $images_info[] = $info;
        else
            return false;
    }
    unset($info);
    $the_max_width  = 0;
    $the_max_height = 0;
    $total_height   = 0;
    $total_width    = 0;
    foreach ($images_info as $info) {
        if ($info[0] > $the_max_width)
            $the_max_width = $info[0];
        if ($info[1] > $the_max_height)
            $the_max_height = $info[1];
        $total_width += $info[0];
        $total_height += $info[1];
    }
    if (strtoupper($align) == 'V') {
        $dst_im = imagecreatetruecolor($the_max_width, $total_height);
        imagealphablending($dst_im,false);
        imagesavealpha($dst_im, true);
		$color = imagecolorallocatealpha($dst_im, 255, 255, 255, 127);
        imagefill($dst_im, 0, 0, $color); //填充
        $startX = 0;
        $startY = 0;
        for ($i = 0; $i < count($images); $i++) {
        	$URL = cn_urlencode($images[$i]);
        	//dump($URL);
            $src_im = imagecreatefrompng($URL);
		    imagealphablending($src_im, false); //关闭混合模式，以便透明颜色能覆盖原画布
		    imagesavealpha($src_im, true);
            imagecopyresampled($dst_im, $src_im, $startX, $startY, 0, 0, $images_info[$i][0], $images_info[$i][1], $images_info[$i][0], $images_info[$i][1]);
            $startY += $images_info[$i][1];
            imagedestroy($src_im);
        }
        imagepng($dst_im);
    } elseif (strtoupper($align) == 'H') {
        if (function_exists('imagecreatetruecolor')) {
            $dst_im = imagecreatetruecolor($total_width, $the_max_height);
        } else {
            $dst_im = imagecreate($total_width, $the_max_height);
        }
        $startX = 0;
        $startY = 0;
        for ($i = 0; $i < count($images); $i++) {
            //$src_im = imagecreatefromjpeg($images[$i]);
            $src_im = imagecreatefrompng($images[$i]);
            imagecopymerge($dst_im, $src_im, $startX, $startY, 0, 0, $images_info[$i][0], $images_info[$i][1], 100);
            $startX += $images_info[$i][0];
            imagedestroy($src_im);
        }
        imagepng($dst_im);
    }
}

function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct)
{
    $opacity = $pct;
    // getting the watermark width
    $w       = imagesx($src_im);
    // getting the watermark height
    $h       = imagesy($src_im);
    
    // creating a cut resource
    $cut = imagecreatetruecolor($src_w, $src_h);
    // copying that section of the background to the cut
    imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h);
    // inverting the opacity
    //$opacity = 100 - $opacity;
    
    // placing the watermark now
    imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h);
    imagecopymerge($dst_im, $cut, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $opacity);
}

function cn_urlencode( $url ){
      $pregstr   =  "/[\x{4e00}-\x{9fa5}]+/u" ; //UTF-8中文正则
     if (preg_match_all( $pregstr , $url , $matchArray )){ //匹配中文，返回数组
         foreach ( $matchArray [0]  as   $key => $val ){
             $url = str_replace ( $val , urlencode( $val ),  $url ); //将转译替换中文
         }
         if ( strpos ( $url , ' ' )){ //若存在空格
             $url = str_replace ( ' ' , '%20' , $url );
         }
     }
     return   $url ;
}

function isZHCN($str) {
    $strGbk = iconv("UTF-8", "GBK//IGNORE", $str);
    $strGb2312 = iconv("UTF-8", "GB2312//IGNORE", $str);
    if ($strGbk == $strGb2312) {
        return true;
    } else {
        return false;
    }
}

function OutputPNG($image, $posY, $rgb, $text) {
    $font_path = dirname(__FILE__) . '/assets/AdobeHeitiStd-Regular.otf';
    $text = mb_convert_encoding($text, 'HTML-ENTITIES', 'auto');
    //$text = mb_convert_encoding($text, 'UTF-8', 'auto');
    $temp = imagettfbbox(ceil(18), 0, $font_path, $text);
    $w    = $temp[2] - $temp[6];
    unset($temp);
    $posX = (imagesx($image) - $w) / 2;
    //var_dump( $posX);
    imagettftext($image, 18, 0, $posX, $posY, $rgb, $font_path, $text);
    return $image;
}
?>