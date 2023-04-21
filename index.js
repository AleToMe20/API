const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/movies', (req, res) => {
    let myTenMovies = [
        { title: 'Lord of the rings', director: 'Peter Jackson', year: 2001 },
        { title: 'Harry Potter and the Philosophers Stone', director: 'Chris Columbus',  year: 2001 },
        { title: 'AIR', director: 'Agnès Varda', year: 2023 },
        { title: 'DUNGEONS & DRAGONS: HONOR AMONG THIEVES', director: 'Jonathan M. Goldstein',  year: 2023 },
        { title: 'SUZUME', director: 'Makoto Shinkai',  year: 2022 },
        { title: 'JOHN WICK: CHAPTER 4', director: 'Chad Stahelski',  year: 2023 },
        { title: 'THE LAST KINGDOM: SEVEN KINGS MUST DIE', director: 'Edward Bazalgette', year: 2023 },
        { title: '65', director: ' Scott Beck, Bryan Woods', year: 2023 },
        { title: 'SHAZAM! FURY OF THE GODS', director: 'David F. Sandberg', year: 2023 },
        { title: 'Fight Club', director: 'David Fincher', year: 1999 }
      ];
      res.json(myTenMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to my movie API!');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Error!');
  });

  app.listen(8080, () => {
    console.log('Server listening on port 8080');
  });