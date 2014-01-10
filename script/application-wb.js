/**
 * @author jb@noloading.com
 */

$("document").ready(function() {"use strict";
	$('html').addClass ('lg-fr'); 

	var POPUP_HEIGHT = 300, buttons_$ = $('.button'), lastPopup_$, popups_$, buttons_array = [], popups_array = [];
	//data-buttonPos
	popups_$ = $('.popup').detach();
	$('#application').append ($('header')); 

	function removeLast() {
		if (lastPopup_$ !== undefined) {
			var index, button_$;

			index = lastPopup_$.attr('data-index');

			button_$ = buttons_array[index];
			button_$.removeClass('selected');
			//lastPopup_$.fadeOut(300, function() {

				//$(this).detach();

			//});

		}
	}


	popups_$.each(function(index, element) {

		var button_$ = $('<div></div>'), element_$ = $(element), pos_array = element_$.attr('data-buttonPos').split(',');
		//alert (pos_array[0]);
		button_$.addClass('button');
		button_$.css('top', Number(pos_array[1]));
		button_$.css('left', Number(pos_array[0]));
		button_$.attr('data-index', index);
		element_$.attr('data-index', index);

		$('#application').append(button_$);

		popups_array.push(element_$);
		buttons_array.push(button_$);

	});

	buttons_$ = $('.button');
	buttons_$.bind('mouseout', function() {
		removeLast();
	});

	buttons_$.bind('click', function() {
		var popup_$, this_$ = $(this), index, a_$;
		if (!Modernizr.touch) {

			index = this_$.attr('data-index');

			popup_$ = $(popups_$[index]);
			a_$ = popup_$.find('a');
			if (a_$.length > 0) {

				window.open(a_$.attr('href'));
			}

		}

	});

	buttons_$.bind('mouseover', function() {
		//console.log ("mouse over");

		var popup_$, this_$ = $(this), top_num, left_num, height_num, index;
		index = this_$.attr('data-index');

		popup_$ = $(popups_$[index]);
		popup_$.css('opacity', 1);
		popup_$.css('display', 'block');
		if (lastPopup_$ !== undefined) {
			//console.log (lastPopup_$.attr('data-index') +" / " + popup_$.attr('data-index'));

			if (lastPopup_$.attr('data-index') !== popup_$.attr('data-index')) {

				removeLast();
			}
		}

		this_$.addClass('selected');
		lastPopup_$ = popup_$;
		popup_$.addClass('reveal');

		$('#application').append(popup_$);
		//popup_$.insertBefore(this_$);

	
		if (!Modernizr.touch) {
			left_num = this_$.position().left + this_$.width() / 2 - popup_$.width() / 2;
		};

		height_num = 'auto';
		//this_$.position().top - top_num + this_$.height() + 10;

		popup_$.css({
		
			left : left_num,
			height : height_num
		});
		lastPopup_$ = popup_$;

	});

});
