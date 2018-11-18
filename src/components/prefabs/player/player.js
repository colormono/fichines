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

  setGamepad(gamepad) {
    // Up
    gamepad.up.press = () => (this.vy = -5);
    gamepad.up.release = () => {
      if (!gamepad.down.isDown) this.vy = 0;
    };

    // Right
    gamepad.right.press = () => (this.vx = 5);
    gamepad.right.release = () => {
      if (!gamepad.left.isDown) this.vx = 0;
    };

    // Left
    gamepad.left.press = () => (this.vx = -5);
    gamepad.left.release = () => {
      if (!gamepad.right.isDown) this.vx = 0;
    };

    // Down
    gamepad.down.press = () => (this.vy = 5);
    gamepad.down.release = () => {
      if (!gamepad.up.isDown) this.vy = 0;
    };
  }

  update(delta) {
    //this.rotation += 5 * delta;

    // update position
    this.position.x += this.vx;
    this.position.y += this.vy;

    // toroide
    if (this.position.x > window.innerWidth) this.position.x = 0;
    if (this.position.x < 0) this.position.x = window.innerWidth;
    if (this.position.y > window.innerHeight) this.position.y = 0;
    if (this.position.y < 0) this.position.y = window.innerHeight;
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
