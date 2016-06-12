var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d"); 
 var clutter = false;

//mouse position
//var pos = canvas.input.activePointer.position;
var space = canvas.getBoundingClientRect(); 
/*
var xval = document.getElementById("X"); 
var yval = document.getElementById("Y"); 
var pos = getMousePos(canvas, e);



xval = pos.x; 
yval = pos.y; 
*/


function draw(event){
    
    

    
    if(clutter === false){
    
        canvas_Context.beginPath(); 
        canvas_Context.lineWidth = "5"; 
        canvas_Context.strokeStyle = "red"; 
        canvas_Context.moveTo(0, 90); 
        canvas_Context.lineTo(300, 175); 
        canvas_Context.stroke(); 
        //Just want to get things to show up on the canvas. 
        canvas_Context.beginPath(); 
        canvas_Context.lineWidth = "5";
        canvas_Context.strokeStyle = "green"; // Green path
        canvas_Context.moveTo(0, 75);
        canvas_Context.lineTo(250, 75);
        canvas_Context.stroke(); // Draw it

        canvas_Context.beginPath();
        canvas_Context.strokeStyle = "purple";  // Purple path
        canvas_Context.moveTo(50, 0);
        canvas_Context.lineTo(150, 130);            
        canvas_Context.stroke();  // Draw it
        clutter = true; 
        
    } else if (clutter === true) {
        
        canvas_Context.clearRect(0, 0, canvas.width, canvas.height);
        clutter = false; 
        
    }
}
