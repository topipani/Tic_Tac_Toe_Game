import '../node_modules/@types/jquery/index.d';

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
    /* console.log('2'); */
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

/* let step = (e, callback) => {
    let $clicked = $(e.currentTarget);
    steps[player].push(getPos($clicked));
    $clicked.unbind('click');
    drawStep($clicked, player);

    //   setTimeout(function() {
    //      console.log('1')
      },500) 
    callback();
}
 */

const step = (e) => {
    return new Promise((resolve, reject) => {
        console.log(steps);
        let $clicked = $(e.currentTarget);
        if (!$clicked.hasClass('red') || !$clicked.hasClass('red')) {
            steps[player].push(getPos($clicked));
        }
        $clicked.unbind('click');
        drawStep($clicked, player);
        resolve();
    });
};

let stepConstructor = (e, callback) => {
    step(e).then(checkWin).then(nextPlayer);
}

let checkWin = () => {
    console.log(steps);
    let currPlayerSteps = steps[player];
    if (currPlayerSteps.length < 3) {
        return;
    } else {
        let posProps = ['top', 'left'];
        posProps.forEach((prop) => {
            let sortedArr = sortByObjProp(currPlayerSteps, prop);
            if (checkStraights(sortedArr, prop)) {
                winConstructor(player);
            }
        });
        if (checkDiagonal(sortByObjProp(currPlayerSteps, 'top'), 'top', 'left')) {
            winConstructor(player);
        }
    }
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
        }
    });
    return win;
}

let checkDiagonal = (arr, prop, prop2) => {
    let checklistA = [];
    let checklistB = [];
    let win = false;
    arr.forEach((el, i, arr) => {
        if (i == 0 || (el[prop] !== arr[i - 1][prop] && el[prop] == el[prop2])) {
            checklistA.push(el);
            win = isWinner(win, checklistA);
        }
        if (i == 0 || el[prop] + el[prop2] == arr[2][prop]) {
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


let newGame = () => {
    $("#playground-container td").removeClass();
    $("#playground-container td").click(stepConstructor);
    $('.info-window').hide();
    steps.red = [];
    steps.blue = [];
    player = 'red';
    console.log('----------------clear----------------');
    console.log(steps)
}