function wait(f) {
	var div = $('<div style="position:fixed;z-index:1000;height:100%;width:100%;cursor:wait" />').appendTo('body');
	if (document.selection)
		div.css('background-color', 'black').css('filter', 'alpha(opacity=0)');
	setTimeout(function() {
		f();
		div.css('cursor', '').remove();
	});
}