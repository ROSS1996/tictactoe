const fields = document.getElementsByClassName('field');
const scores = document.getElementsByClassName('scoreCounter')
const turnDOM = document.getElementById('turn')
const resetBtn = document.getElementById('reset')

let turn = 1

let player1_score = 0
let player2_score = 0

let locked = false

for (const field of fields) {
    field.addEventListener('click', function () {
        changeField(this)
    })
}

resetBtn.addEventListener('click', function() {
    for (const field of fields) {
        field.innerText = ''
    }
    player1_score = 0;
    scores[0].innerText = player1_score
    player2_score = 0;
    scores[1].innerText = player2_score
    turn = 1
    turnDOM.innerHTML = 'Player X turn'
    locked = false
})

function changeField(element) {
    if (turn % 2 != 0 && element.innerText == '' && locked == false) {
        element.innerText = 'X';
        turnDOM.innerHTML = 'Player O turn'
    }
    else if (turn % 2 == 0 && element.innerText == '' && locked == false) {
        element.innerText = 'O';
        turnDOM.innerHTML = 'Player X turn'
    }
    if (turn > 2 && locked == false) {
        checkRows(element)
        checkColumns(element)
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
        let fieldCheck = []
        for (j = 0; j < 3; j++) {
            row.push(fields[i + j].innerText);
            fieldCheck.push(fields[i + j])
            if (j == 2) {
                checkWinner(element, row, fieldCheck)
            }
        }
    }
}

function checkColumns (element) {
    for (i = 0; i < 3; i++) {
        let columns = []
        let fieldCheck = []
        for (j = 0; j < 9 ; j += 3) {
            columns.push(fields[i+j].innerText)
            fieldCheck.push(fields[i + j])
            checkWinner(element, columns, fieldCheck)
        }
    }
}

function checkDiagonals(element) {
    let movements = []
    let fieldCheck = []
    for (i = 0; i < 9; i += 4) {
        movements.push(fields[i].innerText)
        fieldCheck.push(fields[i])
    }
    checkWinner(element, movements, fieldCheck)
    movements = []
    fieldCheck = []
    for (i = 6; i >= 2; i -= 2) {
        movements.push(fields[i].innerText)
        fieldCheck.push(fields[i])
    }
    checkWinner(element, movements, fieldCheck)
}

function checkWinner(element, movements, fieldCheck) {
    let winner = ''
    if (movements[0] != '' && movements[0] == movements[1] && movements[1] == movements[2]) {
        winner = movements[0]
        fieldCheck[0].classList.add('winner')
        fieldCheck[1].classList.add('winner')
        fieldCheck[2].classList.add('winner')
    }
    if (winner == 'X') {
        locked = true
        turnDOM.innerHTML = `Winner: Player X`
        player1_score++
        scores[0].innerText = player1_score
        setTimeout(function () { clearFields(element, fieldCheck) }, 1500);
        locked = true
    }
    else if (winner === 'O') {
        locked = true
        turnDOM.innerHTML = `Winner: Player O`
        player2_score++
        scores[1].innerText = player2_score
        setTimeout(function () { clearFields(element, fieldCheck) }, 1500);
    }
}

function checkFields(element) {
    for (const field of fields) {
        if (field.innerText === '') {
            return false
        }
    }
    return true
}

function clearFields(element, fieldCheck=undefined) {
    for (const field of fields) {
        field.innerText = ''
    }
    if (fieldCheck != undefined) {
        for (const field of fieldCheck) {
            field.classList.remove('winner')
        }
    }
    turn = 1
    turnDOM.innerHTML = 'Player X turn'
    locked = false
}