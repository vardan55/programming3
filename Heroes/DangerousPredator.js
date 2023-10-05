class DangerousPredator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.neighborCells = [];
        this.energy =4;
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
            matrix[this.y][this.x] = 4;
        }
        this.energy--;
        this.checkDieMul();
      
        
    }
    eat() {
        this.getNewCoordinates();
        var cell = random(this.getNeighboringCells(2));
        var cellGrass = random(this.getNeighboringCells(1));
        var cellPredator = random(this.getNeighboringCells(1));
        if(cellGrass)
        {

            this.energy++;
            matrix[this.y][this.x] = 0;
            this.x = cellGrass[0];
            this.y = cellGrass[1];
            for (var i in grass_array) {
                if (this.x == grass_array[i].x && this.y == grass_array[i].y) {
                    grass_array.splice(i, 1);
                    break;
                }
            }
            
            matrix[this.y][this.x] = 4;
           
           
        }else if(cell)
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
            
            matrix[this.y][this.x] = 4;
        }
        else if(cellPredator)
        {
            this.energy++;
            matrix[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            for (var i in predator_array) {
                if (this.x == predator_array[i].x && this.y == predator_array[i].y) {
                    predator_array.splice(i, 1);
                    break;
                }
            }
            
            matrix[this.y][this.x] = 4;
        }
        else
        {
            this.move();
        }
        this.checkDieMul();
    }
    checkDieMul()
    {
        if(this.energy<=0)
        {
            for (var i in dpredator_array) {
                if (this.x == dpredator_array[i].x && this.y == dpredator_array[i].y) {
                    matrix[this.y][this.x] = 0;
                    dpredator_array.splice(i, 1);
                    break;
                }
            }
           
        }
        else if(this.energy>=50)
        {
            this.getNewCoordinates();
            var cell = random(this.getNeighboringCells(2));
            if(cell)
            {
                dpredator_array.push(new DangerousPredator(cell[0],cell[1],4));
                matrix[cell[1]][cell[0]] = 4;
                this.energy=10;
            }
            
        }
    }
}
