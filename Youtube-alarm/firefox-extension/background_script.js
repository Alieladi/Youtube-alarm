
var title = "youtube watching time during today";
var content = "Watching youtube for over ";
var contentTime = 0;
var notifyCounter = 0;
var notifyInterval = 20;
var globalDuration;
var firstNotification = true;


// 7 last days and display then porting 

// PUT LAST DATE SO THAT IT RESETS ON THE NEXT DAY WHEN THE DATE IS LATER THAN THE LAST DATE RECORDED

function updateAndNotify(message, sender, response) { 
// see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Sending_an_asynchronous_response_using_a_Promise
	console.log("Message from the content script:");
  	let duration = message.tdr;
  	let date = message.lstd;
  
  	var td = {
             	name: "youtube_log",
             	totalDuration: duration,
             	lastDate: date
	};

	// options from options page:
	var storageItem = browser.storage.sync.get('timespec')
	storageItem.then((res) => {
		console.log(res);
		if (notifyInterval != res.timespec){
			notifyInterval = res.timespec;
			notifyCounter = 0;
			console.log("%cchange of intervall! ", "color: blue");
		}} , (rej) => {console.log("no notifyIntervall in options page");}
	);


  	getting_storage = browser.storage.local.get("td");
  	return getting_storage.then((pasttd) => { // then returns a promise that the resolve is returned
	    	if(pasttd.td && pasttd.td.lastDate == date) {
	      		console.log("past time duration: "+ pasttd.td.totalDuration);
	      		console.log("added time duration: "+ td.totalDuration);
	      		td.totalDuration += pasttd.td.totalDuration;
	    	}
	    	browser.storage.local.set({td});
	    	globalDuration = td.totalDuration;
	    	let tobe = Math.floor(globalDuration / notifyInterval);
	    	console.log("tobe and globalD: "+ tobe+" "+globalDuration+ " "+ notifyCounter);
		console.log(Boolean(notifyCounter));
		if (firstNotification) 
			{
				notifyCounter = tobe;
				firstNotification = false;
			} 	
		else if (tobe > notifyCounter){
			console.log("%cNotif! "+tobe+" "+globalDuration+" "+ notifyCounter+" "+ notifyInterval, "color: blue");
	      		notifyCounter = tobe;
	      		browser.notifications.create("duration-notification", {
				"type": "basic",
				"title": title,
				"message": content + tobe*notifyInterval + " seconds"
	      		});
	    	}
		return {response: globalDuration}
	  }
	    	// TO DO onError
	  );
//	return new Promise(resolve => {
//    		resolve({response: globalDuration});
//    	});
//	return {response: globalDuration};
}

browser.runtime.onMessage.addListener(updateAndNotify);
