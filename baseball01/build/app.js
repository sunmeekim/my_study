function App() {
  const c1 = counterFactory('digit-number');

  document.getElementById('minus-btn').addEventListener('click', c1.decrease);
  document.getElementById('plus-btn').addEventListener('click', c1.increase);

  document.querySelector('#start-btn').addEventListener('click', e => {
    this.startGame(c1.value);
    e.preventDefault();
  });
}

App.prototype.scrollEvent = function (scrollValue) {
  var scrollValue = window.scrollY;
  window.addEventListener('scroll', function () {
    var el = document.querySelector('#new_game_float');

    if (scrollValue >= 335) el.classList.add('shown');else el.classList.remove('shown');
  });
};
App.prototype.startGame = function (digit) {
  const resultsContainerEl = document.querySelector('.result-container');
  const baseball = new Baseball(digit);
  console.log(`Problem : ${baseball.problem}`);
  try {
    this.dotInputContol = new DotIntputControl('.digit-input-container', { digitNumber: digit,
      callback: numbers => {
        const result = baseball.getResult(numbers);
        resultsContainerEl.insertAdjacentHTML('beforeend', tag`<li class="list-group-item">
              <span class="guess">${numbers}</span>
              <span class="badge result">${result.toString()}</span>
            </li>`);
        if (result.strike === digit) {
          alert('정답을 맞추셨습니다!');
          this.resetGame();
        }
        console.log(result.toString());
      }
    });
  } catch (e) {
    alert(e);
  }
  document.querySelector('.digit-selector').style.display = "none";
  document.querySelector('.game-main').style.display = "block";
};
App.prototype.resetGame = function () {
  // 모든 이벤트와 자식 요소를 제거
  this.dotInputContol.destory();

  // 자식 요소를 제거
  document.querySelector('.result-container').innerHTML = '';
  document.querySelector('.digit-selector').style.display = "block";
  document.querySelector('.game-main').style.display = "none";
};

new App();