if (user_data.scriptBarEditBoxCols != null && user_data.scriptBarEditBoxCols != false)
{
	function textareaIfy(element)
	{
		var textarea = 
			$('<textarea>')
				.attr('cols', Math.round(user_data.scriptBarEditBoxCols / 9))
				.attr('rows', user_data.scriptBarEditBoxRows)
				.val($(element).val());

		textarea.change(
			function ()
			{
				element.val($(this).val());
			});

		element.before(textarea);
		$(element).hide();
	}

	var url = $("form :input[type='text']").css("width", user_data.scriptBarEditBoxCols).last();
	textareaIfy(url);
}