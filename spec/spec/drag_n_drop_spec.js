describe('drag_n_drop image setup', function() {

  beforeEach(function() {
    setFixtures('<ul id="draggable-items"></ul>');
  });

  it('should begin with an empty list', function() {
    var list = document.querySelector('#draggable-items');
    expect(list.childNodes.length).toEqual(0);
  });
  
  it('should have nine items', function() {
    drag_n_drop.init();
    var list = document.querySelector('#draggable-items');
    expect(list.childNodes.length).toEqual(9);
  });
  
});

describe('drag_n_drop drag events', function() {

  var evt,
      elem,
      list;

  beforeEach(function() {
    setFixtures('<ul id="draggable-items"></ul>');
    list = document.querySelector('#draggable-items');
    drag_n_drop.init();

    elem = list.childNodes[0]; // after init, assign first element
  });

  it('should be hidden by coverup on start of drag', function() {
    evt = new CustomEvent('dragstart', true, true);
    list.childNodes[0].dispatchEvent(evt);
    expect(document.querySelector('#coverup')).not.toBeNull();
  });

  it('should remove coverup on end of drag', function() {
    evt = {
      start: new CustomEvent('dragstart', true, true),
      end:   new CustomEvent('dragend', true, true)
    };

    // the event needs to trigger, to create
    // the coverup in the private scope
    elem.dispatchEvent(evt.start);

    elem.dispatchEvent(evt.end);
    expect(document.querySelector('#coverup')).toBeNull();
  });

  it('should assign the .over class to the destination draggable when entering', function() {
    evt = new CustomEvent('dragenter', true, true);
    list.childNodes[0].dispatchEvent(evt);
    expect(list.childNodes[0].className.indexOf('over')).toBeGreaterThan(-1);
  });

  it('should remove the over class from the destination draggable when leaving', function() {
    evt = new CustomEvent('dragleave', true, true);
    elem.classList.add('over');
    elem.dispatchEvent(evt);
    expect(list.childNodes[0].className.indexOf('over')).toEqual(-1);
  });

  it('draggable should get a hover class on mouseover', function() {
    evt = new MouseEvent('mouseover', true, true);
    elem.dispatchEvent(evt);
    expect(list.childNodes[0].className.indexOf('hover')).toBeGreaterThan(-1);
  });

  it('draggable should lose hover class on mouseout', function() {
    evt = {
      over: new MouseEvent('mouseover', true, true),
      out:  new MouseEvent('mouseout', true, true)
    };

    // the event needs to trigger, to add
    // the hover class to the draggable
    elem.dispatchEvent(evt.over);

    elem.dispatchEvent(evt.out);
    expect(list.childNodes[0].className.indexOf('hover')).toEqual(-1);
  });

});