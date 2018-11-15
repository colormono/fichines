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
  filters as baseFilters
} from 'pixi.js';
import * as filters from 'pixi-filters';

/*
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

    */
