//check name



/*
// Enable / disable given input elements
// { elements } - Array with JQuery elements
// { bool } - Boolean
var disableElements = (elements, bool) => {
    elements.forEach(function ($element) {
        $element.prop("disabled", bool)
    })
}

// Get the given jQuery input element's min and max in object
// { $inputElement } - JQuery element
// { {min: min, max: max} } - Object
var limitValues = ($inputElement) => {
    var min = parseInt($inputElement.attr('v-data-min'))
    var max = parseInt($inputElement.attr('v-data-max'))

    return { min: min, max: max }
}

// Keyup event on input (playground's size): 
// Case of valid number, it will enable buttons
// { $element } - input element, JQuery
var inputKeyupEvent = ($element) => {
    $element.keyup(function () {
        if (valid($(this))) {
            disableElements([$(".choosingPlayer.RED"), $(".choosingPlayer.BLUE")], false)
            dropError($(".v-error-text"), false)
        }
        else {
            disableElements([$(".choosingPlayer.RED"), $(".choosingPlayer.BLUE")], true)
            dropError($(".v-error-text"), true)
        }
    })
}

//Check if given number is between the limits
// { $element } - input element, JQuery
// { bool } - boolean, if valid it is true
var valid = ($element) => {
    var bool = false
    var val = parseInt($($element).val())
    if (val >= limitValues($element).min && val <= limitValues($element).max)
        bool = true

    return bool
}

//Write error message or delete it
// { $element } - the JQuery element
// { isError } - boolean, delete or drop message text
var dropError = ($element, isError) => {
    if(isError)
        $element.text("3 és 12 közötti számot tudsz csak megadni!")
    else
        $element.text("")
}
*/