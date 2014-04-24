function DoubleTextBox(id, maxLength) {
	var control = document.getElementById(id);
	if (document.selection) control.rows += 1; //ie
	var halfLength = maxLength / 2;
	control.onkeypress = function(e) {
		//ctrl+* hits in ff, not in ie
		if (e.ctrlKey) return true;
		//nonprinting, enter is handled later
		if (e.which < 32 && e.which != 13) return true;

		//selection, if you select text to overwrite
		var selectionStart, selectionEnd;
		if (document.selection) {
			var selection = document.selection.createRange();
			var beforeSelection = document.body.createTextRange();
			var afterSelection = beforeSelection.duplicate();
			beforeSelection.moveToElementText(this);
			afterSelection.moveToElementText(this);
			beforeSelection.setEndPoint("EndToStart", selection);
			afterSelection.setEndPoint("StartToEnd", selection);

			selectionStart = 0, selectionEnd = 0;
			while (beforeSelection.compareEndPoints("StartToEnd", beforeSelection)) {
				beforeSelection.moveEnd("character", -1);
				selectionStart++;
			}
			while (afterSelection.compareEndPoints("StartToEnd", beforeSelection)) {
				afterSelection.moveStart("character", -1);
				selectionEnd++;
			}
		}
		else selectionStart = this.selectionStart, selectionEnd = this.selectionEnd;

		var oldValue = this.value.replace(/\r\n/g, "\n");
		oldValue = oldValue.substr(0, selectionStart) + oldValue.substr(selectionEnd);
		var newValue = DoubleTextBox_format(oldValue, halfLength);
		var newIndex = newValue.indexOf("\n"), oldIndex = oldValue.indexOf("\n");

		//normal, didn't paste out of bounds
		if (oldValue == newValue) {
			if (e.which == 13) return oldIndex == -1;
			if (oldValue.substr(0, oldIndex).length < halfLength && selectionStart <= oldIndex)
				return true;
			if (oldValue.substr(oldIndex + 1).length < halfLength && selectionStart > oldIndex)
				return true;
			return false;
		}

		//had to trim because too long or too many new lines from mouse paste
		if (selectionStart > newIndex && selectionStart <= oldIndex) selectionStart = newIndex;
		if (selectionStart > oldIndex) selectionStart -= oldIndex - newIndex;
		if (selectionStart > newValue.length) selectionStart = newValue.length;
		if (newValue.substr(0, newIndex).length < halfLength && selectionStart <= newIndex
			|| newValue.substr(newIndex + 1).length < halfLength && selectionStart > newIndex) {
			newValue = newValue.substr(0, selectionStart)
				+ String.fromCharCode(e.which)
				+ newValue.substr(selectionStart);
			selectionStart++;
		}
		this.value = newValue;

		if (document.selection) {
			var selection = this.createTextRange();
			selection.collapse(true);
			selection.moveEnd('character', selectionStart);
			selection.moveStart('character', selectionStart);
			selection.select();
		}
		else this.setSelectionRange(selectionStart, selectionStart);

		return false;
	};
	//needed for pasting with the mouse
	control.onchange = function() {
		var oldValue = this.value.replace(/\r\n/g, "\n");
		var newValue = DoubleTextBox_format(oldValue, halfLength);
		if (oldValue != newValue) this.value = newValue;
	};
}

function DoubleTextBox_format(oldValue, halfLength) {
	var newValue = oldValue;
	var firstIndex, secondIndex;
	if ((secondIndex = newValue.indexOf("\n", (firstIndex = newValue.indexOf("\n")) + 1)) > -1)
		newValue = newValue.substr(0, secondIndex);
	return newValue.substr(0, Math.min(firstIndex, halfLength))
		+ (firstIndex > -1 ? "\n" : "")
		+ newValue.substr(firstIndex + 1, halfLength);
}