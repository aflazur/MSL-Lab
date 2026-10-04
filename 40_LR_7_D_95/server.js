const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie_info'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/movie", (req, res) => { 
    const query = "SELECT Movie_ID,Movie_Name,Genre,Year,IMDb_Rating,director.Director_Name FROM movie JOIN director on movie.Director_ID = director.Person_ID";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching movie data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.post("/addmovie", (req, res) => {
    const { Movie_Name, Genre, Year, IMDb_Rating, Director_ID } = req.body;
    const query = "INSERT INTO movie (Movie_Name, Genre, Year, IMDb_Rating, Director_ID) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [Movie_Name, Genre, Year, IMDb_Rating, Director_ID], (err, results) => {
        if (err) {
            console.error('Error adding movie:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Movie added successfully' });
    });
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});