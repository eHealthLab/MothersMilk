var apn = require('apn');
			
			
//exports.sendAPN = function(req, res){
	
	console.log('inside apn node');
	//var id = req.params.id;
	//console.log('ios device token is:' + id);

	//var myDeviceID = id;
	//var myDevice = new apn.Device(myDeviceID);
	
	var myiPod = "87d23d29be406948bf1ed105e8ae8f193881711f2cd1c97b3f046d64f4cd78cb";
	//var myDevice = new apn.Device(myiPod);
	
	var myiPad = "ef3852133321138786f780402497cd85e934ec0970785b2be25e6503c971a276";
	var myDevice = new apn.Device(myiPad);
	
	// Instantiate a new message
	// and set message defaults
	var note = new apn.Notification();
	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.badge = 7;
	note.sound = "Voicemail.wav";
	note.alert = "You have a new message";
	note.payload = {'messageFrom': 'MMM'};
	note.device = myDevice;

	
	console.log('done creating the note');

	// List of user tokens
	//var userTokens = ['t8x6y1Upv81zhosRDNjP'];
	
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
}
	
	console.log('right before creating apnsconnection');
	
	var apnsConnection = new apn.Connection(options);
	
	console.log('done creating apnsconnection');
	
	// Send the message
	apnsConnection.sendNotification(note);	
	
	console.log('sent the notification');
	    
//};			