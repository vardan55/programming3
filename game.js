var widthh =80;
var heightt = 80;
var cellSize = 10;

const socket = io()



var matrix = []
var grass_array = []
var grasseater_array = []
var predator_array = []
var dpredator_array = []
var fire_array = []
var thunder_array = []
socket.on("sync",function(data)
{
    console.log("sync")
    matrix = data.matrix;
    grass_array = data.grass;
    grasseater_array = data.grasseater;
    predator_array = data.predator;
    dpredator_array = data.dpredator;
    fire_array = data.fire;
    thunder_array = data.thunder;
    drawe()
})

console.log("a")
function setup()
{
  
    //frameRate(1);
    createCanvas((widthh*cellSize)+1,(heightt*cellSize)+1);
    background("grey");
    
}


//socket.on("matrix", drawe)

function drawe(matrix)
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
