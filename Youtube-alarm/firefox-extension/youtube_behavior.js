
//TO DO:
//The app must store watch duration in a day in a cookie, then store 7 days for displaying history per day.

//	Update the variable for storing time specific to each tab. Then update cookie everytime you close a tab.
//OR
//	Update one unique variable everytime you switch to a youtube video page, then update a cookie at the same time or at regular times



console.log("here we go");
var lastDuration = 0;
var startTime = new Date();
var lastDate = startTime.getDate();
var intervalSet = 5;
var intervalId;
var isWindowHidden;



document.addEventListener("focus", function() { // or the visibilitychange event
	startTime = new Date();
	intervalId = window.setInterval(updateDuration, intervalSet*1000);
});

document.addEventListener("blur", function() { // or visibilitychange
	clearInterval(intervalId); // clear interval
	let endTime = new Date();
	lastDuration = (endTime.getTime() - startTime.getTime())/1000;
	lastDate = endTime.getDate();
	browser.runtime.sendMessage({tdr: lastDuration, lstd : lastDate}).then(handleResponse);
});


function updateDuration() {
	lastDuration = intervalSet;
	let endTime = new Date();
	lastDate = endTime.getDate();
	browser.runtime.sendMessage({tdr: lastDuration, lstd : lastDate}).then(handleResponse);
	startTime = new Date();
}


function handleResponse(request){
  console.log("Message from the background script:");
  console.log(request.response);
}

//browser.runtime.onMessage.addListener((request) => {
//  console.log("Message from the background script:");
//  console.log(request.response);
//});


