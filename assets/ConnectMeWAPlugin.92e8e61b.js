import"https://unpkg.com/@workadventure/scripting-api-extra@1.4.4/dist/bundle.js";WA.onInit().then(()=>{console.log("Current player name: ",WA.player.name)});WA.player.state.lastDirection="nothing";function t(e){console.log(e),WA.player.state.lastDirection=e.direction}WA.player.onPlayerMove(t);WA.room.area.onEnter("AdminOffice1").subscribe(()=>{const e={action:"setStatus",body:"available"};parent.postMessage(JSON.stringify(e),"*")});WA.room.area.onEnter("Collide").subscribe(()=>{console.log("collide");let e=WA.player.getPosition();WA.plater.state.lastDirection==="down"&&WA.player.moveTo(e.x,e.y-2,10),WA.plater.state.lastDirection==="up"&&WA.player.moveTo(e.x,e.y+2,10),WA.plater.state.lastDirection==="left"&&WA.player.moveTo(e.x+2,e.y-2,10),WA.plater.state.lastDirection==="right"&&WA.player.moveTo(e.x-2,e.y-2,10)});WA.room.area.onLeave("AdminOffice1").subscribe(()=>{const e={action:"setStatus",body:"out_of_office"};parent.postMessage(JSON.stringify(e),"*")});WA.room.area.onEnter("AdminOffice2").subscribe(()=>{const e={action:"setStatus",body:"meeting"};parent.postMessage(JSON.stringify(e),"*");const o={action:"setMood",body:"In Green room"};parent.postMessage(JSON.stringify(o),"*")});WA.room.area.onLeave("AdminOffice2").subscribe(()=>{const e={action:"setStatus",body:"available"};parent.postMessage(JSON.stringify(e),"*");const o={action:"setMood",body:"---"};parent.postMessage(JSON.stringify(o),"*")});
