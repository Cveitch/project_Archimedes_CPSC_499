//get canvas information
var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");

// array for x values
var xValue = [0]; 
var i = 0; 

//start touch location
var touch_Start_Location = 0; 

//Drawing tells if mouse button has been pressed. 
var Drawing; 

var touchX, touchY; 

//checks to see if the window gets resized
window.addEventListener('resize', canvas_Size, false);






//methods for drawing


var touch_drawing_True = function(e){
    
//move cords to new start location. 
 canvas_Context.moveTo(e.touches[0].clientX-this.offsetLeft, e.touches[0].clientY-this.offsetTop);
    //prevent scrolling
 event.preventDefault(); 
    //add X values to array
    //xValue.push(e.touches[0].clientX-this.offsetLeft); 
}


var drawing_True = function (e) {
    
    
        Drawing = true; 
        event.preventDefault(); 

}

//sets drawing to false
var drawing_False = function (e) {
        Drawing = false; 
    
}

//draws the lines while the mouse is pressed
var draw = function (e) {


    if(Drawing) {
        
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
        
    } else {
        canvas_Context.moveTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop); 

    }
}





//draw on Touchscreens 
/*
-no bounds yet, so can go backwards and in loops
*/
var touch_Draw = function (e){
    
    //prevents scrolling
    event.preventDefault(); 
    //add to array 
        xValue.push(e.touches[0].clientX-this.offsetLeft); 
    
    //check X value 
    if(xValue[i] < e.touches[0].clientX-this.offsetLeft){
        //draw
     canvas_Context.lineTo(e.touches[0].clientX-this.offsetLeft, e.touches[0].clientY-this.offsetTop); 
    canvas_Context.stroke(); 
        i++; 
    } else if(xValue[i] >= e.touches[0].clientX-this.offsetLeft){
           //clear canvas
            canvas_Context.clearRect(0, 0, canvas.width, canvas.height);
            canvas_Context.beginPath();
                
             //reset Xvalue array
            xValue.length = 1; 
            i = 0; 
            
        
    }
    
 

    
    
 
    
    
}


//dynamic canvas size
var canvas_Size = function() {
    
    canvas.height = window.outerHeight-150; 
    canvas.width = window.outerWidth-30; 
    
    
}


//event listeners for drawing with mouse
canvas.addEventListener("mousemove",draw,false ); 
canvas.addEventListener("mousedown",drawing_True,false ); 
canvas.addEventListener("mouseup",drawing_False,false ); 
canvas.addEventListener("mouseleave",drawing_False,false ); 

//event listeners for drawing with finger on touch screen
canvas.addEventListener('touchstart', touch_drawing_True,false); 
canvas.addEventListener("touchmove", touch_Draw, false); 
canvas.addEventListener("touchend", drawing_False, false); 
























