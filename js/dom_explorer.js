var dom_explorer = (function() {

  function getOffsetTop(elem) {
    var offsetTop = 0;

    do {  
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
      }
    } while(elem = elem.offsetParent);
    return offsetTop;
  }

  function getOffsetLeft(elem) {
    var offsetLeft = 0;

    do {  
      if (!isNaN(elem.offsetLeft)) {
        offsetLeft += elem.offsetLeft;
      }
    } while(elem = elem.offsetParent);
    return offsetLeft;
  }

  return {
    offsetTop: getOffsetTop,
    offsetLeft: getOffsetLeft
  }
})();