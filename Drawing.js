//get canvas information
var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");

canvas.height = window.screen.height;   //canvas.height * (canvas.clientWidth / canvas.clientHeight); 
canvas.width = window.screen.width; 
// array for x values
var xVal = [0]; 
var i = 0; 
var a = 1; 

//Wiggle wiggle wiggle room for drawing, so that its not so strict. 
var drawError = 330; 
//Drawing tells if mouse button has been pressed. 
var isDrawing; 

// bool to tell if the user has been alerted to drawing backwards, so that it does not become annoying. 
var hasBeenAlerted = false; 


//set 0,0 so that it fits on any screen. 
var startX = canvas.width - canvas.width; 
var startY = canvas.height / 2; 
var startLocation = false; 

//distance between each segment
//var xSegmentLength = (canvas.width - this.offsetLeft) / 50;
var xSegmentLength = canvas.width / 50;
console.log("xsegmentlength = : "+xSegmentLength); 
//array for coords
var Coords;  

//array for just y values test
var yCoords = [0]; 

//checks to see if drawing has been done, and can send cords to the engine. 
var updateReady = false; 

//methods for drawing

var setTouchDrawingTrue = function (e) 
{
    
    //move cords to new start location. 
    canvas_Context.moveTo(e.touches[0].clientX-this.offsetLeft, e.touches[0].clientY - this.offsetTop);
    //prevent scrolling
    event.preventDefault(); 
    isDrawing = true; 

 
}


var setMouseDrawingTrue = function (e) 
{
    
        event.preventDefault(); 

        isDrawing = true; 


}

//sets drawing to false
var setDrawingFalse = function (e) 
{
        //send array 
           
        isDrawing = false; 
    //storeDS(yCoords);

    
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
                
                //if the current value, equals a bound, then add it to a list
                //cordGenerator(e.pageY-this.offsetTop); 
                //cordGenerator(e.pageY-this.offsetTop); 
                i++;
                
                
                
            }
        /*
        if Xvalue is greater or equal to current X then it means the user is going backwards and thats trouble.
        So lets erase the line and make them start over. 
        */
            else if(xVal[i] >= e.pageX-this.offsetLeft - drawError) 
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
var touchDraw = function (e)
{
    
    //prevents scrolling
    event.preventDefault(); 
    //add to array 
    //xVal.push(e.touches[0].clientX-this.offsetLeft);
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
            
        
            
            canvas_Context.lineTo(e.touches[0].clientX-this.offsetLeft, e.touches[0].clientY-this.offsetTop); 
            canvas_Context.lineWidth=5;
            canvas_Context.stroke();
        //while
            //debug
        
            if(xVal[i] % xSegmentLength ===0 )
            {
            cordGenerator(e.touches[0].clientY); 
            i++; 
           }
            i++;
                
        
        //if the current value, equals a bound, then add it to a list
        
    } 
    //if current value is less than or equal to old value than erase the canvas. 
    else if(xVal[i] >= e.touches[0].clientX-this.offsetLeft + drawError || xVal[i] < e.touches[0].clientX-this.offsetLeft - drawError )
    {
           canvasClear(); 
            
        
    }
        
}

//dynamic canvas size
var setCanvasSize = function()
{
    
    //canvas.height = window.outerHeight-150; 
    //canvas.width = window.outerWidth-30; 
    
    canvas.height = window.screen.height; 
    canvas.width = window.screen.width; 
    
    
}


// alert for drawing backwards
var errorAlert = function()
{
    setDrawingFalse(); 
    
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
            isDrawing = false; 
           
        
        
            //reset Xvalue array
            xVal.length = 1; 
            i = 0; 
    //redraw start location bubble and X line
drawCircle(startX, startY); 
    //yCoords.length = 0 ; 
    
}

//generates Cordanates. 
var cordGenerator = function(yPixels)
{
    
    //if the current value, equals a bound, then add it to a list
               // if(xVal[i] % xSegmentLength === 0 )
                //   {
                       
 
                       //Array Corrds contains (X, Y pixels). 
                       //Might have to play around with pixel values not sure exactly how this will react. 

                       yCoords.push((yPixels - startY) * (-1));
                       console.log("X: "+xVal[i]+" Y: "+(yPixels-startY) *-1 );
                       //yCoords = [-200,-300,-500]; 
                       //send cords to physics here. or after the line is drawn. 
                       
                       
                       
                       i++; 
                       a++; 
                   
                  // }
             //   else{
        
               //         i++; 
              //      }

}


//draw a starting location on the canvas. 
var draw_Circle = function(X,Y)
{
    
canvas_Context.beginPath(); 
canvas_Context.lineWidth=5;
canvas_Context.arc(X, Y, 25, 0, 2*Math.PI); 
canvas_Context.moveTo(X,Y); 
canvas_Context.stroke(); 
canvas_Context.strokeStyle='#e1903d'
canvas_Context.lineTo(canvas.width,Y); 
canvas_Context.stroke(); 
canvas_Context.closePath(); 
    
    
}
var sendCoords = function(){

   storeDS(yCoords); 
    
}



//event listeners for drawing with mouse

canvas.addEventListener("mousemove",    mouseDraw,            false ); 
canvas.addEventListener("mousedown",    setMouseDrawingTrue,  false ); 
canvas.addEventListener("mouseup",      setDrawingFalse,      false ); 
canvas.addEventListener("mouseleave",   setDrawingFalse,      false ); 

//event listeners for drawing with finger on touch screen
canvas.addEventListener('touchstart',   setTouchDrawingTrue,  false); 
canvas.addEventListener("touchmove",    touchDraw,            false); 
canvas.addEventListener("touchend",     setDrawingFalse,      false); 

//checks to see if the window gets resized
window.addEventListener('resize',       setCanvasSize,        false);
window.addEventListener('load', draw_Circle(startX, startY), false); 






















