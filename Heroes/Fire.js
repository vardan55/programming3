const Cell = require("./cell")
var random = require("../rand")
module.exports = class Fire extends Cell{
    constructor(x, y, index) {
        super()
        this.x = x;
        this.y = y;
        this.index = index;
        this.growDelay = 0;
        this.life = 6;
        this.getNewCoordinates()
    }
    groww(season) {
     
        this.growDelay++;
        var emptyCells = this.getNeighboringCells(1);
        var newCell = random(emptyCells);
        this.life--;
        if(this.life<=0)
        {
            for (var i in fire_array) {
                if (this.x == fire_array[i].x && this.y == fire_array[i].y) {
                    matrix[this.y][this.x] = 0;
                    fire_array.splice(i, 1);
                    break;
                }
            }
        }
        if(emptyCells.length==0)
        {
            this.life = 0;
        }
       
        if (season=="winter") return;
        if (newCell && this.growDelay >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newGrass = new Fire(newX, newY, 5);
            fire_array.push(newGrass);
            this.growDelay = 0;
        }
      
    }
 
    
  
    
    
     
}