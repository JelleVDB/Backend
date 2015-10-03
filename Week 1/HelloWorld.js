

//meerdere processen
setTimeout(function() {
	console.log(process.argv[0].toString());
}, 0);

//synchroon command
console.log("Hello World");

//alle functies zonder callback worden EERST uitgevoerd