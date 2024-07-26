const express = require('express')
const router = express.Router()

// Route for create one pilotes
router.post('/insert', (req, res) => {
    const db = req.db
    const { completeName, constructorId, rank, raceId, totalWin } = req.body
    console.log(db)
    const query = `INSERT INTO pilotes (completeName, constructorId, rank, raceId, totalWin) VALUES (?,?,?,?,?)`
    db.run(query, [completeName, constructorId, rank,  raceId, totalWin], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
    })
})

// Route for get all pilotes
router.get('/', (req, res) => {
    const db = req.db
    const query = `SELECT * FROM pilotes`
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching pilotes:', err.message);
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(rows);
    })
})

module.exports = router;