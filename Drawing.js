var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");   

//Drawing tells if mouse button has been pressed. 
var Drawing; 





//if mouse has been pressed, move to mouse location, and set drawing to true. 
canvas.onmousedown = function (e) {
    
    canvas_Context.moveTo(e.clientX, e.clientY); 
    
        Drawing = true; 
    
}

//while mouse is pressed draw
canvas.onmousemove = function (e) {

    if(Drawing) {
        
        canvas_Context.lineTo(e.clientX, e.clientY); 
        canvas_Context.stroke();
    }
}
//when mouse is released stop drawing
canvas.onmouseup = function (e) {
    
        Drawing = false; 
    
}




