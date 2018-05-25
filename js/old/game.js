var endOfGame = false
//One of the pllayers is the computer and it starts the game
//computer is red (1)
//First it will draw its step
var botStartsGame = () => {
    player = props.botPlayer
    var tableSizeHalf = Math.floor(props.tableSize/2)
    var botFirstStepNum = tableSizeHalf * props.tableSize + tableSizeHalf
    drawStep($($('td')[botFirstStepNum]))
}

//in case the player is human it draws the clicked step
//get clicked element and draw step
// { $element } - the clicked td
var tdClick = ($element) => {
    $element.click(function () {
        removeClickEvent($('td'))
        drawStep($(this))
    })
}

//remove click event listener
//after a step can not step more during computer turn
var removeClickEvent = ($elements) => { $elements.unbind('click') }

//add click event listener to all goven element (for example: to "empty" claased tds)
// { $elements } - jQuery elements' list
            //  addClickEvent($('td.empty'))
var addClickEvent = ($elements) => { $elements.click(tdClick($elements)) }

//add background img + add information about it is already used
//remove empty class from played td
var drawStep = ($element) => {
    if (endOfGame && props.botPlayer == 1)
        player = -1
    endOfGame = false
    var playerClass = givePlayerClass(player)
    $element.addClass(playerClass + ' played')
    $element.removeClass('empty')
    checkSteps(playerClass, player)
}

//returns by the good class, which has to be drawn
var givePlayerClass = (player) => { return (player > 0) ? 'playerRed' : 'playerBlue' }

//returns by the next player's code (1 / -1)
var changePlayer = (player) => { return player *= (-1) }

//It sets the next player's parameters
var nextTurnSets = () => {
    player = changePlayer(player)
    if (playerIsBot())
        botTurn()
    else
        addClickEvent($('.empty'))
}

var setUpNewTable = () => {
    $('table').remove()
    drawPlayground(props.tableSize)
    player = 1
}

var playerIsBot = () => {
    return props.bot && (player == props.botPlayer)
}