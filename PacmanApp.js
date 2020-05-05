//Fields
var context;
var shape=new Object();
var board=new Array();
var score = 0;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var pac;
var pacLife=5;
var direct;

//Pacman Objects
var pacman;

//images 
var clock;
var wall;
var heart;
var pac;

//sounds
//sounds
var fruitMusic;
var myMusic;
var myMusicSrc;
var fruitSrc;
var extraMusic;
var extraSrc;
var deathMusic;
var deathSrc;
var isMusicPlaying = false;
var myMusicSrc;
var fruitSrc;
var extraMusic;
var extraSrc;
var deathMusic;
var deathSrc;

//Number of food/balls
var numOfBalls;
var takenBalls;

//food/balls color
var ballColor1;
var ballColor2;
var ballColor3;

//Keys for playing
var keyUp = new Object(),
    keyDown = new Object(),
    keyLeft = new Object(),
    keyRight = new Object();

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

//Monsters types
var monsterOne = new Image();
monsterOne.src = "resource\\ghost1.png";
var monsterTwo = new Image();
monsterTwo.src = "resource\\ghost2.png";;
var monsterThree = new Image();
monsterThree.src = "resource\\ghost3.png";;
var monsterFour = new Image();
monsterFour.src = "resource\\ghost4.png";;

//Strawberry
var strawberry = new Image();
strawberry.src = "resource\\strawberry.png";
var strwberryShape = new Object();
var strawberry_eaten;

$(document).ready(function(){
    loginMenu();
});

function loginMenu() {
    $(".gamePage").hide();
    $(".settingsPage").hide();
    $(".settingsGamePageWarrper").hide();
    $(".wrapper").show();
    $(".register").show();
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
}

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
    clearRegisterationFields();

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
    debugger;
    currentUserName = userName;
    $(".wrapper").hide();
    $(".settingsPage").show();
    $(".settingsPage").focus();
    clearLoginFields();
    return true;
}

function clearLoginFields() {
    let userName = document.getElementById("logInUserName");
    let password = document.getElementById("logInPassword");
    if (userName.value.length != 0 && password.value.length != 0) {
        userName.value="";
        password.value="";
    }
}

function clearRegisterationFields() {
    userName = document.getElementById("userName");
    password = document.getElementById("password");
    firstName = document.getElementById("firstName");
    lastName = document.getElementById("lastName");
    email = document.getElementById("email");
    birthday = document.getElementById("birthday");
    if (userName.value.length != 0 || password.value.length != 0 || firstName.value.length != 0 || lastName.value.length != 0
        || email.value.length != 0 || birthday.value.length != 0) {
        userName.value="";
        password.value="";
        firstName.value = "";
        lastName.value = "";
        email.value ="";
        birthday.value="";
    }
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
    keyUp = 38;
    keyDown = 40;
    keyLeft = 37;
    keyRight = 39;

    //Number of balls/food
    numOfBalls = 50;

    //food/balls colors
    ballColor1 = document.getElementById("ball1").value;//red - 60%
    ballColor2 = document.getElementById("ball2").value;//blue - 30%
    ballColor3 = document.getElementById("ball3").value;//green - 10%

    //Game Time
    timeForGame = 60;

    //Number of monsters
    numOfMonsters = 1;

    $(".settingsPage").hide();
    $(".gamePage").show();
    fillSettingsGamePageData();
    $(".settingsGamePageWarrper").show();
}

/* Settings Keys by user choice */
function setKeyCodeUp(event) {
    keyUp = event.keyCode;
}
function setKeyCodeDown(event) {
    keyDown = event.keyCode;
}
function setKeyCodeLeft(event) {
    keyLeft = event.keyCode;
}
function setKeyCodeRight(event) {
    keyRight = event.keyCode;
}

/**
 * This function called by "Start Game" button in the settings page
 * This function responsible for gathering all inputs fields assigned by the user and define them
 */
function setGameConfigurations() {

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
        keyUp = 38;
        keyDown = 40;
        keyLeft = 37;
        keyRight = 39;
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
    $(".settingsPage").hide();
    $(".gamePage").show();
    fillSettingsGamePageData();
    $(".settingsGamePageWarrper").show();
    return true;
}

/**
 * Play a game after selecting the game settings 
 */
function Start() {
    $(".canvas2").height = 50 ;
    $(".canvas2").width = window.innerWidth;
    $(".canvas2").show();
    pacman = document.getElementById("pacmanRight");
    // board = new Array()
    // score = 0;
    takenBalls = 0;
    // pacLife = 5;
    // pac_color="yellow";
    var cnt = 375;
    var food_remain = numOfBalls;
    //fruit music
    fruitMusic = new Audio();
    fruitSrc = document.createElement("source");
    fruitSrc.type = "audio/mpeg";
    fruitSrc.src = "resource//Fruit.mp3";
    fruitMusic.appendChild(fruitSrc);
    //Clock eating music
    extraMusic = new Audio();
    extraSrc = document.createElement("source");
    extraSrc.type = "audio/mpeg";
    extraSrc.src = "resource//Extra.mp3";
    extraMusic.appendChild(extraSrc);
    //Death music
    deathMusic = new Audio();
    deathSrc = document.createElement("source");
    deathSrc.type = "audio/mpeg";
    deathSrc.src = "resource//Death.mp3";
    deathMusic.appendChild(deathSrc);

    //game music
    myMusic = new Audio();
    myMusicSrc = document.createElement("source");
    myMusicSrc.type = "audio/mpeg";
    myMusicSrc.src = "resource//soundtrack.mp3";
    myMusic.appendChild(myMusicSrc);
    if (!isMusicPlaying){
        myMusic.play();
        isMusicPlaying = true;
    }

    fruitMusic = new Audio();
    fruitSrc = document.createElement("source");
    fruitSrc.type = "audio/mpeg";
    fruitSrc.src = "resource//Fruit.mp3";
    fruitMusic.appendChild(fruitSrc);

    extraMusic = new Audio();
    extraSrc = document.createElement("source");
    extraSrc.type = "audio/mpeg";
    extraSrc.src = "resource//Extra.mp3";
    extraMusic.appendChild(extraSrc);

    deathMusic = new Audio();
    deathSrc = document.createElement("source");
    deathSrc.type = "audio/mpeg";
    deathSrc.src = "resource//Death.mp3";
    deathMusic.appendChild(deathSrc);

    ballSmall = numOfBalls*0.6;
    ballMedium = numOfBalls*0.3;
    ballLarge = numOfBalls*0.1;
    var pacman_remain = 1;
    let k = Math.floor(Math.random() * 4) + 1;
    
    strawberry_eaten = false;

    start_time= new Date();
    for (var i = 0; i < 25; i++) {
        board[i] = new Array();
        for (var j = 0; j < 15; j++) {

            if ((i==3 && j==3) || (i==3 && j==4) || (i==5 && j==4)|| (i==8 && j==3) 
            || (i==8 && j==4) || (i==3 && j==2) || (i==4 && j==2) || (i==5 && j==2) ||(i==6 && j==2) ||
            (i==7 && j==2) ||(i==8 && j==2) || (i==3 && j==5)|| (i==4 && j==5) || (i==5 && j==5) ||
            
            (i==3 && j==9) || (i==4 && j==9) || (i==5 && j==9) || (i==3 && j==10)|| (i==3 && j==11) 
            || (i==3 && j==12) || (i==4 && j==12) || (i==8 && j==11) || (i==5 && j==12) ||(i==6 && j==12) ||
            (i==7 && j==12) ||(i==8 && j==12) || (i==8 && j==10)|| (i==5 && j==10) ||

            (i==16 && j==2) || (i==17 && j==2) || (i==18 && j==2) || (i==19 && j==2)|| (i==20 && j==2) 
            || (i==21 && j==2) || (i==16 && j==3) || (i==16 && j==4) || (i==21 && j==3) ||(i==21 && j==4) ||
            (i==21 && j==5) ||(i==20 && j==5) || (i==19 && j==5)|| (i==19 && j==4)||
            
            (i==16 && j==12) || (i==17 && j==12) || (i==18 && j==12) || (i==19 && j==12)|| (i==20 && j==12) 
            || (i==21 && j==12) || (i==16 && j==11) || (i==16 && j==10) || (i==21 && j==11) ||(i==21 && j==10) ||
            (i==21 && j==9) ||(i==20 && j==9) || (i==19 && j==9)|| (i==19 && j==10)){

            
                board[i][j] = 1;    //wall
            }
            else if(i==4 && j==10){
                board[i][j] = 2;
                // board[4][4] = 7;
            } 
            // else if((i==4 && j==4) && k==2){
            //     board[i][j] = 2;
            //     board[4][10] = 7;
            // }
            else if(i==20 && j==4){
                board[i][j] =7;
            }
            // else if((i==20 && j==10) && k==4){
            //     board[i][j] = 2;
            //     board[20][4] = 7;
            // }
            else if((!(i==0 && j == 0)) && (!(i==24 && j==0)) && (!(i==24 && j==14)) && (!(i==0 && j==14))){
            var randomNum = Math.random();
            if (randomNum <= 1.0 * food_remain / cnt) {
                if(ballLarge > 0){
                    board[i][j] = 6;    // largeball
                    ballLarge--;
                }else if( ballMedium > 0){
                    board[i][j] = 5;    // mediumball
                    ballMedium--;
                }else if(ballSmall > 0){
                    board[i][j] = 4;    // smallball
                    ballSmall--;
                }    
                food_remain--;
            } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                shape.i=i;
                shape.j=j;
                pacman_remain--;
                board[i][j] = 3;     // pacman
            } else {
                board[i][j] = 0;    //empty cell
            }
            cnt--;
            }
        }
    }
    while(food_remain>0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 4;
        food_remain--;
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    if (interval == null) {
        interval=setInterval(UpdatePosition, 100);
    }
    initMonstersPositions();
    initStraberryPosition();
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
    if (keysDown[keyUp]) {
        pacman = document.getElementById("pacmanUp");
        $('#pacmanDown').css('display','none');
        $('#pacmanLeft').css('display','none');
        $('#pacmanRight').css('display','none');
        return 1;
    }
    //Down
    if (keysDown[keyDown]) { 
        pacman = document.getElementById("pacmanDown");
        $('#pacmanUp').css('display','none');
        $('#pacmanLeft').css('display','none');
        $('#pacmanRight').css('display','none');
        return 2;
    }
    //Left
    if (keysDown[keyLeft]) { 
        pacman = document.getElementById("pacmanLeft");
        $('#pacmanDown').css('display','none');
        $('#pacmanUp').css('display','none');
        $('#pacmanRight').css('display','none');
        return 3;
    }
    //Right
    if (keysDown[keyRight]) { 
        pacman = document.getElementById("pacmanRight");
        $('#pacmanDown').css('display','none');
        $('#pacmanLeft').css('display','none');
        $('#pacmanUp').css('display','none');
        return 4;
    }
}

function Draw(direct) {
    if(direct == null){
        direct = "R";
    }
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");


    let wall = new Image();
    wall.src = "resource\\wall.png";

    let clock = new Image();
    clock.src = "resource\\clock.png";

    let heart = new Image();
    heart.src = "resource\\heart.png";

    canvas.width=canvas.width;
    lblScore.value = score;
    lblTime.value = time_elapsed;
    lblLife.value = pacLife;
    lblName.value = currentUserName;
    for (var i = 0; i < 25; i++) {//---->width = 1200
        for (var j = 0; j < 15; j++) {//---->height = 654
            var center = new Object();
            center.x = i * 48 + 24;
            center.y = j * 43 + 21.5;
            if (board[i][j] == 3) {
                
                // pacman.style.display = 'block';
                // $('#'+pacman.id).css('display','block');                 
                context.drawImage(pacman, center.x -20,center.y-20);    
            } else if (board[i][j] == 4) {
                context.beginPath();
                context.arc(center.x, center.y,3.5, 0, 2 * Math.PI); // 5 points food
                context.fillStyle = ballColor1; //color 
                context.fill();
            } else if (board[i][j] == 5) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // 15 points food
                context.fillStyle = ballColor2; //color 
                context.fill();
            } else if (board[i][j] == 6) {
                context.beginPath();
                context.arc(center.x, center.y,6.5, 0, 2 * Math.PI); // 25 points food
                context.fillStyle = ballColor3; //color 
                context.fill();
            }else if (board[i][j] == 1) { // wall
                context.drawImage(wall, center.x -20,center.y-20); 
            }else if (board[i][j] == 2) { // clock
                context.drawImage(clock, center.x -20,center.y-20); 
            }else if (board[i][j] == 7) { // heart
                context.drawImage(heart, center.x -20,center.y-20); 
            }
            if (strwberryShape.i == i && strwberryShape.j == j && !strawberry_eaten) { //strawberry
                context.drawImage(strawberry, center.x -20,center.y-20); 
            }
            if (numOfMonsters >= 1) {
                if (monsterShapeOne.i == i && monsterShapeOne.j == j) {
                    context.drawImage(monsterOne,center.x-20,center.y-20);
                }
            }
            if (numOfMonsters >= 2) {
                if (monsterShapeTwo.i == i && monsterShapeTwo.j == j) {
                    context.drawImage(monsterTwo,center.x-20,center.y-20);
                }
            }
            if (numOfMonsters >= 3) {
                if (monsterShapeThree.i == i && monsterShapeThree.j == j) {
                    context.drawImage(monsterThree,center.x-20,center.y-20);
                }
            }
            if (numOfMonsters >= 4) {
                if (monsterShapeFour.i == i && monsterShapeFour.j == j) {
                    context.drawImage(monsterFour,center.x-20,center.y-20);
                }
            }
         }
        }
        // context.drawImage(monsterOne, 0,0);
        // context.drawImage(monsterTwo, 60 ,0);
        // context.drawImage(monsterThree, 120 ,0);
        // context.drawImage(monsterFour, 180 ,0);
    }


function UpdatePosition() {
    let colisionDone = checkPacmanColisions();
    board[shape.i][shape.j]=0;
    if (!colisionDone) {
        var x = GetKeyPressed();
    }
    //Up
    if(x==1 && !colisionDone)
    {
        if(shape.j>0 && board[shape.i][shape.j-1]!=1 )
        {
            direct = "U";
            shape.j--;
        }
    }
    //Down
    if(x==2 && !colisionDone)
    {
        if(shape.j<14 && board[shape.i][shape.j+1]!=1)
        {
            direct = "D";
            shape.j++;
        }
    }
    //Left
    if(x==3 && !colisionDone)
    {
        if(shape.i>0 && board[shape.i-1][shape.j]!=1)
        {
            direct = "L";
            shape.i--;
        }
    }
    //Right
    if(x==4 && !colisionDone)
    {
        if(shape.i<24 && board[shape.i+1][shape.j]!=1)
        {
            direct = "R";
            shape.i++;
        }
    }
    if(board[shape.i][shape.j]==4 && !colisionDone)
    {
        fruitMusic.play();
        takenBalls++;
        score = score+5;
    }
    if(board[shape.i][shape.j]==5 && !colisionDone)
    {
        fruitMusic.play();
        takenBalls++;
        score = score +15;
    }
    if(board[shape.i][shape.j]==6 && !colisionDone)
    {
        fruitMusic.play();
        takenBalls++;
        score = score+25;
    }
    if(board[shape.i][shape.j]==2 && !colisionDone)
    {
        extraMusic.play();
        start_time.setSeconds(start_time.getSeconds()+30); // clock
    }
    if(board[shape.i][shape.j]==7 && !colisionDone)
    {
        extraMusic.play();
        pacLife++; // heart
    }
    if(shape.i == strwberryShape.i && shape.j == strwberryShape.j && !strawberry_eaten && !colisionDone)
    {
        extraMusic.play();
        score = score+50; // strawberry
        strawberry_eaten = true;
    }
    board[shape.i][shape.j]=3;
    var currentTime=new Date();
    time_elapsed=timeForGame-(currentTime-start_time)/1000;
    if(takenBalls==numOfBalls) 
    {
        myMusic.pause();
        myMusic.currentTime = 0;
        isMusicPlaying = false;
        window.clearInterval(interval);
        if (window.confirm("Winner!!! \n your score:" + score +"\n Another game?")){
            initiateNewGame();
            Start();
        }else{
            window.alert("See you next time :)");
            initiateNewGame();
           
        }
    }else if(time_elapsed <= 0.5 ){
        myMusic.pause();
        myMusic.currentTime = 0;

        isMusicPlaying = false;
        window.clearInterval(interval);
        if(score >= 100){
            if (window.confirm("Winner!!! \n your score:" + score +"\n New game?")){
                initiateNewGame();
            }else{
                window.alert("See you next time :)");
                initiateNewGame();
                $(".settingsPage").hide();
                loginMenu();
            }
        }else{
            if (window.confirm("you are better than " + score + "points!" +"\n New game?")){
                initiateNewGame();
            }else{
                window.alert("See you next time :)");
                initiateNewGame();
                $(".settingsPage").hide();
                loginMenu();
            }
        }
    }else if (pacLife > 0)
    {
        if (colisionDone) {
            deathMusic.play();
            alert("You got eaten!");
            pacLife--;
            score-=10;
            if (score < 0) {
                score = 0;
            }
            initMonstersPositions();
            resetKeysDown();
        }else {
            monstersStartMoving();
            Draw(direct);
        }
    } else {
        alert("Loser!");
        myMusic.pause();
        myMusic.currentTime = 0;

        isMusicPlaying = false;
        initiateNewGame();
    }
}
/**
 * This function ending game after pacman lives becomes 0
 * presents the settings page
 */
function initiateNewGame() {
    myMusic.pause();
    myMusic.currentTime = 0;
    isMusicPlaying = false;
    clearInterval(interval);
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    score = 0;
    pacLife = 5;
    interval = null;
    $(".gamePage").hide();
    $(".settingsGamePageWarrper").hide();
    $(".settingsPage").show();
    resetKeysDown();
}
/**
 * Resets boolean values of 'keysDown' 
 * After pacman got eaten the last key pressed boolean value is still true
 */
function resetKeysDown() {
    keysDown[keyUp] = false;
    keysDown[keyDown] = false;
    keysDown[keyLeft] = false;
    keysDown[keyRight] = false;
}
/**---------------------MONSTERS------------------------------ */
var monsterShapeOne = new Object();
var monsterShapeTwo = new Object();
var monsterShapeThree = new Object();
var monsterShapeFour = new Object();

/**
 * Initiate start positions of monsters in random corners
 */
function initMonstersPositions() {
    let corner = getRandomDirection(); // returnes range of 1 to 4
    if (numOfMonsters >= 1) {
        setMonsterStartPosition(monsterShapeOne,corner);
    }
    if (numOfMonsters >= 2) {
        corner = getRandomDirection();
        setMonsterStartPosition(monsterShapeTwo,corner);
    }
    if (numOfMonsters >= 3){
        corner = getRandomDirection();
        setMonsterStartPosition(monsterShapeThree,corner);
    }
    if (numOfMonsters >= 4) {
        corner = getRandomDirection();
        setMonsterStartPosition(monsterShapeFour,corner);
    }
}

function setMonsterStartPosition(monster,corner) {
    //Top left
    if (corner == 1) {
        monster.i=0;
        monster.j=0;
    }
    //Bottom left
    if (corner == 2) {
        monster.i=0;
        monster.j=14;
    }
    //Bottom right
    if (corner == 3) {
        monster.i=24;
        monster.j=14;
    }
    //Top right
    if (corner == 4) {
        monster.i=24;
        monster.j=0;
    }
} 

/**
 * Updating positions of monsters randomally
 */
function monstersStartMoving() {
    let direction = getRandomDirection();
    if (numOfMonsters >= 1) {
        while(!updateMonsterPosition(monsterShapeOne,direction)) {
            direction = getRandomDirection();
        }
    }
    if (numOfMonsters >= 2) {
        let direction = getRandomDirection();
        while(!updateMonsterPosition(monsterShapeTwo,direction)) {
            direction = getRandomDirection();
        }
    }
    if (numOfMonsters >= 3){
        let direction = getRandomDirection();
        while(!updateMonsterPosition(monsterShapeThree,direction)) {
            direction = getRandomDirection();
        }
    }
    if (numOfMonsters >= 4) {
        let direction = getRandomDirection();
        while(!updateMonsterPosition(monsterShapeFour,direction)) {
            direction = getRandomDirection();
        }
    }
    //strawberry
    direction = getRandomDirection();
    updateStrawberryPosition(direction);
}

/**Return random number between 1 to 4 that represents direction movement of a monster */
function getRandomDirection() {
    return Math.floor(Math.random() * Math.floor(4)) + 1;
}

function updateMonsterPosition(monster,direction) {
   //Up
   if(direction==1)
   {
       if(monster.j>0 && board[monster.i][monster.j-1]!=1 && board[monster.i][monster.j-1]!=2)
       {
        monster.j--;
        return true;
       }
   }
   //Down
   if(direction==2)
   {
       if(monster.j<14 && board[monster.i][monster.j+1]!=1 && board[monster.i][monster.j+1]!=2)
       {
        monster.j++;
        return true;
       }
   }
   //Left
   if(direction==3)
   {
       if(monster.i>0 && board[monster.i-1][monster.j]!=1 && board[monster.i-1][monster.j]!=2)
       {
           monster.i--;
           return true;
       }
   }
   //Right
   if(direction==4)
   {
       if(monster.i<24 && board[monster.i+1][monster.j]!=1 && board[monster.i+1][monster.j]!=2)
       {
           monster.i++;
           return true;
       }
   }
   return false;
}

/**
 * Return true if position of pacman and one of the monsters is the same
 */
function checkPacmanColisions() {
    if (shape.i == monsterShapeOne.i && shape.j == monsterShapeOne.j){
        return true;
    }
    else if (shape.i == monsterShapeTwo.i && shape.j == monsterShapeTwo.j){
        return true;
    }
    else if (shape.i == monsterShapeThree.i && shape.j == monsterShapeThree.j){
        return true;
    }
    else if (shape.i == monsterShapeFour.i && shape.j == monsterShapeFour.j){
        return true;
    }
}

/**--------Strawberry initialization -------------------*/
function initStraberryPosition() {
    let corner = getRandomDirection();
    setMonsterStartPosition(strwberryShape,corner);
}

function updateStrawberryPosition(direction) {
    while(!updateMonsterPosition(strwberryShape,direction) && !monstersAroundStrawberry(direction)) {
        direction = getRandomDirection();
    }
}

function monstersAroundStrawberry(direction) {
    if (numOfMonsters >=1 && monsterAroundStrawberry(monsterShapeOne,direction)) {
            return true;
    }
    if (numOfMonsters >=2 && monsterAroundStrawberry(monsterShapeTwo,direction)) {
            return true;
    }
    if (numOfMonsters >=3 && monsterAroundStrawberry(monsterShapeThree,direction)) {
            return true;
    }
    if (numOfMonsters >=4 && monsterAroundStrawberry(monsterShapeFour,direction)) {
            return true;
    }
    return false;
}

function monsterAroundStrawberry(monster, direction) {
    //up
    if (direction==1) {
        if (monster.i == strwberryShape.i && strwberryShape.j-1==monster.j) {
            return true;
        }
    }
    //down
    if (direction==2) {
        if (monster.i == strwberryShape.i && strwberryShape.j+1==monster.j) {
            return true;
        }
    }
    //left
    if (direction==3) {
        if (monster.i == strwberryShape.i-1 && strwberryShape.j==monster.j) {
            return true;
        }
    }
    //right
    if (direction==4) {
        if (monster.i == strwberryShape.i+1 && strwberryShape.j==monster.j) {
            return true;
        }
    }
    return false;
}


/**
 * Presents the settings values insereted by the user on the game page
 */
function fillSettingsGamePageData() {
    //keys
    if (keyUp == 38 || keyDown == 40 || keyLeft == 37 || keyRight == 39) {
        document.getElementById("KeysRowUp").innerHTML ="  Arrow up";
        document.getElementById("KeysRowDown").innerHTML = "  Arrow down";
        document.getElementById("KeysRowLeft").innerHTML = "  Arrow left";
        document.getElementById("KeysRowRight").innerHTML = "  Arrow right";
    }
    else {
        document.getElementById("KeysRowUp").innerHTML ="  " +  String.fromCharCode(keyUp);
        document.getElementById("KeysRowDown").innerHTML = "  " +  String.fromCharCode(keyDown);
        document.getElementById("KeysRowLeft").innerHTML = "  " +  String.fromCharCode(keyLeft);
        document.getElementById("KeysRowRight").innerHTML = "  " +  String.fromCharCode(keyRight);
    }

    //num of balls
    document.getElementById("foodCounter").innerHTML = "  " +  numOfBalls;

    //balls color
    document.getElementById("ball5").style.backgroundColor = "  " +  ballColor1;
    document.getElementById("ball15").style.backgroundColor ="  " +   ballColor2;
    document.getElementById("ball25").style.backgroundColor = "  " +  ballColor3;

    //game time
    document.getElementById("time").innerHTML = "  " +  timeForGame;

    //num of monsters
    document.getElementById("monsterNumber").innerHTML = "  " +  numOfMonsters;
}


