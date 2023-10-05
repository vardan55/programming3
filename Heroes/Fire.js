class Fire{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.growDelay = 0;
        this.neighborCells = [
            [this.x,this.y],
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.life = 7;
        
    }
    groww() {
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
        if (newCell && this.growDelay >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newGrass = new Fire(newX, newY, 5);
            fire_array.push(newGrass);
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