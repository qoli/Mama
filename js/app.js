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

	LoadReadly('Readly'); //載入成功提示

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

			$('#Single_' + SID + ' .DelSingle').attr('dataSID', SID);

			ChPhoto(SID);

			LoadReadly('reset');

			if (status == "error") {
				LoadReadly('reset');
				$('#addPhoto .text').text('再次嘗試');
			}
		})
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

function ChPhoto(SID) {
	UpdatePhoto("", "", "", SID, "");
	$('#Single_' + SID + ' ' + '.Update').click(function() {
		UpdatePhoto("", "", "", SID, "");
	})
	$('#Single_' + SID + ' ' + '.DelSingle').click(function() {
		ThisSID = $(this).attr('dataSID');
		t = $('#Single_' + ThisSID);
		t.slideUp(300);
		t.empty();
	})

	$('#Single_' + SID + ' ' + '.ChPhoto').click(function() {
		t = $(this);
		d = $(this).attr('data');
		UpdatePhoto("", "", "", SID, d);
		$('#Single_' + SID + ' ' + '.ChPhoto').removeClass('active');
		t.addClass('active');

		$('#Single_' + SID + ' ' + '.ChText2').removeClass('disn');
		$('#Single_' + SID + ' ' + '.ChText').removeClass('disn');
		$('#Single_' + SID + ' ' + '.ChText3').addClass('disn');

		if (d == 2 || d == 3 || d == 4 ||
			d == 7 || d == 8 || d == 9 ||
			d == 10 || d == 11 || d == 12 ||
			d == 13 || d == 14 || d == 16 ||
			d == 17 || d == 19 || d == 20 ||
			d == 22 || d == 23 || d == 24 || d == 25 || d == 26 ||
			d == 27 || d == 29 || d == 30 || d == 31
		) {
			$('#Single_' + SID + ' ' + '.ChText2').addClass('disn');
		}

		if (d == 5 || d == 28) {
			$('#Single_' + SID + ' ' + '.ChText').addClass('disn');
			$('#Single_' + SID + ' ' + '.ChText2').addClass('disn');
		}

		if (d == 21) {
			$('#Single_' + SID + ' ' + '.ChText3').removeClass('disn');
		}
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

function UpdatePhoto(t1, t2, t3, SID, PID) {

	p = $('#Single_' + SID + ' ' + '.mama_photo');
	tips = $('#Single_' + SID + ' ' + '.tips');
	Reload = $('#Single_' + SID + ' ' + '.Reload');
	tips.slideUp(0);
	tips.slideDown();

	if (PID == "") {
		PID = p.attr('dataID');
	} else {
		p.attr('dataID', PID);
	}

	if (t1 == "") {
		t1 = p.attr('dataa');
	} else {
		p.attr('dataa', t1);
	}

	if (t2 == "") {
		t2 = p.attr('datab');
	} else {
		p.attr('datab', t2);
	}

	if (t3 == "") {
		t3 = p.attr('datac');
	} else {
		p.attr('datac', t3);
	}

	Reload.attr('data', PID);

	a = $('#Single_' + SID + ' ' + '.ani');
	Ani(a)


	p.attr(
		'src',
		'photo.php?PhotoID=' + PID + '&Text1=' + t1 + '&Text2=' + t2 + '&Text3=' + t3
	);

	p.load(function() {
		tips.slideUp();
	})
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

	if (state == 'Loading') {
		addPhoto.button('loading');
	}

	if (state == 'reset') {
		addPhoto.button('reset');
	}

	if (state == 'Readly') {
		addPhoto.removeClass('disabled');
		addPhoto_text.text('添加分鏡');
	}

}