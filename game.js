var widthh =80;
var heightt = 80;
var cellSize = 10;

const socket = io()

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

var matrix = []

var grass_array,grasseater_array,predator_array,fire_array,dpredator_array,stats,season;

socket.on("sync",function(data)
{
    console.log("sync")
    matrix = data.matrix;
    grass_array = data.grass;
    grasseater_array = data.grasseater;
    predator_array = data.predator;
    fire_array = data.fire;
    dpredator_array = data.dpredator;
    stats = data.stats;
    season = data.season;
    drawe()
})

function changeSeason()
{
    console.log("huh")
    if(season == "summer")
    {
        season = "winter"
       
    }
    else
    {
        season = "summer"
        
    }
    socket.emit("season",season)
}
   



console.log("a")
function setup()
{
  
    //frameRate(1);
    createCanvas((widthh*cellSize)+1,(heightt*cellSize)+1);
    background("grey");
    
}


//socket.on("matrix", drawe)

function drawe()
{
   // console.log("e");
    for(var h =0;h<matrix.length;h++)
    {
        for(var w =0;w<matrix[h].length;w++)
        {
            if(matrix[h][w] == 1)
            {
                if(season == "summer")
                {
                    fill("#29d958") // empty
                }
                else
                {  
                    fill("#daebd8") // grass
                   
                }
               
            }
            else if(matrix[h][w] == 0)
            {
                if(season == "summer")
                {
                fill("#8a6e69") // grass
                }
                else
                {
                    fill("#c2b4ac") // empty
                }
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



   if(grass_array<=0||grass_array == undefined)
   {
    document.getElementById("grassT").innerHTML = "Grass";
   }
   else
   {
    document.getElementById("grassT").innerHTML = "Grass("+grass_array+")";
   }

   if(grasseater_array<=0||grasseater_array == undefined)
   {
    document.getElementById("grassEaterT").innerHTML = "Grass Eater";
   }
   else
   {
    document.getElementById("grassEaterT").innerHTML = "Grass Eater("+grasseater_array+")";
   }
   

   if(predator_array<=0||predator_array == undefined)
   {
    document.getElementById("predatorT").innerHTML = "Predator";
   }
   else
   {
    document.getElementById("predatorT").innerHTML = "Predator("+predator_array+")";
   }

   if(dpredator_array<=0||dpredator_array==undefined)
   {
    document.getElementById("dpredatorT").innerHTML = "Dangerous Predator";
   }
   else
   {
    document.getElementById("dpredatorT").innerHTML = "Dangerous Predator("+dpredator_array+")";
   }
  
  
  


   if(fire_array<=0 || fire_array == undefined)
   {
    document.getElementById("fireT").innerHTML = "Fire";
   }
   else if(fire_array>=300)
   {
    document.getElementById("fireT").innerHTML = "Fire("+fire_array+") Wildfire!";
   }
   else
   {
    document.getElementById("fireT").innerHTML = "Fire("+fire_array+")";
   }
   fill("white")
   rect(5,3,140,112)
   fill("black")
   
   line(10,10,10,100)
   line(10,100,100,100)

   if(!stats)
    return;

   stroke("red")
   textSize(10)
   var v = 0;
   if (stats.length>=10)
   {
       v=stats.length-10;
   }
   for(var e = v;e<stats.length-1;e++)
   {
       
       stroke("orange")
       line(10+((e-v)*10),clamp(100-stats[e].grasseater/10,10,110),10+(((e-v)+1)*10),clamp(100-stats[e+1].grasseater/10,10,110))
       
       stroke("red")
       line(10+((e-v)*10),clamp(100-stats[e].fire/10,10,110),10+(((e-v)+1)*10),clamp(100-stats[e+1].fire/10,10,110))
       stroke("black")
       line(10+((e-v)*10),clamp(100-stats[e].dpredator/10,10,110),10+(((e-v)+1)*10),clamp(100-stats[e+1].dpredator/10,10,110))
       stroke("brown")
       line(10+((e-v)*10),clamp(100-stats[e].predator/10,10,110),10+(((e-v)+1)*10),clamp(100-stats[e+1].predator/10,10,110))
       stroke("green")
       line(10+((e-v)*10),clamp(100-stats[e].grass/10,10,110),10+(((e-v)+1)*10),clamp(100-stats[e+1].grass/10,10,110))
       noStroke()
       if(e==stats.length-2)
       {
      
        if(stats[e].grasseater >0)
        {
            fill("orange")
            text(stats[e].grasseater,100,clamp(100-stats[e].grasseater/10,10,110))
        }
        if(stats[e].fire >0)
        {
            fill("red")
            text(stats[e].fire,100,clamp(100-stats[e].fire/10,10,110))
        }
        if(stats[e].dpredator >0)
        {
            fill("black")
        text(stats[e].dpredator,100,clamp(100-stats[e].dpredator/10,10,110))
        }
        if(stats[e].predator >0)
        {
            fill("brown")
        text(stats[e].predator,100,clamp(100-stats[e].predator/10,10,110))
        }
        if(stats[e].grass >0)
        {
            fill("green")
        text(stats[e].grass,100,clamp(100-stats[e].grass/10,10,110))
        }
       }
   }
   //line(5,5,150,150)
   stroke("black")

}



function mouseClicked()
{

    var cellCoordinates = getCellCoordinates();
    
    if(cellCoordinates.x >=0 && cellCoordinates.y >=0)
        socket.emit("thunder",cellCoordinates)

}

function getCellCoordinates() {
    const cellX = Math.floor(mouseX / cellSize);
    const cellY = Math.floor(mouseY / cellSize);
    return { x: cellX, y: cellY };
}
