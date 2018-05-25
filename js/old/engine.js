$(document).ready(function() {
    // Validate elements - validate.js
    var elements = [$("#size")]
    disableElements(elements, false)
    inputKeyupEvent($("#size"))
    //for playground-setup.js
    setUpGame()
})
