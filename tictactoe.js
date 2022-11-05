const fields = document.getElementsByClassName('field');

let turn = 0

for (const field of fields) {
    field.addEventListener('click', function () {
        changeField(this)
    })
}


function changeField (element) {
    if (turn == 0 && element.innerText == '') {
        element.innerText = 'X';
        turn = 1;
    }
    else if (turn == 1 && element.innerText == '') {
        element.innerText = 'O';
        turn = 0;
    }
    if (checkFields(element) == true) {
        setTimeout( function () {clearFields(element)}, 1500);
    }
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
    for (const field of fields) {
        field.innerText = ''
    }
}