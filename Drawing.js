//get canvas information
var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");

// array for x values
var xVal = [0]; 
var i = 0; 

//Drawing tells if mouse button has been pressed. 
var isDrawing; 

//methods for drawing

var setTouchDrawingTrue = function (e) 
{
    
    //move cords to new start location. 
    canvas_Context.moveTo(e.touches[0].clientX-this.offsetLeft, e.touches[0].clientY-this.offsetTop);
    //prevent scrolling
    event.preventDefault(); 

 
}


var setMouseDrawingTrue = function (e) 
{
    
    
        isDrawing = true; 
        event.preventDefault(); 

}

//sets drawing to false
var setDrawingFalse = function (e) 
{
        isDrawing = false; 
    
}

//draws the lines while the mouse is pressed
var mouseDraw = function (e) 
{


    if (isDrawing) 
    {
        
        //add X value to array 
        xVal.push(e.pageX - this.offsetLeft); 
        
        //if Xvalue is less than current X value, then draw
            if (xVal[i] < e.pageX - this.offsetLeft)
            {
            
                canvas_Context.lineTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop); 
                canvas_Context.stroke();
                i++;  
                
                
            }
        /*
        if Xvalue is greater or equal to current X then it means the user is going backwards and thats trouble.
        So lets erase the line and make them start over. 
        */
            else if(xVal[i] >= e.pageX-this.offsetLeft) 
            {
                
            //Disable drawing
                isDrawing = false; 
                
            //clear canvas
                canvas_Context.clearRect(0, 0, canvas.width, canvas.height);
                canvas_Context.beginPath();
                
             //reset Xvalue array
                xVal.length = 1; 
                i = 0; 
            
            }
        
    } 
    else 
    {
        canvas_Context.moveTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop); 

    }
}





//draw on Touchscreens 
var touchDraw = function (e){
    
    //prevents scrolling
    event.preventDefault(); 
    //add to array 
    xVal.push(e.touches[0].clientX-this.offsetLeft); 
    
    //check X value 
    if(xVal[i] < e.touches[0].clientX-this.offsetLeft)
    {
            //draw
            canvas_Context.lineTo(e.touches[0].clientX-this.offsetLeft, e.touches[0].clientY-this.offsetTop); 
            canvas_Context.stroke(); 
            i++; 
    } 
    else if(xVal[i] >= e.touches[0].clientX-this.offsetLeft)
    {
           //clear canvas
            canvas_Context.clearRect(0, 0, canvas.width, canvas.height);
            canvas_Context.beginPath();
           
            //reset Xvalue array
            xVal.length = 1; 
            i = 0; 
            
        
    }   
}


//dynamic canvas size
var setCanvasSize = function() {
    
    canvas.height = window.outerHeight-150; 
    canvas.width = window.outerWidth-30; 
    
    
}


//event listeners for drawing with mouse
canvas.addEventListener("mousemove",    mouseDraw,            false ); 
canvas.addEventListener("mousedown",    setMouseDrawingTrue,  false ); 
canvas.addEventListener("mouseup",      setDrawingFalse,      false ); 
canvas.addEventListener("mouseleave",   setDrawingFalse,      false ); 

//event listeners for drawing with finger on touch screen
canvas.addEventListener('touchstart',   setTouchDrawingTrue,  false); 
canvas.addEventListener("touchmove",    touchDraw,           false); 
canvas.addEventListener("touchend",     setDrawingFalse,      false); 

//checks to see if the window gets resized
window.addEventListener('resize',       setCanvasSize,        false);























