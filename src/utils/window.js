function toggleFullScreen() {
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

export { toggleFullScreen };
