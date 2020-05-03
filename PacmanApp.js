//Fields
var context;
var shape=new Object();
var board;
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
var strawberry;
var wall;
var heart;
var pac;

//sounds
var fruitMusic;
var myMusic;

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


$(document).ready(function(){

    // $(".gamePage").hide();
    // $(".settingsPage").hide();
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
    $(".gamePage").hide();
    $(".wrapper").hide();
    $(".settingsPage").show();

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
    numOfMonsters = 4;

    $(".settingsPage").hide();
    $(".gamePage").show();
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
    return true;
}

/**
 * Play a game after selecting the game settings 
 */
function Start() {
    $(".canvas2").show();
    pacman = document.getElementById("pacmanRight");
    board = new Array()
    // score = 0;
    takenBalls = 0;
    // pacLife = 5;
    // pac_color="yellow";
    var cnt = 375;
    var food_remain = numOfBalls;

    // fruitMusic = new sound("resourcw//Fruit.mp3");
    myMusic = new sound("resource//soundtrack.mp3");
    myMusic.play();
    // myMusic.volume = 0.2;

    ballSmall = numOfBalls*0.6;
    ballMedium = numOfBalls*0.3;
    ballLarge = numOfBalls*0.1;
    var pacman_remain = 1;
    let k = Math.floor(Math.random() * 4) + 1;  

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
            // else if((!(i==4 && j == 10)) && (!(i==4 && j==4)) && (!(i==20 && j==10)) && (!(i==20 && j==4))){
            else{
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
        interval=setInterval(UpdatePosition, 120);
    }
    initMonstersPositions();
}

function generateUpLeftwall(board){
    for (var i=3; i<9; i++){
        board[i][2]=2;
    }
    for (var i=2; i<5; i++){
        board[8][i]=2;
    }
    for (var i=4; i<6; i++){
        board[i][5]=2;
    }
    for (var i=3; i<6; i++){
        board[3][i]=2;
    }
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

    let pac = new Image();
    pac.src = "resource\\Pacman"+direct+".png";

    let wall = new Image();
    wall.src = "resource\\wall.png";

    let strawberry = new Image();
    strawberry.src = "resource\\strawberry.png";

    let heart = new Image();
    heart.src = "resource\\heart.png";

    canvas.width=canvas.width;
    lblScore.value = score;
    lblTime.value = time_elapsed;
    lblLife.value = pacLife;
    lblName = currentUserName;
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
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // half circle
                context.fillStyle = ballColor1; //color 
                context.fill();
            } else if (board[i][j] == 5) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // half circle
                context.fillStyle = ballColor2; //color 
                context.fill();
            } else if (board[i][j] == 6) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // half circle
                context.fillStyle = ballColor3; //color 
                context.fill();
            }else if (board[i][j] == 1) {
                context.drawImage(wall, center.x -20,center.y-20); 
            }else if (board[i][j] == 2) {
                context.drawImage(strawberry, center.x -20,center.y-20); 
            }else if (board[i][j] == 7) {
                context.drawImage(heart, center.x -20,center.y-20); 
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
    console.log(shape.i);
    board[shape.i][shape.j]=0;
    var x = GetKeyPressed();
    monstersStartMoving();
    //Up
    if(x==1)
    {
        if(shape.j>0 && board[shape.i][shape.j-1]!=1 )
        {
            direct = "U";
            shape.j--;
        }
    }
    //Down
    if(x==2)
    {
        if(shape.j<14 && board[shape.i][shape.j+1]!=1)
        {
            direct = "D";
            shape.j++;
        }
    }
    //Left
    if(x==3)
    {
        if(shape.i>0 && board[shape.i-1][shape.j]!=1)
        {
            direct = "L";
            shape.i--;
        }
    }
    //Right
    if(x==4)
    {
        if(shape.i<24 && board[shape.i+1][shape.j]!=1)
        {
            direct = "R";
            shape.i++;
        }
    }
    if(board[shape.i][shape.j]==4)
    {
        takenBalls++;
        score = score+5;
    }
    if(board[shape.i][shape.j]==5)
    {
        takenBalls++;
        score = score +15;
    }
    if(board[shape.i][shape.j]==6)
    {
        takenBalls++;
        score = score+25;
    }
    if(board[shape.i][shape.j]==2)
    {
        score = score+100; // strwaberry
    }
    if(board[shape.i][shape.j]==7)
    {
        pacLife++; // heart
    }
    board[shape.i][shape.j]=3;
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    if(score>=20&&time_elapsed<=10)
    {
        pac_color="green";
    }
    if(takenBalls==numOfBalls) 
    {
        myMusic.stop();
        window.clearInterval(interval);
        if (window.confirm("Winner!!! \n your score:" + score +"\n Another game?")){
            Start();
        }else{
            window.alert("See you next time :)")
        }
    }
    else if (pacLife > 0)
    {
        Draw(direct);
        if (checkPacmanColisions()) {
            alert("You got eaten!");
            pacLife--;
            if (pacLife > 0) {
                Start();
            }
        }
    } else {
        alert("You lost :( try again");
        // interval = setInterval(null,0);
        clearInterval(interval);
        $(".gamePage").hide();
        initiateNewGame();
    }
}

function initiateNewGame() {
    var canvas = document.getElementById("canvas2");
    context.clearRect(0,0,canvas.width,canvas.height);
    score = 0;
    pacLife = 5;
    interval = null;
    $(".settingsPage").show();
}
/**---------------------MONSTERS------------------------------ */
var monsterShapeOne = new Object();
var monsterShapeTwo = new Object();
var monsterShapeThree = new Object();
var monsterShapeFour = new Object();

function initMonstersPositions() {
    if (numOfMonsters >= 1) {
        monsterShapeOne.i = 0;
        monsterShapeOne.j = 0;
    }
    if (numOfMonsters >= 2) {
        monsterShapeTwo.i = 0;
        monsterShapeTwo.j = 0;
    }
    if (numOfMonsters >= 3){
        monsterShapeThree.i = 0;
        monsterShapeThree.j = 0;
    }
    if (numOfMonsters >= 4) {
        monsterShapeFour.i = 0;
        monsterShapeFour.j = 0;
    }
}

function monstersStartMoving() {
    debugger;
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
}

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

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}



