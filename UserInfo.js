/**
 * Created by DavisGoulet on 2016-06-11.
 */


/**
 * Take the user input from the splash page and if it is correct,
 * saves it and moves on to the next page.
 * @param {String} buttonID
 */
function signIn(buttonID) 
{
    var name;

    //Gets the name of the user from the options that they select on the splash screen
    //If the user clicks the guest button, the assign the name as guest, else sign in as the username they gave
    if(buttonID === "continueGuestButton")
    {
        name = "Guest";
    }
    else if(buttonID === "signInButton")
    {
        name = document.getElementById("userNameInput").value;

        //Checks that the username length is not less then 2 or greater then 20 characters.
        if(name.length < 2 || name.length > 20)
        {
            document.getElementById("invalidLengthLabel").style.visibility = "visible";
            return;
        }
    }
    //If for some reason this function is called from neither of the buttons, then prevent it from continuing on
    else
    {
        return;
    }

    //Saves the username in the session storage so that other pages can retrieve it.
    sessionStorage.setItem("Username",name);

    //Continue on to the next page
    window.location.href = "Sprite_Page.html";


}

/**
 * Sets the text of the container given by the id to the username that the user gave.
 * @param {String} container
 */
function getUsername(container)
{
    document.getElementById(container).innerHTML = sessionStorage.getItem("Username");
}