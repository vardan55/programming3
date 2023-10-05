class Grass{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.growDelay = 0;
        this.neighborCells = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        
    }
    groww() {
        this.growDelay++;
        var emptyCells = this.getNeighboringCells(0);
        var newCell = random(emptyCells);
       
        if (newCell && this.growDelay >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grass_array.push(newGrass);
            this.growDelay = 0;
        }
    }
 
    
    getNeighboringCells(character) {
        var found = [];
        for (var i in this.neighborCells) {
          
            var x = this.neighborCells[i][0];
            var y = this.neighborCells[i][1];
        
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.neighborCells[i]);
                }
            }
        }
        return found;
    }
    
    
    
     
}