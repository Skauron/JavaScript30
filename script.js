const pressed = [];
const secredCode = 'skauron';

window.addEventListener("keyup", (e) =>{
  pressed.push(e.key);
  pressed.splice(-secredCode.length - 1, pressed.length - secredCode.length);
  if(pressed.join('').includes(secredCode)){
    cornify_add();
  }
});