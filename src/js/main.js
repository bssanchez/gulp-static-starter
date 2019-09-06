;

'use strict';

const helloWorld = (name) => {
  alert(`¡Hello ${name}!`);
}

setTimeout(() => { helloWorld('World'); }, 3000);