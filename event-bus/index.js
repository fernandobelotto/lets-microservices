const express = require('express');
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(cors())

const events = []

app.post('/events', (req, res) => {


    const event = req.body

    events.push(event)

    const ports = [4000, 4001, 4002, 4003]    

    for(let port of ports) {

        console.log(`enviando evento para ms ${port}`)
        axios.post(`http://localhost:${port}/events` , event)
        .then(() => {
            console.log(`evento ${event.type} enviado com sucesso para ${port}`)
        })
        .catch(() => console.log(`falha ao enviar para o ms ${port}`))
    }

    res.json({})
})


app.get('/events', (req, res) => {
    res.json(events)
})

app.listen(4005, () => {
    console.log('listening on http://localhost:4005')
})