SID = 0;

$(document).ready(function() {


	$('#addPhoto').click(function() {

		if (SID == 0) {
			$('#AjaxLoad').empty();
		}

		ani = $('#addPhoto .animation');
		Ani(ani);

		SID = SID + 1;
		$('<div id="Single_' + SID + '" ></div>').appendTo('#AjaxLoad')

		$('#Single_' + SID).load('Single.html', {}, function() {
			t = $('#Single_' + SID);
			t.slideUp(0);
			t.slideDown();

			$('#Single_' + SID + ' .DelSingle').attr('dataSID', SID);

			ChPhoto(SID);
		})
	})

	$('#PreviewButton').click(function() {

		PhotoSRC = "";

		$('.mama_photo').each(function(index) {
			PhotoSRC = PhotoSRC + "|" + $(this).attr('src');
		})

		$.post('ajax.php', {
			SRC: PhotoSRC
		}, function() {
			document.location.href = "preview.php";
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
			d == 17 || d == 19 || d == 20 || d == 22 || d == 23 || d == 24
		) {
			$('#Single_' + SID + ' ' + '.ChText2').addClass('disn');
		}

		if (d == 5) {
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

	a = $('#Single_' + SID + ' ' + '.ani');
	Ani(a)


	p.attr(
		'src',
		'photo.php?PhotoID=' + PID + '&Text1=' + t1 + '&Text2=' + t2 + '&Text3=' + t3
	);

	p.load(function(){
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