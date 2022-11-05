const fields = document.getElementsByClassName('field');

let turn = 0

for (const field of fields) {
    field.addEventListener('click', function () {
        changeField(this)
    })
}


function changeField (element) {
    if (turn == 0) {
        element.innerText = 'X';
        turn = 1;
    } else {
        element.innerText = 'O';
        turn = 0;
    }
}