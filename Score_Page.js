/**
 * Created by DavisGoulet on 2016-06-19.
 */

/**
 * Loads the score page.
 * @param {integer} levelAttempts
 */
function loadScorePage()
{
    window.location.href = "Score_Page.html";
}

/**
 * When the score page loads, this function is called to set any variables onto the page.
 */
function updatePageInfo()
{
    var attemptString = "Attempts: " + getLevelAttempts();
    //var attemptString = "Attempts: " + localStorage.attempt;
    var levelString = "Level " + getCurrentLevel() + " complete!";

    document.getElementById("attemptMessage").innerHTML = attemptString;
    document.getElementById("levelMessage").innerHTML = levelString;
}

function getLevelAttempts()
{
    var levelAttempts = parseInt(sessionStorage.attempt);

    

    return localStorage.attempt;
}


/**
 * Reloads the previous level.
 */
function replayLevel()
{
    //Go back to the Sprite page
    window.location.href = 'Sprite_Page.html'+'#'+'FALSE';

    //Should also have some sort of secondary value to indicate which level was loaded previously
}

/**
 * Loads the next level.
 */
function nextLevel()
{
    //Set a counter for the amount of times player replays the level
    localStorage.attempt = 0;

    //Set up the next level
    var nextLevel = parseInt(localStorage.level) + 1;
    localStorage.level = nextLevel;

    window.location.href = 'Sprite_Page.html'
}
