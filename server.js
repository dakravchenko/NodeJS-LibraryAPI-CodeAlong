const express = require("express")
const uuid = require("uuid")
const app = express();

app.use(express.json())

const data = require('./books.json')

// READ
// CREATE
// UPDATE
// DELETE

add.get('/books', (req, res) => {
    readBooks(req, res)
})
add.post('/books', (req, res) => {
    createBook(req, res)
})
add.put('/books/:id', (req, res) => {
    updateBook(req, res)
})
add.delete('/books/:id', (req, res) => {
    deleteBook(req, res)
})

app.listen(3000, () => {
    console.log('server is running')
})

function readBooks(req, res){
    res.setHeader("Content-type", "application/json")
    res.status(200)
    res.send(data)
}

function createBook(req, res){
    if (isInvalid(req)){
            res.status(400)
            res.send('invalid request')
            return;
         }
    const id = uuid();
    let newBook = {
        id : id,
        title: req.body.title,
        author: req.body.author
    }
        data.push(newBook)
        res.status(201)
        res.send(id)
}

function updateBook(req, res){
    if (isInvalid(req)){
        res.status(400)
        res.send('invalid request')
        return;
     }
     const bookToUpdate = data.find(book => book.id === req.params.id)
     if (typeof bookToUpdate === undefined) {
        res.status(404);
        res.send('No such book')
        return;
     }
     bookToUpdate.title = req.body.title
     bookToUpdate.author = req.body.author
     res.send('ok')
}

function deleteBook(req, res){
    const bookToDelete = data.find(book => book.id === req.params.id)
     if (typeof bookToDelete === undefined) {
        res.status(404);
        res.send('No such book')
        return;
     }
    data.splice(data.indexOf(indexOfBook), 1)
    res.send('ok')
}

function isInvalid(req){
    if ( typeof req.body === undefined || 
        typeof req.body.title === undefined || 
        typeof req.body.author === undefined) {
            return true
        } else {
            return false
        }
}