/*
segment the canvas into chunks

*/

var canvas = document.getElementById("Canvas"); 
var canvas_Context = canvas.getContext("2d");



//Take canvas size and split it up evenly
var canvasSegment = function(CanvasLength, CanvasWidth)
{
    //how many X values there are on the graph
    var xSegment = 100; 
    //how many Y values there are on the graph 
    var ySegment = 100; 
 
    //get length of each segment. 
    var xSegmentLength = CanvasLength / xSegment; 
    var ySegmentWidth = CanvasWidth / ySegment; 
    
    //DEBUG
    //Draw lines on the canvas cordinating to the x,y values. 
    
    
    var x = 0; //xSegmentLength; 
    var y = 0; //ySegmentWidth; 
    
    //draw x lines
    for(var i = 0; i<100; i++ ){
        canvas_Context.moveTo(x, 0);
        canvas_Context.lineTo(x, canvas.width); 
        canvas_Context.stroke(); 
        x += xSegmentLength; 
    }
    
    
    
    
    
    
    
    
    
}