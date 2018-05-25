var myAlerts = (state) => {
    var alertText
    setTimeout((alert) => {
        if (state == "end")
            alertText = "Játék vége"
        if (state == "win")
            alertText = "It is a win!"
        if (state == "draw")
            alertText = "It is a draw!"

        var alert = confirm(alertText)
        if (alert || !alert)
            setUpNewTable()
        endOfGame = true
    }, 1);
}