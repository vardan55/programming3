class Predator extends Cell {
    constructor(x, y, index) {
        super()
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.getNewCoordinates()
        this.energy =20;
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
