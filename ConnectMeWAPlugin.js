
//Needed to be able to get properties easily
import {} from "https://unpkg.com/@workadventure/scripting-api-extra@1.4.4/dist/bundle.js"
var collidableAreas = {};                
WA.player.state.lastDirection = "nothing"
var currentPosition = {}
var lastPosition = {}
var lastMove = {}
window.onmessage = (event) => {
//   console.log("-----------------------",event.data)
   if (event.data === "unblock")
     WA.controls.restorePlayerControls();
   if (event.data === "status"){
     
//     WA.player.getPosition((position) => {
            var position=currentPosition
            var result = false
            for (var a in collidableAreas){                                           
		 //   console.log(collidableAreas[a]);                                      
    		if (position.x >= collidableAreas[a].x && position.x <= collidableAreas[a].x+collidableAreas[a].width && position.y >= collidableAreas[a].y && position.y <= collidableAreas[a].y+collidableAreas[a].height) result=true;
  	    }                                                 
  	    if (result !== true){  
     WA.controls.restorePlayerControls();
                  
              const command  = {action: "move",body:"reset"};        
              console.log("We are not in a zone...sending command", command);                      
              parent.postMessage(JSON.stringify(command), "*");      
            }
            else {
              console.log("we are in a zone");
            } 
//       })

     }
   }

//parent.postMessage("myevent", "*")
//console.log("sending event")

WA.onInit().then(() => {
    console.log('Current player name: ', WA.player.name);
    pollPosition();
});


function pollPosition() {
      setTimeout(() => {
        WA.player.getPosition().then((position) => {
          lastPosition = currentPosition;
          currentPosition = position;
          position.direction = "nothing"
          if (lastPosition.x < position.x) position.direction = "right"
          if (lastPosition.x > position.x) position.direction = "left"                                                                                                                                            
          if (lastPosition.y < position.y) position.direction = "down"                                                                                                                                            
          if (lastPosition.y < position.y) position.direction = "up"                                                                                                                                            

          onMove(position);
        })

        pollPosition();
    },10);  
}
var delta=10;

function enteringInArea(pos,area,delta){
  var dx = 0;
  var dy = 0;
  if (pos.direction=="down") dy=delta
  if (pos.direction=="up") dy=-delta
  if (pos.direction=="right") dx=delta
  if (pos.direction=="left") dx=-delta

  if (pos.x+dx >= area.x)
    if (pos.x+dx <= area.x+area.width)
      if (pos.y+dy >= area.y)
        if (pos.y+dy <= area.y+area.height)
          return true;
}


function onMove(move){
//  console.log(move);
  var result = false;
  lastMove = WA.player.state.lastMove
  WA.player.state.lastMove  = move;
  for (var a in collidableAreas){
//    console.log(collidableAreas[a]);
//    var delta = Math.floor(Math.random()*50)
    
      console.log("state",currentPosition,lastPosition,move.x+delta, collidableAreas[a].x,move.x-delta,collidableAreas[a].x+collidableAreas[a].width,move.y+delta,collidableAreas[a].y,move.y-delta,collidableAreas[a].y+collidableAreas[a].height)

//    if (move.x+delta >= collidableAreas[a].x && currentPosition.x>=lastPosition.x)                                                                                                                               
//      if (move.x-delta <= collidableAreas[a].x+collidableAreas[a].width && currentPosition.x<lastPosition.x)                                                                                                     
//         if (move.y+delta >= collidableAreas[a].y && currentPosition.y>=lastPosition.y)                                                                                                                          
//            if (move.y-delta <= collidableAreas[a].y+collidableAreas[a].height && currentPosition.y < lastPosition.y){                                                                                           
      if (enteringInArea(move,collidableAreas[a],30)){
        console.log("DEBUG",move,"in",collidableAreas[a])
        result=true;
        break;
      }
 
  }
  if (result == true){
              delta=10
              if (move.direction ){

              console.log("--------------------------------- disbalePlayer")
              WA.controls.disablePlayerControls()                                                                                                
              setTimeout(() => {                                                                                                                 
                console.log("Delayed for", 400); 
                WA.controls.restorePlayerControls();  
                console.log("--------------------------------- restoringPlayer")                                                                                               
              }, 400);  
                const command  = {action: "move",body:move.direction};                                                         
                console.log("sending command", command);                                                                                           
                parent.postMessage(JSON.stringify(command), "*"); 
              }    
   } else {
     delta=10
   }
}

WA.player.onPlayerMove(onMove);

const map = await WA.room.getTiledMap();
console.log(map);
for (const layer in map.layers){
  console.log("layer",map.layers[layer])
  if (map.layers[layer].type === "objectgroup")
    for (const object in map.layers[layer].objects){
      console.log("object",map.layers[layer].objects[object])
      for (const property in map.layers[layer].objects[object].properties){
        if (map.layers[layer].objects[object].properties[property].name === "adminStatus"){
	  WA.room.area.onEnter(map.layers[layer].objects[object].name).subscribe(() => {                       
            const command = {action: "setStatus", body: map.layers[layer].objects[object].properties[property].value};                            
            parent.postMessage(JSON.stringify(command), "*");                                    
          });   	  
          WA.room.area.onLeave(map.layers[layer].objects[object].name).subscribe(() => {                                                                                                            
	    const command = {action: "setStatus", body: "out_of_office"};                        
  	    parent.postMessage(JSON.stringify(command), "*");                          
	  });      
	}
        if (map.layers[layer].objects[object].properties[property].name === "adminMood"){                           
          WA.room.area.onEnter(map.layers[layer].objects[object].name).subscribe(() => {                              
            const command = {action: "setMood", body: map.layers[layer].objects[object].properties[property].value};
            parent.postMessage(JSON.stringify(command), "*");                                                         
          });                                                                                                         
        }                                                                                           
     
        if (map.layers[layer].objects[object].properties[property].name === "collidableArea")
          if (map.layers[layer].objects[object].properties[property].value){
            console.log("Subscribing to collidable area ",map.layers[layer].objects[object].name);
            collidableAreas[map.layers[layer].objects[object].name+"-"+map.layers[layer].objects[object].id] = map.layers[layer].objects[object];
/*          WA.room.area.onEnter(map.layers[layer].objects[object].name).subscribe((e = map.layers[layer].objects[object].name) => {        
              console.log("Entering ",e)                                                  
              WA.controls.disablePlayerControls()                                      
              setTimeout(() => {                                                       
                console.log("Delayed for 400ms");                                        
                WA.controls.restorePlayerControls()                                      
              }, 400);                                                             
                    
              const command  = {action: "move",body:WA.player.state.lastMove.direction};
              console.log("sending command", command);  
              parent.postMessage(JSON.stringify(command), "*");                                  
            });*/
          };
      };
    };
};


