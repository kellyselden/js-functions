function Overflow_onload(control, above, builtin, override) {
	var $control = $(control);
	$control.addClass('Overflow');
	var original = $control.attr('original');
	if (!override)
		if (original) $control.html(original);
		else $control.attr('original', original = $control.html());


	$control.onceVisible(function() {
		if (control.scrollWidth == control.clientWidth &&
			control.scrollHeight == control.clientHeight &&
			(!override || $control.attr('overflow') != 'true'))
			return;
		$control.attr('overflow', 'true');

		var overlay = $('<div>');
		overlay.addClass('Overflow_overlay');
		overlay.css('text-align', $control.css('text-align'));
		overlay.css('word-wrap', above ? 'break-word' : $control.css('word-wrap'));
		overlay.width(above ? control.clientWidth : control.scrollWidth);
		overlay.html(original);

		if ($.browser.mozilla && $.browser.version < 7) builtin = false;
		if (builtin) $control.addClass('Overflow_builtin');

		if (!override && !builtin) {
			var text, text2;
			function shrink(source, amount) {
				text = source.substr(0, text.length - amount);
				control.innerHTML = text + (text ? '&hellip;' : '');
			}
			//jump by this many characters at a time
			var optimization = 10;
			//guess which end is faster to start at
			if ((control.clientHeight + control.clientWidth) * 2 < control.scrollHeight + control.scrollWidth) {
				control.innerHTML = '';
				text2 = original;
				while (text2) {
					control.innerHTML += text2.substr(0, optimization);
					text2 = text2.substr(optimization);
					text = control.innerHTML;
					if (control.scrollWidth > control.clientWidth) {
						do { shrink(text, 1) }
						while (control.scrollWidth > control.clientWidth
							&& control.clientWidth/*ie*/);

						var index = text2.indexOf(' ');
						if (index > 0)
							text2 = text2.substr(index);
						else break;
					}
					else if (control.scrollHeight > control.clientHeight) {
						do { shrink(text, 1) }
						while (control.scrollHeight > control.clientHeight);
						break;
					}
				}
			} else {
				text = control.innerHTML;
				while (control.scrollHeight > control.clientHeight)
					shrink(text, optimization);
				if (text != original) {
					shrink(original, 1 - optimization);
					while (control.scrollHeight > control.clientHeight)
						shrink(text, 1);
				}
				do {
					text2 = text = control.innerHTML;
					while (control.scrollWidth > control.clientWidth
						&& control.clientWidth/*ie*/)
						shrink(text, optimization);
					if (text == text2) break;
					shrink(text2, 1 - optimization);
					while (control.scrollWidth > control.clientWidth
						&& control.clientWidth/*ie*/)
						shrink(text, 1);

					var index = text2.indexOf(' ', text.length);
					if (index > 0)
						control.innerHTML += text2.substr(index);
					else break;
				} while (true);
			}
			if (!text) control.innerHTML = original;
		}

		$control.unbind('mouseover.overflow');
		$control.bind('mouseover.overflow', function() {
			$('body').append(overlay);
			overlay.css('top', $(this).offset().top - 1 - (above ? overlay.height() + 2 : 0));
			overlay.css('left', $(this).offset().left - 1);
			if (above)
				$(this).mouseout(function() {
					overlay.remove();
				});
			//ie will sometimes skip mouseout
			//also, instant removal of control will leave overlay lingering
			$('body').mousemove(function(event) {
				if (event.target != control && event.target != overlay[0]) {
					overlay.remove();
					$(this).unbind(event);
				}
			});
		});
	});
}
