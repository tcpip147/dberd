export const debounce = (callback: Function, delay: number) => {
  let timeout: number | undefined;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    callback();
  }, delay);
};
