function saveOptions(e) {
	browser.storage.sync.set({
		timespec: document.querySelector("#time-spec").value
	});
	e.preventDefault();
}

function restoreOptions() {
	var storageItem = browser.storage.sync.get('timespec');  // or storage.sync or storage.managed
	storageItem.then((res) => {
  		document.querySelector("#managed-time-spec").innerText = res.timespec;
	});

	var gettingItem = browser.storage.sync.get('timespec');
	gettingItem.then((res) => {
  		document.querySelector("#time-spec").value = res.timespec;
  	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
