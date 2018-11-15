export function inViewport(x, y, w, h) {
  if (x > w || x < 0 || y > h || y < 0) {
    return false;
  }
  return true;
}

export function rotateToPoint(mx, my, px, py) {
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y, dist_X);
  //var degrees = angle * 180/ Math.PI;
  return angle;
}
