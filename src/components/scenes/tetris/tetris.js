import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import { Gamepad } from '../../../engine';

// Create the Matter.js physics engine
const engine = Matter.Engine.create();

// Add Keyboard and Gamepad support
const gamepad = new Gamepad();

export default class Tetris extends PIXI.Container {
  constructor(app) {
    super();
    this.app = app;

    // Initialise data sets
    this.entities = [];
    this.setup();
  }

  /**
   * Preload assets
   *
   * preload assets before create
   */
  preload() {}

  /**
   * Create scene
   *
   * called when loader has finished
   */
  setup() {
    this.player = this.createEntity(
      window.innerWidth / 2,
      window.innerHeight / 2,
      60,
      60,
      'rectangle',
      false,
      0x1099bb,
      'player'
    );
    this.player.onFloor = false;

    this.character = this.createEntity(
      100,
      100,
      60,
      60,
      'circle',
      false,
      0x7fbf7f
    );

    this.ground = this.createEntity(
      window.innerWidth / 2,
      window.innerHeight,
      window.innerWidth * 2,
      40,
      'rectangle',
      true,
      0xff0000,
      'floor'
    );

    for (var i = 0; i < this.entities.length; i++) {
      let display = this.entities[i].display;
      let body = this.entities[i].body;
      this.addChild(display);
      Matter.World.add(engine.world, body);
    }

    // create 4 walls to contains all our objects within the screen boundaries.
    var offset = 1;
    var wallSize = 20;

    Matter.World.add(engine.world, [
      //top
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        -offset,
        window.innerWidth + 2 * offset,
        wallSize,
        {
          isStatic: true
        }
      ),
      //bottom
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + offset,
        window.innerWidth + 2 * offset,
        wallSize,
        {
          isStatic: true
        }
      ),
      //right
      Matter.Bodies.rectangle(
        window.innerWidth + offset,
        window.innerHeight / 2,
        wallSize,
        window.innerHeight + 2 * offset,
        {
          isStatic: true
        }
      ),
      // left
      Matter.Bodies.rectangle(
        -offset,
        window.innerHeight / 2,
        wallSize,
        window.innerHeight + 2 * offset,
        {
          isStatic: true
        }
      )
    ]);

    Matter.Events.on(engine, 'collisionStart', event => {
      let a = event.pairs[0].bodyA;
      let b = event.pairs[0].bodyB;

      // check bodies, do whatever...
      console.log(a);
      console.log(b);
      if (a.label === 'player' && b.label === 'floor') {
        this.player.onFloor = true;
      }
    });

    // Add gampad support
    this.spaceButton();
  }

  /**
   * Update scene
   *
   * called each frame to update logic
   *
   * @param {Number} dt Delta time
   */
  update(dt) {
    // Right
    if (gamepad.right.isDown) {
      let force = 0.002 * this.player.body.mass;
      Matter.Body.applyForce(this.player.body, this.player.body.position, {
        x: force,
        y: 0
      });
    }

    // Left
    if (gamepad.left.isDown) {
      let force = -0.002 * this.player.body.mass;
      Matter.Body.applyForce(this.player.body, this.player.body.position, {
        x: force,
        y: 0
      });
    }

    this.draw();
  }

  /**
   * Draw scene
   *
   * called each frame to update rendering
   *
   * @param {Number} dt Delta time
   */
  draw(dt) {
    this.app.message.text = 'Tetris';

    Matter.Engine.update(engine);
    for (var i = 0; i < this.entities.length; i++) {
      let display = this.entities[i].display;
      let body = this.entities[i].body;
      display.position = body.position;
      display.rotation = body.angle;
    }
  }

  /**
   * Resize
   *
   * called after container/window has been resized
   */
  resize() {}

  /**
   * Destroy scene
   *
   */
  destroy() {}

  /**
   * Create entity
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   * @param {String} shape
   * @param {Boolean} isStatic
   * @param {Hex} color
   */
  createEntity(x, y, w, h, shape, isStatic, color, label) {
    let entity = {},
      body,
      display;

    // Compensate for lineStyle
    w = w - 1;
    h = h - 1;

    // Create the sprite from a primitive
    let graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.lineStyle(1, 0xeeeeee);
    switch (shape) {
      case 'rectangle':
        graphics.drawRect(x, y, w, h); // TODO x and y even if Sprite position?
        break;
      case 'circle':
        graphics.drawCircle(x, y, w / 2); // TODO x and y even if Sprite position?
        break;
    }

    let texture = graphics.generateCanvasTexture(2, 2); // TODO: Scale

    let sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.position.set(x, y);

    // Create the physical body
    switch (shape) {
      case 'rectangle':
        body = Matter.Bodies.rectangle(x, y, w, h, { isStatic: isStatic });
        break;
      case 'circle':
        body = Matter.Bodies.circle(x, y, w / 2, { isStatic: isStatic });
        break;
    }

    entity.display = sprite;
    entity.body = body;
    entity.body.label = label;

    // Add the entity to the entities of the app and return a reference to it
    this.entities.push(entity);
    return entity;
  }

  /**
   * Gamepad
   */
  spaceButton() {
    // Jump
    gamepad.space.press = () => {
      if (this.player.onFloor) {
        let force = -0.03 * this.player.body.mass;
        Matter.Body.applyForce(this.player.body, this.player.body.position, {
          x: 0,
          y: force
        });
        this.player.onFloor = false;
      }
    };
  }
}
