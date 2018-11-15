import * as PIXI from 'pixi.js';

export default class Title extends PIXI.Text {
  constructor(text, style) {
    super(text, style);

    this.style = {
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
  }
}
