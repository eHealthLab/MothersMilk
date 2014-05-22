var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyARYiYQh2htvdr32FVj7gm4e4b_dqZbOxE');
var message = new gcm.Message();

// Value the payload data to send...
message.addData('message',"You have a new text message");
message.addData('title','Push Notification Sample' );
//message.addData('msgcnt','1'); // Shows up in the notification in the status bar
message.addData('soundname','Voicemail.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

//message.addData('key1','testdarinodegcm');
message.delay_while_idle = 1;
var registrationIds = [];
registrationIds.push('APA91bEAeXkbJ98pCZqygyusQdXc_QBl2QNnv18uYC_UKNBN3pipmqJ7YpEz4nOPWTFpCO2eoyaRBPSZ9GSwumYXeTyjfTYWCv9i8Ao6bJNB_vQmV2DaOv6tf-FcxmX2c77qnQ6o-SpizHOgt7jMm43b5W53mv2ToA');
sender.send(message, registrationIds, 4, function (err, result) {
console.log(result);
			});