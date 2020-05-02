//Fields
//var context = canvas.getContext("2d");
var shape=new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var color1;
var color2;
var color3;





//Number of food/balls
var numOfBalls;

//food/balls color
var ballColor1;
var ballColor2;
var ballColor3;

//Keys for playing
var keyUp;
var keyDown;
var keyLeft;
var keyRight;

//Game timer till end defined by user on the setting page
var timeForGame;//In seconds 

//Current User
var currentUserName;

//balls types
var ballSmall;//5 points - 60%
var ballMedium;//15 points - 30%
var ballLarge;//25 points - 10%

//Number of Monsters
var numOfMonsters;//from settings


$(document).ready(function(){

    $(".gamePage").hide();
    $(".settingsPage").hide();
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
        if(!firstName.value.match(/^[a-zA-Z]+$/))
        {
            alert("Please fill first name with letters only");
            document.getElementById("firstName").focus();
            return false;
        }

        //Last name construct from letters only
    var lastName = document.getElementById("lastName");
        if(!lastName.value.match(/^[a-zA-Z]+$/))
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
    $(".settingsPage").show();
    $(".settingsPage").focus();
    return true;
}

/**
 * This function responsible for the range slider on the settings page
 * How many balls/food to create for the game
 */
function displayValue() {
    var slider = document.getElementById("myRange");
    var outputSlider = document.getElementById("numOfBalls");
    outputSlider.innerHTML = slider.value;
    slider.oninput = function() {
        outputSlider.innerHTML = this.value;
    }
}

/**
 * This function called by "Generate Random" button in the settings page
 * This fuction responsible for generating random values for the configurations of the game
 */
function randomConfigurations() {
    //Keyboard keys
    keyUp = new Object();
    keyDown = new Object();
    keyLeft = new Object();
    keyRight = new Object();
    keyUp.keyCode = 38;
    keyDown.keyCode = 40;
    keyLeft.keyCode = 37;
    keyRight.keyCode = 39;

    //Number of balls/food
    numOfBalls = 50;

    //food/balls colors
    ballColor1 = document.getElementById("ball1").value;//red - 60%
    ballColor2 = document.getElementById("ball2").value;//blue - 30%
    ballColor3 = document.getElementById("ball3").value;//green - 10%

    //Game Time
    timeForGame = 60;

    //Number of monsters
    numOfMonsters = 2;
    $(".settingsPage").hide();
    $(".gamePage").show();
}

/**
 * This function called by "Start Game" button in the settings page
 * This function responsible for gathering all inputs fields assigned by the user and define them
 */
function setGameConfigurations() {
    //Keyboard keys
    keyUp = document.getElementById("keyUp").value;
    keyDown = document.getElementById("keyDown").value;
    keyLeft = document.getElementById("keyLeft").value;
    keyRight = document.getElementById("keyRight").value;

    //Number of balls/food
    numOfBalls = document.getElementById("myRange").value;

    //food/balls colors
    ballColor1 = document.getElementById("ball1").value;
    ballColor2 = document.getElementById("ball2").value;
    ballColor3 = document.getElementById("ball3").value;

    //Game Time
    timeForGame = document.getElementById("timeForGame").value;

    //Number of monsters
    numOfMonsters = document.getElementById("numOfMonsters").value;

    //Valdiating fields
    if (keyUp.length == 0 && keyDown.length == 0 && keyLeft.length == 0 && keyRight.length == 0) {
        keyUp = new Object();
        keyDown = new Object();
        keyLeft = new Object();
        keyRight = new Object();
        keyUp.keyCode = 38;
        keyDown.keyCode = 40;
        keyLeft.keyCode = 37;
        keyRight.keyCode = 39;
    }
    else {
    if (!(keyUp.length != 0 && keyDown.length != 0 && keyLeft.length != 0 && keyRight.length != 0)) {
                alert("You must fill all required fields to start the game or press the 'Generate Random' button");
                return false;
        }
    }
    if (numOfBalls.length == 0 || timeForGame.length == 0 || numOfMonsters.length == 0) {
        alert("You must fill all required fields to start the game or press the 'Generate Random' button");
        return false;
    }
    if (timeForGame < 60) {
        alert("You must choose playing time longer than 60 seconds, please try again");
        return false;
    }
    debugger;
    $(".settingsPage").hide();
    $(".gamePage").show();
    return true;
}

/**
 * Play a game after selecting the game settings 
 */
function Start() {
    $(".canvas").show();
    board = new Array()
    score = 0;
    pac_color="yellow";
    var cnt = 100;
    var food_remain = 50;
    var pacman_remain = 1;
    start_time= new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        for (var j = 0; j < 10; j++) {
            var randomNum = Math.random();
            if (randomNum <= 1.0 * food_remain / cnt) {
                food_remain--;
                board[i][j] = 1;
            } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                shape.i=i;
                shape.j=j;
                pacman_remain--;
                board[i][j] = 2;
            } else {
                board[i][j] = 0;
            }
            cnt--;
        }
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval=setInterval(UpdatePosition,100);
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) { 
        return 2;
    }
    if (keysDown[37]) { 
        return 3;
    }
    if (keysDown[39]) { 
        return 4;
    }
}
function Draw() {
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");
    canvas.width=canvas.width;
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color 
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 5, 2, 0, 2 * Math.PI); // half circle
                context.fillStyle = "black"; //color 
                context.fill();
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // half circle
                context.fillStyle = "black"; //color 
                context.fill();
            }
        }
    }

    //code here
}

function UpdatePosition() {
    board[shape.i][shape.j]=0;
    var x = GetKeyPressed()
    if(x==1)
    {
        if(shape.j>0)
        {
            shape.j--;
        }
    }
    if(x==2)
    {
        if(shape.j<9)
        {
            shape.j++;
        }
    }
    if(x==3)
    {
        if(shape.i>0)
        {
            shape.i--;
        }
    }
    if(x==4)
    {
        if(shape.i<9)
        {
            shape.i++;
        }
    }
    if(board[shape.i][shape.j]==1)
    {
        score++;
    }
    board[shape.i][shape.j]=2;
    var currentTime=new Date();
    time_elapsed=(start_time-currentTime)/1000;
    if(score>=20&&time_elapsed<=10)
    {
        pac_color="green";
    }
    if(score==50)
    {
        window.clearInterval(interval);
        window.confirm("Winner!!! \n your score:" + score +"\n Another game?");
        window.confirm
        // window.alert("Winner!!! \n your score:" + score);
    }
    else
    {
        Draw();
    }
}
