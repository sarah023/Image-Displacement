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
    width: 600,
    height: 800,
    transparent: true
  });

  //add PIXI application to the section tags:
  section.appendChild(app.view);

  //make a new loader:
  const loader = new PIXI.loaders.Loader();

  //load in image:
  loader.add('image', originalImageSource);
  //once the image has loaded -> do things:
  loader.load((loader, resources) => {
    //add the original image back as a 'texture':
    const image = new PIXI.Sprite(resources.image.texture);
    //set the position and size of the image:
    image.x = 100;
    image.y = 100;
    image.width = 400;
    image.height = 600;

    //add the image to the app:
    app.stage.addChild(image);
  });
});
