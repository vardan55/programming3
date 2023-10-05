var widthh =80;
var heightt = 80;
var cellSize = 10;

var matrix = createMatrix(widthh,heightt)
var grass_array = []
var grasseater_array = []
var predator_array = []
var dpredator_array = []
var fire_array = []
var thunder_array = []
function spreadCharacter(index, count) {
    for (let a = 0; a < count; a++) {

    var x = Math.floor(random(0, heightt))
    var y = Math.floor(random(0, widthh))
    if(matrix[x][y]==0)
        matrix[x][y] = index
    }
    }



function setup()
{
    spreadCharacter(1,5000);
    spreadCharacter(2,1000);
   spreadCharacter(3,1000);
    spreadCharacter(4,5);
   
    //frameRate(1);
    createCanvas((widthh*cellSize)+1,(heightt*cellSize)+1);
    background("grey");
    for(var h =0;h<matrix.length;h++)
    {
        for(var w =0;w<matrix[h].length;w++)
        {
            if(matrix[h][w] == 1)
            {
                grass_array.push(new Grass(w,h,1));
            }
            if(matrix[h][w] == 2)
            {
                grasseater_array.push(new GrassEater(w,h,2));
            }
            if(matrix[h][w] == 3)
            {
                predator_array.push(new Predator(w,h,3));
            }
            if(matrix[h][w] == 4)
            {
                dpredator_array.push(new DangerousPredator(w,h,4));
            }
            if(matrix[h][w] == 5)
            {
                fire_array.push(new Fire(w,h,5));
            }
            if(matrix[h][w] == 6)
            {
                thunder_array.push(new Thunder(w,h,6));
            }
        }
    }
   
}

function draw()
{
   // console.log("e");
    for(var h =0;h<matrix.length;h++)
    {
        for(var w =0;w<matrix[h].length;w++)
        {
            if(matrix[h][w] == 1)
            {
                fill("#29d958") // empty
            }
            else if(matrix[h][w] == 0)
            {
                fill("#8a6e69") // grass
            }
            else if(matrix[h][w] == 2)
            {
                fill("#d9a429") // grass eater
            }
            else if(matrix[h][w] == 3)
            {
                fill("brown") //predator
            }
            else if(matrix[h][w] == 4)
            {
                fill("black") // dangerous predator
            }
            else if(matrix[h][w] == 5)
            {
                fill("red") // fire 
            }
            else if(matrix[h][w] == 6)
            {
                fill("white") // thunder
            }
            rect(w*cellSize,h*cellSize,cellSize,cellSize);
        }
    }
    for(let gr=0;gr<grass_array.length;gr++)
    {

       if(grass_array[gr])
        grass_array[gr].groww();
    }
    for(let grasseater=0;grasseater<grasseater_array.length;grasseater++)
    {
        grasseater_array[grasseater].eat();
    }
    for(let predator=0;predator<predator_array.length;predator++)
    {
        predator_array[predator].eat();
    }
    for(let dpredator=0;dpredator<dpredator_array.length;dpredator++)
    {
        dpredator_array[dpredator].eat();
    }
    for(let thunder=0;thunder<thunder_array.length;thunder++)
    {
        thunder_array[thunder].hit();
    }
    for(let fire=0;fire<fire_array.length;fire++)
    {
        fire_array[fire].groww();
    }
   // console.log(fire_array.length);



   if(grass_array.length<=0)
   {
    document.getElementById("grassT").innerHTML = "Grass";
   }
   else
   {
    document.getElementById("grassT").innerHTML = "Grass("+grass_array.length+")";
   }

   if(grasseater_array.length<=0)
   {
    document.getElementById("grassEaterT").innerHTML = "Grass Eater";
   }
   else
   {
    document.getElementById("grassEaterT").innerHTML = "Grass Eater("+grasseater_array.length+")";
   }
   

   if(predator_array.length<=0)
   {
    document.getElementById("predatorT").innerHTML = "Predator";
   }
   else
   {
    document.getElementById("predatorT").innerHTML = "Predator("+predator_array.length+")";
   }

   if(dpredator_array.length<=0)
   {
    document.getElementById("dpredatorT").innerHTML = "Dangerous Predator";
   }
   else
   {
    document.getElementById("dpredatorT").innerHTML = "Dangerous Predator("+dpredator_array.length+")";
   }
  
  
  


   if(fire_array.length<=0)
   {
    document.getElementById("fireT").innerHTML = "Fire";
   }
   else if(fire_array.length>=300)
   {
    document.getElementById("fireT").innerHTML = "Fire("+fire_array.length+") Wildfire!";
   }
   else
   {
    document.getElementById("fireT").innerHTML = "Fire("+fire_array.length+")";
   }
  

}

function createMatrix(w,h)
{
    var final = [];
    for(var i=0;i<h;i++)
    {
        var row = [];
        for(var v=0;v<w;v++)
        {
           row.push(0);
           
        }
        final.push(row);
    }
    return final;
}

function mouseClicked()
{
    var cellCoordinates = getCellCoordinates();
   
    matrix[cellCoordinates.y][cellCoordinates.x] = 6;
    thunder_array.push(new Thunder(cellCoordinates.x,cellCoordinates.y,6));
    
}

function getCellCoordinates() {
    const cellX = Math.floor(mouseX / cellSize);
    const cellY = Math.floor(mouseY / cellSize);
    return { x: cellX, y: cellY };
  }