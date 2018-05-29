import '../node_modules/@types/jquery/index';

$(document).ready(function () {
/*
    introStartSetTime();
    $('.player').click(saveChoosenPlayer);

    var clickResolve;
    var clickready = new Promise(function (resolve) {
        clickResolve = resolve;
    });

    document.querySelector("#playground-container td").addEventListener("click", clickResolve);
    clickready.then(cucc);
*/
    introStartSetTime();    
    $('.player').click(saveChoosenPlayer);
    $("#playground-container td").click(stepConstructor);
    $('#info-ok').click(newGame);
});