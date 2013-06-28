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

$.fn.outerHTML = 
	function () { 
		return $('<div>').append(this.clone()).remove().html();
	};

/** Create a dialog box on a fixed position with self closing functionality
	@id			The DOM ID of the div
	@content	.title: Short title. Defaults to Sangu Package.
				.body: The HTML to show in the body of the tooltip
	@options	.top: CSS top in px
				.left: CSS left in px
				.width: CSS width in px. Defaults to 350.
				.showOnce: If true the tooltip will never be shown again once closed. Defaults to true.
*/
function createFixedTooltip(id, content, options) {
	if (typeof options.width === 'undefined') {
		options.width = 350;
	}
	if (typeof options.showOnce === 'undefined') {
		options.showOnce = true;
	}
	if (typeof content.title === 'undefined') {
		content.title = "Sangu Package";
	}
	
	var persKey = "fixedToolTip_"+id; // Other implementations depend on this naming
	if (!options.showOnce || pers.getGlobal(persKey) == '') {
		content_value.after('<div id="' + id + '" class="vis" style="z-index: 100001; margin: 2px; '
			+ 'width: '+options.width+'px; display: block; position:absolute; top: '+options.top+'px; left: '+options.left+'px; border: 1px solid black; background-color: #F4E4BC">'
			+ '<h4>' + '<img id="'+id+'closeTooltip" style="float: right; cursor: pointer;" src="graphic/minus.png">' + content.title + '</h4>'
			+ '<div style="display: block; text-align: left; margin: 2px;">' + content.body + '</div>'
			+ '</div>');
		
		$("#"+id+"closeTooltip").click(function() {
			$("#" + id).hide();
			if (options.showOnce) {
				pers.setGlobal(persKey, "1");
			}
		});
	}
}

function createSpoiler(button, content, opened) {
	return "<div id='spoiler'><input type='button' value='" + button + "' onclick='toggle_spoiler(this)' /><div><span style='display:" + (opened ? 'block' : 'none') + "'>" + content + "</span></div></div>";
}

function createMoveableWidget(id, title, content) {
	return '<div id=' + id + '+ class="vis moveable widget"><h4><img style="float: right; cursor: pointer;"'
			+ ' onclick="return VillageOverview.toggleWidget(\'' + id + '\', this);" src="graphic/minus.png">'
			+ title + '</h4><div style="display: block;">' + content + '</div></div>';
}

function printCoord(village, desc) {
	if (server_settings.coordinateLinkAllowed) {
		return "<a href=# onclick=\"$('#inputx').val("+village.x+"); $('#inputy').val("+village.y+"); return false;\">" + desc + "</a>";
	} else {
		return "<b>" + desc + "</b> <input type=text onclick='this.select(); this.focus()' size=7 value='" + village.x + '|' + village.y + "'>";
	}
}