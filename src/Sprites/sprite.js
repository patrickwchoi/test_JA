
class Sprite{
  constructor({pos, image, ctx, frames = {dimx:1, dimy:1, zoom:1}}) {
    this.pos = pos //[x,y]
    this.image=image
    this.ctx = ctx
    this.frames = {...frames, xval:0, yval:0, elapsed:0} //this refers to how much copies are in this sprite img
      //basically dimensions of sprite sheet
    //he said to wrap this in image.onload, but doesnt seem necessary
    this.width = this.image.width/this.frames.dimx
    this.height = this.image.height/this.frames.dimy
      //these are dim of actual single sprite based on the png
    this.screenWidth = this.width*this.frames.zoom;
    this.screenHeight = this.height*this.frames.zoom;
    this.moving = false;
    this.clicked=false
    this.dialogue = this.fillDialogue();
  }
  fillDialogue(){
    return {empty: '...'}
  }
  addDialogue(name,str){
    this.dialogue[name] = str
  }
  clickedOn(htmlElems){
    htmlElems.dialogueText.innerHTML = this.dialogue.empty;
  }
  draw(){//draw image of sprite
    this.ctx.drawImage(this.image, 
      this.frames.xval*this.width, 
      this.frames.yval*this.height,
      this.width, 
      this.height, //first 4 args are cropping sprite, if needed
      this.pos[0],
      this.pos[1], //where on canvas we place james, from the top left corner
      this.screenWidth,
      this.screenHeight); //how big img is onscreen

      if (!this.moving) {
        this.frames.xval=0;
        return;}
      if (this.frames.dimx>1){ //means we have a spritesheet, not map
        this.frames.elapsed++
      }
      if (this.frames.elapsed%15===0){
        if (this.frames.xval < this.frames.dimx-1) this.frames.xval++
        else this.frames.xval=1;
        // if (this.frames.yval < this.frames.height) this.frames.yval++
        // else this.frames.yval=0;
      }

  }
}

module.exports = Sprite;