/**
 * @author jb@noloading.com
 */
/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $,SimpleMenu,UserAgent,Modernizr*/

$(window).load(function() {"use strict";

	//$('html').addClass('lg-fr');

	if (UserAgent.msie() > 0 && UserAgent.msie() < 9) {
		$('html').addClass('ie8');

		$('#application').css('display', 'block');
		$('.loading').detach();
		$('#illustration').addClass("animStage");
	}

	$('#application').css('display', 'block');
	$('.loading').detach();
	$('#illustration').addClass("animStage");

	var userLang_str = navigator.language || navigator.userLanguage, POPUP_HEIGHT = 300, buttons_$ = $('.button'), lastPopup_$, popups_$, buttons_array = [], popups_array = [];

	//data-buttonPos
	var languageMenu_$ = $('#languageMenu');
	var languageMenu = new SimpleMenu(languageMenu_$);
	var selectedLanguage_str;

	if (userLang_str.toString().toLowerCase().indexOf('nl') !== -1) {
		selectedLanguage_str = 'nl';

	} else {
		selectedLanguage_str = 'fr';

	}

	var selection_str = "data-id = '" + selectedLanguage_str + "'";

	languageMenu_$.find("span[" + selection_str + "]").trigger('click');
	$('html').toggleClass("lg-" + selectedLanguage_str);

	languageMenu.onSelect = function() {
		//alert ("onselect");
		var lg_str = this.selected_$.attr('data-id');
		$('html').toggleClass("lg-fr", false);
		$('html').toggleClass("lg-nl", false);
		$('html').toggleClass("lg-" + lg_str, true);

		//alert (lg_str);

	};

	function placeButtons() {

		popups_$ = $('.popup').detach();
		$('#application').append($('header'));

		popups_$.each(function(index, element) {

			var close_$ = $('<div></div>'), button_$ = $('<div></div>'), element_$ = $(element), pos_array = element_$.attr('data-buttonPos').split(',');
			close_$.addClass('closeButton');
			close_$.bind('click', removeLast);
			element_$.append(close_$);
			button_$.addClass('button');
			button_$.css('top', Number(pos_array[1] - 5));
			button_$.css('left', Number(pos_array[0] - 5));
			button_$.attr('data-index', index);
			button_$.bind('mouseover', clickButton);
			element_$.attr('data-index', index);

			var delay_num = Number(pos_array[1] * 8) + 500;
			setTimeout(function() {
				//alert ("timeOut");

				$('#application').append(button_$);

			}, delay_num);
			setTimeout(function() {
				button_$.addClass('glow');

			}, delay_num + 3000);

			popups_array.push(element_$);
			buttons_array.push(button_$);

		});
	}

	function clickButton() {

		//alert('click');

		var popup_$, this_$ = $(this), top_num, left_num, height_num, index;

		index = this_$.attr('data-index');

		popup_$ = $(popups_$[index]);
		popup_$.stop();
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

		if (!Modernizr.touch) {
			left_num = this_$.position().left + this_$.width() / 2 - popup_$.width() / 2;
			if (left_num < 10) {
				left_num = 10;
			}
			var max_pos = $('#application').width() - popup_$.width() - 10;
			if (left_num > max_pos) {
				left_num = max_pos;
			}
		}

		height_num = 'auto';

		popup_$.css({

			left : left_num,
			height : height_num
		});
		lastPopup_$ = popup_$;

	}

	function removeLast() {
		if (lastPopup_$ !== undefined) {
			var index, button_$;

			index = lastPopup_$.attr('data-index');

			button_$ = buttons_array[index];
			button_$.removeClass('selected');
			lastPopup_$.fadeOut(300, function() {

				$(this).detach();

			});

		}
	}

	placeButtons();

	//alert($('buttons').length);

	//buttons_$.bind('click', clickButton);

});
