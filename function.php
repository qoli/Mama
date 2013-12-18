<?php

/**
 * 除错变量
 * @param var $vars 除错目标
 * @param str $label 标题头
 * @param bool $return 返回值而不输出
 */
function dump($vars, $label = '', $return = false) {
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
function get_files($dir) {
    $files = array();
 
    if (!is_dir($dir)) {
        return $files;
    }
 
    $d = dir($dir);
    while (false !== ($file = $d->read())) {
        if ($file != '.' && $file != '..') {
            $filename = $dir . "/"  . $file;
 
            if(is_file($filename)) {
                $files[] = $filename;
            }else {
                $files = array_merge($files, get_files($filename));
            }
        }
    }
    $d->close();
    return $files;
}

function ExplodeArray($PhotoArray) {
	$PhotoArray = explode('|', $PhotoArray);

	foreach ($PhotoArray as $value) {
		if ($value != "") {
		//$images[] = 'http://192.168.1.235/' . $value;
			$images[] = 'http://tools.llqoli.com/Mama/' . $value;
		}
	}	

	return $images;
}

function implode_image($images, $align = 'V') {
	header('Content-type:image/jpeg');
	if(!is_array($images) || count($images) < 1) {
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