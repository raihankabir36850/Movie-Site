// Importing module
import express from 'express';
import { add } from './index';

const app = express();
const PORT:Number=3000;

const moviesData = [
    {
        id: 1,
        title: 'Avengers: Endgame'
    },
    {
        id: 2,
        title: 'Avengers: Infinity War'
    },
    {
        id: 3,
        title: 'Avengers: Infinity War'
    },
    {
        id: 4,
        title: 'Avengers: Infinity War'
    },
    {
        id: 5,
        title: 'Avengers: Infinity War'
    }
]


// Handling GET / Request
app.get('/api/movies', (req, res) => {
    res.send(moviesData);
})

// Server setup
app.listen(PORT,() => {
    console.log('The application is listening'
          + 'on port http://localhost:'+PORT);
})