let resize = (gameSize, baseSize, displaySize, resolution) => {

  console.log("resizing")

  var width = gameSize.width;
  var height = gameSize.height;

  this.cameras.resize(width, height);

  this.bg.setSize(width, height);
}

export default resize