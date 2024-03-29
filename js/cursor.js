const cursor = document.querySelector("#cursor");

const DEFAULT_CURSOR_SIZE = cursor.style.getPropertyValue("--height");
const DEFAULT_CURSOR_BGCOLOR = cursor.style.getPropertyValue("--bg-color");

let isCursorLocked = false;

document.addEventListener("mousedown", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--scale", 0.7);
    cursor.style.setProperty("--bg-color", '#6547FE');
  }
});

document.addEventListener("mouseup", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--scale", 1);
    cursor.style.setProperty("--bg-color", DEFAULT_CURSOR_BGCOLOR);
  }
});

document.addEventListener("mousemove", ({ x, y }) => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--top", y + "px");
    cursor.style.setProperty("--left", x + "px");
  }
});

document.querySelectorAll("a, button").forEach((a) => {
  let rect = null;

  a.addEventListener(
    "mouseenter",
    ({ target }) => {
      isCursorLocked = true;

      rect = target.getBoundingClientRect();

      cursor.classList.add("is-locked");
      cursor.style.setProperty("--top", rect.top + rect.height / 2 + "px");
      cursor.style.setProperty("--left", rect.left + rect.width / 2 + "px");
      cursor.style.setProperty("--width", rect.width + "px");
      cursor.style.setProperty("--height", rect.height + "px");

      target.style.setProperty("--scale", 1.05);
    },
    { passive: true }
  );

  a.addEventListener(
    "mousemove",
    ({ target }) => {
      const halfHeight = rect.height / 2;
      const topOffset = (event.y - rect.top - halfHeight) / halfHeight;
      const halfWidth = rect.width / 2;
      const leftOffset = (event.x - rect.left - halfWidth) / halfWidth;

      cursor.style.setProperty("--translateX", `${leftOffset * 3}px`);
      cursor.style.setProperty("--translateY", `${topOffset * 3}px`);

      target.style.setProperty("--translateX", `${leftOffset * 6}px`);
      target.style.setProperty("--translateY", `${topOffset * 4}px`);
    },
    { passive: true }
  );

  a.addEventListener(
    "mouseleave",
    ({ target }) => {
      isCursorLocked = false;

      cursor.style.setProperty("--width", DEFAULT_CURSOR_SIZE);
      cursor.style.setProperty("--height", DEFAULT_CURSOR_SIZE);
      cursor.style.setProperty("--translateX", 0);
      cursor.style.setProperty("--translateY", 0);

      target.style.setProperty("--translateX", 0);
      target.style.setProperty("--translateY", 0);
      target.style.setProperty("--scale", 1);

      setTimeout(() => {
        if (!isCursorLocked) {
          cursor.classList.remove("is-locked");
        }
      }, 100);
    },
    { passive: true }
  );
});

document.querySelectorAll("p,h1, h2, h3, h4, h5, h6, ul, ol").forEach((p) => {
  p.addEventListener(
    "mouseover",
    () => {
      cursor.style.setProperty("--width", "0.25rem");
      cursor.style.setProperty("--height", "1.5em");
    },
    { passive: true }
  );

  p.addEventListener(
    "mouseout",
    () => {
      cursor.style.setProperty("--width", DEFAULT_CURSOR_SIZE);
      cursor.style.setProperty("--height", DEFAULT_CURSOR_SIZE);
    },
    { passive: true }
  );
});
