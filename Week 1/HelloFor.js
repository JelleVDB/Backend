

//zelfde werkwijze, negatieve for lus is IETS rapper
for(var i=0; i< process.argv.length; i++)
{
	console.log(process.argv[i]);
}

console.log("--------------------");

//MIX NOET synchroon (for) & asynchroon
for(var i=process.argv.length-1; i>= 0; i--)
{
	console.log(process.argv[i]);
	setTimeout(function() {console.log(i);}, 0);
}

console.log("--------------------");

//bestaan for asynchroon ? => process.argv.forEach(el, function(){});