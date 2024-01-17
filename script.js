let buttons = document.querySelectorAll('.board button');
let move = 0;
let botRow;
let botColumn;
let winDiv = document.querySelector('.win');
let winTxt = document.querySelector('#winTxt');
let invalidMove = document.querySelector('#invalid');
let resetBtn = document.querySelector('#reset');
let plrWinsTxt = document.querySelector('#plrWins');
let botWinsTxt = document.querySelector('#botWins');
let tiesTxt = document.querySelector('#ties');

let loadCont = document.querySelector('.load');
let loadingBar = document.querySelector('.loading');

let row;
let column;

let botButton;
let time;
let thinking = false;
let resetting = false;
let Won;

let winLoss;

let plrWins = 0;
let botWins = 0;
let ties = 0;

let randNum;
let counter;

let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function block(){
    row = parseInt(row);
    column = parseInt(column);
    counter = 0;
    do{
        randNum = Math.floor(Math.random() * 8) + 1;
        switch(randNum){
            case 1:
                if(column-1 >= 0 && row-1 >= 0 && board[row-1][column-1] == ' '){
                    return [row-1, column-1];
                }
                counter++;
                break;
            case 2:
                if(row-1 >= 0 && board[row-1][column] == ' '){
                    return [row-1, column];
                }
                counter++;
                break;
            case 3:
                if(row-1 >= 0 && column+1 <= 2 && board[row-1][column+1] == ' '){
                    return [row-1, column+1];
                }
                counter++;
                break;
            case 4:
                if(column+1 <= 2 && board[row][column+1] == ' '){
                    return [row, column+1];
                }
                counter++;
                break;
            case 5:
                if(column-1 >= 0 && board[row][column-1] == ' '){
                    return [row, column-1];
                }
                break;
            case 6:
                if(column-1 >= 0 && row+1 <= 2  && board[row+1][column-1] == ' '){
                    return [row+1, column-1];
                }
                counter++;
                break;
            case 7:
                if(row+1 <= 2 && board[row+1][column] == ' '){
                    return [row+1, column];
                }
                counter++;
                break;
            case 8:
                if(column+1 <= 2 && row+1 <= 2 && board[row+1][column+1] == ' '){
                    return [row+1, column+1];
                }
                counter++;
                break;
        }
    }while(counter < 8);

    return null;
}

function possibleWin(symbolCheck) {
    for(let i = 0; i < 3; i++){
        if(board[i][0] === board[i][1] && board[i][1] === symbolCheck && board[i][2] === ' '){
            return [i, 2];
        }
        if(board[i][1] === board[i][2] && board[i][2] === symbolCheck && board[i][0] === ' '){
            return [i, 0];
        }
        if(board[i][0] === board[i][2] && board[i][2] === symbolCheck && board[i][1] === ' '){
            return [i, 1];
        }
        if(board[0][i] === board[1][i] && board[1][i] === symbolCheck && board[2][i] === ' '){
            return [2, i];
        }
        if(board[1][i] === board[2][i] && board[2][i] === symbolCheck && board[0][i] === ' '){
            return [0, i];
        }
        if(board[0][i] === board[2][i] && board[2][i] === symbolCheck && board[1][i] === ' '){
            return [1, i];
        }
    }

    if(board[0][0] === board[1][1] && board[1][1] === symbolCheck && board[2][2] === ' '){
        return [2, 2];
    }
    if(board[1][1] === board[2][2] && board[2][2] === symbolCheck && board[0][0] === ' '){
        return [0, 0];
    }
    if(board[0][0] === board[2][2] && board[2][2] === symbolCheck && board[1][1] === ' '){
        return [1, 1];
    }
    if(board[0][2] === board[1][1] && board[1][1] === symbolCheck && board[2][0] === ' '){
        return [2, 0];
    }
    if(board[1][1] === board[2][0] && board[2][0] === symbolCheck && board[0][2] === ' '){
        return [0, 2];
    }
    if(board[0][2] === board[2][0] && board[2][0] === symbolCheck && board[1][1] === ' '){
        return [1, 1];
    }
    return null;
}


function reset(){
    winTxt.textContent = '';
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            board[i][j] = ' ';
        }
    }
    buttons.forEach(function(button){
        button.textContent = '';
        button.classList.remove('winner');
        button.classList.remove('loser');
        button.classList.remove('selected');
    });
    resetting = false;
}

function highlight(row1, col1, row2, col2, row3, col3, symbol){
    if(symbol == 'X'){
        winLoss = 'winner';
    }
    else{
        winLoss = 'loser';
    }
    document.getElementById(row1 + ' ' + col1).classList.add(winLoss);
    document.getElementById(row2 + ' ' + col2).classList.add(winLoss);
    document.getElementById(row3 + ' ' + col3).classList.add(winLoss);
}

function checkWin(){
    for (let i = 0; i < 3; i++){
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] !== ' '){
            highlight(i, 0, i, 1, i, 2, board[i][0]);
            return [1, board[i][0]];
        }
        if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] !== ' '){
            highlight(0, i, 1, i, 2, i, board[0][i]);
            return [1, board[0][i]];
        }
    }

    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] !== ' '){
        highlight(0, 0, 1, 1, 2, 2, board[0][0]);
        return [1, board[0][0]];
    }
    if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] !== ' '){
        highlight(0, 2, 1, 1, 2, 0, board[0][2]);
        return [1, board[0][2]];
    }
    return [0, 0];
}


function win(){
    if(resetting){
        return;
    }
    let win = checkWin();
    if(win[0]){
        if(win[1] == 'X'){
            plrWins += 1;
            winTxt.style.color = '#3E9130';
            winTxt.textContent = 'PLAYER (X) WINS';
            Won = 1;
        }
        else{
            botWins += 1;
            winTxt.style.color = 'red';
            winTxt.textContent = 'BOT (O) WINS';
        }
        move = 10;
    }
}

function winsTxt(){
    plrWinsTxt.textContent = plrWins;
    tiesTxt.textContent = ties;
    botWinsTxt.textContent = botWins;
}

function afterMatch(){
    if(resetting){
        return;
    }
    if(move === 9){
        winTxt.textContent = 'TIE';
        ties += 1;
        winTxt.style.color = '#ffffff';
    }

    if(move === 9 || move === 10){
        resetting = true;
        winsTxt();
        loadCont.style.visibility = 'visible';
        loadingBar.style.width = '100%';

        setTimeout(function(){
            loadCont.style.visibility = 'hidden';
            loadingBar.style.width = '0%';
            winTxt.style.color = '#ffffff';
            
            reset();
            Won = 0;
            setTimeout(function(){
                winTxt.textContent = 'New Round';
            }, 0);
            setTimeout(function(){
                resetting = false;
                move = 0;
            }, 500);

            setTimeout(function(){
                winTxt.textContent = '';
            }, 4000);
        }, 3000);
    }
    console.log(move);
}

buttons.forEach(function(button){
    button.addEventListener('click', function(){
        if(!thinking){
            [row, column] = button.id.split(' ');
            if(move < 9){
                if(board[row][column] == ' '){
                    invalidMove.style.visibility = 'hidden';
                    button.textContent = 'X'
                    board[row][column] = 'X'
                    button.classList.add('selected');
                    move++;
                    win();
                    if(move < 9){
                        time = Math.random()*1500;
                        thinking = true;
                        console.log(time);
                        setTimeout(function(){
                            if(possibleWin('O') != null){
                                console.log("O HAS WIN ON: " + possibleWin('O'));
                                moveBOT = possibleWin('O');
                                board[moveBOT[0]][moveBOT[1]] = 'O';
                                botButton = document.getElementById(moveBOT[0] + ' ' + moveBOT[1]);
                                botButton.textContent = 'O';
                            }
                            else{
                                if(possibleWin('X') != null){
                                    console.log("X HAS WIN ON: " + possibleWin('X'));
                                    moveBOT = possibleWin('X');
                                    board[moveBOT[0]][moveBOT[1]] = 'O';
                                    botButton = document.getElementById(moveBOT[0] + ' ' + moveBOT[1]);
                                    botButton.textContent = 'O';
                                }
                                else{
                                    console.log(block());
                                    if(block() != null){
                                        console.log("Blocking...");
                                        moveBOT = block();
                                        board[moveBOT[0]][moveBOT[1]] = 'O';
                                        botButton = document.getElementById(moveBOT[0] + ' ' + moveBOT[1]);
                                        botButton.textContent = 'O';
                                    }
                                    else{
                                        do{
                                            botRow = Math.floor(Math.random()*3);
                                            botColumn = Math.floor(Math.random()*3);
                                        }while(board[botRow][botColumn] != ' ');
                                        botButton = document.getElementById(botRow + ' ' + botColumn);
                                        botButton.textContent = 'O'
                                        board[botRow][botColumn] = 'O'
                                    }
                                }
                            }
                            botButton.classList.add('selected');
                            move++;
                            thinking = false;
                            win();
                        },time);
                    }
                }
                else{
                    winTxt.textContent = '';
                    invalidMove.style.visibility = 'visible';
                    setTimeout(function(){
                        invalidMove.style.visibility = 'hidden';
                    }, 500);
                }
            }
            if(Won || move == 9){
                afterMatch()
            }
            else{
                setTimeout(function(){
                    afterMatch();
                }, time+0.01);
            }
        }
    });
});