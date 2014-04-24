$.fn.onceVisible = function(func) {
	var $this = $(this);
	var isVisible = function() {
		if ($this.is(':visible')) {
			func();
			return true;
		}
	}
	if (isVisible()) return;
	var removeEvents;
	var $document = $(document);
	var handler = function(e) {
		if (removeEvents || isVisible()) {
			$document.unbind(e);
			removeEvents = true;
		}
	}
	$document.click(handler).keyup(handler);
}