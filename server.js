const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet =require('helmet');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.get('/movie', (req, res) => {})

const PORT = 8000;

app.listen(PORT, () => {
    console.log('Server started on PORT 8000')
})