<? include("include_Top.php");?>

<hr/>
<div class="previewbox">
  <?php 
  if ($_SESSION['PhotoList'] == "") {
    echo '<img src="photo.php?PhotoID=2&Text1=别玩你妈，加入的内容呢？&Text2=3">';
  } else {
    echo '<img alt="载入中..." title="载入中..." src="bigphoto.php">';
  }

  ?>
</div>

      <div class="bs-example bs-example3 clearfix">
        <div class="left">
        </div>
        <div class="right">
          <a href="download.php" target="_self" class="preview btn btn-primary">
            <span class="glyphicon glyphicon-cloud-download"></span> 下載
          </a>
          <a href="index.php" class="btn btn-default">重來</a>
          <p class="desctext">步驟 2/2</p>
        </div>
      </div>

<? include("include_Footer.php");?>
<script type="text/javascript">$('.preview').addClass('active');</script>      