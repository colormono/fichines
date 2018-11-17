import * as PIXI from 'pixi.js';
import { Scene } from '../../../engine';
import MyCanvas from '../../prefabs/my-canvas/my-canvas';
import MyParticles from '../../prefabs/my-particles/my-particles';

/**
 * Scene: Example
 *
 * Animate a canvas based texture
 * Should try with singleton... if canvas is not created...
 *
 * @param {Object} app App reference
 * @extends Scene
 * @exports Example
 */
export default class Example extends Scene {
  constructor(app) {
    super();
    this.app = app;

    // Animated texture from a canvas (p5?)
    const fromMyCanvas = new MyCanvas();
    this.p5canvas = new PIXI.Sprite(fromMyCanvas.texture);
    this.p5canvas.position.set(150, Math.random() * 300);
    this.addChild(this.p5canvas);

    // Particles
    let myParticles = MyParticles();
    this.addChild(myParticles);

    // Graphic Primitives
    let rectangle = new PIXI.Graphics();
    rectangle.beginFill(0xff0000);
    rectangle.drawRect(0, 0, 100, 100);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    this.addChild(rectangle);
  }

  /**
   * Update scene
   *
   * @param {Number} delta Delta time
   */
  update(delta) {
    this.p5canvas.texture.update();
  }

  /**
   * Destroy scene
   */
  destroy() {
    console.log('destroy');
  }
}
