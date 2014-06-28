describe('dom_explorer offset functions', function() {

  beforeEach(function() {
    setFixtures('<div id="the-element" style="position:absolute; top:100px; left:203px;"></div>')
  })

  it('should get the top position of 100', function() {
    var elem = document.getElementById('the-element');
    expect(dom_explorer.offsetTop(elem)).toEqual(100);
  });

  it('should get the left position of 203', function() {
    var elem = document.getElementById('the-element');
    expect(dom_explorer.offsetLeft(elem)).toEqual(203);
  });

});