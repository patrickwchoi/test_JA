const Sprite = require("./sprite.js");
const Utils = require("./utils.js");

class Player extends Sprite{

  constructor(...args){
    super(...args)
    this.prevPos = this.pos
    this.stepsMoved = 0;
    this.posForPokemon = [this.pos[0]-25, this.pos[1]] //25 is guess for pokemons width
    this.moving = false;
  }
  
  
}
module.exports = Player;