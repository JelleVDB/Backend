function showHelp(){
	var menu = "Jelle's MENU";
	menu += "\n\nHow to use:";
	menu += "\n--help \t\t show this help file";
	menu += "\n--name <NAME> \t say welcome to <NAME>";

	console.log(menu);
}

if(process.argv[2] == "--help" || !process.argv[2]){
	showHelp();
	process.exit();
}


if(process.argv[2] == "--name"){
	console.log("Welcome", process.argv[3]);
}