//check, if other player has somewhere win for next step
//get the best step for winning


//nézze végig az összes lépésre, hogy nyerhet-e
//előszőr beadja a win-controll.js-nek a másik játékos pozícióit megtoldva az 1. aztán a 2. ... üres hellyel,
//  ha valamelyikkel nyerő lenne, oda rakja
//  aztán ugyenzt megteszi a sajátjaival, 
//ha nincs egyiknél sem nyerő - ?

var botTurn = () => {
    var botWinStep = checkPlayerWinStep(player)
    var isWinnerStep = botWinStep ? botWinStep : checkPlayerWinStep(changePlayer(player))
    var step = isWinnerStep ? isWinnerStep : bestStep(player)
    drawStep(step)
}

var checkPlayerWinStep = (currP, size) => {
    var currPClass = givePlayerClass(currP)
    var currPPos = getPositionsInArr($('.' + currPClass))
    var stepPossibilities = getPositionsInArr($('.empty'))

    var i = 0
    var examinedPos = currPPos.concat(stepPossibilities[i])

    while(i < stepPossibilities.length && !isWinner(examinedPos, size)) {
        i++
        examinedPos = currPPos.concat(stepPossibilities[i])
    }

    if (i < stepPossibilities.length)
        return $($('.empty')[i])
    else
        return false
}

var bestStep = (ply) => {
    var size = props.tableSize-1
    return $($('.empty')[0])

/*     while(size >= 0) {
        var step = checkPlayerWinStep(ply, size)
        console.log(step)
        console.log(size)
        if (step)
            return step
        size--
    } */
}

