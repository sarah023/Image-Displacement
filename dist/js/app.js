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

  //set up PIXI application - add pixi application options:
  const app = new PIXI.Application({
    //add extra sizing around the images to ensure that the filters
    //cover the entire image
    width: 600,
    height: 800,
    transparent: true
  });

  //add PIXI application to the section tags:
  section.appendChild(app.view);

  //make a new image/filters here:
  let image = null;
  let displacementImage = null;

  //make a new loader:
  const loader = new PIXI.loaders.Loader();

  //load in image:
  loader.add('image', originalImageSource);
  //load in displacement image: (for displacement filter)
  //displacementImage sizes need to be either 512px x 512px or 1024px x 1024px
  loader.add('displacement', './images/displacement3.jpg');

  //once the image has loaded -> do things:
  loader.load((loader, resources) => {
    //add the original image back as a 'texture':
    image = new PIXI.Sprite(resources.image.texture);
    displacementImage = new PIXI.Sprite(resources.displacement.texture);
    //set the position and size of the image:

    //set position - size + the middle of the respective width/height
    //image width is 400, so 200 is the midde/center, etc.
    image.x = 100 + 200;
    image.y = 100 + 300;
    //remember that extra sizing was allowed prior - so set back to the
    //correct image sizes.
    image.width = 400;
    image.height = 600;
    image.interactive = true;
    //for certain transitions, need to set the anchor point of
    //the image to the center.
    //based on 0 - 1, so 0.5 is the middle/center point
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;

    //displacement image sizing (optional)
    displacementImage.width = 300;
    displacementImage.height = 300;
    displacementImage.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.repeat;

    //*ADD FILTERS*
    image.filters = [
      // new PIXI.filters.BlurFilter(2, 5),
      // new PIXI.filters.NoiseFilter(0.2),
      new PIXI.filters.DisplacementFilter(displacementImage, 20)
    ];

    //http://pixijs.download/release/docs/PIXI.filters.BlurFilter.html
    //http://pixijs.download/release/docs/PIXI.filters.NoiseFilter.html
    //http://pixijs.download/release/docs/PIXI.filters.DisplacementFilter.html

    //*ADD IMAGES/FILTERS TO PAGE*
    app.stage.addChild(image);
    app.stage.addChild(displacementImage);

    //*ADD MOVEMENT/TIMING*
    app.ticker.add(() => {
      //*rotation variation*
      // image.rotation = image.rotation + 0.01;
      //*displacementImage movement
      displacementImage.x = displacementImage.x + 1;
      displacementImage.y = displacementImage.y + 1;
    });
  });
});
