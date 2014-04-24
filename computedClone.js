jQuery.fn.css2 = jQuery.fn.css;
jQuery.fn.css = function() {
	if (arguments.length) return jQuery.fn.css2.apply(this, arguments);
	var attr = ['font-family','font-size','font-weight','font-style','color',
		'text-transform','text-decoration','letter-spacing','word-spacing',
		'line-height','text-align','vertical-align','direction','background-color',
		'background-image','background-repeat','background-position',
		'background-attachment','opacity','width','height','top','right','bottom',
		'left','margin-top','margin-right','margin-bottom','margin-left',
		'padding-top','padding-right','padding-bottom','padding-left',
		'border-top-width','border-right-width','border-bottom-width',
		'border-left-width','border-top-color','border-right-color',
		'border-bottom-color','border-left-color','border-top-style',
		'border-right-style','border-bottom-style','border-left-style','position',
		'display','visibility','z-index','overflow-x','overflow-y','white-space',
		'clip','float','clear','cursor','list-style-image','list-style-position',
		'list-style-type','marker-offset'];
	var len = attr.length, obj = {};
	for (var i = 0; i < len; i++)
		obj[attr[i]] = jQuery.fn.css2.call(this, attr[i]);
	return obj;
}

jQuery.fn.computedClone = function() {
	var o = $(this);
	var clone = o.clone();
	(function r(o1, o2) {
		o2.css(o1.css());
		var c1 = o1.children();
		if (!c1.length)
			return;
		var c2 = o2.children();
		for (var i in c1)
			r(c1.eq(i), c2.eq(i));
	})(o, clone);
	return clone;
}