require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const moviedex = require('./moviedex')

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json( { error: 'Unauthorized request' } )
    }

    next()
})

app.get('/movie', (req, res) => {
    const {genre, country, avg_vote} = req.query;
    let results = [...moviedex];
    let voteNum = Number(avg_vote);
    
    if(voteNum === NaN) {
        return res.status(400).json({ error: 'average vote must be a number'})
    }
        
    if (genre) {
        results = results.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase())
        )
    }
    if (country) {
        results = results.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()))
    }
    if (avg_vote) {
        results = results.filter(movie => movie.avg_vote >= voteNum)
    }

    res.json(results)
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log('Server started on PORT 8000')
})