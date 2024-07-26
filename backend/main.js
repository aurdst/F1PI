const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const pilotesRoutes = require('./routes/pilotes/routesPilotes')

//Authorisation CORS Header here
app.use(cors())
app.use(bodyParser.json())

//Connexion a la bdd
const db = new sqlite3.Database('./db/pilotes', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Database connected')
})

const query = "CREATE TABLE IF NOT EXISTS pilotes (id SERIAL PRIMARY KEY, completeName VARCHAR(255), constructorId INTEGER, rank INTEGER UNIQUE, raceId INTEGER, totalWin INTEGER, CONSTRAINT fk_constructor FOREIGN KEY (constructorId) REFERENCES constructors(id), CONSTRAINT fk_race FOREIGN KEY (raceId) REFERENCES races(id))";

db.run(query, (err) => {
    if(err) {
        console.error('Error creating table', err.message)
    }
})

// Passer la connexion de base de données à vos routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/pilotes', pilotesRoutes);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`app running on ${port}`)
})

module.exports = db;