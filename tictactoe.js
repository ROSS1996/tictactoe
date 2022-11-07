const fields = document.getElementsByClassName('field');
const scores = document.getElementsByClassName('scoreCounter')
const turnDOM = document.getElementById('turn')

let turn = 1

let player1_score = 0
let player2_score = 0

let locked = false

for (const field of fields) {
    field.addEventListener('click', function () {
        changeField(this)
    })
}

function changeField(element) {
    if (turn % 2 != 0 && element.innerText == '' && locked == false) {
        element.innerText = 'X';
        turnDOM.innerHTML = 'Player 2 turn'
    }
    else if (turn % 2 == 0 && element.innerText == '' && locked == false) {
        element.innerText = 'O';
        turnDOM.innerHTML = 'Player 1 turn'
    }
    if (turn > 2 && locked == false) {
        checkRows(element)
        checkDiagonals(element)
    }
    if (checkFields(element) == true) {
        setTimeout(function () { clearFields(element) }, 1500);
    }
    turn++
}

function checkRows(element) {
    for (i = 0; i < 9; i += 3) {
        let row = []
        for (j = 0; j < 3; j++) {
            row.push(fields[i + j].innerText);
            if (j == 2) {
                checkWinner(element, row)
            }
        }
    }
}

function checkDiagonals(element) {
    let movements = []
    for (i = 0; i < 9; i += 4) {
        movements.push(fields[i].innerText)
    }
    checkWinner(element, movements)
    movements = []
    for (i = 6; i >= 2; i -= 2) {
        movements.push(fields[i].innerText)
    }
    checkWinner(element, movements)
}

function checkWinner(element, movements) {
    let winner = ''
    if (movements[0] != '' && movements[0] == movements[1] && movements[1] == movements[2]) {
        winner = movements[0]
    }
    if (winner == 'X') {
        locked = true
        turnDOM.innerHTML = `Winner: Player 1`
        player1_score++
        scores[0].innerText = player1_score
        setTimeout(function () { clearFields(element) }, 1500);
        locked = true
    }
    else if (winner === 'O') {
        locked = true
        turnDOM.innerHTML = `Winner: Player 2`
        player2_score++
        scores[1].innerText = player2_score
        setTimeout(function () { clearFields(element) }, 1500);
    }
}

/*
function checkColumns (element) {
    for (i = 0; i < 9; i += 3) {
        console.log(`coluna ${i}`)
        let columns = []
        for (j = 0; j < 3 ; j ++) {
            console.log(`${fields[i+j].id} : ${fields[i+j].innerText}`)
            columns.push(fields[i+j].innerText)
            //console.log(`I: ${i} | J: ${j}`)

        }
        console.log(`I: ${i} | J: ${j}`)
        console.log(`Ola ${i+j}: ${columns}`)
        if (j == 2) {
            if (columns[0] == columns[1] && columns[1] == columns[2]) {
                winner = row[0]
            }
        }
    }
}
*/

function checkFields(element) {
    for (const field of fields) {
        if (field.innerText === '') {
            return false
        }
    }
    return true
}

function clearFields(element) {
    for (const field of fields) {
        field.innerText = ''
    }
    turn = 1
    turnDOM.innerHTML = 'Player 1 turn'
    locked = false
}