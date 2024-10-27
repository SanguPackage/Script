var lastCheck = sessionStorage.lastUpdateCheck,
    currentVersion = '//<!--@@INCLUDE "version.txt" INDENT=0 //-->';

function displayNewVersion() {
    var a = document.createElement('a');
    var linkText = document.createTextNode(" - Sangu Package Update!");
    a.appendChild(linkText);
    a.title = "Er is een update voor het Sangu Package beschikbaar!";
    a.href = "https://sangu.be";
    a.style.color = "black";
    a.style.fontWeight = "bolder";
    a.style.backgroundColor = "yellow";

    document.getElementById("linkContainer").appendChild(a);
}

if (typeof GM_xmlhttpRequest !== "undefined") {
    if (!lastCheck) {
        sessionStorage.lastUpdateCheck = "done";
        try
        {
            // GM_xmlhttpRequest didn't work when put in sangu_ready
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://www.sangu.be/api/sangupackageversion.php",
                synchronous: false,
                onload: function(response) {
                    if (response.responseText !== currentVersion) {
                        sessionStorage.lastUpdateCheck = "hasNew";
                        displayNewVersion();
                    }
                }
            });
        }
        catch (e)
        {
            console.log("error fetching latest version number:");
            console.log(e);
        }
    } else if (lastCheck === "hasNew") {
        displayNewVersion();
    }
}