var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs")
app.use(express.static("."));

app.get("/", function(req, res){
   res.redirect("./index.html");
});



var widthh =80;
var heightt = 80;
var cellSize = 10;

var season = "summer"


var random = require("./rand")

matrix = createMatrix(widthh,heightt)
grass_array = []
grasseater_array = []
predator_array = []
dpredator_array = []
fire_array = []
thunder_array = []

//Cells
const DangerousPredator = require("./Heroes/DangerousPredator")
const Fire = require("./Heroes/Fire")
const Grass = require("./Heroes/Grass")
const GrassEater = require("./Heroes/GrassEater")
const Predator = require("./Heroes/Predator")
const Thunder = require("./Heroes/Thunder")

function spreadCharacter(index, count) {
   
    for (let a = 0; a < count; a++) {

    var x = Math.floor(random(heightt))
    var y = Math.floor(random(widthh))

    if(matrix[x][y]==0)
        matrix[x][y] = index
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

function simulate()
{
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
   emit()

    var final = []
    try
    {
        final = JSON.parse(fs.readFileSync("statistics.json"))
    }catch
    {
        final = []
    }
    if (!Array.isArray(final))
    {
        final = []
    }
    final.push({
        grass:grass_array.length,
        grasseater:grasseater_array.length,
        predator:predator_array.length,
        dpredator:dpredator_array.length,
        fire:fire_array.length,
        thunder:thunder_array.length,
    })
    fs.writeFileSync("statistics.json",JSON.stringify(final))
}



function initialize()
{
   spreadCharacter(1,5000);
spreadCharacter(2,1000);
spreadCharacter(3,1000);
spreadCharacter(4,5);
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
    emit()
}

io.on('connection', function (socket) {
   initialize();
   startGame();
   emit()
   socket.on("thunder",function(cellCoordinates)
   {
    matrix[cellCoordinates.y][cellCoordinates.x] = 6;
    thunder_array.push(new Thunder(cellCoordinates.x,cellCoordinates.y,6));
   })
   socket.on("season",function(_season)
   {
    season = _season
   })
});

function emit()
{
    io.sockets.emit("sync", {
        matrix:matrix,
        grass:grass_array.length,
        grasseater:grasseater_array.length,
        predator:predator_array.length,
        dpredator:dpredator_array.length,
        fire:fire_array.length,
        thunder:thunder_array.length,
        stats:JSON.parse(fs.readFileSync("statistics.json")),
        season:season,
      });
}


let intervalID;

function startGame()
{
   clearInterval(intervalID)
   intervalID = setInterval(()=>{
      simulate()
   } ,100)
}

let PORT = 3000
server.listen(PORT, function(){
    console.log("Server is running on port "+PORT);
    console.log("Open: localhost:"+PORT)
 });
