const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let current;
let gameGrid;

const winnigPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];



//for initialization of the game

function initGame(){
    current = 'x';
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    
    gameinfo.innerText = `Current player - ${current}`;

    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents= "all";
        // to remove the background color after a new game
        boxes[index].classList.remove("win");

        //instead of above code we can also write this code

        // box.classList = `box box${index+1}`;


             

    });
}

initGame();

function swapTurn(){
    if(current === "x"){
        current = 'o';
    }
    else
    current = "x";

    gameinfo.innerText = `Current player - ${current}`;  // to change in UI
}


function checkGameOver(){
    let answer = "";

    winnigPositions.forEach((position)=>{
        //gridGame ke pass sab values hai so we check this condition
        if((gameGrid[position[0]] !== "" ) && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]]=== "x")
            answer = "x";
            else
            answer = "o";


            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //changing the color of wining position

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }
    })
    //to declare the winner of the game
    if(answer !== ""){
        gameinfo.innerText = `Winner player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // condition for tie
    let fillcount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        fillcount++;
    });

    if(fillcount === 9){
        gameinfo.innerText = `Game Tied :)`;
        newGameBtn.classList.add("active");
    }


}

function handleClick(index){
    newGameBtn.classList.add("active");
    if(gameGrid[index]===""){
        boxes[index].innerText = current; //ye UI me change karta hai
        gameGrid[index] = current; // ye gameGrid array ka value change karta hai
        boxes[index].style.pointerEvents = "none";

        swapTurn();

        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
        

    })
});

newGameBtn.addEventListener("click",initGame);