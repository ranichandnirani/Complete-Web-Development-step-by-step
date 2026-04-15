import express from 'express';

const app = express()
const port = 3000
app.use(express.json())

let teaData = []
let nextId = 1

app.post('/teas', (req, res) => {

    const { name, price } = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
});

app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}..`)
});