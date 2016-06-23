//get canvas information
var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");

// array for x values
var xVal = [0]; 
var i = 0; 
var a = 1; 

//Drawing tells if mouse button has been pressed. 
var isDrawing; 

// bool to tell if the user has been alerted to drawing backwards, so that it does not become annoying. 
var hasBeenAlerted = false; 


//set 0,0 so that it fits on any screen. 
var startX = canvas.width - canvas.width; 
var startY = canvas.height / 2; 
var startLocation = false; 

//distance between each segment
var xSegmentLength = canvas.width / 50; 
var ySegmentHeight = canvas.height / 50; 

//array for coords
var Coords;  




//get rid of this
 

/*

 var x = 0; //xSegmentLength; 
     var y = 0; //ySegmentWidth; 
    
    //draw x lines
    for(var i = 0; i<50; i++ )
    {
        canvas_Context.beginPath(); 
        canvas_Context.moveTo(x, 0);
        canvas_Context.lineTo(x, canvas.height); 
        canvas_Context.strokeStyle = '#ff0000';
        canvas_Context.stroke(); 
        x = x + canvas.width / 50;
        canvas_Context.closePath(); 
        
        
    }
//draw y lines
    for(var i = 0; i<50; i++ )
    {
        canvas_Context.beginPath(); 
        canvas_Context.moveTo(0, y);
        canvas_Context.lineTo(canvas.width, y); 
        canvas_Context.strokeStyle = '#219859'; 
        canvas_Context.stroke(); 
        y = y + canvas.height / 50; 
        canvas_Context.closePath(); 
        
    }



//stop
*/











//indication start location and X line
canvas_Context.beginPath(); 
canvas_Context.arc(startX, startY, 25, 0, 2*Math.PI); 
canvas_Context.moveTo(startX,startY); 
canvas_Context.stroke(); 
canvas_Context.strokeStyle='#000000'
canvas_Context.lineTo(canvas.width,startY); 
canvas_Context.stroke(); 
canvas_Context.closePath(); 
    



 




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
        //start location is always the same place. 
        if(!startLocation)
        {
        canvas_Context.moveTo(startX,startY); 
        startLocation = true; 
        }
        
        //add X value to array 
        xVal.push(e.pageX - this.offsetLeft); 
        
        
        //if    Xvalue is less than current X value, then draw
            if (xVal[i] < e.pageX - this.offsetLeft)
            {
            
                canvas_Context.lineTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop); 
                canvas_Context.stroke();

                
                /*
                
                //if the current value, equals a bound, then add it to a list
                if(xVal[i] = a * xSegmentLength )
                   {
                       
                       if(e.pageY-this.offsetTop < )
                       
                       
                   
                       Coords[a] = [[a,e.pageY-this.offsetTop]]
                       
                       
                       i++; 
                       a++; 
                   
                   }
                else
                    {
                        i++; 
                    }
                */
                
                
                
            }
        /*
        if Xvalue is greater or equal to current X then it means the user is going backwards and thats trouble.
        So lets erase the line and make them start over. 
        */
            else if(xVal[i] >= e.pageX-this.offsetLeft) 
            {
                 canvasClear(); 
            
                
                
               
                   
                
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
        //start from 0,0
        if(!startLocation)
        {
        canvas_Context.moveTo(startX,startY); 
        startLocation = true; 
        }
            //draw
            canvas_Context.lineTo(e.touches[0].clientX-this.offsetLeft, e.touches[0].clientY-this.offsetTop); 
            canvas_Context.stroke(); 
            i++; 
    } 
    else if(xVal[i] >= e.touches[0].clientX-this.offsetLeft)
    {
           canvasClear(); 
            
        
    }   
}


//dynamic canvas size
var setCanvasSize = function()
{
    
    canvas.height = window.outerHeight-150; 
    canvas.width = window.outerWidth-30; 
    
    
}


// alert for drawing backwards
var errorAlert = function()
{
    
    if(!hasBeenAlerted)
        {
    window.alert("Cannot draw backwards");
    hasBeenAlerted = true; 
        }

  
    
}

//clear canvas and redraw circle
var canvasClear = function()
{
    //allert user they cant draw backwards
        errorAlert();  
        //clear canvas
        
            canvas_Context.clearRect(0, 0, canvas.width, canvas.height);
            canvas_Context.beginPath();
            //reset start local
            startLocation = false; 
           
        
        
            //reset Xvalue array
            xVal.length = 1; 
            i = 0; 
    //redraw start location bubble and X line
canvas_Context.beginPath(); 
canvas_Context.arc(startX, startY, 25, 0, 2*Math.PI); 
canvas_Context.moveTo(startX,startY); 
canvas_Context.stroke(); 
canvas_Context.strokeStyle='#000000'
canvas_Context.lineTo(canvas.width,startY); 
canvas_Context.stroke(); 
canvas_Context.closePath(); 
    
    
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























