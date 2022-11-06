const fields = document.getElementsByClassName('field');

const turnDOM = document.getElementById('turn')
let turn = 1

for (const field of fields) {
    field.addEventListener('click', function () {
        changeField(this)
    })
}

function changeField (element) {
    if (turn % 2 == 0 && element.innerText == '') {
        element.innerText = 'X';
        turnDOM.innerHTML = 'Player 2 turn'
    }
    else if (turn % 2 != 0 && element.innerText == '') {
        element.innerText = 'O';
        turnDOM.innerHTML = 'Player 1 turn'
    }
    if (turn > 2) {
        winner = checkRows()
        if (winner == 'X' || winner == 'O') {
            console.log(`Winner: ${winner}`)
            setTimeout( function () {clearFields(element)}, 1500);
        }
    }
    if (checkFields(element) == true) {
        setTimeout( function () {clearFields(element)}, 1500);
    }
    turn++
}

function checkFields (element) {
    for (const field of fields) {
        if (field.innerText === '')
        {
            return false
        }
    }
    return true
}

function clearFields (element) {
    console.log(checkRows())
    for (const field of fields) {
        field.innerText = ''
    }
    turn = 1
    turnDOM.innerHTML = 'Player 1 turn'
}

function checkRows (element) {
    for (i = 0; i < 9; i += 3) {
        let row = []
        for (j = 0; j < 3 ; j++) {
            row.push(fields[i+j].innerText);
            if (j == 2) {
                //console.log(row)
                if (row[0] == row[1] && row[1] == row[2]) {
                    return `${row[0]}`
                }
            }
        }
    }
}

function checkColumns (element) {
    for (i = 0; i < 3; i++) {
        console.log(`coluna ${i+1}`)
        for (j = 0; j < 9 ; j += 3) {
            console.log(`${fields[i+j].id} : ${fields[i+j].innerText}`)
        }
    }
}

function checkDiagonals (element) {
    console.log('Diagonal Direita')
    for (i = 0; i < 9; i += 4 ) {
        console.log(`${fields[i].id} : ${fields[i].innerText}`);
    }
    console.log('Diagonal Esquerda')
    for (i = 8; i >= 0; i -= 4 ) {
        console.log(`${fields[i].id} : ${fields[i].innerText}`);
    }
}

