/**
 * PIXI OOP Game
 *
 * - Create game and insert into the DOM
 * - Create a player, enemies, coins and bullets
 * - Move the player with the gamepad
 * - Add GLSL Filters
 *
 * @exports Game
 */
import { filters as baseFilters } from 'pixi.js';
import * as filters from 'pixi-filters';
import { Bump, Controls, toggleFullScreen, inViewport } from '../utils';
import Stats from '../utils/stats';

import Title from './prefabs/title/title';
import Player from './prefabs/player/player';
import MyCanvas from './prefabs/my-canvas/my-canvas';
import MyParticles from './prefabs/my-particles/my-particles';
import './game.css';

export default class Game {
  constructor(config) {
    // Create and insert app into the DOM
    this.app = new PIXI.Application(config);
    this.app.renderer.backgroundColor = 0x333333;
    document.body.appendChild(this.app.view);

    // Add Stats
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);

    // Add Physics engine
    this.b = new Bump(PIXI);

    // Add Keyboard input
    this.controls = new Controls();

    // Preload assets
    this.preload();
  }

  preload() {
    PIXI.loader
      .add('enemy', './assets/images/skull.png')
      .add('coin1', './assets/images/coin1.png')
      .add('coin2', './assets/images/coin2.png')
      .add('coin3', './assets/images/coin3.gif')
      .on('progress', (loader, resource) => {
        console.log('loading: ' + resource.url);
        console.log('progress: ' + loader.progress + '%');
      })
      // start when everything is loaded
      .load(this.setup.bind(this));
  }

  setup() {
    // destructuring
    const { stage, screen } = this.app;
    const { resources } = PIXI.loader;

    // Create a game container
    this.gameContainer = new PIXI.Container();
    stage.addChild(this.gameContainer);

    // Fill the background
    let background = new PIXI.Graphics();
    background.beginFill(0x111111);
    background.drawRect(0, 0, screen.width, screen.height);
    background.endFill();
    this.gameContainer.addChild(background);

    // Create the player
    this.player = new Player(resources.coin2.texture);
    this.player.position.set(500, 200);
    this.player.setControls(this.controls);
    this.gameContainer.addChild(this.player);

    // Add bullets support
    this.bullets = [];
    this.tryShooting = () => {
      let newBullet = this.player.shoot();
      if (newBullet) {
        this.gameContainer.addChild(newBullet);
        this.bullets.push(newBullet);
        //console.log('Balas vivas', this.bullets.length);
      }
    };
    stage.interactive = true;
    stage.on('mousedown', () => this.tryShooting());
    this.controls.space.press = () => this.tryShooting();
    this.controls.enter.press = () => toggleFullScreen();

    // Create an enemy
    this.enemy = new PIXI.Sprite(resources.enemy.texture);
    this.enemy.anchor.set(0.5, 0.5);
    this.enemy.position.set(500, 500);
    this.gameContainer.addChild(this.enemy);

    // Create coins
    this.coins = new PIXI.Container();
    this.coins.position.set(100, 100);
    this.gameContainer.addChild(this.coins);
    //this.coins.removeChild(coin3);
    for (let i = 0; i < 100; i++) {
      let monedita = new PIXI.Sprite(resources.coin1.texture);
      const w = Math.random() * screen.width;
      const h = Math.random() * screen.height;
      monedita.position.set(w, h);
      monedita.rotation = w;
      this.coins.addChild(monedita);
    }

    // Animated texture from a canvas (p5?)
    const fromMyCanvas = new MyCanvas();
    this.p5canvas = new PIXI.Sprite(fromMyCanvas.texture);
    this.p5canvas.position.set(150, Math.random() * 300);
    this.gameContainer.addChild(this.p5canvas);

    // Particles
    let myParticles = MyParticles();
    stage.addChild(myParticles);

    // Text title
    this.message = new Title('Avoid enemies!');
    this.message.position.set(30, 90);
    this.gameContainer.addChild(this.message);

    //Graphic Primitives
    let rectangle = new PIXI.Graphics();
    rectangle.beginFill(0x00ccff);
    rectangle.drawRect(0, 0, 100, 100);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    this.gameContainer.addChild(rectangle);

    // Shaders
    this.filterNoise = new baseFilters.NoiseFilter();
    this.filterCRT = new filters.CRTFilter();
    this.filterPixelate = new filters.PixelateFilter();
    this.filterGlitch = new filters.GlitchFilter({
      slices: 10,
      offset: 10,
      red: [-3, 0],
      green: [0, 3],
      blue: [3, 0]
    });

    this.gameContainer.filters = [
      this.filterGlitch,
      this.filterCRT,
      this.filterNoise
    ];

    this.player.filters = [this.filterPixelate];

    // Animate
    this.state = this.play;
    this.app.ticker.add(delta => {
      // Game loop
      this.gameLoop(delta);

      // Filters (update shader uniforms)
      //filter.uniforms.time.value += 1;
      this.filterNoise.seed = Math.random();
      this.filterCRT.seed = Math.random();
      //this.filterGlitch.slices = parseInt(Math.random() * 100);
    });
  }

  gameLoop(delta) {
    this.stats.begin();
    this.state(delta);
    this.stats.end();
  }

  play(delta) {
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
      if (!inViewport(x, y, screen.width, screen.height)) {
        this.bullets[b].destroy();
        this.bullets.splice(b, 1);
        break;
      }
    }

    // Collisions
    if (this.b.hit(this.player, this.enemy)) {
      this.message.text = 'Collission!';
    } else {
      this.message.text = 'Keep walking...';
    }

    // update canvas texture
    this.p5canvas.texture.update();
  }
}
