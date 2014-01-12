/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $*/



function SimpleMenu (parent_$) {"use strict"; 
	var items_$ = parent_$.children (), context = this;
	
	this.selected_$ = undefined; 
	this.onSelect = function (){};  
	 
	items_$.bind ('click', function (){
		var this_$ = $(this); 
		items_$.toggleClass ('selected', false); 
		this_$.toggleClass ('selected');
		context.selected_$ = this_$;
		context.onSelect ();   
		
		
		
	}); 

	
	
	
	
}
