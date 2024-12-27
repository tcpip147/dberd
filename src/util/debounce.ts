export const debounce = (callback: Function, delay: number) => {
  let timeout: number | undefined;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    callback();
  }, delay);
};

export const threshold = (lock: boolean[], callback: Function) => {
  if (!lock[0]) {
    lock[0] = true;
    requestAnimationFrame(() => {
      callback();
      lock[0] = false;
    });
  }
};
