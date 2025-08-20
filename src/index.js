module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = bracketsConfig.map(([open]) => open);
  const bracketPairs = Object.fromEntries(
    bracketsConfig.map(([open, close]) => [close, open])
  );
  const symmetricBrackets = bracketsConfig
    .filter(([open, close]) => open === close)
    .map(([br]) => br);

  for (let i = 0; i < str.length; i += 1) {
    const curr = str[i];

    if (symmetricBrackets.includes(curr)) {
      if (stack[stack.length - 1] === curr) {
        stack.pop();
      } else {
        stack.push(curr);
      }
    } else if (openBrackets.includes(curr)) {
      stack.push(curr);
    } else {
      if (stack.length === 0) return false;
      const top = stack[stack.length - 1];
      if (bracketPairs[curr] === top) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
};
