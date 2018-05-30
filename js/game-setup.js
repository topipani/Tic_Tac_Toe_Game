//import './node_modules/@types/jquery/index.d';

let props = {
    playerNum: 1,
    name1: "dakljf",
    bot: true,
    name2: "bot",
    player: "blue"
};

let player = 'red';

let steps = {
    red: [],
    blue: []
};

let nextPlayer = () => {
    player = (player == 'red') ? 'blue' : 'red';
}

let getPos = ($element) => {
    let tableBodyPos = $('.playground > tbody').position();
    let pos = {
        top: $element.position().top - tableBodyPos.top,
        left: $element.position().left - tableBodyPos.left
    }

    return pos;
}

let drawStep = ($currElement, currPlayer) => {
    $currElement.addClass(currPlayer);
}

const step = (e) => {
    let promise = new Promise((resolve, reject) => {
        let $clicked = $(e.currentTarget);
        steps[player].push(getPos($clicked));
        drawStep($clicked, player);
        $clicked.off('click');
        resolve(true);
    });
    return promise;
};

let stepConstructor = (e) => {
    //TODO: nincs lekezelve, ha nyert (checkWin true-val ter vissza, a kovetkezo utani then-nel mi legyen, most nextPlayer kovetkezik)
    step(e)
        .then((r) => { return checkWin(); })
        .then((r) => {
            if (r) {
                end(player, 'win');
            } else {
                return checkEqual();
            }
        })
        .then((r) => {
            if (r) {
                end(player, 'equal');
            } else {
                nextPlayer();
            }
        });
}
let checkEqual = () => {
    let promise = new Promise((resolve, reject) => {
        return resolve(steps.blue.concat(steps.red).length === $('.playground td').length);
    });
    return promise;
}

let checkWin = () => {
    let promise = new Promise((resolve, reject) => {
        let currPlayerSteps = steps[player];
        if (currPlayerSteps.length < 3) {
            return resolve(false);
        } else {
            let posProps = ['top', 'left'];
            posProps.forEach((prop) => {
                let sortedArr = sortByObjProp(currPlayerSteps, prop);
                if (checkStraights(sortedArr, prop)) {
                    resolve(true);
                }
            });
            if (checkDiagonal(sortByObjProp(currPlayerSteps, 'top'), 'top', 'left')) {
                resolve(true);
            }
        }
        resolve(false);
    });
    return promise;
}

let sortByObjProp = (arr, prop) => {
    return arr.sort(function (a, b) {
        return a[prop] - b[prop];
    });
}

let checkStraights = (arr, posProp) => {
    let checklist = [];
    let win = false;

    arr.forEach((el, i, arr) => {
        if (i == 0 || arr[i][posProp] == arr[i - 1][posProp]) {
            checklist.push(arr[i]);
            win = isWinner(win, checklist);
        } else {
            checklist = [];
            checklist.push(arr[i]);
        }
    });
    return win;
}

let getMaxPos = (arr) => {
    let arrPos = arr.map((i, e) => { return getPos($(e)) });
    return sortByObjProp(arrPos, 'top')[arrPos.length - 1].top;
}

let checkDiagonal = (arr, prop, prop2) => {
    let maxPos = getMaxPos($('td'));
    let checklistA = [];
    let checklistB = [];
    let win = false;
    arr.forEach((el, i, arr) => {
        if (i === 0 || (el[prop] !== arr[i - 1][prop] && el[prop] === el[prop2])) {
            checklistA.push(el);
            win = isWinner(win, checklistA);
        }
        if (el[prop] + el[prop2] === maxPos) {
            checklistB.push(el);
            win = isWinner(win, checklistB);
        }
    })
    return win;
}

let isWinner = (win, arr) => {
    if (win == true || arr.length > 2) {
        return true;
    }

    return false;
}

let winConstructor = (player) => {
    $('#info').text('You have won ' + player);
    $('#info').addClass('info');
    $('.info-window').show();
}
let end = (player, type) => {
    let text;
    if (type == 'equal') {
        text = 'It\'s a draw!';
    } else if (type == 'win' ) {
        text = 'You won ' + player;
    }
    $('#info').text(text);
    $('#info').addClass('info');
    $('.info-window').show();
}

let newGame = () => {
    $("#playground-container td").removeClass();
    $("#playground-container td").off("click").on('click', stepConstructor);
    $('.info-window').hide();
    steps.red = [];
    steps.blue = [];
    player = 'red';
}