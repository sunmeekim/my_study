function DotIntputControl(containerSelector, { callback = function () {}, digitNumber = 3 } = {}) {
  let inputElementText = '';

  this.inputContainer = document.querySelector(containerSelector);

  if (!(callback instanceof Function)) {
    throw new Error('콜백함수를 잘못 전달 받았습니다.');
  }

  if (this.inputContainer == null) {
    throw Error('컨테이너 아이디를 찾을 수 없습니다.');
  }

  for (let index = 0; index < digitNumber; index++) {
    inputElementText += '<input type="text" maxlength="1" class="digit-input" placeholder="•">';
  }

  this.inputContainer.innerHTML = inputElementText;
  this.inputContainer.addEventListener('keydown', e => {
    const charCode = typeof e.which == "undefined" ? e.keyCode : e.which; // IE는 keyCode
    if (e.target.className === 'digit-input') {
      if (charCode === 37 || charCode == 8 || charCode == 46 || charCode == 39 || charCode == 32) {
        return;
      }
      if (charCode === 13 && e.target === e.target.parentElement.lastElementChild) {
        const arrOfInputs = Array.from(e.target.parentElement.children),
              values = arrOfInputs.map(v => Number(v.value));
        arrOfInputs.forEach(v => v.value = null);
        e.target.parentElement.firstElementChild.select();
        callback.call(null, values);
        return;
      }
      if (!/[0-9]/.test(Number(String.fromCharCode(charCode)))) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  });
  this.inputContainer.addEventListener('keyup', e => {
    if (e.target.className === 'digit-input') {
      // http://keycode.info/ keycode
      const charCode = typeof e.which == "undefined" ? e.keyCode : e.which,
            // IE는 keyCode
      previousSibling = e.target.previousElementSibling,
            nextElementSibling = e.target.nextElementSibling;

      if (previousSibling) {
        // 왼쪽방향키, backspace, delete, 
        if (charCode === 37 || charCode == 8 || charCode == 46) {
          previousSibling.select();
          previousSibling.focus();
          return;
        }
      }

      if (nextElementSibling) {
        // 오른쪽방향키, 스페이스바
        if (charCode === 39 || charCode === 32) {
          nextElementSibling.select();
          return;
        }
        if (e.target.value != "") {
          nextElementSibling.select();
        }
      }
    }
  });
}
DotIntputControl.prototype.destory = function () {
  const clonedEl = this.inputContainer.cloneNode(false); // true면 자식이 포함된다.
  this.inputContainer.parentNode.replaceChild(clonedEl, this.inputContainer);
};