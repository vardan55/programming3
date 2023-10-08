class Grass extends Cell{
    constructor(x, y, index) {
        super()
        this.x = x;
        this.y = y;
        this.index = index;
        this.growDelay = 0;
        this.getNewCoordinates()
        
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
}