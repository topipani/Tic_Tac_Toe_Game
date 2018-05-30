let botMove = () => {
    const midPos = allPos()[allPos().length - Math.floor(allPos().length/2)];
    const tablePos = $('.playground > tbody').position();
    const midTd = document.elementFromPoint(midPos.top + tablePos.top, midPos.left + tablePos.left);
    $(midTd).addClass((props.player == 'red') ? 'blue' : 'red');
    $(midTd).off('click');
    nextPlayer();
}