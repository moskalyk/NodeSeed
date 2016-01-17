
var request 	= require('request')
var qs 			= require('querystring')
// var squel 		= require("squel")


//ROUTES ===========================================================

module.exports = function (app){

	app.get('/test', function(req,res){
		// qs.

		// squel.select()
		// 	.from()
		// 	.order
		// 	.limit()
			res.send(qs('SELECT * FROM table'))
	})

	app.get('/auth', function (req,res){
		var cookieJar = request.jar();
		var options = {
			url: 'https://login.salesforce.com/services/oauth2/token',
			headers:{
		  		"Content-Type": "application/x-www-form-urlencoded"
		  	},
		  	jar:cookieJar,
		  	form: {
		  		'client_id': '3MVG9KI2HHAq33RwKULXNqHEgokv1xJ1_pZ1ios.lkGWct3S8G2z2z0PmC.e2sS68G288AQZqlhD6Xy_krbAb',
		    	'client_secret': '2185958376703640696',
		    	'grant_type': 'password',
		    	'username': 'amin@mapletreecapital.ca',
		    	'password': '47oldenglishiHjZFOupW1iVJ0U7RmE9fxpA'
		  	}
		  }
		  

		  request.post(options, function (err, r, body) {
		  	if(err)
		  		throw err
		  	else{
		  		console.log('----------------')
		  		console.log(r)
		  		body = JSON.parse(body)
		  		console.log(body)
		  		var access_token = body.access_token
		  		var instance_url = body.instance_url
		  		console.log('access_token: ' + access_token)
		  		console.log('instance_url: ' + instance_url)

		  		var options = {
					url: instance_url+'/services/data/v26.0/query/?q=SELECT+name+from+Account',
					headers:{
				  		"Content-Type": "application/x-www-form-urlencoded",
				  		"Authorization": "Bearer " + access_token
				  	}
				  }

		  		request.post(options, function (err,r,body){
		  			if(err)
				  		throw err
				  	else{
				  		console.log('----------------')
				  		console.log(r)
				  		body = JSON.parse(body)
				  		console.log(body)
		  			}
		  		})
		  	}
		})
	})


    app.get('/login/:accountID', function(req, res) {
        console.log('Loggin it')
    });
}
