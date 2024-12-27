export const closest = (el: HTMLElement, className: string) => {
  let tmp: HTMLElement | null = el;
  while (tmp != null) {
    if (tmp.classList.contains(className)) {
      return tmp;
    }
    tmp = tmp.parentElement;
  }
  return tmp;
};

export const hasClass = (el: HTMLElement, className: string) => {
  return el.classList.contains(className);
};

export const setClass = (el: HTMLElement, className: string) => {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
};

export const removeClass = (el: HTMLElement | NodeListOf<HTMLElement>, className: string) => {
  if (el instanceof HTMLElement) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    }
  } else {
    el.forEach((ele) => {
      if (ele.classList.contains(className)) {
        ele.classList.remove(className);
      }
    });
  }
};

export const removeClassRecursivly = (root: HTMLElement, className: string) => {
  if (root.classList.contains(className)) {
    root.classList.remove(className);
  }
  const targets = root.querySelectorAll('.' + className);
  targets.forEach((target) => {
    if (target.classList.contains(className)) {
      target.classList.remove(className);
    }
  });
};
