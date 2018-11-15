import * as PIXI from 'pixi.js';
import sketch from './sketch';

export default class MyCanvas {
  constructor() {
    const mySketch = sketch();
    const baseTexture = new PIXI.BaseTexture(mySketch);
    this.texture = new PIXI.Texture(baseTexture);
  }
}
