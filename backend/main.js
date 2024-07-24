const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

//Authorisation CORS Header here
app.use(cors())

//Connexion a la bdd
let db = new sqlite3.Database('./db/pilotes', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Database connected')
})

let query = "CREATE TABLE IF NOT EXISTS pilotes (id SERIAL PRIMARY KEY, completeName VARCHAR(255), constructorID INTEGER, raceID INTEGER, totalWin INTEGER, CONSTRAINT fk_constructor FOREIGN KEY (constructorID) REFERENCES constructors(id), CONSTRAINT fk_race FOREIGN KEY (raceID) REFERENCES races(id))";

db.run(query)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`app running on ${port}`)
})