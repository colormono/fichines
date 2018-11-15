import * as PIXI from 'pixi.js';
import { rotateToPoint } from '../../../utils';
import Bullet from '../bullet/bullet';
import playerTexture from './skull.png';

/**
 * Player
 *
 * Our hero
 *
 * @param  {texture} player texture
 * @exports Player
 * @extends Sprite
 */
export default class Player extends PIXI.Sprite {
  constructor(texture) {
    super(texture || PIXI.Texture.fromImage(playerTexture));

    this.anchor.set(0.5);
    this.interactive = true;
    this.cursor = 'wait';

    // Velocity
    this.vx = 0;
    this.vy = 0;

    // Bullets
    this.canShoot = true;
  }

  setControls(controls) {
    // Up
    controls.up.press = () => (this.vy = -5);
    controls.up.release = () => {
      if (!controls.down.isDown) this.vy = 0;
    };

    // Right
    controls.right.press = () => (this.vx = 5);
    controls.right.release = () => {
      if (!controls.left.isDown) this.vx = 0;
    };

    // Left
    controls.left.press = () => (this.vx = -5);
    controls.left.release = () => {
      if (!controls.right.isDown) this.vx = 0;
    };

    // Down
    controls.down.press = () => (this.vy = 5);
    controls.down.release = () => {
      if (!controls.up.isDown) this.vy = 0;
    };
  }

  update(delta) {
    //this.rotation += 5 * delta;

    // update position
    this.position.x += this.vx;
    this.position.y += this.vy;

    // toroide
    if (this.position.x > screen.width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = screen.width;
    if (this.position.y > screen.height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = screen.height;
  }

  // rotate to point, animate shooting
  lookAt(x, y) {
    this.rotation = rotateToPoint(x, y, this.position.x, this.position.y);
  }

  shoot() {
    if (this.canShoot) {
      const props = {
        x: this.position.x + Math.cos(this.rotation) * 20,
        y: this.position.y + Math.sin(this.rotation) * 20,
        angle: this.rotation
      };

      var bullet = new Bullet();
      bullet.position.x = props.x;
      bullet.position.y = props.y;
      bullet.rotation = props.angle;

      return bullet;
    }
    return false;
  }
}
