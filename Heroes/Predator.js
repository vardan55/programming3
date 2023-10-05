class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.neighborCells = [];
        this.energy =20;
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
    eat() {
        this.getNewCoordinates();
        var cell = random(this.getNeighboringCells(2));
        if(cell)
        {
            this.energy++;
            matrix[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            for (var i in grasseater_array) {
                if (this.x == grasseater_array[i].x && this.y == grasseater_array[i].y) {
                    grasseater_array.splice(i, 1);
                    break;
                }
            }
            
            matrix[this.y][this.x] = 3;
            this.checkDieMul();
        }else
        {
            this.move();
        }
       
    }
    checkDieMul()
    {
        if(this.energy<=0)
        {
            for (var i in predator_array) {
                if (this.x == predator_array[i].x && this.y == predator_array[i].y) {
                    matrix[this.y][this.x] = 0;
                    predator_array.splice(i, 1);
                    break;
                }
            }
           
        }
        else if(this.energy>=30)
        {
            this.getNewCoordinates();
            var cell = random(this.getNeighboringCells(2));
            if(cell)
            {
                predator_array.push(new Predator(cell[0],cell[1],3));
                matrix[cell[1]][cell[0]] = 3;
                this.energy=10;
            }
            
        }
    }
}
