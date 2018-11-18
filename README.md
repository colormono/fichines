# Fichines

## Resources

### Builder

- https://webpack.js.org/

### Renderer

- [PixiJs](http://www.pixijs.com/): Engine
- [PixiJs DOCS](http://pixijs.download/release/docs/index.html): Engine documentation
- [Learning PixiJs](https://github.com/kittykatattack/learningPixi): Engine Tutorial
- [Awesome PixiJs](https://github.com/cursedcoder/awesome-pixijs): Curated list of plugins
- [Fullscreen](https://github.com/pixijs/pixi.js/wiki/v4-Tips%2C-Tricks%2C-and-Pitfalls#resizing-renderer): Resizing renderer
- [Canvas](https://www.html5canvastutorials.com/): Canvas Docs
- [Pixi Seed](https://github.com/edwinwebb/pixi-seed/): Starting boilerplate example

### Filters

- http://pixijs.download/release/docs/PIXI.filters.html
- https://github.com/pixijs/pixi-filters
- https://pixijs.io/pixi-filters/docs/
- https://pixijs.io/examples/#/basics/custom-filter.js
- https://github.com/ktingvoar/PixiGlitch/

### Input

- [Keyboard](https://github.com/kittykatattack/learningPixi#keyboard): How to read input from keyboard
- [Key Values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values): Keyboard value references
- [Pixi Keyboard](https://github.com/Nazariglez/pixi-keyboard): Wrapper for the keyboard
- [Web Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad): API Docs
- [gamepadtest](http://luser.github.io/gamepadtest/): Test connected gamepads

### Output

- [Stats.js](https://github.com/mrdoob/stats.js/): JavaScript Performance Monitor

### Animations

- [eventemitter3-timer](https://soimy.github.io/eventemitter3-timer/): Timer
- [GSAP PixiPlugin](https://greensock.com/docs/Plugins/PixiPlugin): Use the greensock powers

### Game utils

- [Playground](http://playgroundjs.com/): Game oriented framework
- [Pixi Collision detection](https://davidfig.github.io/intersects/): Collisions engine
- [Matter JS](http://brm.io/matter-js/): Physics engine
- [Matter JS Docs](http://brm.io/matter-js/docs/): Matter Physics engine docs
- [Pixi and Matter combined](https://codepen.io/colormono/pen/wQWjEv): Example
- [Pixi Camera](https://github.com/davidfig/pixi-viewport)
- [P2](https://github.com/schteppe/p2.js/): Physics engine
- [Proton](http://a-jie.github.io/Proton/): Particles engine
- [Pixi Game Engine Utils](https://github.com/kittykatattack/hexi#setupfunction): Up to v3

### Game assets

- [Itch.io](https://itch.io/): Store
- [GameDevMarket](https://www.gamedevmarket.net): Store
- [OpenGameArt](http://opengameart.org): Anything
- [Kenney](https://www.kenney.nl/assets): Tilesets
- [OrangeFreeSounds](http://www.orangefreesounds.com/): Sounds
- [Font](https://somepx.itch.io/humble-fonts-free)

### Beyond

- https://github.com/willianjusten/awesome-audio-visualization
- [Phaser Boilerplate](https://github.com/lean/phaser-es6-webpack): JS Game Framework

### Other Code Sources (Thanks for sharing!)

- https://github.com/deepstreamIO/ds-demo-spaceshooter
- https://github.com/idzhurov/pixijs-game-boilerplate
- https://github.com/gamestdio/pixi-engine
- http://proclive.io/shooting-tutorial/
- https://github.com/joegaffey/galaxeroids

### GLSL Example

```js
import { Filter, filters as baseFilters } from 'pixi.js';
import \* as filters from 'pixi-filters';

export default class Game {
  constructor(config) {
    //...
    this.preload();
  }

  preload() {
    PIXI.loader
      .add('shader', './assets/shaders/noise.frag')
      .load(this.setup.bind(this));
  }

  setup(){
    //...

    // Filtes
    // coded filter, arguments: (vertexShader, framentSource)
    var shaderCode = `
      precision mediump float;
      uniform float time;
      void main(){
        gl_FragColor = vec4(sin(time), sin(time/2.0), 0.0, 0.5);
      }
    `;
    const filterInline = new Filter(null, shaderCode);

    // external filter
    const filterCustom = new Filter(null, resources.shader.data);

    // base filters
    this.filterNoise = new baseFilters.NoiseFilter();

    // plugin filters
    this.filterCRT = new filters.CRTFilter();
    const filterPixelate = new filters.PixelateFilter();
    const filterGlitch = new filters.GlitchFilter({
      slices: 10,
      offset: 10,
      red: [-3, 0],
      green: [0, 3],
      blue: [3, 0]
    });

    this.gameContainer.filters = [
      //filterPixelate,
      filterGlitch,
      this.filterCRT,
      this.filterNoise
    ];

    this.player.filters = [filterPixelate];

    // Animate the filter
    this.app.ticker.add(delta => {
      // update shader uniforms
      //filter.uniforms.time.value += 1;
      //filterGlitch.slices = parseInt(Math.random() * 3);
      this.filterNoise.seed = Math.random();
      this.filterCRT.seed = Math.random();
    });
  }
}

```
