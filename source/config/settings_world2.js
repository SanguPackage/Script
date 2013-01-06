if (user_data.worldSpecific != undefined)
{
	$.extend(user_data, user_data.worldSpecific);
	user_data.worldSpecific = null;
}