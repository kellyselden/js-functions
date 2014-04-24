jQuery.prototype.scrollIntoView = function(item) {
	var thisOffset = this.offset();
	var itemOffset = item.offset();
	if (thisOffset.top > itemOffset.top)
		this.prop('scrollTop', this.prop('scrollTop') - (thisOffset.top - itemOffset.top));
	else if ((thisOffset.top += this.height()) < (itemOffset.top += item.height()))
		this.prop('scrollTop', this.prop('scrollTop') + (itemOffset.top - thisOffset.top));
	if (thisOffset.left > itemOffset.left)
		this.prop('scrollLeft', this.prop('scrollLeft') - (thisOffset.left - itemOffset.left));
	else if ((thisOffset.left += this.width()) < (itemOffset.left += item.width()))
		this.prop('scrollLeft', this.prop('scrollLeft') + (itemOffset.left - thisOffset.left));
	return this;
}