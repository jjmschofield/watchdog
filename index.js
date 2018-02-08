const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));
app.get('/', (req, res) => res.render('index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

