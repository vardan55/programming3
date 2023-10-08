class Cell
{
    constructor(x,y,index)
    {
        this.x = x
        this.y = y
        this.index = index
        
    }

    
    getNewCoordinates() {
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
    move() {
        this.getNewCoordinates();
        var cell = random(this.getNeighboringCells(0));
        if(cell)
        {
            matrix[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            matrix[this.y][this.x] = 3;
        }
        this.energy--;
        this.checkDieMul();
      
        
    }
}