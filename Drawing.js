//get canvas information
var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");

//checks to see if the window gets resized
window.addEventListener('resize', canvas_Size, false);

//Drawing tells if mouse button has been pressed. 
var Drawing; 





//if mouse has been pressed, move to mouse location, and set drawing to true. 
canvas.onmousedown = function (e) {
    
    canvas_Context.moveTo(e.pageX-this.offsetLeft, e.pageY-this.offsetLeft); 
    
        Drawing = true; 
    
}

//while mouse is pressed draw
canvas.onmousemove = function (e) {

    if(Drawing) {
        
        canvas_Context.lineTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop); 
        canvas_Context.stroke();
       
       
    }
}
//when mouse is released stop drawing
canvas.onmouseup = function (e) {
    
        Drawing = false; 
    
}

//If mouse leaves the canvas, then it stops drawing
canvas.onmouseleave = function (e){
        Drawing = false; 
}



//dynamic canvas size
var canvas_Size = function(){
    
    canvas.height = window.outerHeight-150; 
    canvas.width = window.outerWidth-30; 
    
    
}




 /* random notes
        
        
        todo: 
        X-Canvas should be the size of the screen. Right now its only as big as I make it. 
        -Line does not start where the mouse cursor is. I think this has something to do with how the x and y values are being measured. 
        -Not be able to draw backwards. Think I can just check for the mouse x values and compare them to the previous values. 
        -Play around with storing x,y values. 
        
        
        
        
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