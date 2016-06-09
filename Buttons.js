/**
 * PROJECT_ARCHIMEDES 2016.
 */

function CONTEXT_SWITCH(PAGE_VAL){
//    Allows for changing of pages
    console.log(PAGE_VAL);
    switch(PAGE_VAL) {
        case "SPLASH":
            window.location.href = "Splash_Page.html";
            break;
        case "SPRITE":
            window.location.href = "Canvas_Page.html";
            break;
        case "CANVAS":
            window.location.href = "Sprite_Page.html";
            break;
        case "SCORE":
            window.location.href = "Score_Page.html";
            break;
        default:
            window.location.href = "Score_Page.html";
            break;
    }
    
}