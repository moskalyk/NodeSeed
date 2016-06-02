
//ROUTES ===========================================================

module.exports = function (app){
    app.get('/login/:username', function(req, res) {
        console.log('Loggin it ' + req.params.username);
        res.send(req.params.username)

        //Find a user in the database, if a database is connected
        // User.findOne({
        // 	'Username': req.params.username
        // },function(err, user){
        // 	if(err)
        // 		throw err;
        // 	if(user){
        // 		console.log('user found!');
        // 		console.log(user);
        // 		var returnMessage = {
		      //   	'status': 200,
		      //   	'message': 'user found'
		      //   }
        // 		res.send(returnMessage);
        // 	}else{
        // 		//could not find user
        // 		res.send(404);
        // 	}
        // });
    });
}
