$.fn.sortElements = (function () {
	var sort = [].sort;
	return function (comparator, getSortable) {
		getSortable = getSortable || function () { return this; };
		var placements = this.map(function () {
			var sortElement = getSortable.call(this),
			parentNode = sortElement.parentNode,
			// Since the element itself will change position, we have
			// to have some way of storing its original position in
			// the DOM. The easiest way is to have a 'flag' node:
			nextSibling = parentNode.insertBefore(
				document.createTextNode(''),
				sortElement.nextSibling
			);

			return function () {
				if (parentNode === this) {
					throw new Error("You can't sort elements if any one is a descendant of another.");
				}

				// Insert before flag:
				parentNode.insertBefore(this, nextSibling);
				// Remove flag:
				parentNode.removeChild(nextSibling);
			};
		});

		return sort.call(this, comparator).each(function (i) {
			placements[i].call(getSortable.call(this));
		});
	};
})();

// TODO: this function should be someplace else. It's not UI related.
$.fn.outerHTML = 
	function () { 
		return $('<div>').append(this.clone()).remove().html();
	};

function createSpoiler(button, content, opened) {
	return "<div id='spoiler'><input type='button' value='" + button + "' onclick='toggle_spoiler(this)' /><div><span style='display:" + (opened ? 'block' : 'none') + "'>" + content + "</span></div></div>";
}

function createMoveableWidget(id, title, content) {
	return '<div id=' + id + '+ class="vis moveable widget"><h4><img style="float: right; cursor: pointer;"'
			+ ' onclick="return VillageOverview.toggleWidget(\'' + id + '\', this);" src="graphic/minus.png">'
			+ title + '</h4><div style="display: block;">' + content + '</div></div>';
}

function printCoord(village, desc) {
	//TODO: add javascript to put x|y in clipboard
	if (server_settings.coordinateLinkAllowed) {
		return "<a href=# onclick=\"$('#inputx').val("+village.x+"); $('#inputy').val("+village.y+"); return false;\">" + desc + "</a>";
	} else {
		return "<b>" + desc + "</b> <input type=text onclick='this.select(); this.focus()' size=7 value='" + village.x + '|' + village.y + "'>";
	}
}