/*
 * start file van de applicatie
 * node als api cliënt gebruiken
 */

"use strict";

//1. nodige packages ophalen
var requestHandlers = require("./scripts/requesthandlers.js"),
    router = require("./scripts/router.js"),
    staticServer = require("./scripts/StaticServer.js");

//2. middleware ophalen
var handlers = {};
//handers["/"] = requestHandlers.root;
handlers["/getFile"] = requestHandlers.getFile;
handlers["/apiData"] = requestHandlers.apiData;

//3. initializeren inclusief middleware as dependancy
staticServer.init(router, handlers, 8080);