SID = 0;
pre_photo_h = 0;
pre_photo_w = 0;
sh = 0;

$(document).ready(function() {

	$(window).resize(function() {
		reSize();
	})

	w_obj = $('.welcome');
	w_obj.attr('src', 'assets/welcome.png').load(function() {
		$(this).removeClass('opa')
		reSize();
		$('body').css({
			'background-color': '#fafafa'
		})
	});

	LoadReadly('Readly'); //修改「添加分鏡」的按鈕狀態

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

	}) //歡迎載入樣式完畢

	pop = $('.pop');

	pop.popover('hide');

	$('.closepop').click(function() {
		pop.popover('hide');
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

		$('#Single_' + SID).load('Single.html', {}, function(response, status, xhr) {
			t = $('#Single_' + SID);
			t.slideUp(0);
			t.slideDown();

			$.get("pngs/photos.json", function(data) {
				$.each(data, function(idx, item) {
					$('<li><a href="#' + SID + '_' + idx + '" data-toggle="tab">' + idx + '</a></li>').appendTo('#Single_' + SID + ' .nav-tabs');

					html = '';
					$.each(item, function(html_idx, html_item) {
						html = html + '<h5><b>' + html_idx + '</b></h5>';
						this_html = '';
						$.each(html_item, function(item_idx, item_list) {
							if (item_list.width >= 500) {
								w_500 = 500;
								h_500 = item_list.height * (500 / item_list.width)
							} else {
								w_500 = item_list.width
								h_500 = item_list.height
							}
							this_html = this_html + '<img class="isAni ClickPhoto" src="' + item_list.path + '" data-trigger="hover" data-placement="bottom" title="' + item_list.text + '" data-title="' + item_list.text + '" data-content="<img width=\'' + w_500 + '\' height=\'' + h_500 + '\' src=\'' + item_list.path + '\' />" data-html="true" width="' + 48 + '" height="' + item_list.height * (48 / item_list.width) + '" data_type="' + item_list.type + '" data_posx="' + item_list.posx + '"  data_posy="' + item_list.posy + '" data_posy2="' + item_list.posy2 + '" data_posy3="' + item_list.posy3 + '" />';
						});
						html = html + this_html;
					});

					$('<div class="tab-pane fade in" id="' + SID + '_' + idx + '">' + html + '</div>').appendTo('#Single_' + SID + ' .tab-content');

				})
				$('<li class="pull-right"><a href="#' + SID + '_empty" data-toggle="tab"><span class="glyphicon glyphicon-chevron-up"></span> 收起</a></li>').appendTo('#Single_' + SID + ' .nav-tabs');
				$('<div class="tab-pane fade in" id="' + SID + '_empty">' + '<h5><b>請點擊上方展開</b></h5><hr/>' + '</div>').appendTo('#Single_' + SID + ' .tab-content');
				$('#Single_' + SID + ' .nav-tabs a:first').tab('show'); //激活第一個 TAB
				$('#Single_' + SID + ' .tab-content img').popover('hide'); //激活 popover;
				$('#Single_' + SID + ' .DelSingle').attr('dataSID', SID); //綁定刪除分鏡按鈕
				ClickPhoto(SID); //變更圖片的操作綁定
			}); //解釋 JSON

			LoadReadly('reset');
			if (status == "error") {
				$('#addPhoto .text').text('再次嘗試');
			}

		}) //Load 完成
	})

	$('#preview_photo').load(function() {
		$('.tips').slideUp();
	})

	$('#PreviewButton').click(function() {

		t = $(this);
		pop.popover('hide');
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
				pop.popover('show');

				$('#close_preview').click(function() {
					pop.popover('hide');
				})

			});
		})
	});

	$('#OutputJPG').click(function() {
		document.location.href = "download.php";
	});
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

		UpdatePhoto("", "", "", SID, src,posy,posy2,posy3);

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

	console.log(v);
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

function LoadReadly(state) {

	addPhoto = $('#addPhoto');
	addPhoto_text = $('#addPhoto .text');
	$('.tab-content a').tooltip('hide'); //激活 tooltip;

	if (state == 'Loading') {
		addPhoto.button('loading');
	}

	if (state == 'reset') {
		addPhoto.button('reset');
	}

	if (state == 'Readly') {
		addPhoto.removeClass('disabled');
		addPhoto_text.text('添加鏡頭');
	}

}