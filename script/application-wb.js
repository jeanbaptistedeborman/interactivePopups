/**
 * @author jb@noloading.com
 */

$(document).ready(function() {"use strict";

    var POPUP_HEIGHT = 300, buttons_$ = $('.button'), lastPopup_$, popups_$;
//data-buttonPos
    popups_$ = $('.popup').detach();
    popups_$.each (
        function (index, element) {
        
          
            var  button_$ = $ ('<div></div>'), element_$ = $(element), pos_array = element_$.attr ('data-buttonPos').split (',');  
            //alert (pos_array[0]);    
            button_$.addClass ('button');
          button_$.css('top', Number (pos_array[1]));
          button_$.css('left', Number (pos_array[0])); 

               $('body').append (button_$); 
            
        }
        
    ); 
    
    buttons_$ = $('.button'); 
    
    buttons_$.bind('mouseover', function() {
        var popup_$ = $(popups_$[0]), this_$ = $(this), top_num, left_num;
        
        if (lastPopup_$ !== undefined) {
         lastPopup_$.fadeIn (); 
        //lastPopup_$.detach();
        }
        popup_$.addClass ('selected'); 
        lastPopup_$ = popup_$;

        $('body').append(popup_$);

        top_num = this_$.position().top - POPUP_HEIGHT;
        left_num = this_$.position().left + this_$.width() / 2 - popup_$.width() / 2;

        popup_$.css({
            top : top_num,
            left : left_num
        });

    });
    buttons_$.bind('mouseout', function() {
        var this_$ = this; 
        //lastP
        this_$.removeClass ('selected');
        lastPopup_$.fadeOut (500, function (){
            lastPopup_$.detach (); 
            
            
        }); 

    });

});
