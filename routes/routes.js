

//ROUTES ===========================================================

module.exports = function (app){
    app.get('/', function(req, res) {
    	var message = 'Don\'t poke around in caves with snakes'
        console.log(message)
        res.send(message)
    });
}
