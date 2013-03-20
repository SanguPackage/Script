// Inject script in the page
(function () {
     var script = document.createElement("script");
     script.textContent = "(" + sangu_ready + ")()";
     document.body.appendChild(script);
})();