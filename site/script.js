$(document).ready(function()
{
	$(".showSpoiler").click(
		function()
		{
			var div = $(this);
			while (!div.hasClass("spoiler")) div = div.next();
			div.toggle();
			return false;
		});

	$(".showConfig").click(
		function()
		{
			var div = $(this);
			while (!div.hasClass("config")) div = div.next();
			div.toggle();
			return false;
		});
		
	$(".spoilerButton").click(
		function()
		{
			$(this).next().toggle();
		});
});