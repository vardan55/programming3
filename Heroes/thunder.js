const Cell = require("./cell")
var random = require("../rand")
var Fire = require("./Fire")
module.exports = class Thunder extends Cell {
    constructor(x, y, index) {
        super()
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.getNewCoordinates()
    }
   
    hit()
    {
       
        var d = this.getNeighboringCells(1);
        
        var grass = null;
      
        for (var u=0;u<d.length;u++) {
          
            for (var gg=0;gg<grass_array.length;gg++) {
               
                if (d[u][0] == grass_array[gg].x && d[u][1] == grass_array[gg].y) {
                   
                    grass = grass_array[gg];
                  
                    if(grass)
                    {
                       
                        var e = new Fire(grass.x,grass.y,5);
                        matrix[grass.y][grass.x] = 5;
                        fire_array.push(e); 
                        grass_array.splice(gg,1);
                        break;
                    }

                }
            }       
        }
       
        for (var i in thunder_array) {
            if (this.x == thunder_array[i].x && this.y == thunder_array[i].y) {
                matrix[this.y][this.x] = 0;
                thunder_array.splice(i, 1);
             
                break;
            }
        }
    }
}
