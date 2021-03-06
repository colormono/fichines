import * as PIXI from 'pixi.js';

export default class Bunny extends PIXI.Sprite {
  constructor() {
    super(PIXI.Texture.fromImage('../assets/images/skull.png'));
    this.anchor.set(0.5);
  }

  update(delta) {
    this.rotation += 5 * delta;
  }
}
