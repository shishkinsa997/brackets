module.exports = function check(str, bracketsConfig) {
  const openToClose = new Map(
    bracketsConfig.map(([open, close]) => [open, close])
  );
  const closeToOpen = new Map(
    bracketsConfig.map(([open, close]) => [close, open])
  );
  const symmetric = new Set(
    bracketsConfig
      .filter(([open, close]) => open === close)
      .map(([open]) => open)
  );

  const stack = [];

  const ok = str.split('').every((char) => {
    if (symmetric.has(char)) {
      if (stack[stack.length - 1] === char) stack.pop();
      else stack.push(char);
      return true;
    }

    if (openToClose.has(char)) {
      stack.push(char);
      return true;
    }

    if (closeToOpen.has(char)) {
      const needOpen = closeToOpen.get(char);
      const last = stack.pop();
      return last === needOpen;
    }

    return false;
  });

  return ok && stack.length === 0;
};
