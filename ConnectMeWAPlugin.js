
//Needed to be able to get properties easily
import {} from "https://unpkg.com/@workadventure/scripting-api-extra@1.4.4/dist/bundle.js"


//parent.postMessage("myevent", "*")
//console.log("sending event")

WA.onInit().then(() => {
    console.log('Current player name: ', WA.player.name);
});


WA.player.onPlayerMove(console.log);

const myAdminOffice1 = WA.room.area.onEnter("AdminOffice1").subscribe(() => {
  const command = {action: "setStatus", body: "available"};
  parent.postMessage(JSON.stringify(command), "*");
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
