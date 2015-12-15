var users = require("../../data/users.json");

function loadUser(req, res, next) {
    var user = req.user = users[req.params.name.toLowerCase()];
    if (!user) {
        req.error = "Niet gevonden";
        res.send('Niet gevonden of onbestaande gebruiker', 404)
        next();
    } else {
        next();
    }
}

module.exports = loadUser;