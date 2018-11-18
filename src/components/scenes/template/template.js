import * as PIXI from 'pixi.js';
import { Scene } from '../../../engine';

export default class Template extends Scene {
  constructor(app) {
    super();
    this.app = app;
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
  setup() {}

  /**
   * Update scene
   *
   * called each frame to update logic
   *
   * @param {Number} dt Delta time
   */
  update(dt) {}

  /**
   * Draw scene
   *
   * called each frame to update rendering
   *
   * @param {Number} dt Delta time
   */
  draw(dt) {}

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
}
