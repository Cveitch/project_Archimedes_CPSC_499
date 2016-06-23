/**
 * PROJECT_ARCHIMEDES 2016.
 */

var jump = true;

//AD: this method doesn't work
function CONTEXT_SWITCH(PAGE_VAL){
//    Allows for changing of pages
    console.log(PAGE_VAL);
    switch(PAGE_VAL) {
        case "SPLASH":
            window.location.href = "../../project_Archimedes_CPSC_499-ALEX_1/Splash_Page.html";
            break;
        case "SPRITE":
            window.location.href = "window.location.href='Canvas_Page.html";
            break;
        case "CANVAS":
            window.location.href = "../../project_Archimedes_CPSC_499-ALEX_1/Sprite_Page.html";
            break;
        case "SCORE":
            window.location.href = "../../project_Archimedes_CPSC_499-ALEX_1/Score_Page.html";
            break;
        default:
            window.location.href = "../../project_Archimedes_CPSC_499-ALEX_1/Score_Page.html";
            break;
    }
    
}

function setCompare(text){
    if(text === "FALSE"){
        jump = false;
    }
}

function getCompare(){ return jump }