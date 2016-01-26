
var request 	= require('request')
var qs 			= require('querystring')
var fullContactAPIKey = '975db5132a3798f4'
var async 		= require('async')
var cheerio 	= require('cheerio')
var request = require('request')
var htmlparser = require("htmlparser");
var _ = require('lodash')
var Converter = require("csvtojson").Converter;
var join = require('path').join

var Promise = require('bluebird');

var jsonfile = require('jsonfile')
var util = require('util')

var fs = require('fs');

var Promise = require("bluebird");
var fsProm = Promise.promisifyAll(require("fs"));

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};



//ROUTES ===========================================================

module.exports = function (app){

	app.get('/companiesExtractAll/:letter', function (req,res){
		Company.find({'Letter':req.params.letter},function(err,companies){
			if(err)
				res.send(err)
			if(companies){
				var file = join(__dirname, './company_data_'+req.params.letter+'.json')
				fs.writeFile(file, JSON.stringify(companies, null, 3), function (err) {
				  if (err) 
				  	return console.log(err);
				  else
				  	res.send(200)
				})
			}
		})
	})


	app.get('/companiesExtractAll/:letter/:code', function (req,res){
		// console.log(req.params.letter)
		var file = join(__dirname, './company_data_'+req.params.letter+'.json')

		fs.readFile(file, function (err, data) {
		  if (err) 
		  	return console.log(err);
		  else{
		  	var list = []
		  	data = JSON.parse(data)
		  	for (var i = 0; i < data.length; i++) {
				// console.log(req.params.code)

		  		if(data[i].NAICS==req.params.code){
		  			list.push(data[i])
		  		}
		  	}
		  	res.send(list)
		  }
		})
	})

	app.get('/companiesExtractAllLetter/:code', function (req,res){

		var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
		var list = []
		var count = 0



		for (var i = 0; i <alphabet.length; i++) {
			
			var file = join(__dirname, './company_data_'+alphabet[i]+'.json')

			fs.readFile(file, function (err, data) {
			  if (err) 
			  	return console.log(err);
			  else{
			  	
			  	data = JSON.parse(data)
			  	for (var j = 0; j < data.length; j++) {
					// console.log(req.params.code)

			  		if(data[j].NAICS==req.params.code){
			  			list.push(data[j])
			  		}
			  	}
			  	count++
			  	if(count==26){
			  		res.send(list)
			  	}
			  	
			  }
			})
		};
	})

	app.get('/get/813990', function(req,res){
		var file = join(__dirname, './company_data_A.json')

		fs.readFile(file, function (err, data) {
		  if (err) 
		  	return console.log(err);
		  else{
		  	var list = []
		  	data = JSON.parse(data)
		  	for (var i = 0; i < data.length; i++) {
		  		if(data[i].NAICS=='813990'){
		  			list.push(data[i])
		  		}
		  	}
		  	res.send(list)
		  }
		})
	})

	app.get('/getInformation', function(req,res){
		var file = join(__dirname, './company_data_A.json')
		fs.readFile(file, function (err, data) {
		  if (err) 
		  	return console.log(err);
		  else{
		  	// var list = []
		  	data = JSON.parse(data)

		  	for (var i = 0; i < data.length; i++) {
		  		if(data[i]._id == '56a1a255302e38e0594345ac'){
		  			var url = data[i].NAICSLink;

		  			(function(i){
						request(url, function(error, response, html){
					    	if(!error){
					        	var $ = cheerio.load(html)

						        var information = {
						        	Contact:{
						        		Name: '',
							        	Title: '',
							        	Telephone: ''
						        	},
						        	Email:'',
						        	PrimaryBusinessActivity:'',

						        	YearEstablished: '',
						        	TotalSales:{
						        		Lower:'',
						        		Upper:''
						        	},
						        	NumberOfEmployees: '',
						        	Raw:[]
						        }

						    	async.parallel([
					        		function(callback){
					        			$('.noIcon.font-small').filter(function(){
									    	information.Email = $(this).title
									    })
					        			callback()
					        		},function(callback){
								        $('.boxInside').filter(function(){
								        	var data = $(this)
								            Things = data.find('td').text().split('\n')
								            for (var i = 0; i < Things.length; i++) {
								            	if(Things[i].trim().length>0){
								            		// console.log('Thing: ' + i )
								            		// console.log(Things)
								            		line = Things[i].trim()
								            		// console.log('line')
								            		// console.log(line)
								            		if(line == 'Total Sales ($CDN):'){
								            			information.TotalSales.Lower =  Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim()
								            			information.TotalSales.Upper = Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim()
								            			console.log('Upper: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim())
								            			console.log('Lower: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim())
								            		}else

								            		//PrimaryBusinessActivity
								            		if(line == 'Primary Business Activity:'){
								            			information.PrimaryBusinessActivity = Things[i+5].trim()
								            			console.log('Primary Business Activity: '+Things[i+5].trim())
								            		}else

								            		//Contact - Title
								            		if(line == 'Title:' && Things.length >= (i+9)){
							            				console.log('Title: '+Things[i+9].trim())
							            				information.Contact.Title = Things[i+9].trim()
								            		}else
								            		//YearEstablished
								            		if(line == 'Year Established:'){
								            			information.YearEstablished = Things[i+3].trim()
								            			console.log('YearEstablished: '+Things[i+3].trim())
								            		}else
								            		
								            		//Number of Employees
								            		if(line=='Number of Employees:'){
								            			information.NumberOfEmployees = Things[i+3].trim()
								            			console.log('Number of Employees: '+Things[i+3].trim())
								            		}else if(Things.length==7&&Things[i].length>0&&Things[i].length>0 && i==3 ){
								            			// for (var p = 0; p < Things[i].length; p++) {
								            			// 	console.log(p+':'+Things[i][p])
								            			// };
								            			information.Contact.Name = Things[i].trim() +' '+ Things[i+1].trim()
								            			console.log('Conact Name: '+Things[i].trim() +' '+ Things[i+1].trim())
								            		}else if(Things[i].trim() == 'Telephone:'){
								            			information.Contact.Telephone = Things[i+3].trim()
								            			console.log('Telephone: '+Things[i+3].trim())
								            		}
								            		information.Raw.push(line)
								            	}
								            }
						        			
								        })
										callback()
					        		}], 
					        		function (err, results){
					        			console.log(information)
						        		// res.send(information)
						        		console.log(data[i]._id)
						        		Company.findOneAndUpdate({
						        			'_id': data[i]._id
						        		}, {
						        			Information: JSON.stringify(information) 
						        		}, function(err, company){
						        			if(err)
						        				res.send(err)
						        			if(company)
						        				res.send(200)
						        		})
					        	})
							}
						})
					})(i)
		  		}
		  	}
		  	// res.send(list)
		  }
		})
	})

	app.get('/write', function (req,res){
 		
 		var file = join(__dirname, './company_data.json')

		

		
		// var obj = {name: 'JP'}
		 
		// jsonfile.writeFile(file, obj, function (err) {
		//   console.error(err)
		// })
	})

	app.get('/massScrape', function(req,res){
		var converter = new Converter({});
		converter.fromFile(join(__dirname, "./2012_NAICS_Structure.csv"), function(err,result){
			if(err)
				console.log(err)
			else{
				var list = []
				console.log('here')
				for (var i = 0; i < result.length; i++){

					// console.log(result[i])
					var code = result[i].code
					console.log(code)

					var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

					for (var j = 0; j < alphabet.length; j++) {
						
						var letter = alphabet[j]

						var url = 'http://www.ic.gc.ca/app/ccc/sld/cmpny.do?letter=' + letter + '&lang=eng&profileId=1921&naics=' + code

						request(url, function(error, response, html){
						    	if(!error){
						        var $ = cheerio.load(html)

						        $('.mrgn-bttm-sm').filter(function(){

						            var data = $(this);

						            var companyLink = ''
						            var NAICSLink = ''

						            if(data.find('a')['0'])
						            	companyLink = 'http://www.ic.gc.ca/' + data.find('a')['0'].attribs.href
						            

						            if(data.find('a')['1'])
						            	NAICSLink = 'http://www.ic.gc.ca/' + data.find('a')['1'].attribs.href

						            var newCompany = new Company({
						            	CompanyName		: data.text().split('\n')[1].trim(),
										CompanyLink		: companyLink,
										NAICSLink		: NAICSLink
						            })

						            
						            console.log(newSchema)
						            
						        })
						}})
					}


				}
			}
		})
	})
	app.get('/scrape', function(req,res){

		url = 'http://www.ic.gc.ca/app/ccc/sld/cmpny.do?letter=A&lang=eng&profileId=1921&naics=';
		async.waterfall([
		function(callback) {
			request(url, function(error, response, html){
			    	if(!error){
			        var $ = cheerio.load(html);
			        // var colors = []
			        $('#cn-cont').filter(function(){

			            var data = $(this);
			            console.log(data)

			            console.log(data.text().split('\n'))

			            // var rows = data.text().split('\n')
			            
			            // // var index = 0;
			            // for (var i = 0; i < rows.length-1; i++) {
			            // 	var row = rows[i].split(') ')
			            // 	// console.log(row)

			            // 	// for (var j = 0; j < row.length-1; j+=2) {
			            // 		var mod = 0
			            // 		var hack = 0

			            // 		var color = new Color({
			            // 			colorName:'',
			            // 			hsl: {
			            // 				h:'',
			            // 				s:'',
			            // 				l:''
			            // 			}
			            // 		})

		
			            
			        })
			}})
		}, 
		function(callback){

		}], function (err, info) {
		res.send(colors)
		});


		// async.waterfall([
		// function(callback) {
			    
		// }], function (err, colors) {
		// res.send(colors)
		// });
	})

	app.get('/scrape/:company', function(req,res){
		var url = 'http://www.ic.gc.ca/app/ccc/srch/nvgt.do?lang=eng&prtl=1&sbPrtl=&estblmntNo=100015680000&profile=cmpltPrfl&profileId=1921&app=sold&searchNav=F'
		request(url, function(error, response, html){
	    	if(!error){
	        var $ = cheerio.load(html);

	        var entry = {
	        		company: '',
	        		link: '',
	        		description:{

	        		},
	        		contactInformation:{

	        		}, 
	        		companyDescription:{

	        		}
	        	}



	        // var colors = []
	        $('.noBulletnoIndent').filter(function(){
	        	
	            var data = $(this);
	            company = data.text().trim().split('\n')
	            console.log(company[1].trim())
	            res.send(company[1].trim())

	            // var rows = data.text().split('\n')
	            
	            // // var index = 0;
	            // for (var i = 0; i < rows.length-1; i++) {
	            // 	var row = rows[i].split(') ')
	            // 	// console.log(row)

	            // 	// for (var j = 0; j < row.length-1; j+=2) {
	            // 		var mod = 0
	            // 		var hack = 0

	            // 		var color = new Color({
	            // 			colorName:'',
	            // 			hsl: {
	            // 				h:'',
	            // 				s:'',
	            // 				l:''
	            // 			}
	            // 		})


	            
	        })
		}})
	})

	app.get('/testing', function (req, res){
		var url = 'http://api.naics.us/v0/q?year=2012'
		request( url, function (error, response, html){
			console.log(JSON.parse(html))
		})
	})

	app.get('/alphabet', function(req,res){
		url = 'http://www.ic.gc.ca/app/ccc/sld/cmpny.do?letter=A&lang=eng&profileId=1921&naics=31141'
		var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
		for (var i = 0; i < alphabet.length; i++)
			console.log('http://www.ic.gc.ca/app/ccc/sld/cmpny.do?letter=' + alphabet[i] + '&lang=eng&profileId=1921&naics=' + req.params.naics)
		res.send(200)
	})

	app.get('/industries', function(req,res){
		var converter = new Converter({});
		converter.fromFile(join(__dirname, "./2012_NAICS_Structure.csv"), function(err,result){

			for (var i = 0; i < result.length; i++) {
				result[i]
				var code = result[i].code
				var industry = result[i].company
				console.log(industry.slice(-1))
				if(industry.slice(-1) =='/'){
					industry = industry.substring(0, industry.length - 2)
				}
				if(industry.slice(-1) =='T'){
					industry = industry.substring(0, industry.length - 2)
				}
				var newNaics = new NAICS({
					NAICS		: code,
					Industry	: industry.replace(/\/$/, "")
				})

				newNaics.save(function(err, naics){
					if(err){
						res.send(err)
					}
					if(naics){
						console.log(naics)
					}else{
						res.send(404)
					}
				})

			}
		})
				
	})

	app.get('/testingcompany', function (req, res){

			var url = 'http://www.ic.gc.ca//app/ccc/srch/nvgt.do;jsessionid=0001YurdDGuobgpVAPvKHc6xz7j:-140E?lang=eng&prtl=1&sbPrtl=&estblmntNo=234567029048&profile=cmpltPrfl&profileId=1921&app=sold&searchNav=F'

			request(url, function(error, response, html){
				if(!error){
			        var $ = cheerio.load(html)

			        var information = {
			        	Contact:{
			        		Name: '',
				        	Title: '',
				        	Telephone: ''
			        	},
			        	Email:'',
			        	PrimaryBusinessActivity:'',
			        	// Contacts:[],
			        	YearEstablished: '',
			        	TotalSales:{
			        		Lower:'',
			        		Upper:''
			        	},
			        	NumberOfEmployees: '',
			        	Raw:[]
			        	// ServiceName:''
			        }

			        // var contact = {
			        // 	Name: '',
			        // 	Title: '',
			        // 	Telephone: ''
			        // }

				    async.parallel([
		        		function(callback){
		        			$('.noIcon.font-small').filter(function(){
						    	information.Email = $(this).title
						    })
		        			callback()
		        		},function(callback){
					        $('.boxInside').filter(function(){
					        	var data = $(this)
					            Things = data.find('td').text().split('\n')
					            for (var i = 0; i < Things.length; i++) {
					            	if(Things[i].trim().length>0){
					            		// console.log('Thing: ' + i )
					            		// console.log(Things)
					            		line = Things[i].trim()
					            		// console.log('line')
					            		// console.log(line)
					            		if(line == 'Total Sales ($CDN):'){
					            			information.TotalSales.Lower =  Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim()
					            			information.TotalSales.Upper = Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim()
					            			console.log('Upper: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim())
					            			console.log('Lower: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim())
					            		}else

					            		//PrimaryBusinessActivity
					            		if(line == 'Primary Business Activity:'){
					            			information.PrimaryBusinessActivity = Things[i+5].trim()
					            			console.log('Primary Business Activity: '+Things[i+5].trim())
					            		}else

					            		//Contact - Title
					            		if(line == 'Title:' && Things.length >= (i+9)){
				            				console.log('Title: '+Things[i+9].trim())
				            				information.Contact.Title = Things[i+9].trim()
					            		}else
					            		//YearEstablished
					            		if(line == 'Year Established:'){
					            			information.YearEstablished = Things[i+3].trim()
					            			console.log('YearEstablished: '+Things[i+3].trim())
					            		}else
					            		
					            		//Number of Employees
					            		if(line=='Number of Employees:'){
					            			information.NumberOfEmployees = Things[i+3].trim()
					            			console.log('Number of Employees: '+Things[i+3].trim())
					            		}else if(Things.length==7&&Things[i].length>0&&Things[i].length>0 && i==3 ){
					            			// for (var p = 0; p < Things[i].length; p++) {
					            			// 	console.log(p+':'+Things[i][p])
					            			// };
					            			information.Contact.Name = Things[i].trim() +' '+ Things[i+1].trim()
					            			console.log('Conact Name: '+Things[i].trim() +' '+ Things[i+1].trim())
					            		}else if(Things[i].trim() == 'Telephone:'){
					            			information.Contact.Telephone = Things[i+3].trim()
					            			console.log('Telephone: '+Things[i+3].trim())
					            		}else{
					            			information.Raw.push(line)
					            		}
					            	}
					            }
			        			
					        })
							callback()
		        		}], 
		        		function (err, results){
		        			console.log(information)
			        		res.send(information)
		        		})
			    }
			})
	})

	app.post('/scrapeCompany', function (req, res){

			var url = req.body.link

			request(url, function(error, response, html){
				if(!error){
			        var $ = cheerio.load(html)

			        var information = {
			        	Contact:{
			        		Name: '',
				        	Title: '',
				        	Telephone: ''
			        	},
			        	Email:'',
			        	PrimaryBusinessActivity:'',
			        	// Contacts:[],
			        	YearEstablished: '',
			        	TotalSales:{
			        		Lower:'',
			        		Upper:''
			        	},
			        	NumberOfEmployees: '',
			        	Raw:[]
			        	// ServiceName:''
			        }

			        // var contact = {
			        // 	Name: '',
			        // 	Title: '',
			        // 	Telephone: ''
			        // }

				    async.parallel([
		        		function(callback){
		        			$('.noIcon.font-small').filter(function(){
						    	information.Email = $(this).title
						    })
		        			callback()
		        		},function(callback){
					        $('.boxInside').filter(function(){
					        	var data = $(this)
					            Things = data.find('td').text().split('\n')
					            for (var i = 0; i < Things.length; i++) {
					            	if(Things[i].trim().length>0){
					            		// console.log('Thing: ' + i )
					            		// console.log(Things)
					            		line = Things[i].trim()
					            		// console.log('line')
					            		// console.log(line)
					            		if(line == 'Total Sales ($CDN):'){
					            			information.TotalSales.Lower =  Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim()
					            			information.TotalSales.Upper = Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim()
					            			console.log('Upper: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim())
					            			console.log('Lower: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim())
					            		}else

					            		//PrimaryBusinessActivity
					            		if(line == 'Primary Business Activity:'){
					            			information.PrimaryBusinessActivity = Things[i+5].trim()
					            			console.log('Primary Business Activity: '+Things[i+5].trim())
					            		}else

					            		//Contact - Title
					            		if(line == 'Title:' && Things.length >= (i+9)){
				            				console.log('Title: '+Things[i+9].trim())
				            				information.Contact.Title = Things[i+9].trim()
					            		}else
					            		//YearEstablished
					            		if(line == 'Year Established:'){
					            			information.YearEstablished = Things[i+3].trim()
					            			console.log('YearEstablished: '+Things[i+3].trim())
					            		}else
					            		
					            		//Number of Employees
					            		if(line=='Number of Employees:'){
					            			information.NumberOfEmployees = Things[i+3].trim()
					            			console.log('Number of Employees: '+Things[i+3].trim())
					            		}else if(Things.length==7&&Things[i].length>0&&Things[i].length>0 && i==3 ){
					            			// for (var p = 0; p < Things[i].length; p++) {
					            			// 	console.log(p+':'+Things[i][p])
					            			// };
					            			information.Contact.Name = Things[i].trim() +' '+ Things[i+1].trim()
					            			console.log('Conact Name: '+Things[i].trim() +' '+ Things[i+1].trim())
					            		}else if(Things[i].trim() == 'Telephone:'){
					            			information.Contact.Telephone = Things[i+3].trim()
					            			console.log('Telephone: '+Things[i+3].trim())
					            		}

					            		information.Raw.push(line)
					            		
					            	}
					            }
			        			
					        })
							callback()
		        		}], 
		        		function (err, results){
		        			console.log(information)
			        		res.send(information)
		        		})
			    }
			})
	})

	app.post('/scrapeCompanyNew', function (req, res){

			var url = req.body.link

			request(url, function(error, response, html){
				if(!error){
			        var $ = cheerio.load(html)

			        var information = {
			        	Contact:{
			        		Name: '',
				        	Title: '',
				        	Telephone: ''
			        	},
			        	Email:'',
			        	PrimaryBusinessActivity:'',
			        	// Contacts:[],
			        	YearEstablished: '',
			        	TotalSales:{
			        		Lower:'',
			        		Upper:''
			        	},
			        	NumberOfEmployees: '',
			        	Raw:[]
			        	// ServiceName:''
			        }

			        // var contact = {
			        // 	Name: '',
			        // 	Title: '',
			        // 	Telephone: ''
			        // }

			     //    var process = function (url) {
					   //  var lines = [];
					   //  fetch(url)
					   //      .then(function (rows) {
					   //      	var information = {
						  //       	Contact:{
						  //       		Name: '',
							 //        	Title: '',
							 //        	Telephone: ''
						  //       	},
						  //       	Email:'',
						  //       	PrimaryBusinessActivity:'',
						  //       	// Contacts:[],
						  //       	YearEstablished: '',
						  //       	TotalSales:{
						  //       		Lower:'',
						  //       		Upper:''
						  //       	},
						  //       	NumberOfEmployees: '',
						  //       	Raw:[]
						  //       	// ServiceName:''
						  //       }

					   //          $('.boxInside').filter(function(){
						  //       	var data = $(this)
						  //           Things = data.find('td').text().split('\n')
						  //           for (var i = 0; i < Things.length; i++) {
						  //           	if(Things[i].trim().length>0){
						  //           		// console.log('Thing: ' + i )
						  //           		// console.log(Things)
						  //           		line = Things[i].trim()
						  //           		// console.log('line')
						  //           		// console.log(line)
						  //           		if(line == 'Total Sales ($CDN):'){
						  //           			information.TotalSales.Lower =  Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim()
						  //           			information.TotalSales.Upper = Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim()
						  //           			console.log('Upper: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim())
						  //           			console.log('Lower: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim())
						  //           		}else

						  //           		//PrimaryBusinessActivity
						  //           		if(line == 'Primary Business Activity:'){
						  //           			information.PrimaryBusinessActivity = Things[i+5].trim()
						  //           			console.log('Primary Business Activity: '+Things[i+5].trim())
						  //           		}else

						  //           		//Contact - Title
						  //           		if(line == 'Title:' && Things.length >= (i+9)){
					   //          				console.log('Title: '+Things[i+9].trim())
					   //          				information.Contact.Title = Things[i+9].trim()
						  //           		}else
						  //           		//YearEstablished
						  //           		if(line == 'Year Established:'){
						  //           			information.YearEstablished = Things[i+3].trim()
						  //           			console.log('YearEstablished: '+Things[i+3].trim())
						  //           		}else
						            		
						  //           		//Number of Employees
						  //           		if(line=='Number of Employees:'){
						  //           			information.NumberOfEmployees = Things[i+3].trim()
						  //           			console.log('Number of Employees: '+Things[i+3].trim())
						  //           		}else if(Things.length==7&&Things[i].length>0&&Things[i].length>0 && i==3 ){
						  //           			// for (var p = 0; p < Things[i].length; p++) {
						  //           			// 	console.log(p+':'+Things[i][p])
						  //           			// };
						  //           			information.Contact.Name = Things[i].trim() +' '+ Things[i+1].trim()
						  //           			console.log('Conact Name: '+Things[i].trim() +' '+ Things[i+1].trim())
						  //           		}else if(Things[i].trim() == 'Telephone:'){
						  //           			information.Contact.Telephone = Things[i+3].trim()
						  //           			console.log('Telephone: '+Things[i+3].trim())
						  //           		}

						  //           		information.Raw.push(line)
						            		
						  //           	}
						  //           }
				        			
						  //       })
								// return 
					   //      })
					   //  }

				    async.parallel([
		        		function(callback){
		        			$('.noIcon.font-small').filter(function(){
						    	information.Email = $(this).title
						    })
		        			callback()
		        		},function(callback){

		        			var information = {
						        	Contact:{
						        		Name: '',
							        	Title: '',
							        	Telephone: ''
						        	},
						        	Email:'',
						        	CompanyName:'',
						        	PrimaryBusinessActivity:'',
						        	// Contacts:[],
						        	YearEstablished: '',
						        	TotalSales:{
						        		Lower:'',
						        		Upper:''
						        	},
						        	NumberOfEmployees: '',
						        	Raw:[]
						        	// ServiceName:''
						        }

					        $('.boxInside').filter(function(){
					        	var data = $(this)
					            Things = data.find('td').text().split('\n')
					            for (var i = 0; i < Things.length; i++) {
					            	if(Things[i].trim().length>0){
					            		// console.log('Thing: ' + i )
					            		// console.log(Things)
					            		line = Things[i].trim()
					            		// // console.log('line')
					            		// // console.log(line)
					            		// if(line == 'Total Sales ($CDN):'){
					            		// 	information.TotalSales.Lower =  Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim()
					            		// 	information.TotalSales.Upper = Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim()
					            		// 	console.log('Upper: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[0].trim())
					            		// 	console.log('Lower: '+Things[i+4].trim().replaceAll('$','').replaceAll(',','').split('to')[1].trim())
					            		// }else

					            		// //PrimaryBusinessActivity
					            		// if(line == 'Primary Business Activity:'){
					            		// 	information.PrimaryBusinessActivity = Things[i+5].trim()
					            		// 	console.log('Primary Business Activity: '+Things[i+5].trim())
					            		// }else

					            		// //Contact - Title
					            		// if(line == 'Title:' && Things.length >= (i+9)){
				            			// 	console.log('Title: '+Things[i+9].trim())
				            			// 	information.Contact.Title = Things[i+9].trim()
					            		// }else
					            		// //YearEstablished
					            		// if(line == 'Year Established:'){
					            		// 	information.YearEstablished = Things[i+3].trim()
					            		// 	console.log('YearEstablished: '+Things[i+3].trim())
					            		// }else
					            		
					            		// //Number of Employees
					            		// if(line=='Number of Employees:'){
					            		// 	information.NumberOfEmployees = Things[i+3].trim()
					            		// 	console.log('Number of Employees: '+Things[i+3].trim())
					            		// }else if(Things.length==7&&Things[i].length>0&&Things[i].length>0 && i==3 ){
					            		// 	// for (var p = 0; p < Things[i].length; p++) {
					            		// 	// 	console.log(p+':'+Things[i][p])
					            		// 	// };
					            		// 	information.Contact.Name = Things[i].trim() +' '+ Things[i+1].trim()
					            		// 	console.log('Conact Name: '+Things[i].trim() +' '+ Things[i+1].trim())
					            		// }else if(Things[i].trim() == 'Telephone:'){
					            		// 	information.Contact.Telephone = Things[i+3].trim()
					            		// 	console.log('Telephone: '+Things[i+3].trim())
					            		// }

					            		information.Raw.push(line)
					            		
					            	}
					            }
			        			// console.log('Here: information')
			        			// console.log(information)
			        			
					        })
							
							setTimeout(function(){
								callback(information)
							}, 1000)
							
							
		        		}], 
		        		function (err, results){
		        			if(err){
		        				console.log('err')
		        				console.log(err)
		        				results = err.Raw

		        				for (var i = 0; i<results.length; i++) {
			        				var line = results[i]

			        				if(line == 'Total Sales ($CDN):'){
			        					if(results[i+1].charAt(results[i+1].length-1)=='+'){
			        						information.TotalSales.Lower = results[i+1].replaceAll('$','').replaceAll(',','').split('to')[0].replaceAll('+','').trim()
			        						information.TotalSales.Upper = Infinity
			        					}else{
			        						information.TotalSales.Lower =  results[i+1].replaceAll('$','').replaceAll(',','').split('to')[0].trim()
					            			information.TotalSales.Upper = results[i+1].replaceAll('$','').replaceAll(',','').split('to')[1].trim()
					            			console.log('Upper: '+results[i+1])
					            			console.log('Lower: '+results[i+1])
			        					}
				            			
				            		}else if(line == 'Primary Business Activity:'){
				            			information.PrimaryBusinessActivity = results[i+1]
				            			console.log('Primary Business Activity: '+results[i+1])
				            		}else if(line == 'Title:'){
			            				console.log('Title: '+results[i+1])
			            				information.Contact.Title = results[i+1]
				            		}else if(line == 'Year Established:'){
				            			information.YearEstablished = results[i+1]
				            			console.log('YearEstablished: '+results[i+1])
				            		}else if(line=='Number of Employees:'){
				            			information.NumberOfEmployees = results[i+1]
				            			console.log('Number of Employees: '+results[i+1])
				            		}else if(i==0){
				            			information.Contact.Name = results[i] +' '+ results[i+1]
				            			console.log('Contact Name: '+results[i] +' '+ results[i+1])
				            		}else if(results[i] == 'Telephone:'){
				            			information.Contact.Telephone = results[i+1]
				            			console.log('Telephone: '+results[i+1])
				            		}else if(results[i] == 'Email:'){
				            			information.Contact.Email = results[i+1]
				            			console.log('Email: '+results[i+1])
				            		}else if(results[i] == 'Service Name:'){
				            			information.CompanyName = results[i+1]
				            			console.log('Email: '+results[i+1])
				            		}else{
				            			information.Raw.push(results[i])
				            		}
			        			}
			        			res.send(information)
		        			}else{
			        			console.log(results)
			        			console.log('results')
			        			console.log(JSON.stringify(results))
				        	// var information = {
					        // 	Contact:{
					        // 		Name: '',
						       //  	Title: '',
						       //  	Telephone: ''
					        // 	},
					        // 	Email:'',
					        // 	PrimaryBusinessActivity:'',
					        // 	// Contacts:[],
					        // 	YearEstablished: '',
					        // 	TotalSales:{
					        // 		Lower:'',
					        // 		Upper:''
					        // 	},
					        // 	NumberOfEmployees: '',
					        // 	Raw:[]
					        // 	// ServiceName:''
					        // }

		        			

			        		res.send(information)
			        		}
		        		})
			    }
			})
	})

	app.post('/saveSearch', function (req, res){
		var newSearch = new Search({
			CompanyName	: req.body.company,
			Name		: req.body.name,
			Email		: req.body.email,
			Title		: req.body.title,
			Telephone	: req.body.tele,
			Employees 	: req.body.employees,
			Lower 		: req.body.lower,
			Upper 		: req.body.upper,
			IClink 		: req.body.IClink
		})

		newSearch.save(function(err, search){
			if(err){
				res.send(err)
			}
			if(search){
				res.send(search)
			}
		})
	})

	app.get('/searches', function (req, res){
		Search.find({},function(err,searches){
			if(err)
				res.send(err)
			if(searches)
				res.send(searches)
			else
				res.send(404)
		})
	})

	app.get('/updateLetterField', function (req, res){
		Company.find({},function(er,companies){
			for (var i = 0; i < companies.length; i++) {
				Company.findOneAndUpdate(
				{
					'_id': companies[i]._id
				},{
					Letter: companies[i].CompanyName.charAt(0).toUpperCase()
				},function(err, companyUpdate){
					if(err)
						res.send(err)
					if(companyUpdate)
						console.log(companyUpdate.CompanyName)
					else
						res.send(404)
				})
			}
		})
	})

	app.get('/updateLetterFieldNAICS', function (req, res){
		NAICS.find({},function(er,companies){
			for (var i = 0; i < companies.length; i++) {
				NAICS.findOneAndUpdate(
				{
					'_id': companies[i]._id
				},{
					Letter: companies[i].Industry.charAt(0).toUpperCase()
				},function(err, companyUpdate){
					if(err)
						res.send(err)
					if(companyUpdate)
						console.log(companyUpdate.CompanyName)
					else
						res.send(404)
				})
			}
		})
	})

	app.get('/NAICSLetter/:letter', function (req, res){
		NAICS.find({
			'Letter': req.params.letter
		}, function(err, naics){
			if(err)
				res.send(err)
			if(naics)
				res.send(naics)
			else
				res.send(404)
		})
	})
	app.get('/NAICS', function (req, res){
		NAICS.find({}, function(err, naics){
			if(err)
				res.send(err)
			if(naics)
				res.send(naics)
			else
				res.send(404)
		})
	})

	app.get('/NAICS/cleanDatabase/:id', function (req, res){
		NAICS.find({'_id': req.params.id}).remove().exec(function(err, data) {
		  console.log(data)
		  res.send(200)
		})
	})

	app.get('/NAICSCode/:code', function (req, res){
		NAICS.find({
			'NAICS': req.params.code
		}, function(err, naics){
			if(err)
				res.send(err)
			if(naics)
				res.send(naics)
			else
				res.send(404)
		})
	})

	app.get('/getdata', function (req, res){
		Company.find({},function(err,companies){	
			if(err)
				res.send(err)
			if(companies){
				for (var i = 0; i < companies.length; i++) {
					console.log(companies[i].CompanyName.charAt(0).toUpperCase())
				}
				res.send(200)
			}else{
				res.send(404)
			}
		})
	})

	app.get('/scrapes', function(req,res){
		// url = 'http://www.ic.gc.ca/app/ccc/sld/cmpny.do?letter=A&lang=eng&profileId=1921&naics=' + req.params.naics;
		var converter = new Converter({});
		converter.fromFile(join(__dirname, "./2012_NAICS_Structure.csv"), function(err,result){
			var counter1 = 0;
			var letterCount = 6;
			var x = setInterval(function(){
				var k = counter1
				var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
				var code = result[k].code
				var industry = result[k].company

				var letter = alphabet[25]

				console.log(k+": "+code)

				var url = 'http://www.ic.gc.ca/app/ccc/sld/cmpny.do?letter=' + letter + '&lang=eng&profileId=1921&naics=' + code

				request(url, function(error, response, html){
			    	if(!error){
			        var $ = cheerio.load(html)

			        $('.mrgn-bttm-sm').filter(function(){

			            var data = $(this);

			            var companyLink = ''
			            var NAICSLink = ''

			            if(data.find('a')['1'])
			            	companyLink =  data.find('a')['1'].attribs.href
			            

			            if(data.find('a')['0'])
			            	NAICSLink = 'http://www.ic.gc.ca' + data.find('a')['0'].attribs.href

			            var newCompany = new Company({
			            	NAICS 			: code,
			            	CompanyName		: data.text().split('\n')[1].trim(),
							CompanyLink		: companyLink,
							NAICSLink		: NAICSLink,
							Letter 			: data.text().split('\n')[1].trim().charAt(0).toUpperCase()
			            })

			            newCompany.save(function(err, company){
			            	if(err)
			            		res.send(500)
			            	if(company)
			            		console.log(company)
			            })
			            
			        })
				}})

				counter1++;
			    if(counter1 === result.length) {
			        clearInterval(x);
			    }
			},200)
	})
	})

	app.get('/sorrymark', function(req,res){
		while(1){
			var url = '/markhall.co/'
			request(url, function(error, response, html){
				if(error){
					console.log(error)
				}else{
					console.log(html)
				}
			})
		}
	})

	app.get('/auth', function (req, res){
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
					url: instance_url+'/services/data/v26.0/query/?q=SELECT name from Account',
					headers:{
				  		"Content-Type": "application/x-www-form-urlencoded",
				  		"Authorization": "Bearer " + access_token
				  	}
				  }

				 //  var options = {
					// url: instance_url+'/services/data/v26.0/recent/?limit=20',
					// headers:{
				 //  		"Content-Type": "application/x-www-form-urlencoded",
				 //  		"Authorization": "Bearer " + access_token
				 //  	}
				 //  }

				 //  var options = {
					// url: instance_url+'/services/data/v26.0/sobjects',
					// headers:{
				 //  		"Content-Type": "application/x-www-form-urlencoded",
				 //  		"Authorization": "Bearer " + access_token
				 //  	}
				 //  }

				 //  var options = {
					// url: instance_url+'/services/data/v26.0/',
					// headers:{
				 //  		"Content-Type": "application/x-www-form-urlencoded",
				 //  		"Authorization": "Bearer " + access_token
				 //  	}
				 //  }

				 //  var options = {
					// url: instance_url+'/services/data/v26.0/?q=FIND+%7BAcme',
					// headers:{
				 //  		"Content-Type": "application/x-www-form-urlencoded",
				 //  		"Authorization": "Bearer " + access_token
				 //  	}
				 //  }


				 //  var options = {
					// url: instance_url+'/services/data/v26.0/query/?q=SELECT City,State,Street,CompanyId FROM DatacloudCompany WHERE AnnualRevenue > 10000000 ORDER BY City LIMIT 100 OFFSET 0',
					// headers:{
				 //  		"Content-Type": "application/x-www-form-urlencoded",
				 //  		"Authorization": "Bearer " + access_token
				 //  	}
				 //  }

		  		request.get(options, function (err,r,body){
		  			if(err)
				  		throw err
				  	else{
				  		console.log('----------------')
				  		// console.log(r)
				  		body = JSON.parse(body)
				  		// console.log(body)
				  		// console.log(body.sobjects)
				  	// 	var options = {
							// url: 'https://na34.salesforce.com'+body.records[0].attributes.url,
							// headers:{
						 //  		"Content-Type": "application/x-www-form-urlencoded",
						 //  		"Authorization": "Bearer " + access_token
						 //  	}
						 //  }

				  	// 	request.get(options, function(err, r, body){
				  	// 		if(err)
				  	// 			throw err
				  	// 		else{
				  	// 			console.log('----------------')
						 //  		console.log(r)
						 //  		body = JSON.parse(body)
						 //  		console.log(body)
				  	// 		}
				  	// 	})
				  		for (var i = body.records.length - 1; i >= 0; i--) {
				  			console.log(body.records[i])
				  		};
		  			}
		  		})
		  	}
		})
	})


    app.get('/login/:accountID', function(req, res) {
        console.log('Loggin it')
    });
}
