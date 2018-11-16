/**
 * Game
 *
 * The main entry point from Webpack
 * - Appends render canvas to DOM
 * - Calls renderer.render
 * - Add Loading Screen and loads assets
 * - Adds Example Screen once loading is complete
 * - Subscribes and Dispatches to AppStore & DOM
 */
import config from './config';
import Game from './components/game';
import Footer from './components/footer';
import './assets/styles/main.css';

let footer = Footer();
document.body.appendChild(footer);

// Game
const game = new Game(config.renderer);
