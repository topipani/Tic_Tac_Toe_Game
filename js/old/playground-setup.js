var props;
var player;

//click event listener on choosed button:
// - hide data page
// - set up playground
var setUpGame = () => {
    $('.choosingPlayer').click(function () {
        props = getGameStartProps($(this))
        drawPlayground(props.tableSize)
        $('#giveData').hide()   //hide data div
        $('#playground-controll').show()    //show playground's div
    })
}

//get the given data
// { $element } - clicked element
// { tableSize } - given number of game size
// { choosedPlayer } - blue (-1) or red (1)
var getGameStartProps = ($element) => {
    //var tableSize = parseInt($('#size').val())
    var choosedPlayer = parseInt($element.attr('id'))
    player = choosedPlayer
    var name1 = $('#name1').val()

    return {
        tableSize: 3,
        choosedPlayer: choosedPlayer,
        bot: true,
        botPlayer: changePlayer(choosedPlayer),
        name1: name1,
        name2: "Gyula"
    }
}

//draw playground on
// { size } - given number of game size
var drawPlayground = (size) => {
    $("#playground-controll").append("<table>")
    makeRows(size)
    if (props.bot && props.choosedPlayer == -1)
        botStartsGame()
}

//draw table rows
// { size } - given number of game size
var makeRows = (size) => {
    for (i = 0; i < size; i++) {
        $("#playground-controll table").append('<tr>')
        makeCells(size)
    }
}

//draw table cells per row and add class' name "empty"
//add click event listener to created cell
// { size } - given number of game size
var makeCells = (size) => {
    for (var j = 0; j < size; j++) {
        $("#playground-controll table tr").last().append('<td class="empty">')
        if (props.choosedPlayer == 1 || !props.bot)
            tdClick($('td').last())
    }
}

