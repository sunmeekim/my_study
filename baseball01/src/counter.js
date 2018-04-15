function counterFactory(id) {
  var _elId = id,
      _value = 1;
  if (document.getElementById(_elId) == null) throw Error(id + ' 찾을 수 없습니다.');
  document.getElementById(_elId).innerHTML = _value;
  return {
    increase: function() {
      if (_value > 8) return _value;
      _value += 1
      document.getElementById(_elId).innerHTML = _value;
      return _value;
    },
    decrease: function() {
      if (_value < 2) return _value;
      _value -= 1
      document.getElementById(_elId).innerHTML = _value;
      return _value;
    },
    get value() {
      return _value;
    }
  }
}

function scrollEvent (scrollValue) {
  var scrollValue = window.scrollY;
  window.addEventListener('scroll', function() {
    var el = document.querySelector('#new_game_float');
    
    if(scrollValue >= 335) el.classList.add('shown');
    else el.classList.remove('shown');
  });
}
