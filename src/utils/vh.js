import debounce from "lodash/debounce";

export const vh = (window) => {
  if (!window) throw new Error("window is not exist");

  return debounce(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, 300);
};
