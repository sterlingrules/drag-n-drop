var drag_n_drop = (function() {

  var Drag,
      list,
      dragElem,
      coverup;

  // Drag Event Handlers
  Drag = {
    init: function(e) {
      dragElem  = this;
      coverup   = _createCover.call(this);
      
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', dragElem.innerHTML);
      }

      list.appendChild(coverup);
    },

    destroy: function(e) {
      dragElem.classList.remove('hover'); // remove hover class
      coverup.parentNode.removeChild(coverup); // remove coverup

      [].forEach.call(list.childNodes, function (item) {
        item.classList.remove('over');
      });
    },

    enter: function() {
      this.classList.add('over');
    },

    leave: function() {
      this.classList.remove('over');
    },

    over: function(e) {
      if (e.preventDefault) e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    },

    drop: function(e) {
      var destHTML = this.innerHTML;

      if (e.stopPropagation) e.stopPropagation(); // prevents browser from redirecting.
      if (dragElem.innerHTML === destHTML) return false; // Don't do anything if dropping the same photo we're dragging.

      dragElem.innerHTML = destHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    },

    mouseover: function() {
      this.classList.add('hover');
    },

    mouseout: function() {
      this.classList.remove('hover');
    }
  };

  function _init() {
    var images = imagesModel.all();

    images.forEach(function(img) {
      var dragBlock = document.createElement('li'),
          item      = document.createElement('div');

      list = document.querySelector('#draggable-items');
      
      item.className = 'photo round-corners';
      item.style.backgroundImage = 'url(' + img + ')';
      
      dragBlock.className = 'draggable round-corners';
      dragBlock.setAttribute('draggable', true);
      dragBlock.appendChild(item);

      list.appendChild(dragBlock);
    });

    _setupEvents();
  }

  function _setupEvents() {
    [].forEach.call(list.childNodes, function(item) {
      item.addEventListener('dragstart', Drag.init, false);
      item.addEventListener('dragend', Drag.destroy, false);
      item.addEventListener('dragenter', Drag.enter, false);
      item.addEventListener('dragleave', Drag.leave, false);
      item.addEventListener('dragover', Drag.over, false);
      item.addEventListener('drop', Drag.drop, false);
      item.addEventListener('mouseover', Drag.mouseover, false);
      item.addEventListener('mouseout', Drag.mouseout, false);
    });
  }

  function _createCover() {
    var obj = document.createElement('div'),
        offsetTop = dom_explorer.offsetTop(this),
        offsetLeft = dom_explorer.offsetLeft(this);

    obj.id            = 'coverup';
    obj.style.width   = this.offsetWidth;
    obj.style.height  = this.offsetHeight;
    obj.style.top     = offsetTop;
    obj.style.left    = offsetLeft;

    return obj;
  }

  return {
    init: _init
  }
})();

drag_n_drop.init();