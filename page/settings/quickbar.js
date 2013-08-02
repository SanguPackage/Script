if (user_data.scriptbar.editBoxCols != null && user_data.scriptbar.editBoxCols != false) {
	// TODO: textareaIfy: This might be useful on other places aswell. Move to func/UI?
	function textareaIfy(element) {
		var textarea = 
			$('<textarea>')
				.attr('cols', Math.round(user_data.scriptbar.editBoxCols / 9))
				.attr('rows', user_data.scriptbar.editBoxRows)
				.val($(element).val());

		textarea.change(function () {
			element.val($(this).val());
		});

		element.before(textarea);
		$(element).hide();
	}

	var url = $("form :input[type='text']").css("width", user_data.scriptbar.editBoxCols).last();
	textareaIfy(url);
}