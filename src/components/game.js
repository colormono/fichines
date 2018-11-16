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
import { Controls, toggleFullScreen } from '../utils';
import Stats from '../utils/stats';

import Title from './prefabs/title/title';
import SceneWalker from './scenes/walker/walker';
import SceneExample from './scenes/example/example';
import './game.css';

export default class Game extends PIXI.Application {
  constructor(config) {
    // Create and insert app into the DOM
    super(config);
    document.body.appendChild(this.view);

    // Add Stats
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);

    // Add Keyboard input
    this.controls = new Controls();
    this.stage.interactive = true;

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
        //console.log('loading: ' + resource.url);
        console.log('progress: ' + loader.progress + '%');
      })
      // start when everything is loaded
      .load(this.setup.bind(this));
  }

  setup() {
    // Create a game container
    this.gameContainer = new PIXI.Container();
    this.stage.addChild(this.gameContainer);

    // Fill the background
    let background = new PIXI.Graphics();
    background.beginFill(0x111111);
    background.drawRect(0, 0, this.screen.width, this.screen.height);
    background.endFill();
    this.gameContainer.addChild(background);

    // Create the scenes
    this.sceneWalker = new SceneWalker(this);
    this.gameContainer.addChild(this.sceneWalker);

    // Current scene
    this.state = this.sceneWalker;

    // Game title
    this.message = new Title('Fichines');
    this.message.position.set(30, 90);
    this.gameContainer.addChild(this.message);

    // Filters (A.K.A. Shaders)
    this.filterNoise = new baseFilters.NoiseFilter();
    this.filterCRT = new filters.CRTFilter();
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

    // Animate
    this.ticker.add(delta => {
      this.gameLoop(delta);

      // Filters (update shader uniforms)
      //filter.uniforms.time.value += 1;
      //this.filterGlitch.slices = parseInt(Math.random() * 100);
      this.filterNoise.seed = Math.random();
      this.filterCRT.seed = Math.random();
    });
  }

  gameLoop(delta) {
    this.stats.begin();
    this.state.update(delta);
    this.stats.end();
  }
}
