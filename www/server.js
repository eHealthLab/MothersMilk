var express = require('express')
    , cors = require('cors')
    , get = require('./routes/participants')
    , getdata = require('./routes/getdata')
    , http = require('http')
    , path = require('path');

var app = express();

//app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    //app.use(express.logger('dev'));
    //app.use(express.bodyParser());
    app.use(cors());
    //app.use(express.methodOverride());
    //app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
//});


//app.configure('development', function(){
    //app.use(express.errorHandler());
//});

//app.get('/', get.all);
//app.get('/loginSignup/:id', get.oneEmail)
app.get('/loginSignup/:id/:pwd', get.one);
app.get('/messages/:id', getdata.onemessage);
app.get('/messages/spanish/:id', getdata.spanishone);
app.post('/messages/:id/:messageID', getdata.setMessageAsRead);
app.post('/messages/:message/:email/:messageID', getdata.addMessage);
app.post('/loginSignup/:firstName/:lastName/:email/:password/:phoneNumber/' +
':babyName/:babyDOB/:babyGender/:zipcode', get.addUser);
app.post('/setGoals/:days/:minutes/:userID', get.setGoals);
app.post('/logMinutes/:minutes/:userID', get.logMinutes);
app.post('/initialize/:userID', get.initialize);
app.post('/feedback/:userID/:feedback', getdata.addFeedback);
app.post('/updateBadge/:badgeNumber/:userID', get.setBadge);
app.get('/badgeInfo/:userID', get.badgeInfo);
app.get('/goalsInfo/:userID', get.goalsInfo);
app.get('/totalPointsInfo/:userID', get.totalPointsInfo);


app.post('/changeStatus/:id', get.changeStatus);
app.post('/sendGCM/:id/:count', getdata.sendGCM);
app.post('/sendAPN/:id/:count', getdata.sendAPN);
app.post('/updateClicks/:about/:feedback/:facebook/:text/:tutorial', getdata.updateClicks);

http.createServer(app).listen(app.get('port'), "0.0.0.0", function(){
    console.log("Express server listening on port " + app.get('port'));
});
