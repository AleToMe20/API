const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
uuid = require('uuid');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

let users = [
{
  id: 1,
  name: "Kim",
  favoriteMovies: []
},
{
  id: 2,
  name: "Adjei",
  favoriteMovies:["AIR"]
},
];

let movies =[  
    {
      Title: 'Lord of the rings', 
      Description: "Set in the fictional world of Middle-earth, the films follow the hobbit Frodo Baggins as he and the Fellowship embark on a quest to destroy the One Ring, to ensure the destruction of its maker, the Dark Lord Sauron. The Fellowship eventually splits up and Frodo continues the quest with his loyal companion Sam and the treacherous Gollum. Meanwhile, Aragorn, heir in exile to the throne of Gondor, along with the elf Legolas, the dwarf Gimli, Merry, Pippin, and the wizard Gandalf, unite to save the Free Peoples of Middle-earth from the forces of Sauron and rally them in the War of the Ring to aid Frodo by distracting Sauron's attention.",
      Genre: {
        Name: "Fantasy",
        Description: "The Lord of the Rings is a series of three epic fantasy adventure films directed by Peter Jackson, based on the novel The Lord of the Rings by J. R. R. Tolkien.",
      },
      Director:{ 
        Name: 'Peter Jackson', 
        Bio:"Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien.",
      Birth: 1961,
    }, 
    ImgaeURL: "https://irs.www.warnerbros.com/keyart-jpeg/movies/…of_the_rings_fellowship_of_the_ring_2000x3000.jpg",
    Featured: "False",
  },

    { 
      Title: 'AIR', 
      Description: "From award-winning director Ben Affleck, AIR reveals the unbelievable game-changing partnership between a then-rookie Michael Jordan and Nike's fledgling basketball division which revolutionized the world of sports and contemporary culture with the Air Jordan brand. This moving story follows the career-defining gamble of an unconventional team with everything on the line, the uncompromising vision of a mother who knows the worth of her son’s immense talent, and the basketball phenom who would become the greatest of all time.",
      Genre: {
        Name: " Drama, Sports",
        Description: "A fact-based drama that no one will dunk on, Air aims to dramatize events that changed the sports world forever -- and hits almost nothing but net. Read critic reviews",
      },
      Director:{ 
        Name: 'Ben Affleck', 
        Bio:"Benjamin Géza Affleck is an American actor and filmmaker. His accolades include two Academy Awards. Affleck began his career as a child when he starred in the PBS educational series The Voyage of the Mimi. He later appeared in the independent comedy Dazed and Confused and various Kevin Smith films.",
      Birth: 1972,
    }, 
    ImgaeURL: "https://upload.wikimedia.org/wikipedia/en/d/de/AirFilmPoster.png",
    Featured: "False",
   },
    { 
      Title: '65',
      Description: "After a catastrophic crash on an unknown planet, pilot Mills quickly discovers he's actually stranded on Earth -- 65 million years ago. Now, with only one chance at a rescue, Mills and the only other survivor, Koa, must make their way across an unknown terrain riddled with dangerous prehistoric creatures.",
      Genre: {
        Name: "Sci-fi, Adventure, Action, Mystery & thriller",
        Description: "Sodden sci-fi that somehow finds a way to bungle Adam Driver fighting dinosaurs, 65 is closer to zero",
      },
      Director:{ 
        Name: 'Scott Beck, Bryan Woods', 
        Bio:"Scott Beck is the author-illustrator of many highly praised picture books for young children. His books have received starred reviews and such praise as “a soaring story-hour selection” (School Library Journal) and “perfect for sharing one-on-one” (Kirkus Reviews).",
      Birth: 1984,
    }, 
    ImgaeURL: "https://upload.wikimedia.org/wikipedia/en/c/c4/65_film_teaser_poster.jpg",
    Featured: "False",
    },
  ];

//CREATE
app.post('/users', (req, res) => {
const newUser = req.body;

if (newUser.name) {
  newUser.id = uuid.v4();
  users.push(newUser);
  res.status(201).json(newUser)
} else {
  res.status(400).send('user need names')
}
})

//UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  
 let user = users.find( user => user.id == id);
  
    if (user) {
      user.name = updatedUser.name;
      res.status(200).json(user);
    } else {
      res.status(400).send('no such user')
    }
 })

 // CREATE
 app.patch('/users/:id/favorites/:movieTitle', (req,res)=>{
  const{id, favoriteMovieTitle}=req.params;

  let user=users.find(user=>user.id == id);

  if(user){
      user.favoriteMovies.push(favoriteMovieTitle);
      res.status(201).send('movie added to your favorites list');
      console.log(favoriteMovieTitle);
  }else{
      res.status(400).send('movie not added');
  }
});

  // DELETE
app.delete('/users/:id/favorites/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;  
  let user = users.find( user => user.id == id);
    if (user) {
      user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
      res.status(200).send(`${movieTitle} has been removed to user ${id}'s array`);;
    } else {
      res.status(400).send('no such user')
    }
 })

   // DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;  
  let user = users.find( user => user.id == id);
    if (user) {
      users = users.filter( user => user.id != id);
      res.status(200).send(`user ${id} has been deleted`);;
    } else {
      res.status(400).send('no such user')
    }
 })

//Read
app.get('/movies', (req, res) => {
 res.status(200).json(movies)
})

//Read
app.get('/movies/:title', (req, res) => {
  const {title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if(movie){
      res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }
 })

 //Read
app.get('/movies/genre/:genreName', (req, res) => {
  const {genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if(genre){
      res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }
 })

  //Read
app.get('/movies/director/:directorName', (req, res) => {
  const {directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if(director){
      res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }
 })

  app.listen(8080, () => console.log('Server  listening on port 8080'))