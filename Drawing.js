//get canvas information
var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");

//checks to see if the window gets resized
window.addEventListener('resize', canvas_Size, false);

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
        /*
        
         can take values and store them in data structure. 
        array? 
        2d array [x,y]
        Only 1 of each x value
        x is gong to be plus one each time, its never going to go backwards
        Y does not matter
        really only need x values? ---maybe
        might be to strict? 
        BUT WHATS THE SCALE???????
        It cant be 1 pixel = 1 value (x or y)
        
        Scale?
        Divide screen length into 10? 
        Divide screen length 
        
        
        
        */
       
    }
}
//when mouse is released stop drawing
canvas.onmouseup = function (e) {
    
        Drawing = false; 
    
}

//dynamic canvas size
var canvas_Size = function(){
    
    canvas.height = window.outerHeight-150; 
    canvas.width = window.outerWidth-30; 
    
    
}




