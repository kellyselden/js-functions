jQuery.prototype.isVisible = function() {
	if (this.is(':hidden'))
		return false;
	var parent = this;
	while (1) {
		parent = parent.parent();
		if (parent[0].tagName == "FORM")
			continue;
		if (parent[0] == document.body)
			return true;
		if ((parent.offset().top > this.offset().top) ||
			(parent.offset().left > this.offset().left) ||
			(parent.offset().top + parent.height() < this.offset().top + this.height()) ||
			(parent.offset().left + parent.width() < this.offset().left + this.width()))
			return false;
	}
}