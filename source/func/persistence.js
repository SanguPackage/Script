function getCookie(name, isGlobalWorld)
{
	if (true || localStorage === undefined)
	{
		//console.log("no localstorage?");
		if (document.cookie.match(/;/))
		{
			var cooks = document.cookie.split("; ");
			for (var x = 0; x < cooks.length; x++)
			{
				var cookie = cooks[x];
				if (cookie.match(name + "="))
					return cookie.replace(name + "=", "");
			}
		}
		else
		{
			if (document.cookie.match(name + "="))
				return document.cookie.replace(name + "=", "");
		}

		return '';
	}
	else
	{
		var item = localStorage.getItem(name);
		if (item == null) return '';
		//var 
	}
}

function setCookie(name, value, expireMinutes)
{
	var date_obj = new Date();
	time = date_obj.getTime();
	if (expireMinutes == undefined)
	{
		time += 1 * 60 * 1000 * 24 * 356;
	}
	else
	{
		time += expireMinutes * 1000 * 60;
	}
	date_obj.setTime(time);

	var expires = "expires=" + date_obj.toGMTString() + ";";

	document.cookie = name + "=" + value + ";" + expires;
}