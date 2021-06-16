const express = require('express');
const app = express();
const port = 4008;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const uri = "mongodb+srv://Devve08:abousafa123@movies.cj5gi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('connected', () => {
    console.log('connected')
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/user', (req, res) => {
    res.json({
        message : "welcome to database"
    })
})

app.post('/user/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403)
        } else {

            res.json({
                message : "Post created", 
                authData
            })

        }
    })
    
})

app.post('/user/login', (req, res) => {
    const user= {
        username : 'Devve',
        password : '1234'
    }
    jwt.sign({user: user}, 'secretkey', (err, token) =>{
        res.json({
            token : token
        })
    });
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ')

        const bearerToken = bearer[1]
        
        req.token = bearerToken

        next()

    } else {
        res.sendStatus(403);
    }
}

let movieSchema = new mongoose.Schema({
    title : {type: String, required: true},
    year : {type : Number, min:1000, max:3000, required: true},
    rating : {type : Number, default: 4}

})

let movieDB = mongoose.model('movieD', movieSchema);


app.get('/', (req, res) =>{
    res.send('ok')
})

// display search data
app.get('/search', (req, res) =>{

    let searchData 
    if (req.query.s != ""){
        searchData = { status: 200, message : "ok", data : req.query.s}
    } else {
        searchData = {status: 500, error: true, message:"you have to provide a search"}
    }
    res.send(searchData)
})

// display hello id when /hello/ID invoked
app.get('/hello/:id', (req, res) =>{
    res.send(`{status:200, message:${req.params.id}}`)
})


// display time when /time is invoked


    let x = new Date()
    let y = x.getHours()
    let z = x.getMinutes()


app.get('/time', (req, res) =>{
    res.send(`{status:200, message: ${y}:${z}}`)
})
// display ok when /text invoked
app.get('/test', (req, res) =>{
    res.send(`{status:200, message:"ok"}`)
})

//CRUD setup 

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

// movies create

app.post('/movies/create', (req, res) =>{
    res.send(`{status:200, message:"create"}`)
})

app.post('/movies/:add', (req, res) =>{
    

    const movieData = new movieDB([{
        title : req.query.title,
        year : req.query.year,
        rating : req.query.rating

    }])
    console.log(req.query.year)
    movieData.save((err, movieData) =>{
        if (err){
            res.send("error");
        } else res.send({ status: 200, data: movieData});
    } )

})

// movies read
app.get('/movies/read', (req, res) =>{
    try {
        let read = movieSchema
        res.send(read)
    } catch(err){
        res.send("error" + err)
    }
})

app.get('/movies/read/by-date', (req, res) =>{

    let sorted =  movies.sort(function(a, b){
            return a.year - b.year
        })
    
    res.send({status : 200, data : sorted })
})

app.get('/movies/read/by-rating', (req, res) =>{
    let sortRating = movies.sort(function(a, b){
        return b.rating - a.rating
    })
    res.send({status : 200, data : sortRating})
})

app.get('/movies/read/by-title', (req, res) =>{
    let sortTitle = movies.sort(function(a, b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    res.send({ status : 200, data : sortTitle})
})

app.get('/movies/read/id/:id', (req, res) =>{

    if (req.params.id >= 0 && req.params.id < movies.length){

        res.send({status : 200, data : movies[req.params.id]})
    } else {
        res.send({status:404, error:true, message:'the movie <ID> does not exist'})
    }
    
})

// update data

app.put('/movies/update', (req, res) =>{
    res.send(`{status:200, message:"update"}`)
})

app.put('/movies/update/:id', verifyToken, (req, res) =>{
    let idUpdate = req.params.id
    let newTitle = req.query.title
    let newRating = req.query.rating
    let newYear = req.query.year
    let titleUpdate

    jwt.verify(req.token, "secretkey", (err, authData) => {

        if(err) {
            res.sendStatus(403);
        } else{
            if(idUpdate < movies.length && idUpdate >= 0 && /\d+/.test(idUpdate)){
        if(newTitle){
            movies[idUpdate].title = newTitle
        }

        if(newRating){
            movies[idUpdate].rating = newRating
        }
        
        if(newYear){
            movies[idUpdate].year = newYear 

        }

        res.send({
            status: 200,
            data: movies,
            authData: authData
        })
       
    


    } else 
    titleUpdate= "error"
    
    res.send({
        status:404,
        error: true,
        message: "The movie id does not exist"})}
})
    
})
// delete data
app.delete('/movies/delete', (req, res) =>{
    res.send(`{status:200, message:"delete"}`)
})


app.delete('/movies/delete/:id', (req, res) =>{

    let operation
    let result
    let movieId = req.params.id
    if ( /\d+/.test(movieId) && movieId !== "" && movieId !== undefined && movieId < movies.length){
       operation= movies.splice(movieId, 1)
       result = {status: 200, data : movies}
    } else {
        result = {status:404, error:true, message:'the movie <ID> does not exist'}
    }
    res.send(result)
})

app.listen(port, () =>{
    console.log(`hello at http://localhost:${port}`)
})