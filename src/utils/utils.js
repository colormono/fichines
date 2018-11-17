export const checkScreen = (w, h, cw, ch) => w !== cw || h !== ch;

export function inViewport(x, y, w, h) {
  if (x > w || x < 0 || y > h || y < 0) {
    return false;
  }
  return true;
}

export function toggleFullScreen() {
  if (!document.mozFullScreen && !document.webkitFullScreen) {
    if (document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    } else {
      document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else {
      document.webkitCancelFullScreen();
    }
  }
}
