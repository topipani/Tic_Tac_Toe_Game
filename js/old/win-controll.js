//check if the game ends or it has to be continued
var checkSteps = (playerClass) => {
    var currPlayerStepsPos = getPositionsInArr($('.' + playerClass))
    if (currPlayerStepsPos.length < props.tableSize) nextTurnSets()

    else if (isWinner(currPlayerStepsPos)) myAlerts("win")    //it is a win
    else if (isDraw()) myAlerts("draw")  //it is a draw
    else nextTurnSets() //continue game
}

//get positions for player
// { $elemList } - all JQuery elements for player
// { posList } - all drawn step's positions for player in arr
var getPositionsInArr = ($elemList) => {
    var posList = []
    $.each($elemList, (i, elem) => { posList.push($(elem).position()) })
    return posList
}

//check if there is a winner
var isWinner = (positions, size) => {
    if (!size)
        size = props.tableSize

    if (checkLines(positions, "top", size) || checkLines(positions, "left", size)) return true
    else if (isTopAndLeftSame(positions, size)) return true
    else if (isReverseDiagonal(positions, size)) return true
    else return false
}

//Check for win in lines
var checkLines = (positions, posType, size) => {
    var sortedPositions = sortPos(positions, posType)
    var sameNum = 1
    for (i = 0; i < sortedPositions.length; i++) {
        if (i == (sortedPositions.length-1)) return
        //are the element and the next one same?
        else if (sortedPositions[i][posType] == sortedPositions[i+1][posType]) sameNum += 1 //yes -> count it
        else sameNum = 1 // no -> start over the counting
    
        if (sameNum == size) return true  //it is a win
    }
}

//Check for win in diagonal
var isTopAndLeftSame = (positions, size) => {
    var posDiagonalTopToLeft = positions.filter(function (pos) {
      return pos.left == pos.top
    })
    return posDiagonalTopToLeft.length == size
}

//Check for win in reverse diagonal
var isReverseDiagonal = (positions, size) => {
    var allPosOption = getAllPosOption()
    var reverseDiagonals = 0
    positions.forEach(function (obj) {
        var index
        allPosOption.forEach(function (elem, i) {
            if (elem == obj.top) {
            index =  i
            return
            }
        })
        if (obj.left == allPosOption[allPosOption.length-index-1])
            reverseDiagonals +=1
    })
    return reverseDiagonals == size
}

//check if there is a draw
var isDraw = () => {
    return $('td').length == $(".played").length
}

//sort positions for given postype (top or left)
var sortPos = (positions, posType) => {
    return positions.sort(function (a, b) {
        return a[posType] - b[posType]
    })
}

//get all existing positions
var getAllPosOption = () => {
    var allPosList = getPositionsInArr($('td'))
    var posList = allPosList
                  .sort(function (a, b) { return a.top - b.top} )
                  .filter(function (elem, i, list) {
                    if (i == list.length-1) return elem.top != list[list.length-props.tableSize-1].top
                    else return elem.top != list[i+1].top
                  })
                  .map(function (elem) { return elem.top})
     return posList
}