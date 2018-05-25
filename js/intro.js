var introStartSetTime = () => {
    setTimeout(function () {
        handleElementHide($('#intro-welcome'), $('#intro-player-num'))
        setTimeout(function () {
            handleElementHide($('#intro-welcome'), $('#alone-input'))
            addInput($('#alone-container'), '<input type="text" id="alone-input" maxlength="1" autofocus>', 'playernum')
        }, 4000)
    }, 4000)
    
}

var handleElementHide = ($hide, $show) => {
    $hide.hide()
    $show.show()
}

var addInput = ($container, input, method) => {
    $container.append(input)
    var inputId = '#' + $(input).attr('id')
    $(inputId).focus()
    inputKeyup($(inputId), method)
}

var inputKeyup = ($elem, method) => {
    if (method == 'playernum')
        handlePlayerNum($elem)
    else if (method == 'name-1')
        handleName1($elem)
    else if (method == 'name-2')
        handleName2($elem) 
}

var playerNumSave = (playerNum) => {
    props.playerNum = playerNum
    handleElementHide($('#intro-player-num'), $('#intro-name-1'))
    setTimeout(function () {
        addInput($('#intro-name-1-container'), '<input type="text" id="name-1" maxlength="6" autofocus>', 'name-1')
    }, 4000)
}

var handlePlayerNum = ($elem) => {
    $elem.keyup(function () {
        var letter = $(this).val().toLowerCase()
        if (letter == "y")
            playerNumSave(1)
        else if (letter == "n")
            playerNumSave(2)
        else
            this.value = ""
    })
}

var handleName1 = ($elem) => {
    $elem.keyup(function (keyEvent) {
        if (keyEvent.keyCode == 13)
            saveName1($elem.val())
    })
}

var handleName2 = ($elem) => {
    $elem.keyup(function (keyEvent) {
        if (keyEvent.keyCode == 13)
            saveName2($($elem).val())
    })
}
var saveName1 = (name1) => {
    props.name1 = name1
    if (props.playerNum == 1) {
        props.bot = true
        props.name2 = "bot"
        handleElementHide($('.typewriter-content'), $('#side-chooser-container'))
        matrixScreen()
    }
    else {
        handleElementHide($('#intro-name-1'), $('#intro-name-2'))
        setTimeout(function () {
            addInput($('#intro-name-2-container'), '<input type="text" id="name-2" maxlength="6" autofocus>', 'name-2')
        }, 4000)
    }
}

var saveName2 = (name2) => {
    props.name2 = name2
    handleElementHide($('.typewriter-content'), $('#side-chooser-container'))
    matrixScreen()
}

matrixScreen = () => {
    var q = document.getElementById('q')
    var s = window.screen;
    var width = q.width = s.width;
    var height = q.height = s.height;
    var letters = Array(256).join(1).split('');
    var draw = function () {
        q.getContext('2d').fillStyle='rgba(0,0,0,.05)';
        q.getContext('2d').fillRect(0,0,width,height);
        q.getContext('2d').fillStyle='#0F0';
        letters.map(function(y_pos, index){
            text = String.fromCharCode(3e4+Math.random()*33);
            x_pos = index * 10;
            q.getContext('2d').fillText(text, x_pos, y_pos);
            letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
        });
    };
    setInterval(draw, 33);
}