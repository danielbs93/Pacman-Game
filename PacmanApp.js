//Fields
//var context = canvas.getContext("2d");
var shape=new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

//Game timer till end defined by user on the setting page
var timeForGame;//In seconds 

//Current User
var currentUserName;

//balls types
var ballSmall;//5 points - 60%
var ballMedium;//15 points - 30%
var ballLarge;//25 points - 10%

//Monsters
var numOfMonsters;//from settings

//test

$(document).ready(function(){
    
    $(".login").hide();
    $(".register_li").addClass("active");

    $(".login_li").click(function(){
        $(this).addClass("active");
        $(".register_li").removeClass("active");
        $(".login").show();
        $(".register").hide();

    })

    $(".register_li").click(function(){
        $(this).addClass("active");
        $(".login_li").removeClass("active");
        $(".register").show();
        $(".login").hide();
    })
});

//Defualt character
$(document).ready(function(){
    let userData = {
        userName: "p",
        password: "p",
        firstName: "p",
        lastName: "p",
        email: "p",
        birthDate: Date.now()
    };
    let format = JSON.stringify(userData);
    localStorage.setItem("p",format);
});

function registerUser() {
    let userData = {
        userName: document.getElementById("userName").value,
        password: document.getElementById("password").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        birthday: document.getElementById("birthday").value
    };
   
    if (!checkFieldsForRegisteration())
    {
        return false;
    }
    let userName = document.getElementById("userName").value;
    let format = JSON.stringify(userData);
    localStorage.setItem(userName,format);
    alert("You have successfully signed up!");

}

/**
 * Register to the system
 */
function checkFieldsForRegisteration()
{
    //Empty fields verifyer
    if (document.getElementById("userName").value.length == 0 || document.getElementById("password").value.length == 0 
        || document.getElementById("firstName").value.length == 0 || document.getElementById("lastName").value.length == 0
        || document.getElementById("email").value.length == 0 || document.getElementById("birthday").value.length == 0)
    {
            alert("Please fill all the required fields");
            return false;
    }

    //User name exist in the system
    if (localStorage.getItem(document.getElementById("userName").value) != null)
    {
        alert("User name already exist, please try another");
        document.getElementById("userName").focus();
        return false;
    }

    //Password construct from letters and numbers with min length of 6
    var password = document.getElementById("password");
    var letters = /^[a-zA-Z]/;
    if(password.value.length < 6) {
        alert("Password must contain at least 6 characters");
        return false;
    }
    var lettersAndNumbers = /^[0-9a-zA-Z]/;
    if(!password.value.match(lettersAndNumbers))
    {
        alert('Please input alphanumeric characters only');
        document.getElementById("password").focus();
        return false;
    }else if (password.value.search(/\d/) == -1) {
        alert("Password must have at least 1 number");
        return false;
    } else if (password.value.search(/[a-zA-Z]/) == -1) {
        alert("Password must have at leat 1 letter");
        return false;
    }

    //First name construct from letters only
    var firstName = document.getElementById("firstName");
        if(!firstName.value.match(letters))
        {
            alert("Please fill first name with letters only");
            document.getElementById("firstName").focus();
            return false;
        }

        //Last name construct from letters only
    var lastName = document.getElementById("lastName");
        if(!lastName.value.match(letters))
        {
            alert("Please fill last name with letters only");
            document.getElementById("lastName").focus();
            return false;
        }

        //Email verifyer 
    var email = document.getElementById("email");
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.value.match(mailformat))
        {
            alert("Email format wrong' please try again");
            document.getElementById("email").focus();
            return false;
        }
       
    return true;

}

/**
 * Log in to the system
 */
function logIn() {
    let userName = document.getElementById("logInUserName").value;
    let password = document.getElementById("logInPassword").value;
    if (localStorage.getItem(userName) == null) {
        alert("User name does not exist, please sign up");
        document.getElementById("logInUserName").focus();
        return false;
    }else {
        let userData = localStorage.getItem(userName);
        let format = JSON.parse(userData);
        if (password != format.password) {
            alert("Password incorrect please try again");
            document.getElementById("logInPassword").focus();
            return false;
        }
    }
    alert("You have signed in successfully");
    currentUserName = userName;
    $(".wrapper").hide();
    return true;
}
