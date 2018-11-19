import * as PIXI from 'pixi.js';
import * as filters from 'pixi-filters';
import { Gamepad, Scene } from '../../../engine';
import { inViewport } from '../../../utils';
import Intersects from 'intersects';
import Player from '../../prefabs/player/player';
import Coin from '../../prefabs/coin/coin';

// Add Keyboard and Gamepad support
const gamepad = new Gamepad();

/**
 * Scene: Collisions
 *
 * Top down view arcade
 *
 * @param {Object} app App reference
 * @extends Scene
 * @exports Collisions
 */
export default class Collisions extends Scene {
  constructor(app) {
    super();
    this.app = app;
    this.setup();
  }

  /**
   * Create scene
   *
   * called when loader has finished
   */
  setup() {
    // Fill the background
    let background = new PIXI.Graphics();
    background.beginFill(0x00ccff);
    background.drawRect(0, 0, window.innerWidth, window.innerHeight);
    background.endFill();
    this.addChild(background);

    // Populate with coins
    this.coins = new PIXI.Container();
    //this.coins.position.set(100, 100);
    this.addChild(this.coins);
    //this.coins.removeChild(coin3);
    for (let i = 0; i < 10; i++) {
      let monedita = new Coin();
      const w = Math.random() * window.innerWidth;
      const h = Math.random() * window.innerHeight;
      monedita.position.set(w, h);
      //monedita.rotation = w;
      this.coins.addChild(monedita);
    }

    // Create the player
    this.player = new Player();
    this.player.position.set(500, 200);
    this.player.setGamepad(gamepad);
    this.addChild(this.player);

    // Apply pixelated filter
    this.filterPixelate = new filters.PixelateFilter();
    this.player.filters = [this.filterPixelate];

    // Add bullets support
    this.bullets = [];
    this.tryShooting = () => {
      let newBullet = this.player.shoot();
      if (newBullet) {
        this.addChild(newBullet);
        this.bullets.push(newBullet);
        //console.log('Balas vivas', this.bullets.length);
      }
    };
    gamepad.space.press = () => this.tryShooting();
    this.app.stage.on('mousedown', () => this.tryShooting());

    // Create an enemy
    this.enemy = new PIXI.Sprite(PIXI.loader.resources.enemy.texture);
    this.enemy.anchor.set(0.5, 0.5);
    this.enemy.position.set(500, 500);
    this.addChild(this.enemy);
  }

  /**
   * Update scene
   *
   * called each frame to update logic
   *
   * @param {Number} dt Delta time
   */
  update(dt) {
    // Player
    this.player.update();
    this.player.lookAt(
      this.app.renderer.plugins.interaction.mouse.global.x,
      this.app.renderer.plugins.interaction.mouse.global.y
    );

    // Enemy
    this.enemy.rotation += 0.01;

    // Bullets
    for (let b = this.bullets.length - 1; b >= 0; b--) {
      this.bullets[b].update();
      const { x, y } = this.bullets[b].position;
      if (!inViewport(x, y, window.innerWidth, window.innerHeight)) {
        this.bullets[b].destroy();
        this.bullets.splice(b, 1);
        break;
      }
    }

    // Collisions
    // boxBox(x1, y1, w1, h1, x2, y2, w2, h2)
    if (
      Intersects.boxBox(
        this.player.position.x,
        this.player.position.y,
        this.player.width,
        this.player.height,
        this.enemy.position.x,
        this.enemy.position.y,
        this.enemy.width,
        this.enemy.height
      )
    ) {
      this.app.message.text = 'Game over!';
      this.app.scenesManager.goTo('example');
    } else {
      this.app.message.text = 'Keep walking...';
    }

    // recolectar monedas
    for (let i = 0; i < this.coins.children.length; i++) {
      if (
        Intersects.boxBox(
          this.player.position.x,
          this.player.position.y,
          this.player.width,
          this.player.height,
          this.coins.children[i].position.x,
          this.coins.children[i].position.y,
          this.coins.children[i].width,
          this.coins.children[i].height
        )
      ) {
        this.coins.removeChild(this.coins.children[i]);
      }
    }
  }

  /**
   * Collect coins
   */
  collectCoin() {}

  /**
   * Destroy scene
   */
  destroy() {
    console.log('destroy');
  }
}
