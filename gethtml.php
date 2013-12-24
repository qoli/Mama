<div class="PhotoList" >
    <div class="opa isAni bs-example">
<?php
include 'function.php';

$SID = $_GET['SID'];
$BaseDir = dirname(__FILE__);
$Folder = $BaseDir . "/pngs";
$jsonPath = $Folder . '/photos.json';
$handle = fopen($jsonPath, "r");
$contents = fread($handle, filesize($jsonPath));
$json = json_decode($contents);
fclose($handle);

echo '<ul class="nav nav-pills">';


foreach ($json as $idx => $item) {
    echo '<li><a href="#' . $SID . '_' . $idx . '" data-toggle="tab">' . $idx . '</a></li>';
}
echo '<li class="pull-right"><a href="#' . $SID . '_empty" data-toggle="tab"><span class="glyphicon glyphicon-chevron-up"></span> 收起</a></li>';
echo '</ul>';

echo '<div class="tab-content">';

$i = 0;

foreach ($json as $idx => $item) {
    $i++;
    $html = '';
    
    
    foreach ($item as $html_idx => $html_item) {
        $html = $html . '<h5><b>' . $html_idx . '</b></h5>';
        $this_html = '';
        
        
        foreach ($html_item as $item_idx => $item_list) {
            $item_list = objectToArray($item_list);
            if ($item_list['width'] >= 500) {
                $w_500 = 500;
                $h_500 = $item_list['height'] * (500 / $item_list['width']);
            } else {
                $w_500 = $item_list['width'];
                $h_500 = $item_list['height'];
            }
            $this_html = $this_html . '<img class="lazy isAni ClickPhoto" src="" data-original="' . $item_list['path'] . '" data-trigger="hover" data-placement="bottom" 
            title="' . $item_list['text'] . '" data-title="' . $item_list['text'] . '"
            data-content="<img width=\'' . $w_500 . '\' height=\'' . $h_500 . '\' src=\'' . $item_list['path'] . '\' />" 
            data-html="true" width="' . 48 . '" height="' . $item_list['height'] * (48 / $item_list['width']) . '" data_type="' . $item_list . type . '" 
            data_posx="' . $item_list['posx'] . '"  data_posy="' . $item_list['posy'] . '" data_posy2="' . $item_list['posy2'] . '" 
            data_posy3="' . $item_list['posy3'] . '" />';
        } //圖片合併結束
        $html = $html . $this_html;
    }
    if ($i == 1) {
        $in = 'in';
    } else {
        $in = "";
    }
    echo '<div class="tab-pane fade ' . $in . '" id="' . $SID . '_' . $idx . '">' . $html . '</div>';
}

echo '<div class="tab-pane fade" id="' . $SID . '_empty">' . '<h5><b>請點擊上方展開</b></h5><hr/>' . '</div>';
echo '</div>';
?>
  <h5>導演</h5>
  <div class="btn-group">
    <button type="button" class="DelSingle btn btn-danger" dataSID="0">
    <span class="animation glyphicon glyphicon-remove"></span> 刪除此鏡頭
    </button>
  </div>
</div>

<div class="row">
  <div class="col-md-7">
    <p><img class="mama_photo shw" src="photo.php?PhotoURL=pngs/LINE/LINE%20內置表情/260@2x.png" dataTextA="" dataTextB="" dataTextC="" dataPosyA="370" dataPosyB="-10" dataPosyC="-10" dataURL="pngs/LINE/LINE%20內置表情/260@2x.png" /></p>
  </div>
  <div class="col-md-5">
    <div class="tips bs-callout bs-callout-danger">
      <h4>鏡頭切換中…</h4>
      <p><span class="loop ani animation glyphicon glyphicon-cog"></span> 請稍後，攝影師正在移動鏡頭。</p>
      <p class="desctext" >如果攝像機卡住了，請點擊<button type="button" class="Reload ChPhoto btn-link" data="25">這裡</button>重試。</p>
    </div>
    <form role="form">
      <h4>設計對白</h4>
      <hr/>
      <div class="ChText form-group">
        <label>主角 A 說：</label>
        <input class="Text1 form-control" placeholder="學習一天了，跟媽媽出去玩吧。">
      </div>
      <div class="ChText ChText2 form-group" data="2">
        <label>配角 B 回答：</label>
        <input class="Text2 form-control" placeholder="不呢，我喜歡學習">
      </div>
      <div class="ChText ChText3 form-group disn" data="3">
        <label>導演：</label>
        <input class="Text3 form-control" placeholder="……">
      </div>
      <button type="button" class="btn btn-default Update">
      預覽對白
      </button>
    </form>
  </div>
</div>

</div>
