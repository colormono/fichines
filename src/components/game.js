import { filters as baseFilters } from 'pixi.js';
import * as filters from 'pixi-filters';
import Stats from '../utils/stats';

import { ScenesManager } from '../engine';
import SceneWalker from './scenes/walker/walker';
import SceneExample from './scenes/example/example';

import Title from './prefabs/title/title';
import './game.css';

/**
 * Game
 *
 * - Create game and insert into the DOM
 * - Create a player, enemies, coins and bullets
 * - Move the player with the gamepad
 * - Add GLSL Filters
 *
 * @param {Object} config Renderer configuration
 * @extends PIXI.Application
 * @returns {Game}
 */
export default class Game extends PIXI.Application {
  constructor(config) {
    // append renderer to DOM
    super(config);
    this.ratio = config.ratio;
    this.stage.interactive = true;
    document.body.appendChild(this.view);

    // add Stats
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);

    // preload assets
    this.preload();
  }

  // Resize function window
  // TODO: Observer pattern
  // All components should react to change
  resize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    /*
    let w, h;
    if (window.innerWidth / window.innerHeight >= this.ratio) {
      w = window.innerHeight * this.ratio;
      h = window.innerHeight;
    } else {
      w = window.innerWidth;
      h = window.innerWidth / this.ratio;
    }
    this.renderer.resize(w, h);

    this.background.width = w;
    this.background.height = h;
    */
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
    this.background = new PIXI.Graphics();
    this.background.beginFill(0xccff);
    this.background.drawRect(0, 0, window.innerWidth, window.innerHeight);
    this.background.endFill();
    this.gameContainer.addChild(this.background);

    // Create a scene container
    this.sceneContainer = new PIXI.Container();
    this.gameContainer.addChild(this.sceneContainer);

    // Create an overlay container
    this.overlayContainer = new PIXI.Container();
    this.gameContainer.addChild(this.overlayContainer);

    // Scene manager
    this.scenesManager = new ScenesManager(this);
    this.scenesManager.addScene('walker', SceneWalker);
    this.scenesManager.addScene('example', SceneExample);
    //this.scenesManager.showNextScene();
    //this.scenesManager.showNextScene();
    this.scenesManager.goTo('walker');

    // Game title
    this.message = new Title('Fichines');
    this.message.position.set(30, 90);
    this.overlayContainer.addChild(this.message);

    // Filters (A.K.A. Shaders)
    this.filterNoise = new baseFilters.NoiseFilter();
    this.filterCRT = new filters.CRTFilter();
    this.filterGlitch = new filters.GlitchFilter({
      fillMode: 3,
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

    // Listen for window resize events
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    // Game loop
    this.ticker.add(dt => this.update(dt));
  }

  /**
   * Update application
   *
   * called each frame to update logic and rendering
   *
   * @param {Number} dt Delta time
   */
  update(dt) {
    this.stats.begin();

    // update current scene
    this.state.update(dt);

    // update filters
    //this.filter.uniforms.time.value += 1;
    //this.filterGlitch.slices = parseInt(Math.random() * 3);
    this.filterNoise.seed = Math.random();
    this.filterCRT.seed = Math.random();

    // Last: close the stats
    this.stats.end();
  }
}
