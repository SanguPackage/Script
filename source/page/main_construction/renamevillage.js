if (user_data.villageName != null && user_data.villageName.length > 0) {
	var showButtons = true;
	$.each(user_data.villageName, function (i, v) { if (game_data.village.name == v) showButtons = false; });

	if (showButtons) {
		var submitButton = $("input[type='submit']:last");
		$.each(user_data.villageName, function (i, v) {
			// rename village to one of the provided user_data.villageName options
			var button = $("<input type=button value='" + v + "'>")
				.bind("click", function () {
					$("input[name='name']").val(v);
					if (user_data.villageNameClick) {
						$("input[type='submit']").click();
					}
				});
			var input = submitButton.parent().append(button);
		});
	}
}