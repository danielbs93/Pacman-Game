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
var pac;
var direct;





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




$(document).ready(function(){
    
    // $(".login").hide();
    // $(".register_li").addClass("active");

    // $(".login_li").click(function(){
    //     $(this).addClass("active");
    //     $(".register_li").removeClass("active");
    //     $(".login").show();
    //     $(".register").hide();

    // })

    // $(".register_li").click(function(){
    //     $(this).addClass("active");
    //     $(".login_li").removeClass("active");
    //     $(".register").show();
    //     $(".login").hide();
    // })
    $(".wrapper").hide();
    $(".settingsPage").hide()
    $(".register").hide();
    $(".login").hide();
    $(".game_page").show();
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

function displayValue() {
    var slider = document.getElementById("myRange");
    var outputSlider = document.getElementById("numOfBalls");
    outputSlider.innerHTML = slider.value;
    slider.oninput = function() {
        outputSlider.innerHTML = this.value;
    }
}

/**
 * Play a game after selecting the game settings 
 */
function Start() {
    $(".canvas2").show();
    board = new Array()
    score = 0;
    pac_color="yellow";
    var cnt = 100;
    var food_remain =85;
    var pacman_remain = 1;
    start_time= new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        for (var j = 0; j < 10; j++) {
            if ((i==8 && j==1) || (i==2 && j==7))
            {
                board[i][j] = 4;
            }
            else if ((i==8 && j==2) || (i==7 && j==1) || (i==1 && j==7) || (i==2 && j==8)){
                board[i][j] = 5;
            }
            else{
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
    }
    while(food_remain>0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval=setInterval(UpdatePosition, 120);
}

function findRandomEmptyCell(board){
    var i = Math.floor((Math.random() * 9) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
   while(board[i][j]!=0)
   {
        i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() * 9) + 1);
   }
   return [i,j];             
}

function GetKeyPressed() {
    //Up
    if (keysDown[38]) {
        return 1;
    }
    //Down
    if (keysDown[40]) { 
        return 2;
    }
    //Left
    if (keysDown[37]) { 
        return 3;
    }
    //Right
    if (keysDown[39]) { 
        return 4;
    }
}

function Draw(direct) {
    if(direct == null){
        direct = "R";
    }
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");
    let pac = new Image();
    pac.src = "resource\\Pacman"+direct+".png";
    canvas.width=canvas.width;
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) {  
                context.drawImage(pac, center.x -15,center.y-15);
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 3.5, 0, 2 * Math.PI); // half circle
                context.fillStyle = "black"; //color 
                context.fill();
            }else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x-15, center.y-15, 30, 60);
                context.fillStyle = "grey"; //color 
                context.fill();
            }else if (board[i][j] == 5) {
                context.beginPath();
                context.rect(center.x-15, center.y-15, 60, 30);
                context.fillStyle = "grey"; //color 
                context.fill();
            }
         }

        }
    }


function UpdatePosition() {
    board[shape.i][shape.j]=0;
    var x = GetKeyPressed()
    //Up
    if(x==1)
    {
        if(shape.j>0 && board[shape.i][shape.j-1]!=4 && board[shape.i][shape.j-1]!=5)
        {
            direct = "U";
            shape.j--;
        }
    }
    //Down
    if(x==2)
    {
        if(shape.j<9 && board[shape.i][shape.j+1]!=4 && board[shape.i][shape.j+1]!=5)
        {
            direct = "D";
            shape.j++;
        }
    }
    //Left
    if(x==3)
    {
        if(shape.i>0 && board[shape.i-1][shape.j]!=4 && board[shape.i-1][shape.j]!=5)
        {
            direct = "L";
            shape.i--;
        }
    }
    //Right
    if(x==4)
    {
        if(shape.i<9 && board[shape.i+1][shape.j]!=4 && board[shape.i+1][shape.j]!=5)
        {
            direct = "R";
            shape.i++;
        }
    }
    if(board[shape.i][shape.j]==1)
    {
        score++;
    }
    board[shape.i][shape.j]=2;
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    if(score>=20&&time_elapsed<=10)
    {
        pac_color="green";
    }
    if(score==100) //TODO: change this
    {
        window.clearInterval(interval);
        if (window.confirm("Winner!!! \n your score:" + score +"\n Another game?")){
            Start();
        }else{
            window.alert("See you next time :)")
        }
    }
    else
    {
        Draw(direct);
    }
}



