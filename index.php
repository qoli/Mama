<? include("include_Top.php");?>

<div id="AjaxLoad" >
  <p class="text_center" ><img class="opa isAni welcome h278" src="assets/empty.png" /></p>
  <p><img src="assets/addPhoto.png" /></p>
</div>

<div class="bs-example bs-example2 clearfix">
  <div class="left">
    <button id="addPhoto" type="button" class="btn btn-primary disabled" data-loading-text="正在載入...">
    <span class="animation glyphicon glyphicon-plus"></span> <span class="text" >添加鏡頭</span>
    </button>
    <p class="desctext" id="loadingTxt">Tips： <span id="LoadTips">如果緩存載入很慢或瀏覽器已經卡住，請多刷新幾次。</span> </p>
  </div>
  <div class="right">
    <button id="PreviewButton" type="button" class="pop preview btn btn-primary"
    data-loading-text="正在合併鏡頭…" rel="popover" data-html="true" data-trigger="manual" data-title='你的影片 <a id="close_preview" class="close" aria-hidden="true">&times;</a>'
    data-content='點擊開始渲染' data-placement="auto">
    <span class="glyphicon glyphicon-chevron-right"></span> 生成預覽
    </button>
    <p class="desctext">步驟 1/2</p>
  </div>
</div>

<? include("include_Footer.php");?>