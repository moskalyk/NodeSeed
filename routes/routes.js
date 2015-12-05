

//ROUTES ===========================================================

module.exports = function (app){

    app.get('/login/:accountID', function(req, res) {
        console.log('Loggin it')
    });
}
