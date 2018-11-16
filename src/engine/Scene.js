import * as PIXI from 'pixi.js';

class Scene extends PIXI.Container {
  constructor(...args) {
    super(...args);

    console.log('New scene');
  }
}

export { Scene };
