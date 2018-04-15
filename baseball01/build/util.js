function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tag(parts) {
  const vals = [].slice.call(arguments, 1);
  return parts.reduce(function (memo, next) {
    return memo + String(vals.shift()) + next;
  });
}