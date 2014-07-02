var mysql = require('mysql');
var gcm = require('node-gcm');
var apn = require('apn');
var qs = require('querystring');


var openConnection = function() {
    return mysql.createConnection({ host: 'localhost', user: 'munjala',
        password: 'artika12', database: 'mothersmilk'});
};

exports.onemessage = function(req, res){
    var finalMessages = new Array();
    console.log("Entered");
    var Id = req.params.id;
    var registerDay = req.params.date;
    if ((connection = openConnection())) {
        console.log("Connection Open");
        var queryString = "select allmessages, registerdate, status from participants where ID=" + Id;
        connection.query(queryString, function(err, rows, fields) {
            console.log("Error check");
            if (err) throw err;
            console.log("After throw");
            var registerDate = rows[0].registerdate;
            if (rows[0].allmessages) {
                console.log("entered allmessages");
                if (rows[0].status == 0) {
                    queryString = "select * from outbound a, user" + Id +" b where a.ID = b.ID";
                }
                else {
                    queryString = "select * from outboundpp a, user" + Id +" b where a.ID = b.ID";
                }

                if ((connection = openConnection())) {
                    connection.query(queryString, function(err, rows, fields) {
                        if (err) throw err;
                        rows.unshift({
                            "ID": 27,
                            "subject": "Welcome to Mother's Milk.",
                            "message": "Welcome to Mother's Milk! We will be sending you text messages a few times each week over the next few weeks. We're glad you're participating!",
                            "releasedate": "2014-03-29T10:00:00.000Z",
                            "directmessage": 1,
                            "inflag": 0,
                            "nextmessage": -1,
                            "day": 2,
                            "lastmessage": 0,
                            "inb": null,
                            "outb": 0,
                            "registerday": 2
                        });
                        res.send(rows);
                    });
                    connection.end();
                }
            } else {
                console.log("Entered all else");
                //var today =  new Date();
                //console.log('today:' + today + today.getTime());

                var one_day=1000*60*60*24
                //var numberOfDays = ((today.getTime() - registerDay.getTime())/one_day) % 30;
                //console.log('number of days:' + numberOfDays);
                if (rows[0].status == 0) {
                    //queryString = "select * from outbound a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday<=a.day AND a.releasedate<=now()";
                    queryString = "select * from outbound a, user" + Id + " b, (select registerdate from participants where ID= " + Id + ") c where a.ID = b.ID AND a.day <= (select DATEDIFF(Date(now()), c.registerdate))";
                }
                else if (rows[0].status == 1) {
                    //queryString = "select * from outboundpp a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday<=a.day AND a.releasedate<=now()";
                    queryString = "select * from outboundpp a, user" + Id + " b, (select registerdate from participants where ID= " + Id + ") c where a.ID = b.ID AND a.day <= (select DATEDIFF(Date(now()), c.registerdate))";
                }

                if ((connection = openConnection())) {
                    connection.query(queryString, function(err, rows, fields) {
                        if (err) throw err;
                        if (rows[0] != undefined) {
                            if (rows[rows.length - 1].lastmessage) {
                                console.log("Last Message Check");
                                var abc1 = new Array();
                                var finalRows = new Array();
                                var startDate =new Date(2014, 03, 29);    //Month is 0-11 in JavaScript
                                var thisday = new Date();                        //Get 1 day in milliseconds
                                var one_day=1000*60*60*24
                                var daysSinceStart = 1; //((thisday.getTime() - startDate.getTime())/one_day) % 30;
                                if (rows[0].status == 0) {
                                    queryString = "select * from outbound a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday>a.day AND a.day<" + daysSinceStart;
                                }
                                else {
                                    queryString = "select * from outboundpp a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday>a.day AND a.day<" + daysSinceStart;
                                }

                                if ((connection = openConnection())) {
                                    connection.query(queryString, function(err, rows1, fields) {
                                        console.log("Date Check");
                                        if (err) throw err;
                                        finalRows = rows1.slice(0);
                                        finalMessages = rows1.slice(0);
                                        rows1 = rows1.concat(rows);
                                        console.log(rows1.length);
                                        if(rows1.length == 26) {
                                            if ((connection = openConnection())) {
                                                queryString = "update participants set allmessages = true where ID=" + Id;
                                                connection.query(queryString, function(err, rowdata, fields) {
                                                    if (err) throw err;
                                                });
                                            }
                                            connection.end();
                                        }
                                        rows1.unshift({
                                            "ID": 27,
                                            "subject": "Welcome to Mother's Milk!",
                                            "message": "Welcome to Mother's Milk! We will be sending you text messages a few times each week over the next few weeks. We're glad you're participating!",
                                            "releasedate": "2014-03-29T10:00:00.000Z",
                                            "directmessage": 1,
                                            "inflag": 0,
                                            "nextmessage": -1,
                                            "day": 2,
                                            "lastmessage": 0,
                                            "inb": null,
                                            "outb": 1,
                                            "registerday": 2
                                        });
                                        res.send(rows1);
                                        //return rows1;
                                    });
                                }
                                connection.end();
                            } else {
                                console.log("Not last message");
                                rows.unshift({
                                    "ID": 27,
                                    "subject": "Welcome to Mother's Milk!",
                                    "message": "Welcome to Mother's Milk! We will be sending you text messages a few times each week over the next few weeks. We're glad you're participating!",
                                    "releasedate": "2014-03-29T10:00:00.000Z",
                                    "directmessage": 1,
                                    "inflag": 0,
                                    "nextmessage": -1,
                                    "day": 2,
                                    "lastmessage": 0,
                                    "inb": null,
                                    "outb": 1,
                                    "registerday": 2
                                });
                                res.send(rows);
                            }
                        } else {
                            rows.unshift({
                                "ID": 27,
                                "subject": "Welcome to Mother's Milk!",
                                "message": "Welcome to Mother's Milk! We will be sending you text messages a few times each week over the next few weeks. We're glad you're participating!",
                                "releasedate": "2014-03-29T10:00:00.000Z",
                                "directmessage": 1,
                                "inflag": 0,
                                "nextmessage": -1,
                                "day": 2,
                                "lastmessage": 0,
                                "inb": null,
                                "outb": 1,
                                "registerday": 2
                            });
                            res.send(rows);
                        }
                    });
                }
                connection.end();
            }
        });
    }
    console.log("Close");
    connection.end();
};

exports.spanishone = function(req, res){
    var finalMessages = new Array();
    console.log("Entered");
    var Id = req.params.id;
    if ((connection = openConnection())) {
        console.log("Connection Open");
        var queryString = "select allmessages, registerdate, status from participants where ID=" + Id;
        connection.query(queryString, function(err, rows, fields) {
            console.log("Error check");
            if (err) throw err;
            console.log("After throw");
            var registerDate = rows[0].registerdate;
            if (rows[0].allmessages) {
                console.log("entered allmessages");
                if (rows[0].status == 0) {
                    queryString = "select * from outboundspanish a, user" + Id +" b where a.ID = b.ID";
                }
                else {
                    queryString = "select * from outboundppspanish a, user" + Id +" b where a.ID = b.ID";
                }

                if ((connection = openConnection())) {
                    connection.query(queryString, function(err, rows, fields) {
                        if (err) throw err;
                        rows.unshift({
                            "ID": 27,
                            "subject": "¡Bienvenida a la Leche de Mamá!",
                            "message": " Vamos a mandarte mensajes de texto algunas veces por semana en las próximas semanas. Estamos contentos que vas a participar. ",
                            "releasedate": "2014-03-29T10:00:00.000Z",
                            "directmessage": 1,
                            "inflag": 0,
                            "nextmessage": -1,
                            "day": 2,
                            "lastmessage": 0,
                            "inb": null,
                            "outb": 0,
                            "registerday": 2
                        });
                        res.send(rows);
                    });
                    connection.end();
                }
            } else {
                console.log("Entered all else");
                if (rows[0].status == 0) {
                    queryString = "select * from outboundspanish a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday<=a.day AND a.releasedate<=now()";
                }
                else {
                    queryString = "select * from outboundppspanish a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday<=a.day AND a.releasedate<=now()";
                }

                if ((connection = openConnection())) {
                    connection.query(queryString, function(err, rows, fields) {
                        if (err) throw err;
                        if (rows[0] != undefined) {
                            if (rows[rows.length - 1].lastmessage) {
                                console.log("Last Message Check");
                                var abc1 = new Array();
                                var finalRows = new Array();
                                var startDate =new Date(2013, 10, 27);    //Month is 0-11 in JavaScript
                                var thisday = new Date();                        //Get 1 day in milliseconds
                                var one_day=1000*60*60*24
                                var daysSinceStart = ((thisday.getTime() - startDate.getTime())/one_day) % 30;

                                if (rows[0].status == 0) {
                                    queryString = "select * from outboundspanish a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday>a.day AND a.day<" + daysSinceStart;
                                }
                                else {
                                    queryString = "select * from outboundppspanish a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday>a.day AND a.day<" + daysSinceStart;
                                }


                                if ((connection = openConnection())) {
                                    connection.query(queryString, function(err, rows1, fields) {
                                        console.log("Date Check");
                                        if (err) throw err;
                                        finalRows = rows1.slice(0);
                                        finalMessages = rows1.slice(0);
                                        rows1 = rows1.concat(rows);
                                        console.log(rows1.length);
                                        if(rows1.length == 26) {
                                            if ((connection = openConnection())) {
                                                queryString = "update participants set allmessages = true where ID=" + Id;
                                                connection.query(queryString, function(err, rowdata, fields) {
                                                    if (err) throw err;
                                                });
                                            }
                                            connection.end();
                                        }
                                        rows1.unshift({
                                            "ID": 27,
                                            "subject": "¡Bienvenida a la Leche de Mamá!",
											"message": " Vamos a mandarte mensajes de texto algunas veces por semana en las próximas semanas. Estamos contentos que vas a participar. ",
											"releasedate": "2014-03-29T10:00:00.000Z",
											"directmessage": 1,
                                            "inflag": 0,
                                            "nextmessage": -1,
                                            "day": 2,
                                            "lastmessage": 0,
                                            "inb": null,
                                            "outb": 1,
                                            "registerday": 2
                                        });
                                        res.send(rows1);
                                        //return rows1;
                                    });
                                }
                                connection.end();
                            } else {
                                console.log("Not last message");
                                rows.unshift({
                                    "ID": 27,
                                    "subject": "¡Bienvenida a la Leche de Mamá!",
									"message": " Vamos a mandarte mensajes de texto algunas veces por semana en las próximas semanas. Estamos contentos que vas a participar. ",
									"releasedate": "2014-03-29T10:00:00.000Z",
									"directmessage": 1,
                                    "inflag": 0,
                                    "nextmessage": -1,
                                    "day": 2,
                                    "lastmessage": 0,
                                    "inb": null,
                                    "outb": 1,
                                    "registerday": 2
                                });
                                res.send(rows);
                            }
                        } else {
                            rows.unshift({
                                "ID": 27,
                                "subject": "¡Bienvenida a la Leche de Mamá!",
								"message": " Vamos a mandarte mensajes de texto algunas veces por semana en las próximas semanas. Estamos contentos que vas a participar. ",
								"releasedate": "2014-03-29T10:00:00.000Z",
								"directmessage": 1,
                                "inflag": 0,
                                "nextmessage": -1,
                                "day": 2,
                                "lastmessage": 0,
                                "inb": null,
                                "outb": 1,
                                "registerday": 2
                            });
                            res.send(rows);
                        }
                    });
                }
                connection.end();
            }
        });
    }
    console.log("Close");
    connection.end();
};

exports.addMessage = function(req, res) {
    var message = req.params.message;
    var id = req.params.email;
    var messageID = req.params.messageID;
    if((connection = openConnection())) {
        var queryString = "update user" + id + " set inb = '" + message + "'  where ID = '" + messageID + "'";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            var finalMessages = new Array();
            console.log("Entered");
            var Id = req.params.email;
            if ((connection = openConnection())) {
                var queryString = "select allmessages, registerdate from participants where ID=" + Id;
                connection.query(queryString, function(err, rows, fields) {
                    if (err) throw err;
                    var registerDate = rows[0].registerdate;
                    if (rows[0].allmessages) {
                        console.log("entered allmessages");
                        queryString = "select * from outbound a, user" + Id +" b where a.ID = b.ID";
                        connection.query(queryString, function(err, rows, fields) {
                            if (err) throw err;
                            res.send(rows);
                        });
                    } else {
                        console.log("Entered all else");
                        queryString = "select * from outbound a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday<=a.day AND a.releasedate<=now()";
                        connection = openConnection();
                        connection.query(queryString, function(err, rows, fields) {
                            if (err) throw err;
                            if (rows[0] != undefined) {
                                if (rows[rows.length - 1].lastmessage) {
                                    console.log("Last Message Check");
                                    var abc1 = new Array();
                                    var finalRows = new Array();
                                    var startDate =new Date(2013, 10, 27);    //Month is 0-11 in JavaScript
                                    var thisday = new Date();                        //Get 1 day in milliseconds
                                    var one_day=1000*60*60*24
                                    var daysSinceStart = ((thisday.getTime() - startDate.getTime())/one_day) % 30;
                                    queryString = "select * from outbound a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday>a.day AND a.day<" + daysSinceStart;
                                    connection = openConnection();
                                    connection.query(queryString, function(err, rows1, fields) {
                                        console.log("Date Check");
                                        if (err) throw err;
                                        finalRows = rows1.slice(0);
                                        finalMessages = rows1.slice(0);
                                        rows1 = rows1.concat(rows);
                                        console.log(rows1.length);
                                        if(rows1.length == 26) {
                                            queryString = "update participants set allmessages = true where ID=" + Id;
                                            connection.query(queryString, function(err, rowdata, fields) {
                                                if (err) throw err;
                                            });
                                        }
                                        res.send(rows1);
                                        //return rows1;
                                    });
                                    connection.end();
                                } else {
                                    console.log("Not last message");
                                    res.send(rows);
                                }
                            } else res.send();
                        });
                        connection.end();
                    }
                });
            }
            connection.end();
        });
    }
    connection.end();
};

exports.addFeedback = function(req, res) {
	
    var feedback = req.params.feedback;
    var lsRegExp = /'/g;

    feedback = String(feedback).replace(lsRegExp, "''");
    if((connection = openConnection())) {
		
        var queryString = "insert into feedback (feedback) values('" + feedback + "')";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("Success");
        });
    }
    connection.end();
};


exports.updateClicks = function(req, res) {

    var feedbackClicks = req.params.feedback;
    var aboutUsClicks = req.params.about;
    var facebookClicks = req.params.facebook;
    var textClicks = req.params.text;
    var tutorialClicks = req.params.tutorial;

    if((connection = openConnection())) {

        var queryString = "update clicks set aboutUs = aboutUs + " + aboutUsClicks + ", feedback = feedback + " + feedbackClicks + ", facebook = facebook +" + facebookClicks + ", text = text +" + textClicks + ", tutorial = tutorial +" + tutorialClicks;
        console.log(queryString);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows[0]);
            res.send("Success");
        });
    }
    connection.end();

};

exports.setMessageAsRead = function (req, res) {
    var id = req.params.id;
    var lsRegExp = /'/g;

    id = String(id).replace(lsRegExp, "''");
    var messageID = req.params.messageID;
    if((connection = openConnection())) {
        var queryString = "update user" + id + " set outb = true where ID = " + messageID;
        console.log(queryString);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            queryString = "select * from outbound a, user" + id + " b where a.ID = b.ID";
            connection = openConnection()
            connection.query(queryString, function(err, rows, fields) {
                if (err) throw err;
                console.log(rows[0].message);
                res.send(rows);
            });
            connection.end();
        });
    }
    connection.end();
};


exports.sendGCM = function(req, res){

	var sender = new gcm.Sender('AIzaSyDu7Q4sbbSFsDDbvJhXtNtgjbgh_W4UP04');
	var message = new gcm.Message();
	var id = req.params.id;
    var unreadCount = req.params.count;

	// Value the payload data to send...
	message.addData('message',"You have a new text message");
	message.addData('title','Mothers Milk' );
	message.addData('msgcnt',unreadCount); // Shows up in the notification in the status bar
	message.addData('soundname','Voicemail.wav'); //Sound to play upon notification receipt - put in the www folder in app
	message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
	message.delay_while_idle = 1;
	var registrationIds = [];
	registrationIds.push(id);
	sender.send(message, registrationIds, 4, function (err, result) {
		if (err) throw err;
		console.log(result);
	});				
    
};

exports.sendAPN = function(req, res){
	

	var id = req.params.id;
    var unreadCount = req.params.count;
	var myDeviceID = id;
	var myDevice = new apn.Device(myDeviceID);

    //var iPod = "87d23d29be406948bf1ed105e8ae8f193881711f2cd1c97b3f046d64f4cd78cb";
    //var myDevice = new apn.Device(iPod);

	// Instantiate a new message
	// and set message defaults
	var note = new apn.Notification();
	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.badge = unreadCount;
	note.sound = "Voicemail.wav";
	note.alert = "You have a new text message";
	note.payload = {'messageFrom': 'Mothers Milk'};
	note.device = myDevice;
	
	//console.log('done creating the note');
	
	var callback = function(errorNum, notification){
    	console.log('Error is: %s', errorNum);
    	console.log("Note " + notification);
	}
	
	var root = process.cwd();
	var options = {
    gateway: 'gateway.push.apple.com', // this URL is different for Apple's Production Servers and changes when you go to production
    errorCallback: callback,
    cert: root + '/routes/MMMPush_ProdCert.pem',
    key:  root + '/routes/MMMPush_ProdKey.pem',
    passphrase: 'Agil33h3alth',                 
    port: 2195,                       
    enhanced: true,                   
    cacheLength: 100                  
};
	
	var apnsConnection = new apn.Connection(options);

    apnsConnection.pushNotification(note, myDevice);
	    
};

