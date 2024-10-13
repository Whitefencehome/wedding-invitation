var map = new daum.roughmap.Lander({
  timestamp: "1728822970654",
  key: "2kvjs",
  mapHeight: "420",
});
map.render();

var copies = document.getElementsByClassName("copy-click");
for (var e of copies) {
  e.addEventListener("click", function (ev) {
    ev.preventDefault();
    var e = ev.currentTarget;
    var text = e.textContent;
    var copyHandler = function () {
      e.className = "copy-click show-tooltip";
      setTimeout(function () {
        e.className = "copy-click";
      }, 1000);
    };
    if (document.execCommand) {
      copyToClipboard(text);
      copyHandler();
    } else {
      navigator.clipboard.writeText(text).then(copyHandler);
    }
  });
}
