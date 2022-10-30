
//Needed to be able to get properties easily
import {} from "https://unpkg.com/@workadventure/scripting-api-extra@1.4.4/dist/bundle.js"


//parent.postMessage("myevent", "*")
//console.log("sending event")

WA.onInit().then(() => {
    console.log('Current player name: ', WA.player.name);
});

WA.player.state.lastDirection = "nothing"

function onMove(move){
  console.log(move);
  WA.player.state.lastDirection  = move.direction;
}

WA.player.onPlayerMove(onMove);





const myAdminOffice1 = WA.room.area.onEnter("AdminOffice1").subscribe(() => {
  const command = {action: "setStatus", body: "available"};
  parent.postMessage(JSON.stringify(command), "*");
});

const myCollide = WA.room.area.onEnter("Collide").subscribe(() => {
  console.log("collide");
  let position = WA.player.getPosition();
  if (WA.player.state.lastDirection === "down"){
    WA.player.moveTo(position.x, position.y-2, 10);
  }
  if (WA.player.state.lastDirection === "up"){
    WA.player.moveTo(position.x, position.y+2, 10);
  }
  if (WA.player.state.lastDirection === "left"){
    WA.player.moveTo(position.x+2, position.y-2, 10);
  }
  if (WA.player.state.lastDirection === "right"){
    WA.player.moveTo(position.x-2, position.y-2, 10);
  }
});


WA.room.area.onLeave("AdminOffice1").subscribe(() => {

  const command = {action: "setStatus", body: "out_of_office"};                                                                                                                                                        
  parent.postMessage(JSON.stringify(command), "*");       
});

const myAdminOffice2 = WA.room.area.onEnter("AdminOffice2").subscribe(() => {                                                                                                                                      
  const command = {action: "setStatus", body: "meeting"};                                                                                                                                                        
  parent.postMessage(JSON.stringify(command), "*");   
  const command2 = {action: "setMood", body: "In Green room"};
  parent.postMessage(JSON.stringify(command2), "*");                                                                                                                                                             
});                                                                                                                                                                                                                
                                                                                                                                                                                                                   
WA.room.area.onLeave("AdminOffice2").subscribe(() => {                                                                                                                                                             
                                                                                                                                                                                                                   
  const command = {action: "setStatus", body: "available"};                                                                                                                                                    
  parent.postMessage(JSON.stringify(command), "*");                                                                                                                                                                
  const command2 = {action: "setMood", body: "---"};                                                                                                                                                     
  parent.postMessage(JSON.stringify(command2), "*");          
});
