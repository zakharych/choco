const hamburger = document.querySelector('#hamburger');
const body = document.body;
const links = document.querySelectorAll('.burger-menu__link');
const overlayElement = document.querySelector('.overlay');




links.forEach(function(element){
    element.addEventListener('click' , toggleMenu);
  })


function toggleMenu(){
    hamburger.classList.toggle('burger--active');
    overlayElement.classList.toggle('overlay--active');
    body.classList.toggle('body--active-menu');
  }

hamburger.addEventListener('click' , toggleMenu);