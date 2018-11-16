import * as PIXI from 'pixi.js';
import particleTexture from '../../../assets/images/coin2.png';

const MyParticles = () => {
  const superFastSprites = new PIXI.particles.ParticleContainer(1000, {
    rotation: true,
    alphaAndtint: true,
    scale: true,
    uvs: true
  });

  for (let i = 0; i < 100; i++) {
    let monedita = new PIXI.Sprite(PIXI.Texture.fromImage(particleTexture));
    const w = Math.random() * 800;
    const h = Math.random() * 600;
    monedita.position.set(w, h);
    monedita.rotation = w;
    superFastSprites.addChild(monedita);
  }

  return superFastSprites;
};

export default MyParticles;
