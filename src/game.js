const collisions = require("./Map/collisions.js");
const Sprite = require("./Sprites/sprite.js");
const Player = require("./Sprites/player.js");
const Boundary = require("./Map/boundary.js");
const Utils = require("./utils.js");
const Pokemon = require("./Sprites/pokemon.js");
const Item = require("./Sprites/item.js");

//Create Variables
const dialogueBox = document.querySelector('#dialoguebox');
const dialogueText = document.querySelector('#dialoguetext');
const dialogueText2 = document.querySelector('#dialoguetext2');
const option1 =  document.querySelector('#option1');
const option2 =  document.querySelector('#option2');

const menuButton = document.querySelector('#menuButton');
const menu = document.querySelector('#menu');
const beforeMenuContent = document.querySelectorAll('.beforeMenuContent');//object like array
const backToBeforeMenu = document.querySelector('#backToBeforeMenu');
const instructionsButton = document.querySelector('#instructionsButton');
const instructions = document.querySelector('#instructions');
const menuContent = document.querySelectorAll('.menuContent');
const mapButton = document.querySelector('#mapButton');
const backToMenuButton = document.querySelector('#backToMenuButton');
const pokedex = document.querySelector('#pokedexContent');
const pokedexButton = document.querySelector('#pokedexButton');



const  htmlElems = { //stuff I wanna pass in
  dialogueBox: dialogueBox, 
  dialogueText:dialogueText,
  dialogueText2:dialogueText2,
  option1:option1, option2:option2,
  menuButton:menuButton}
const map = new Image();
map.src = "./assets/tilemap8.png";
map.width = 160*16; //MUST CHANGE MANUALLY WHEN CHANGING MAP DIMENSIONS
map.height = 130*16;

const james = new Image();
james.src = "./assets/james_sprites.png";
james.width = 16*3;
james.height = 20*4;

const bagonImg = new Image();
bagonImg.src = "./assets/bagon_sprites.png"
bagonImg.width = 16*2;
bagonImg.height = 21*4;

const pokeballImg = new Image();
pokeballImg.src = "./assets/pokeball.png"
pokeballImg.width = 920;
pokeballImg.height = 512;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(map,0,0)
    this.offset = [-700, -750]; //default location of map at start

    this.collisionsMap = this.make2dArrCollisions();
    this.boundaries = this.addBoundaries(this.collisionsMap);
    this.framesPressed = 0; //will let us know how long a key is held down
    this.registerEventListeners();

    this.background = new Sprite({
      pos: this.offset,
      image: map,
      ctx: this.ctx,
    });
    this.player = new Player({
      pos: [canvas.width / 2 - james.width/3, canvas.height/2 - james.height/4], //manually fixed pos based on james.png dim
      image: james,
      ctx: this.ctx,
      frames: { dimx: 3, dimy: 4, zoom: 1.8 },
    });
    this.bagon = new Pokemon({
      pos: [canvas.width / 2 , canvas.height / 2 ], //very rough pos, will fix later
      image: bagonImg,
      ctx: this.ctx,
      frames: { dimx: 2, dimy: 4, zoom: 1.8 }, 
      name: 'Bagon'});
    this.bagon.setTrainer(this.player);
    this.moveables = [this.background, ...this.boundaries];
    // this.play();
  }

  play() {this.animate();}

  animate() {
    //animates screen. will run infinietly and 'refresh' screen
    this.background.draw();
    //this.drawBoundaries(); //disable when finished with game
    this.bagon.changePokemonDirection(this.keys, this.player) 
    this.bagon.followPlayer(this.player);
    this.player.draw();
    let moving = true;
    //player.moving signals player should be moving bc wasd is pressed
    //moving signals if the conditions (rectangular collision) to move are true or false
    //moving background with WASD
    Utils.movePlayer(this.player, this.keys, this.boundaries, this.moveables, this.lastkey, moving);
    
    window.requestAnimationFrame(this.animate.bind(this));
  }

  drawBoundaries(){
    this.boundaries.forEach((boundary) => {
      boundary.draw(); //animate our collisions
    });
  }

  click(e){
    //what happens when you click on screen and not on specific html elem
  let mouseY = e.clientY - 36; //36 is font size of header1
  let mouseX = e.clientX
  
  if (Utils.isMouseOnRect([mouseX, mouseY], this.bagon)){
      this.bagon.clickedOn(htmlElems);
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.player)){
    this.player.clickedOn(htmlElems);
  } else{
    //return dialogue to game state if empty part of canvas is clicked on
    this.resetDialogue();
  }
  }
  resetDialogue(){
    document.querySelectorAll('#dialoguebox > *').forEach(
      (el)=>{
      // if (!button.classList.contains('hidden')) 
      el.classList.add('hidden')
      })
  }
  registerEventListeners() {

    this.boundClickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);

    //Menu Button
    menuButton.addEventListener('click', ()=>{
      beforeMenuContent.forEach((button)=>button.classList.add('hidden'))
      backToBeforeMenu.classList.remove('hidden')
      menuContent.forEach((button)=>button.classList.remove('hidden'))
    })
    //Back To Before Menu Button
    backToBeforeMenu.addEventListener('click', ()=>{
      //add back before menu content
      beforeMenuContent.forEach((button)=>button.classList.remove('hidden'))
      //remove menu content
      menuContent.forEach((button)=>button.classList.add('hidden'))
      //remove instructions instructions
      instructions.classList.add('hidden');
      //both instructions and menu
      backToBeforeMenu.classList.add('hidden');

    })
    //Instructions Button
    instructionsButton.addEventListener('click', ()=>{
      beforeMenuContent.forEach((button)=>button.classList.add('hidden'));
      backToBeforeMenu.classList.remove('hidden');
      instructions.classList.remove('hidden');
    })

    //map button
    mapButton.addEventListener('click', ()=>{
      document.querySelectorAll('#menu *').forEach((el)=>el.classList.add('hidden'));
      document.querySelectorAll('#mapContent *').forEach((el)=>el.classList.remove('hidden'));
      document.querySelector('#mapContent').classList.remove('hidden');
      backToBeforeMenu.classList.add('hidden')
      backToMenuButton.classList.remove('hidden')
    })

    //pokedex button
    pokedexButton.addEventListener('click', ()=>{
      document.querySelector('#pokedexContent').classList.remove('hidden');
      document.querySelectorAll('#pokedexContent *').forEach((el)=>el.classList.remove('hidden'));
      backToBeforeMenu.classList.add('hidden')
      pokedexButton.classList.add('hidden')
      document.querySelector('#mapButton').classList.add('hidden');

      backToMenuButton.classList.remove('hidden')
      document.querySelector('#Bagonfriendshiplevel').innerHTML = 'Friendship Level: '+this.bagon.friendshiplevel + '/'+this.bagon.friendshipmax //not sure why id is capital, check why
    })

    //Back to Menu button
    backToMenuButton.addEventListener('click', ()=>{
      document.querySelectorAll('#menu > *').forEach((el)=>{
        el.classList.add('hidden')
      })
      // menuContent.forEach((button)=>button.classList.remove('hidden'))
      document.querySelectorAll('#menu > .menuContent').forEach((el)=>{
        el.classList.remove('hidden')
      })
      backToBeforeMenu.classList.remove('hidden')
    })
    this.keys = {
      w:{ pressed: false, startTime:0, timePressed :0},
      a:{ pressed: false, startTime:0, timePressed :0},
      s:{ pressed: false, startTime:0, timePressed :0},
      d:{ pressed: false, startTime:0, timePressed :0},
    }
    this.lastkey = 'something';
    window.addEventListener("keydown", (e) => {
      //whenever a key is pressed, will update keys hash
      switch (e.key) {
        case "w":
            //if we are just starting to press w, start tracking time
          if (this.keys.w.pressed===false){this.keys.w.startTime = e.timeStamp} 
          this.keys.w.pressed = true;
          this.keys.w.timePressed=e.timeStamp-this.keys.w.startTime
          this.lastkey = "w";
          break;
        case "a":
          this.keys.a.pressed = true;
          this.keys.a.timePressed+=1
          this.lastkey = "a";
          break;
        case "s":
          this.keys.s.pressed = true;
          this.keys.s.timePressed+=1
          this.lastkey = "s";
          break;
        case "d":
          this.keys.d.pressed = true;
          this.keys.d.timePressed+=1
          this.lastkey = "d";
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      //whenever a key is not pressed, will update keys hash
      switch (e.key) {
        case "w":
          this.keys.w.pressed = false;
          this.keys.w.timePressed=0
          break;
        case "a":
          this.keys.a.pressed = false;
          this.keys.a.timePressed=0
          break;
        case "s":
          this.keys.s.pressed = false;
          this.keys.s.timePressed=0
          break;
        case "d":
          this.keys.d.pressed = false;
          this.keys.d.timePressed=0
          break;
      }
    });
  }

  addBoundaries(collisionsMap) {
    let boundaries = [];
    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 17281 || symbol === 2684371841 || symbol ===1610630017 || symbol === 3221242753) {
          //if pos on our collisions grid has collision, add boundaruy
          boundaries.push(
            new Boundary({
              ctx: this.ctx,
              pos: [
                j * Boundary.width + this.offset[0],
                i * Boundary.height + this.offset[1],
              ],
            })
          );
        }
        //pushing boundary object where i is row, j is coln in our collisions arr
      });
    });
    return boundaries;
  }
  
  make2dArrCollisions() {
    let mapWidthTiles = map.width / 16;
    const collisionsMap = [];
    // console.log('mapWidthTiles:'+ mapWidthTiles) //check if mapwodthtiles is 0 and infinte loop
    for (let i = 0; i < collisions.length; i += mapWidthTiles) {
      //do i do .length-1?
      collisionsMap.push(collisions.slice(i, i + mapWidthTiles));
    }
    return collisionsMap;
  }

}

module.exports = Game;
