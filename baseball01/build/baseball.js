function Baseball(digit = 3) {
  this.digit = digit;
  this.problem = this.makeProblem(digit);
}
Baseball.prototype = {
  constructor: Baseball,
  makeProblem: function () {
    let problem = [],
        numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < this.digit; i++) {
      let max = 9 - i,
          index = getRandomInt(0, max);
      problem.push(numbers[index]);
      numbers.splice(index, 1);
    };

    return problem;
  },
  getResult: function (guess) {
    let result = "",
        strike = 0,
        ball = 0;

    this.problem.forEach((v, i) => {
      if (guess[i] === v) {
        strike++;
      } else if (v === guess[i]) {
        ball++;
      }
    });

    return new Result(strike, ball);
  }
};

function Result(strike, ball) {
  this.strike = strike;
  this.ball = ball;
}
Result.prototype.toString = function () {
  let resultString = `${this.strike}S${this.ball}B`;
  if (this.strike === 0 && this.ball === 0) {
    resultString = 'OUT';
  }
  return resultString;
};