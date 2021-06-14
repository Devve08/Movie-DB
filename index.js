const express = require('express');
const app = express();
const port = 3001;

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

app.listen(port, () =>{
    console.log(`hello at http://localhost:${port}`)
})