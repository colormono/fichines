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

    this.create();
  }

  get type() {
    return 'player';
  }

  create() {
    // Bullets
    this.canShoot = true;
    this.collideWorldBounds = false;
    this.can_jump = true;
    this.vel = {
      x: 0,
      y: 0
    };
  }

  setGamepad(gamepad) {
    // Up
    gamepad.up.press = () => (this.vel.y = -5);
    gamepad.up.release = () => {
      if (!gamepad.down.isDown) this.vel.y = 0;
    };

    // Right
    gamepad.right.press = () => (this.vel.x = 5);
    gamepad.right.release = () => {
      if (!gamepad.left.isDown) this.vel.x = 0;
    };

    // Left
    gamepad.left.press = () => (this.vel.x = -5);
    gamepad.left.release = () => {
      if (!gamepad.right.isDown) this.vel.x = 0;
    };

    // Down
    gamepad.down.press = () => (this.vel.y = 5);
    gamepad.down.release = () => {
      if (!gamepad.up.isDown) this.vel.y = 0;
    };
  }

  update(delta) {
    //this.rotation += 5 * delta;

    // update position
    this.position.x += this.vel.x;
    this.position.y += this.vel.y;

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

  jump() {
    if (!this.jumping && !this.falling) {
      this.ddy = this.ddy - this.impulse; // an instant big force impulse
      this.jumping = true;
    }
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
