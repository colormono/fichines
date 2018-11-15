/**
 * PIXI Tests
 *
 * Todo junto y desorganizado ;o
 *
 * @exports Game
 */
//import * as PIXI from 'pixi.js';
import {
  Application,
  BaseTexture,
  Texture,
  Text,
  Sprite,
  loader,
  particles,
  Container,
  Graphics,
  Filter,
  filters as baseFilters,
  utils
} from 'pixi.js';
import * as filters from 'pixi-filters';
import { Bump, Controls } from '../utils';
import Stats from '../utils/stats';

//import Player from './player/player';

import MyCanvas from './my-canvas';
import skullTexture from '../assets/images/skull.png';
import './game.css';

export default class Game {
  constructor(config) {
    // Create app and insert into the DOM
    this.app = new Application(config);
    document.body.appendChild(this.app.view);

    //this.create = this.create.bind(this);
  }

  create() {
    var self = this;

    // Add stats
    // 0: fps, 1: ms, 2: mb, 3+: custom
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // Physics engine
    const b = new Bump(PIXI);

    // destructuring
    const { stage, screen, renderer } = self.app;

    //Define any variables that are used in more than one function
    var state, gameContainer, bunny, skull, message, canvasTexture;

    // Listen for window resize events
    window.addEventListener('resize', resize);

    // Resize function window
    function resize() {
      // Resize the renderer
      renderer.resize(window.innerWidth, window.innerHeight);
    }

    resize();

    renderer.backgroundColor = 0x333333;
    //renderer.view.style.position = 'absolute';
    //renderer.view.style.display = 'block';
    //renderer.autoResize = true;
    //renderer.resize(window.innerWidth, window.innerHeight);

    //Capture the keyboard arrow keys
    const controls = new Controls();

    // load the texture we need
    loader
      .add('shader', './assets/shaders/noise.frag')
      .add('bunny', './assets/images/skull.png')
      .add('coin1', './assets/images/coin1.png')
      .add('coin2', './assets/images/coin2.png')
      .add('coin3', './assets/images/coin3.gif')
      .add('skull', skullTexture)
      .on('progress', loadProgressHandler)
      .load(setup);

    function loadProgressHandler(loader, resource) {
      //Display the file `url` currently being loaded
      console.log('loading: ' + resource.url);

      //Display the percentage of files currently loaded
      console.log('progress: ' + loader.progress + '%');

      //If you gave your files names as the first argument
      //of the `add` method, you can access them like this
      //console.log("loading: " + resource.name);
    }

    var bullets = [];
    var bulletSpeed = 5;
  }

  shoot(rotation, startPosition) {
    var bullet = new PIXI.Sprite(loader.resources.bunny.texture);
    bullet.position.x = startPosition.x;
    bullet.position.y = startPosition.y;
    bullet.rotation = rotation;
    gameContainer.addChild(bullet);
    bullets.push(bullet);
    console.log('Balas vivas', bullets.length);
  }

  rotateToPoint(mx, my, px, py) {
    var self = this;
    var dist_Y = my - py;
    var dist_X = mx - px;
    var angle = Math.atan2(dist_Y, dist_X);
    //var degrees = angle * 180/ Math.PI;
    return angle;
  }

  setup() {
    console.log('All files loaded');

    const { resources } = loader;

    // Create a game container
    gameContainer = new Container();
    stage.addChild(gameContainer);

    // Fill the background with an image (to apply filters anywhere)
    let background = new PIXI.Graphics();
    background.beginFill(0x111111);
    background.drawRect(0, 0, screen.width, screen.height);
    background.endFill();
    gameContainer.addChild(background);

    //let player = new Player();
    //gameContainer.addChild(player);

    // This creates a texture from a 'bunny.png' image
    bunny = new Sprite(resources.bunny.texture);
    bunny.x = screen.width / 2;
    bunny.y = screen.height / 2;
    // Rotate around the center
    //bunny.anchor.x = 0.5;
    //bunny.anchor.y = 0.5;
    // Add the bunny to the scene we are building
    gameContainer.addChild(bunny);

    // This creates a texture from a 'bunny.png' image
    skull = new Sprite(resources.skull.texture);
    skull.x = 100;
    skull.y = 100;
    skull.vx = 0;
    skull.vy = 0;
    skull.interactive = true;
    skull.cursor = 'wait';
    gameContainer.addChild(skull);

    //Left arrow key `press` method
    controls.left.press = () => {
      skull.vx = -5;
    };

    //Left arrow key `release` method
    controls.left.release = () => {
      if (!controls.right.isDown) {
        skull.vx = 0;
      }
    };

    //Up
    controls.up.press = () => {
      skull.vy = -5;
    };
    controls.up.release = () => {
      if (!controls.down.isDown) {
        skull.vy = 0;
      }
    };

    //Right
    controls.right.press = () => {
      skull.vx = 5;
    };
    controls.right.release = () => {
      if (!controls.left.isDown) {
        skull.vx = 0;
      }
    };

    //Down
    controls.down.press = () => {
      skull.vy = 5;
    };
    controls.down.release = () => {
      if (!controls.up.isDown) {
        skull.vy = 0;
      }
    };

    // game shoots
    stage.interactive = true;

    stage.on('mousedown', function(e) {
      shoot(skull.rotation, {
        x: skull.position.x + Math.cos(skull.rotation) * 20,
        y: skull.position.y + Math.sin(skull.rotation) * 20
      });
    });

    controls.space.press = () => {
      shoot(skull.rotation, {
        x: skull.position.x + Math.cos(skull.rotation) * 20,
        y: skull.position.y + Math.sin(skull.rotation) * 20
      });
    };

    controls.enter.press = () => {
      console.log('Enter');
      toggleFullScreen();
    };

    function toggleFullScreen() {
      if (!document.mozFullScreen && !document.webkitFullScreen) {
        if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen();
        } else {
          document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else {
          document.webkitCancelFullScreen();
        }
      }
    }

    // A texture from a canvas
    let myCanvas = MyCanvas();
    let canvasBaseTexture = new BaseTexture(myCanvas);
    canvasTexture = new Texture(canvasBaseTexture);

    // This creates a texture from a 'bunny.png' image
    const pepito = new Sprite(canvasTexture);
    pepito.position.set(150, Math.random() * 300);
    gameContainer.addChild(pepito);

    // Groups
    let coin1 = new Sprite(resources.coin1.texture);
    coin1.position.set(16, 16);

    let coin2 = new Sprite(resources.coin2.texture);
    coin2.position.set(32, 32);

    let coin3 = new Sprite(resources.coin3.texture);
    coin3.position.set(64, 64);

    let coins = new Container();
    coins.position.set(100, 100);

    for (let i = 0; i < 100; i++) {
      let monedita = new Sprite(resources.coin1.texture);
      const w = Math.random() * screen.width;
      const h = Math.random() * screen.height;
      monedita.position.set(w, h);
      monedita.rotation = w;
      coins.addChild(monedita);
    }

    coins.addChild(coin1);
    coins.addChild(coin2);
    coins.addChild(coin3);
    gameContainer.addChild(coins);
    //console.log('Coins', coins.children);
    coins.removeChild(coin3);
    //console.log('Coins', coins.children);

    console.log('Coin2 local x', coin2.position.x);
    console.log('Coin2 global x', coins.toGlobal(coin2.position).x);
    console.log('Coin2 global x', coin2.getGlobalPosition().x);

    // Particles
    let superFastSprites = new particles.ParticleContainer(1000, {
      rotation: true,
      alphaAndtint: true,
      scale: true,
      uvs: true
    });
    for (let i = 0; i < 10; i++) {
      let monedita = new Sprite(resources.coin1.texture);
      const w = Math.random() * screen.width;
      const h = Math.random() * screen.height;
      monedita.position.set(w, h);
      monedita.rotation = w;
      superFastSprites.addChild(monedita);
    }
    stage.addChild(superFastSprites);

    // Text
    let style = {
      fontFamily: 'ArcadeClassic',
      fontSize: '36px',
      fontStyle: 'bold italic',
      fill: '#F7EDCA',
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#FF0000',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    };

    message = new Text('It is working !!', style);
    message.x = 30;
    message.y = 90;
    gameContainer.addChild(message);

    //Graphic Primitives
    let rectangle = new Graphics();
    rectangle.beginFill(0x00ccff);
    rectangle.drawRect(0, 0, 100, 100);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    gameContainer.addChild(rectangle);

    // Shaders

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
    const filterNoise = new baseFilters.NoiseFilter();

    // plugin filters
    const filterCRT = new filters.CRTFilter();
    const filterPixelate = new filters.PixelateFilter();
    const filterGlitch = new filters.GlitchFilter({
      slices: 10,
      offset: 10,
      red: [-3, 0],
      green: [0, 3],
      blue: [3, 0]
    });

    gameContainer.filters = [
      //filterPixelate,
      filterGlitch,
      filterCRT,
      filterNoise
    ];

    skull.filters = [filterPixelate];

    // Animate the filter
    self.app.ticker.add(delta => {
      // update shader uniforms
      //filter.uniforms.time.value += 1;
      //filterGlitch.slices = parseInt(Math.random() * 3);
      filterNoise.seed = Math.random();
      filterCRT.seed = Math.random();
    });

    //Start the game loop
    state = play;
    self.app.ticker.add(delta => gameLoop(delta));
  }

  gameLoop(delta) {
    //Update the current game state:
    stats.begin();
    state(delta);
    stats.end();
  }

  play(delta) {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;

    skull.position.x += skull.vx;
    skull.position.y += skull.vy;

    if (skull.position.x > screen.width) skull.position.x = 0;
    if (skull.position.x < 0) skull.position.x = screen.width;
    if (skull.position.y > screen.height) skull.position.y = 0;
    if (skull.position.y < 0) skull.position.y = screen.height;

    if (b.hit(skull, bunny)) {
      message.text = 'Collission!';
    } else {
      message.text = 'Keep walking...';
    }

    // animate shooting
    // just for fun, let's rotate mr rabbit a little
    skull.rotation = rotateToPoint(
      renderer.plugins.interaction.mouse.global.x,
      renderer.plugins.interaction.mouse.global.y,
      skull.position.x,
      skull.position.y
    );

    for (let b = bullets.length - 1; b >= 0; b--) {
      bullets[b].position.x += Math.cos(bullets[b].rotation) * bulletSpeed;
      bullets[b].position.y += Math.sin(bullets[b].rotation) * bulletSpeed;

      if (
        bullets[b].position.x > screen.width ||
        bullets[b].position.x < 0 ||
        bullets[b].position.y > screen.height ||
        bullets[b].position.y < 0
      ) {
        bullets[b].destroy();
        bullets.splice(b, 1);
        break;
      }
    }

    // update canvas texture
    canvasTexture.update();

    // render the container
    //renderer.render(stage);
  }

  end() {}

  menu(delta) {
    console.log('menu');
  }
}
