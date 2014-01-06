SID = 0;
pre_photo_h = 0;
pre_photo_w = 0;
sh = 0;
host = "http://tools.llqoli.com/Mama/";
reSize();

LoadingDone = function() {
	$('#loadingTxt').fadeOut(2400);
	previewPop.popover('hide'); //綁定預覽
	LoadReadly('Readly'); //修改「添加分鏡」的按鈕狀態	
}

$(document).ready(function() {

	///變量設定
	previewPop = $('.pop');
	welcomeImage = $('.welcome');

	if (isComplete(host + 'pngs/LINE/LINE%20%E5%85%A7%E7%BD%AE%E8%A1%A8%E6%83%85/287@2x.png') === false) {
		$('#cacheState').text('快取不存在');
	} else {
		$('#cacheState').text('快取正常');
	}

	LoadReadly('Loading');

	welcomeImage.attr('src', 'assets/welcome.png').load(function() {
		$(this).removeClass('opa');

		LoadingDone();

		$('#cacheState').text('...');

	});

	if (isLength('#about_app')) {
		$('#about_app img').attr('src', 'assets/welcome.png').load(function() {
			$("#about_app")
				.animate({
					textIndent: 0
				}, {
					step: function(now, fx) {
						$(this).css({
							'opacity': 1
						});
					},
					duration: 1200,
					complete: function() {
						$(this)
							.attr('style', '')
							.addClass('opa2');

					}
				}, 'linear');

		})
	} //關於頁面的樣式

	$('#openComments').click(function() {
		t = $(this);
		t.button('loading');
		t.parent().load('comments.php', function() {
			t.remove();
		});
	})

	$('.closepop').click(function() {
		previewPop.popover('hide');
	})

	$('#addPhoto').click(function() {

		LoadReadly('Loading');

		if (SID == 0) {
			$('#AjaxLoad').empty();
		}

		ani = $('#addPhoto .animation');
		Ani(ani);

		SID = SID + 1;
		$('<div id="Single_' + SID + '" ></div>').appendTo('#AjaxLoad')


		$.get('gethtml.php', {
			'SID': SID
		}, function(response, status, xhr) {

			$('#Single_' + SID).html(response);

			t = $('#Single_' + SID);
			t.slideUp(0);
			t.slideDown();

			$('#Single_' + SID + ' .nav-pills a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
				$('#' + SID + '_' + e.target.text).children('img.lazy').lazyload({
					effect: "fadeIn"
				})
				var timeout = setTimeout(function() {
					$('#' + SID + '_' + e.target.text).children('img.lazy').trigger("sporty")
				}, 600);
			})

			$('#Single_' + SID + ' .tab-content img').popover('hide'); //激活 popover;
			$('#Single_' + SID + ' .DelSingle').attr('dataSID', SID); //綁定刪除分鏡按鈕
			$('#Single_' + SID + ' .nav-pills a:first').tab('show'); //激活第一個 TAB
			ClickPhoto(SID); //變更圖片的操作綁定
			LoadReadly('reset');
		}).fail(function() {
			if (status == "error") {
				$('#addPhoto .text').text('再次嘗試');
			}
		}) //get 完成
	})

	$('#preview_photo').load(function() {
		$('.tips').slideUp();
	})

	$('#PreviewButton').click(function() {

		t = $(this);
		previewPop.popover('hide');
		t.addClass('disabled');
		//t.html('<span class="glyphicon glyphicon-chevron-right"></span> 處理中…');
		t.button('loading');
		PhotoSRC = "";

		$('.mama_photo').each(function(index) {
			PhotoSRC = PhotoSRC + "|" + $(this).attr('src');
		})

		$.post('ajax.php', {
			SRC: PhotoSRC
		}, function() {
			loadImage('bigphoto.php', function() {
				t.removeClass('disabled')
					.attr('data-content', '<p><img class="shw pre_bigphoto" src="bigphoto.php" width="150" height="' + (150 / pre_photo_w) * pre_photo_h + '" /></p><p class="text_center" ><a href="preview.php" target="_blank">在新的螢幕查看 <span class="glyphicon glyphicon-new-window"></span></a></p>')
					.button('reset')
					.removeClass('btn-primary')
					.addClass('btn-success')
					.html('<span class="glyphicon glyphicon-ok"></span> 重新生成');
				previewPop.popover('show');

				$('#close_preview').click(function() {
					previewPop.popover('hide');
				})

			});
		})
	});

	$('#OutputJPG').click(function() {
		document.location.href = "download.php";
	});

});

var resizeTimer = null;
$(window).on('resize', function() {
	if (resizeTimer) {
		clearTimeout(resizeTimer)
	}
	resizeTimer = setTimeout(function() {
		reSize();
	}, 400);
});

/**
 * 一堆函數
 */

function ClickPhoto(SID) {
	UpdatePhoto("", "", "", SID);
	ShowTheinput(1);

	$('#Single_' + SID + ' ' + '.Update').click(function() {
		UpdatePhoto("", "", "", SID);
	})
	$('#Single_' + SID + ' ' + '.DelSingle').click(function() {
		ThisSID = $(this).attr('dataSID');
		t = $('#Single_' + ThisSID);
		t.slideUp(300);
		t.empty();
	})

	$('#Single_' + SID + ' ' + '.ClickPhoto').click(function() {
		t = $(this);
		$('#Single_' + SID + ' ' + '.ClickPhoto').removeClass('active');
		t.addClass('active');

		title = ReadData(t, 'data-title', 'empty');
		src = ReadData(t, 'src', 'pngs/def.png');
		posy = ReadData(t, 'data_posy', 360);
		posy2 = ReadData(t, 'data_posy2', -10);
		posy3 = ReadData(t, 'data_posy3', -10);
		type = ReadData(t, 'data_type', 1);

		console.log(type);

		ShowTheinput(type);

		UpdatePhoto("", "", "", SID, src, posy, posy2, posy3);

	})

	$('#Single_' + SID + ' ' + '.Text1').change(function() {
		UpdatePhoto($(this).val(), "", "", SID, "");
	})

	$('#Single_' + SID + ' ' + '.Text2').change(function() {
		UpdatePhoto("", $(this).val(), "", SID, "");
	})

	$('#Single_' + SID + ' ' + '.Text3').change(function() {
		UpdatePhoto("", "", $(this).val(), SID, "");
	})
}

function ShowTheinput(type) {
	$('#Single_' + SID + ' ' + '.ChText').removeClass('disn');
	$('#Single_' + SID + ' ' + '.ChText2').addClass('disn');
	$('#Single_' + SID + ' ' + '.ChText3').addClass('disn');

	if (type == 2) {
		$('#Single_' + SID + ' ' + '.ChText2').removeClass('disn');
	}

	if (type == 3) {
		$('#Single_' + SID + ' ' + '.ChText2').removeClass('disn');
		$('#Single_' + SID + ' ' + '.ChText3').removeClass('disn');
	}

	if (type == 0) {
		$('#Single_' + SID + ' ' + '.ChText').addClass('disn');
		$('#Single_' + SID + ' ' + '.ChText2').addClass('disn');
		$('#Single_' + SID + ' ' + '.ChText3').addClass('disn');
	}
}

function UpdatePhoto(t1, t2, t3, SID, PURL, p1, p2, p3) {

	p = $('#Single_' + SID + ' ' + '.mama_photo');
	tips = $('#Single_' + SID + ' ' + '.tips');
	Reload = $('#Single_' + SID + ' ' + '.Reload');
	tips.slideUp(0);
	tips.slideDown();

	PURL = UpdateData(p, 'dataURL', PURL);
	t1 = UpdateData(p, 'dataTextA', t1);
	t2 = UpdateData(p, 'dataTextB', t2);
	t3 = UpdateData(p, 'dataTextC', t3);
	p1 = UpdateData(p, 'dataPosyA', p1);
	p2 = UpdateData(p, 'dataPosyB', p2);
	p3 = UpdateData(p, 'dataPosyC', p3);


	Reload.attr('data', PURL);

	a = $('#Single_' + SID + ' ' + '.ani');
	Ani(a)


	p.attr(
		'src',
		'photo.php?PhotoURL=' + PURL + '&Text1=' + t1 + '&Text2=' + t2 + '&Text3=' + t3 + '&posy=' + p1 + '&posy2=' + p2 + '&posy3=' + p3
	);

	p.load(function() {
		tips.slideUp();
	})
}

function UpdateData(obj, dataName, dataValue) {
	if (dataValue == "" || typeof(dataValue) == 'undefined') {
		dataValue = obj.attr(dataName);
	} else {
		obj.attr(dataName, dataValue);
	}

	v = dataValue;

	//console.log(v);
	return v;
}

function ReadData(obj, dataName, dataValue) {
	v = obj.attr(dataName);
	if (v == "") {
		v = dataValue;
	}

	return v;

}

function Ani(a) {
	a.animate({
		textIndent: 0
	}, {
		step: function(now, fx) {
			$(this).css({
				'-webkit-transform': "rotate(720deg) scale(1.2)",
				'-moz-transform': "rotate(720deg) scale(1.2)",
				'-o-transform': "rotate(720deg) scale(1.2)",
				'transform': "rotate(720deg) scale(1.2)"
			});
		},
		duration: 1500,
		complete: function() {
			$(this).css({
				'text-indent': 0,
				'-webkit-transform': "rotate(0deg) scale(1)",
				'-moz-transform': "rotate(0deg) scale(1)",
				'-o-transform': "rotate(0deg) scale(1)",
				'transform': "rotate(0deg) scale(1)"
			})
		}
	}, 'linear');
}

function loadImage(url, callback) {
	var img = new Image();
	img.onload = function() {
		pre_photo_h = img.height;
		pre_photo_w = img.width;
		img.onload = null;
		callback(img);
	}
	img.src = url;
}

function reSize() {
	sh = $(window).height();
	ph = (sh - 320 - 300) / 2
	if (ph <= 0) {
		ph = 0;
	}
	$('.welcome').css({
		'padding': ph + 'px 0'
	});
}

function LoadReadly(state, text) {

	addPhoto = $('#addPhoto');
	addPhoto_text = $('#addPhoto .text');

	if (state == "custom") {
		addPhoto.addClass('disabled');
		addPhoto_text.text(text);
	}

	if (state == 'Loading') {
		addPhoto.button('loading');
	}

	if (state == 'reset') {
		addPhoto.button('reset');
	}

	if (state == 'Readly') {
		addPhoto.button('reset');
		addPhoto.removeClass('disabled');
		addPhoto_text.text('添加鏡頭');
	}

}

function isLength(obj) {
	if ($(obj).length > 0) {
		return true;
	} else {
		return false;
	}
}

function isComplete(url) {
	var img = new Image();
	img.src = url;

	if (img.complete || img.width) {
		return true;
	} else {
		return false;
	}
}

function isUndefined(cb) {
	if (typeof(cb) == 'undefined') {
		return false;
	} else {
		return true;
	}
}

function preloader(file, callback) {
	// XMLHttpRequestオブジェクト
	var xmlhttp = null;

	// ロード監視フラグ
	var loaded = false;

	// プリロード画像ファイル名の格納用配列
	var preloadImages = new Array();


	if (xmlhttp != null && xmlhttp.readyState != 0 && xmlhttp.readyState != 4) {
		xmlhttp.abort();
	}


	/* XMLHttpRequestオブジェクトの作成 */
	try {
		// Internet Explorer 7, Firefox, Mozilla, Nestcape, Safari
		xmlhttp = new XMLHttpRequest();
	} catch (e) {
		try {
			// Internet Explorer
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (e) {
			// Ajax非対応ブラウザ
			xmlhttp = null;
			return false;
		}
	}


	/* レスポンスデータ処理 */
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				// 画像ロード処理
				var imgcol = xmlhttp.responseXML.getElementsByTagName('image');
				for (var i = 0; i < imgcol.length; i++) {
					preloadImages[i] = new Image();
					preloadImages[i].src = imgcol[i].firstChild.nodeValue;
					$('#Num').text(i + 1);
					$('#All').text(imgcol.length);
				}
				loaded = true;
				callback();
			} else {
				alert('緩存建立工具錯誤 :' + xmlhttp.statusText);
			}
		}
	};


	/* HTTPリクエスト */
	xmlhttp.open('GET', file, true);
	xmlhttp.send(null);
}

function DefCallback() {};