const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send('ok')
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