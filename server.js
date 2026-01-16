const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'd26893.mysql.zonevs.eu',
    user: 'd26893_busstops',
    password: '3w7PYquFJhver0!KdOfF',
    database: 'd26893_busstops'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database!');
});

app.get('/stops', (req, res) => {
    const sql = 'SELECT * FROM ivanalek_stop';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/buses/:stopName', (req, res) => {
    const stopName = req.params.stopName;
    const sql = `
        SELECT t.bus_number, d.direction
        FROM ivanalekstop_times t
        LEFT JOIN ivanalek_directions d
        ON t.stop_name = d.stop_name AND t.bus_number = d.bus_number
        WHERE t.stop_name = ?
        ORDER BY CAST(t.bus_number AS UNSIGNED), t.bus_number
    `;
    db.query(sql, [stopName], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/nearest-stop', (req, res) => {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const sql = 'SELECT stop_name, stop_lat, stop_lon FROM ivanalek_stop';
    db.query(sql, (err, results) => {
        if (err) throw err;

        let nearestStop = null;
        let minDistance = Infinity;

        results.forEach(stop => {
            const d = Math.sqrt(Math.pow(stop.stop_lat - lat, 2) + Math.pow(stop.stop_lon - lon, 2));
            if (d < minDistance) {
                minDistance = d;
                nearestStop = stop;
            }
        });

        res.json(nearestStop);
    });
});

app.get('/arrival-times', (req, res) => {
    const stopName = req.query.stop_name;
    const busNumber = req.query.bus_number;

    const sql = `
        SELECT arrival_time
        FROM ivanalek_arrival
        WHERE stop_name = ? AND bus_number = ?
        ORDER BY arrival_time ASC
        LIMIT 5
    `;
    db.query(sql, [stopName, busNumber], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
