import './index.css';

const myComponent = () => {
  let element = document.createElement('div');
  element.className = 'my-component';
  element.innerHTML = 'FICHINES';
  return element;
};

export default myComponent;
