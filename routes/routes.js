

//ROUTES ===========================================================

module.exports = function (app){
	app.get('/auth/salesforce', function(req,res){
		res.send(200)
	})


    app.get('/login/:accountID', function(req, res) {
        console.log('Loggin it')
    });
}
