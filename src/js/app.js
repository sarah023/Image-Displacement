//1. loop over each section
//2. select the image
//3. replace with a canvas

const sections = document.querySelectorAll('section');

sections.forEach(section => {
  //select the image tag
  const originalImage = section.querySelector('img');
  //select the src attribute from the img tag
  const originalImageSource = originalImage.getAttribute('src');

  section.innerHTML = '';

  //set up PIXI application
  const app = new PIXI.Application({
    //pixi application options:
    width: 800,
    height: 1500,
    transparent: true
  });

  //add PIXI application to the section tags:
  section.appendChild(app.view);
});
