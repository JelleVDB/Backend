var delay = 1000;
var users = [];
var userIds = [1,2,3,4,5,6,7,8,9];


function loadSync(element, delay) {
	var start = new Date().getTime();
	while (new Date().getTime() - start < delay) {
//just wait
	}
	return "element " + element + " loaded";
}
//monitoren van synchrone doorlooptijd
function loadArraySynchroon(array, elements) {
	var start = new Date().getTime();
	for (element in elements) {
		array[element] = loadSync(element, delay);
		console.log(array[element]); //informatie wanneer ingeladen
	}
	return (new Date().getTime() - start) + "\n";
}




function loadAsync(element, cb) {
	setTimeout(function () {
		cb("Element " + element + " loaded async");
	}, delay);
}

function loadArrayAsync(arrayA, elements, cb) {
	var counter = 0;
	for (var element in elements) {
		loadAsync(element, function (element) {
			arrayA[element] = element;
			console.log(arrayA[element]);
			
			if (++counter === elements.length) {
				//console.log(new Date().getTime() - start)
				cb(arrayA);
			};
		});
	};
		//NIET hier callback nog lopende
}




/*function loadAsync(element) {
	setTimeout(function () {
		console.log("element " + element + " loaded");
	}, delay);
}
//monitoren van asynchrone doorlooptijd
function loadArrayAsynchroon(array, elements, callback) {
	var start = new Date().getTime();
	elements.forEach(callback);
	return (new Date().getTime() - start) + "\n";
}*/



console.log("synchroon load time: ", loadArraySynchroon(users, userIds));


var start = new Date().getTime();

loadArrayAsync(users, userIds, function (users) {
	console.log("async loadtime: ", (new Date().getTime() - start))
});