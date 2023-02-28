const Sprite = require("./sprite.js");

const salamenceSprite = new Image();
salamenceSprite.src = './assets/salamence_sprites_31x28.png'
salamenceSprite.width = 31*2;
salamenceSprite.height = 28*4;

class Pokemon extends Sprite{

  constructor({pos, image, ctx, frames = {dimx:1, dimy:1, zoom:1}, pokedexpic, name}){
    super({pos, image, ctx, frames});
    this.name = name
    this.feelings = 'nervous :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 2;
    //convert to function later
    let pokedexentry = document.createElement("div");
    pokedexentry.id = name+'Pokedex'; //ex. id-"bagonPokedex"
    let br = document.createElement("br");
    let pokedexname = document.createTextNode(name+': ');
    let friendship = document.createElement('div')
    friendship.innerHTML = 'Friendship Level: '+this.friendshiplevel;
    friendship.id = name+'friendshiplevel' //#bagonfriendshiplevel
    pokedexentry.appendChild(pokedexname)
    pokedexentry.appendChild(br)
    pokedexentry.appendChild(friendship)
    document.querySelector('#pokedexContent').appendChild(pokedexentry);

  }

  incrementFriendship(){
    if (this.friendshiplevel===this.friendshipmax-1){ //return //trigger something for friendshipmaxed
      this.friendshiplevel=this.friendshipmax
      document.querySelectorAll('#dialoguebox > *').forEach((el)=>el.classList.add('hidden'));
      document.querySelector('#dialogueAnnouncement').classList.remove('hidden');
      document.querySelector('#dialogueAnnouncement').innerHTML = `
        Bagon's friendship has been maxed! Bagon will now evolve into a Salamence! Congratulations!
      `
      this.updateSpriteSalamence();
      this.name='Salamence'
    } else {
      this.friendshiplevel++
    }
  }
  updateSpriteSalamence(){
    this.image = salamenceSprite;
    this.zoom = .7;
    this.width = this.image.width/this.frames.dimx
    this.height = this.image.height/this.frames.dimy
      //these are dim of actual single sprite based on the png
    this.screenWidth = this.width*this.frames.zoom;
    this.screenHeight = this.height*this.frames.zoom;
  }
  setTrainer (player){
    this.player = player
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

      // if (!this.moving) { //removing this code will always make bagon animate walking
      //   this.frames.xval=0;
      //   return;}
      this.frames.elapsed++
      if (this.frames.elapsed%15===0){
        if (this.frames.xval < this.frames.dimx-1) this.frames.xval++
        else this.frames.xval=0;
      }

  }
  fillDialogue(){
    return {
      empty: '...', 
      roar: 'Rawr!! >:O',
      eating: 'nomnomnom ^~^',
      happy: 'Rawr!! :}'
  }
  }
  followPlayer(player){
    // let playerPrevPos = player.pos
    this.pos = player.posForPokemon
    this.draw();
  }

  changePokemonDirection(keys, player){
    if (keys.w.pressed && player.moving) {
      // player.moving = true;
      this.frames.yval = 3;
    }
    else if (keys.s.pressed  && player.moving) {
      // player.moving = true;
      this.frames.yval = 0;
    }
    else if (keys.a.pressed  && player.moving) {
      // player.moving = true;
      this.frames.yval = 1;
      }
    else if (keys.d.pressed  && player.moving) {
      // player.moving = true;
      this.frames.yval = 2;
      }
  }
  clickedOn(htmlElems){ //what happens when we click on bagon
    // console.log('bagon clickedOn method!')
    htmlElems.dialogueText.innerHTML = this.name+': '+ this.dialogue.roar;
    htmlElems.dialogueText2.innerHTML = 'What would you like to do?'
    this.defaultInteraction(htmlElems);
    // console.log('Friendship Level: '+this.friendshiplevel)
  }
  defaultInteraction(htmlElems){
    this.showSelectorContent('.dialogueOption')
    this.showSelectorContent('#dialogueButtons')

    this.showSelectorContent('#spaceforalldialoguetext') //new

    htmlElems.option1.innerHTML = 'Give '+this.name+' compliments';
    document.querySelector('#bagon_face').classList.remove('hidden')
    htmlElems.option1.onclick = ()=>{
      this.hideSelectorContent('.dialogueOption')
      htmlElems.dialogueText.innerHTML = this.name+': '+ this.dialogue.happy;
      htmlElems.dialogueText2.innerHTML = '*Giving '+this.name+' pets*'
      this.incrementFriendship();
    }
    htmlElems.option2.innerHTML = 'Give '+this.name+' treats';
    htmlElems.option2.onclick = ()=>{
      this.hideSelectorContent('.dialogueOption')
      htmlElems.dialogueText.innerHTML = this.name+': '+ this.dialogue.eating;
      htmlElems.dialogueText2.innerHTML = '*Giving '+this.name+' treats*'
      this.incrementFriendship();
    }
  }

  hideSelectorContent(selector){//move this to sprite class
    document.querySelectorAll(selector).forEach((el)=>{
      el.classList.add('hidden')
    })
  }

  showSelectorContent(selector){//move this to sprite class
    document.querySelectorAll(selector).forEach((el)=>{
      el.classList.remove('hidden')
    })
  }
}

module.exports = Pokemon;