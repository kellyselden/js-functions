jQuery.fn.selectText = function(x, y) {
	if (!this.length || this[0].tagName != 'INPUT')
		return;

	var input = this.first();
	var val = input.val();
	var selectionStart, selectionEnd;
	if (typeof x == 'string') {
		selectionStart = val.indexOf(x);
		if (selectionStart == -1) return;
		selectionEnd = selectionStart + x.length;
	} else if (typeof x == 'undefined') {
		selectionStart = 0;
		selectionEnd = val.length;
	} else {
		selectionStart = x;
		if (typeof y == 'undefined')
			selectionEnd = val.length;
		else if (y < 0)
			selectionEnd = val.length + y;
		else selectionEnd = y;
	}

	if (document.selection) {
		var selection = this[0].createTextRange();
		selection.collapse(true);
		selection.moveEnd('character', selectionEnd);
		selection.moveStart('character', selectionStart);
		selection.select();
	}
	else this[0].setSelectionRange(selectionStart, selectionEnd);

	if (jQuery.browser.safari)
		input.mouseup(function(e) {
			$(this).unbind(e);
			return false;
		});

	return this;
}