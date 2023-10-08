class GrassEater extends Cell{
    constructor(x, y, index) {
        super()
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.energy = 5;
        this.getNewCoordinates()
    }

    eat() {
        this.getNewCoordinates();
        var cell = random(this.getNeighboringCells(1));
        if(cell)
        {
            this.energy++;
            matrix[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            for (var i in grass_array) {
                if (this.x == grass_array[i].x && this.y == grass_array[i].y) {
                    grass_array.splice(i, 1);
                    break;
                }
            }
            
            matrix[this.y][this.x] = 2;
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
            for (var i in grasseater_array) {
                if (this.x == grasseater_array[i].x && this.y == grasseater_array[i].y) {
                    matrix[this.y][this.x] = 0;
                    grasseater_array.splice(i, 1);
                    break;
                }
            }
           
        }
        else if(this.energy>=20)
        {
            this.getNewCoordinates();
            var cell = random(this.getNeighboringCells(1));
            if(cell)
            {
                grasseater_array.push(new GrassEater(cell[0],cell[1],2));
                matrix[cell[1]][cell[0]] = 2;
                this.energy=8;
            }
            
        }
    }
}
