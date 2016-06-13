//get canvas information
var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");

// array for x values
var xValue = [0]; 
var i = 0; 


//checks to see if the window gets resized
window.addEventListener('resize', canvas_Size, false);

//Drawing tells if mouse button has been pressed. 
var Drawing; 





//if mouse has been pressed, move to mouse location, and set drawing to true. 
canvas.onmousedown = function (e) {
    
    //canvas_Context.moveTo(e.pageX-this.offsetLeft, e.pageY-this.offsetLeft); 
    
        Drawing = true; 
    
}

//while mouse is pressed draw
canvas.onmousemove = function (e) {
        


    if(Drawing) {
        
        // canvas_Context.lineTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop); 
        //add X value to array 
        xValue.push(e.pageX-this.offsetLeft); 
        
        //if Xvalue is less than current X value, then draw
            if(xValue[i]<e.pageX-this.offsetLeft){
            
                canvas_Context.lineTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop); 
                canvas_Context.stroke();
                i++;  
            //if Xvalue is greater or equal to current X then it means the user is going backwards and thats trouble.
            //So lets erase the line and make them start over. 
            } else if(xValue[i] >= e.pageX-this.offsetLeft) {
            //Disable drawing
            Drawing = false; 
            //clear canvas
            canvas_Context.clearRect(0, 0, canvas.width, canvas.height);
            canvas_Context.beginPath();
            //reset Xvalue array
            xValue.length = 1; 
            i = 0; 
            
        }
        
    }else{
        canvas_Context.moveTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop); 

    }
}
    //when mouse is released stop drawing
canvas.onmouseup = function (e) {
    // canvas_Context.moveTo(e.pageX-this.offsetLeft, e.pageY-this.offsetLeft);
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
        X-Line does not start where the mouse cursor is. I think this has something to do with how the x and y values are being measured. 
        X-Not be able to draw backwards. Think I can just check for the mouse x values and compare them to the previous values. 
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