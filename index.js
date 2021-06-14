const express = require('express');
const app = express();
const port = 3002;

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

let movreads = {status : 200, data : movies}

app.get('/movies/create', (req, res) =>{
    res.send(`{status:200, message:"create"}`)
})

app.get('/movies/read', (req, res) =>{
    res.send(movreads)
})

app.get('/movies/update', (req, res) =>{
    res.send(`{status:200, message:"update"}`)
})

app.get('/movies/delete', (req, res) =>{
    res.send(`{status:200, message:"delet"}`)
})


app.listen(port, () =>{
    console.log(`hello at http://localhost:${port}`)
})