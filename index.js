const express = require('express');
const app = express();
const port = 3006;

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

app.get('/movies/create', (req, res) =>{
    res.send(`{status:200, message:"create"}`)
})

app.get('/movies/add', (req, res) =>{

    let createData 
    if (req.query.title !== "" && req.query.year !== "" &&  /^[0-9]{4}$/.test(req.query.year))
    {
        if (req.query.rating !== "" && req.query.rating !== undefined){
            movies.push({title : req.query.title, year : req.query.year, rating : req.query.rating })
            createData = {status : 200, data : movies}
    } else { 
        movies.push({title : req.query.title, year : req.query.year, rating : 4})
     createData = {status : 200, data : movies}
    }
 } else {
     createData = { status:403, error:true, message:'you cannot create a movie without providing a title and a year' }
 }
 res.send(createData);
})

// movies read
app.get('/movies/read', (req, res) =>{
    let movreads = {status : 200, data : movies}
    res.send(movreads)
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


app.get('/movies/update', (req, res) =>{
    res.send(`{status:200, message:"update"}`)
})

// delete data
app.get('/movies/delete', (req, res) =>{
    res.send(`{status:200, message:"delet"}`)
})


app.get('/movies/delete/:id', (req, res) =>{

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