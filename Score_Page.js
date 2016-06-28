/**
 * Created by DavisGoulet on 2016-06-19.
 */

/**
 * Loads the score page and saves the variables that will need to be set
 * onto the page after it loads.
 * @param {integer} levelAttempts
 */
function loadScorePage(levelAttempts)
{
    window.location.href = "Score_Page.html";
    sessionStorage.setItem("levelAttempts",levelAttempts);
}

/**
 * When the score page loads, this function is called to set any variables onto the page.
 */
function updatePageInfo()
{
    var attemptString = "Attempts: " + sessionStorage.getItem("levelAttempts");
    document.getElementById("attemptMessage").innerHTML = attemptString;
}


/**
 * Reloads the previous level.
 */
function replayLevel()
{

}

/**
 * Loads the next level.
 */
function nextLevel()
{

}
