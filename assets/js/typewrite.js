function scrollTypeWrite(
  originDescription,
  scrollElem,
  contentElem,
  backgroundElem,
  footerElem
) {
  var description = [];
  var f = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  var s = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  var t = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  var cs = f + s + t;
  function getConstantVowel(uni) {
    uni = uni - 0xac00;

    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - fn * 588) / 28);
    let tn = parseInt(uni % 28);

    return {
      f: f[fn],
      s: s[sn],
      t: t[tn],
    };
  }

  for (var i = 0; i < originDescription.length; i += 1) {
    ch = originDescription.charCodeAt(i);
    if ("가".charCodeAt() <= ch && ch < "힣".charCodeAt()) {
      var word = getConstantVowel(ch);
      description.push(word.f);
      description.push(word.s);
      description.push(word.t);
    } else {
      description.push(String.fromCharCode(ch));
    }
  }

  var draw = function () {
    var progress =
      (window.scrollY - scrollElem.offsetTop) /
      (scrollElem.clientHeight - window.innerHeight);
    if (progress < 0) {
      progress = 0;
      contentElem.innerHTML = "";
      footerElem.classList.remove("active");
      backgroundElem.classList.remove("active");
      return;
    } else if (progress > 1) {
      progress = 1;
      footerElem.classList.add("active");
      backgroundElem.classList.add("active");
    } else if (progress > 0.9) {
      footerElem.classList.add("active");
      backgroundElem.classList.add("active");
    } else {
      footerElem.classList.remove("active");
      backgroundElem.classList.remove("active");
    }

    var progressIdx = parseInt((description.length - 1) * progress);
    var text = "";
    var hangulBuffer = [];
    function combineHangul(uni) {
      if (hangulBuffer.length == 0) {
        hangul = uni;
        hangulBuffer.push(uni);
      } else if (hangulBuffer.length == 1) {
        fn = f.indexOf(hangulBuffer[0]);
        sn = s.indexOf(uni);
        hangul = String.fromCharCode(fn * 588 + sn * 28 + 0xac00);
        hangulBuffer.push(uni);
      } else {
        fn = f.indexOf(hangulBuffer[0]);
        sn = s.indexOf(hangulBuffer[1]);
        tn = t.indexOf(uni);
        hangul = String.fromCharCode(fn * 588 + sn * 28 + tn + 0xac00);
        hangulBuffer = [];
      }
      return hangul;
    }
    for (var cursor = 0; cursor <= progressIdx; cursor += 1) {
      var ch = description[cursor];
      if (ch == "\n") {
        text += "<br/>";
      } else if (cs.indexOf(ch) > -1) {
        var hangul = combineHangul(ch);
        if (hangulBuffer.length == 2 || hangulBuffer.length == 0) {
          text = text.slice(0, -1) + hangul;
        } else {
          text += hangul;
        }
      } else {
        text += ch;
      }
    }

    contentElem.innerHTML = text;
  };
  window.addEventListener("scroll", draw, false);
  draw();
}
