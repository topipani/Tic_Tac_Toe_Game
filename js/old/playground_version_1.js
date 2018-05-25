var tableSize
var player
var playerClass
var playerName
var it
// var endOfGame = false

//after choosing player set up playground
var drawPlayGround = (size) => {
   $('#giveData').hide()
   $('#playground-controll').show()
   $("#playground-controll").append("<table>")
   if (makeRows(size) == true) {
     $('td').addClass('empty')
     if (choosedPlayer == '1') {
       player = 1
       tdClick()
     } else {  //red = 1
       player = 1
       computerStep()
       tdClick()
     }
   }
}

//set up the choosed numbered of table rows
var makeRows = (size) => {
  for (i = 0; i < size; i++) {
    $("#playground-controll table").append('<tr>')
    makeCells(size)
  }
  return true
}
//set up the choosed numbered of table cells
var makeCells = (size) => {
  for (var j = 0; j < size; j++) {
     $("#playground-controll table tr").last().append('<td>')
   }
}

var tdClick = () => {
  $("td").click(function () {
    drawStepAndNext($(this))
    // endOfGame = false
    setTimeout(function() {
      checkSteps(playerClass)
      changePlayer()
      // if (!endOfGame)
        computerStep()
    }, 5)
  })
}

var drawStepAndNext = (elem) => {
  playerClass = (player > 0) ? 'playerRed' : 'playerBlue'
  elem.addClass(playerClass) //add background img
  elem.addClass('played') //add information about it is already used
  elem.removeClass('empty') //remove empty class from played td
  elem.unbind('click') //remove event listener from current td
}

var computerStep = () => {
  drawStepAndNext($($('.empty')[0]))
  checkSteps(playerClass)
  changePlayer()
}

var changePlayer = () => { player *= (-1) }

//get positions for player
var getPositionsInArr = ($elemList) => {
  var posList = []
  $.each($elemList, (i, elem) => { posList.push($(elem).position()) })
  return posList
}

var checkSteps = (playerClass) => {
  var currPlayerStepsPos = getPositionsInArr($('.' + playerClass))
  if (currPlayerStepsPos.length < tableSize) return

  if (isWinner(currPlayerStepsPos)) gameAlert("win")
  else if (isDraw()) gameAlert("draw")  //it is a draw
}

//------------------------------------ check wins -----------------------------------
var isWinner = (positions) => {
  if (checkLines(positions, "top") || checkLines(positions, "left")) return true
  else if (isTopAndLeftSame(positions)) return true
  else if (isReverseDiagonal(positions)) return true
}

var checkLines = (positions, posType) => {
  var sortedPositions = sortPos(positions, posType)
  var sameNum = 1
  for (i = 0; i < sortedPositions.length; i++) {
    if (i == (sortedPositions.length-1)) return
    //are the element and the next one same?
    else if (sortedPositions[i][posType] == sortedPositions[i+1][posType]) sameNum += 1 //yes -> count it
    else sameNum = 1 // no -> start over the counting

    if (sameNum == tableSize) return true  //it is a win
  }
}

var isTopAndLeftSame = (positions) => {
  var posDiagonalTopToLeft = positions.filter(function (pos) {
    return pos.left == pos.top
  })
  return posDiagonalTopToLeft.length == tableSize
}

var isReverseDiagonal = (positions) => {
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
  return reverseDiagonals == tableSize
}

var sortPos = (positions, posType) => {
  return positions.sort(function (a, b) {
    return a[posType] - b[posType]
  })
}
//----------------------------------- / check wins -----------------------------------
//------------------------------------ all positions ---------------------------------
var getAllPosOption = () => {
  var allPosList = getPositionsInArr($('td'))
  var posList = allPosList
                .sort(function (a, b) { return a.top - b.top} )
                .filter(function (elem, i, list) {
                  if (i == list.length-1) return elem.top != list[list.length-tableSize-1].top
                  else return elem.top != list[i+1].top
                })
                .map(function (elem) { return elem.top})
   return posList
}
//----------------------------------- / all positions --------------------------------
//------------------------------------ check draw ------------------------------------
var isDraw = () => {
  return $('td').length == $(".played").length
}
//----------------------------------- / check draw -----------------------------------
// ------------------------------------ alerts ---------------------------------------
var gameAlert = (type) => {
  if (type == "win") {
    alert(playerClass + " - Tú eres fantastico! Congratulaciones!")
    reloadIt()
  }
  else if (type == "loose") {
    alert(playerClass + " - Perdedor :(")
    reloadIt()
  }
  else if (type == "draw") {
    alert(playerClass + " - Empetar!")
    reloadIt()
  }
}
// ------------------------------ / end: / alerts -----------------------------------
//-------------------------- check html inputs' value -------------------------------
$(document).ready(function () {
  disableButtons(true)
  $('#size').keyup(function () {
    inputValidate($(this), $(this).attr('type'))
  })
})

var inputValidate = (element, type) => {
  if (type == "number") {
    validateNum(element)
  }
}

var checkMaxMin = (val, min, max) => { return parseInt(val) >= parseInt(min) && parseInt(val) <= parseInt(max) }
var validateNum = (element) => {
  if (!checkMaxMin(element.val(), element.attr('v-data-min'), element.attr('v-data-max')))
    validateErrorTexts(element, true, "3 és 12 közötti számot tudsz csak megadni!")
  else
    validateErrorTexts(element, false)
}
var validateErrorTexts = (element, isError, errorText) => {
  if (isError) {
    disableButtons(true)
    $(element.parent().children('.v-error-text')).text(errorText)
  }
  else {
    disableButtons(false)
    $(element.parent().children('.v-error-text')).text("")
  }
}
//------------------------- / check html input's value ------------------------------
var disableButtons = (bool) => {
  if (bool)
    $('.playerChoser').children().prop('disabled', true)
  else
    $('.playerChoser').children().prop('disabled', false)
}
//------------------------------- get player's data ---------------------------------
$(document).ready(function () {
    $('.choosingPlayer').click(function () {
      player = parseInt($(this).attr('id'))
      choosedPlayer = $(this).attr('id')
      tableSize = parseInt($('#size').val())
      drawPlayGround(tableSize)
    })
})
//----------------------------- / get player's data ---------------------------------
//------------------------------- finish the game -----------------------------------
//new table at end of game
var reloadIt = () => {
  $('table').remove()
  player = parseInt(choosedPlayer)
  drawPlayGround(tableSize)
}
//------------------------------ / finish the game ----------------------------------