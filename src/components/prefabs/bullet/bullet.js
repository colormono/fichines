import * as PIXI from 'pixi.js';
import bulletTexture from './bullet.png';

/**
 * Bullet
 *
 * @exports Bullet
 * @extends Sprite
 */
export default class Bullet extends PIXI.Sprite {
  constructor(texture) {
    super(texture || PIXI.Texture.fromImage(bulletTexture));
    this.bulletSpeed = 5;
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
