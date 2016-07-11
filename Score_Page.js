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
    var levelString = "Level " + getCurrentLevel() + " complete!";

    document.getElementById("attemptMessage").innerHTML = attemptString;
    document.getElementById("levelMessage").innerHTML = levelString;
}


/**
 * Reloads the previous level.
 */
function replayLevel()
{
    resetLevelAttempts();
    window.location.href = "Sprite_Page.html";
}

/**
 * Loads the next level.
 */
function nextLevel()
{
    resetLevelAttempts();
    increaseLevel();
    window.location.href = "Sprite_Page.html";
}
