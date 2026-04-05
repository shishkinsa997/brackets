module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const brackets = Object.fromEntries(
    bracketsConfig.map(([open, close]) => [open, close])
  );

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    if (brackets[stack.at(-1)] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};
