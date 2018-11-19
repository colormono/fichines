import * as PIXI from 'pixi.js';
import coinTexture from './coin1.png';

/**
 * Coin
 *
 * @exports Coin
 * @extends Sprite
 */
export default class Coin extends PIXI.Sprite {
  constructor(texture) {
    super(texture || PIXI.Texture.fromImage(coinTexture));
    this.bulletSpeed = 5;
  }

  get type() {
    return 'coin';
  }

  /**
   * animation loop
   * @return {null}
   */
  update() {
    this.position.x += Math.cos(this.rotation) * this.bulletSpeed;
    this.position.y += Math.sin(this.rotation) * this.bulletSpeed;
  }
}
