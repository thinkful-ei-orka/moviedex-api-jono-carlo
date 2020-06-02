const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

app.get('/movie', (req, res) => {})

const PORT = 8000;

app.listen(PORT, () => {
    console.log('Server started on PORT 8000')
})