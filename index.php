<? include("include_Top.php");?>

      <div id="AjaxLoad" >
          <p class="text_center" ><img src="assets/addPhoto.png" /></p>
      </div>

      <div class="bs-example bs-example2 clearfix">
        <div class="left">
          <button id="addPhoto" type="button" class="btn btn-primary">
            <span class="animation glyphicon glyphicon-plus"></span> 添加欄位
          </button>
        </div>
        <div class="right">
          <button id="PreviewButton" type="button" class="preview btn btn-primary">
            <span class="glyphicon glyphicon-chevron-right"></span> 预览
          </button>
          <a href="index.php" class="btn btn-default">重來</a>
          <p class="desctext">步驟 1/2</p>
        </div>
      </div>

<? include("include_Footer.php");?>
<script type="text/javascript">$('.index').addClass('active');</script>