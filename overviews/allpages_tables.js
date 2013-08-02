//tableHandler.overviewTable

var tableHandler;
(function (tableHandler) {
	function init(id, options) {
		tableHandler.overviewTableName = id;
		tableHandler.overviewTable = $("#" + id);
		tableHandler.settings = {
			hasBottomTotalRow: false
			
		};
		tableHandler.settings = $.extend({}, tableHandler.settings, options || {});
		
		// do stuff on page load
		ajaxLoadNextPageSetup();
	}
	tableHandler.init = init;
	
	function getReplacedVillageRows(page) {
		var overviewTable = typeof page === 'undefined' ? tableHandler.overviewTable : $("#"+tableHandler.overviewTableName, page);
		if (typeof tableHandler.settings.rowReplacer === "function") {
			var newTable = "";
			var villageRows = selectVillageRows(overviewTable);
			villageRows.each(function () {
				var row = $(this);
				newTable += tableHandler.settings.rowReplacer(row);
			});
			return newTable;
		} else {
			return selectVillageRows(overviewTable);
		}
	}
	tableHandler.getReplacedVillageRows = getReplacedVillageRows;
	
	function selectVillageRows(page) {
		//q(tableHandler.overviewTableName);
		//q("grrrr:"+page.find("tr").not(":first").length);
		var villageRows = page.find("tr").not(":first");
		if (tableHandler.settings.hasBottomTotalRow) {
			villageRows = villageRows.not(":last");
		}
		//q(villageRows);
		return villageRows;
	}
	
	function ajaxLoadNextPageSetup() {
		if (server_settings.ajaxAllowed) {
			var nextPageLink = $("#paged_view_content a.paged-nav-item").first();
			if (nextPageLink.length !== 0) {
				// find all pages we can still add to the current table
				var currentPageLabel = nextPageLink.parent().find("strong");
				var nextPageLinks = [];
				currentPageLabel = currentPageLabel.next();
				while (currentPageLabel.text().match(/\d/)) {
					nextPageLinks.push(currentPageLabel);
					currentPageLabel = currentPageLabel.next();
				}
				
				if (nextPageLinks.length > 0) {
					nextPageLink.parent().append("&nbsp; <a href=# id=loadNextPage>"+trans.sp.overviews.loadNextPage+"</a>");
					
					$("#loadNextPage").click(function() {
						// Get next page or remove link
						var nextPageUrl = nextPageLinks[0];
						if (nextPageLinks.length == 1) {
							$(this).replaceWith("<strong>"+trans.sp.overviews.loadNextPage+"</strong>");
						}
						nextPageLinks.shift();
						
						// Fetch and insert next page
						ajax(nextPageUrl.attr("href"), function (page) {
							var nextPageRows = getReplacedVillageRows($(page));
							if (tableHandler.settings.hasBottomTotalRow) {
								tableHandler.overviewTable.find("tr:last").before(nextPageRows);
							} else {
								tableHandler.overviewTable.append(nextPageRows);
							}

							nextPageUrl.replaceWith("<strong>"+nextPageUrl.text()+"</strong>");
						});
					});
				}
			}
		}
	}
})(tableHandler || (tableHandler = {}));