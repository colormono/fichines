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
import MyComponent from './components/my-component';
//import MyCanvas from './components/my-canvas';
import './assets/styles/main.css';

let element = MyComponent();
document.body.appendChild(element);

// Game
const game = new Game(config.renderer);

// Testing JS
/*

//let myCanvas = MyCanvas();
//document.body.appendChild(myCanvas);

class Person {
  constructor(name) {
    this.name = name;
  }

  greeting() {
    console.log(this.name);
  }
}

let mono = new Person('Pepito');
mono.greeting();


(function() {
  return {
    name: 'something'
  };
})();

var andelita = (function() {
  var firstName = 'Andrea';
  var lastName = 'Varela';
  var nickName = 'Andelita';

  function setName(_firstName, _lastName) {
    firstName = _firstName;
    lastName = _lastName;
  }

  function getName() {
    return `${firstName} ${lastName} (${nickName})`;
  }

  return {
    setName: setName,
    getName: getName
  };
})();

console.log(andelita.getName());
andelita.setName('Mariano', 'Rivas');
console.log(andelita.getName());
console.log(andelita.firstName);
console.log(andelita.lastName);
*/
