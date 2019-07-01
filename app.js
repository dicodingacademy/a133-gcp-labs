const express = require('express')
const sleep = require('sleep')
const app = express()

app.get('/', (req, res) => {

    // var name = "Dicoding"
    var randomNum = Math.floor(Math.random() * (5 - 0) + 0)

    if (randomNum === 0) {
        sleep.msleep(10000)
    }
    
    res.send(`Hello ${name}!`)
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is up and listening at port: ${PORT}`)
})
