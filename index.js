import express from 'express'
import { db } from './db.js';
import { createId } from './function.js';

const app = express();
app.use(express.json())
/**
 * id
 * title
 * author
 * genre
 * publication date
 * price
 */
app.get("/books",(req,res)=>{
    res.json(db.books);
})
app.get('/books/:id',(req,res)=>{
    const id = req.params.id;
    const books = db.books;
    let book = undefined;
    const len = books.length;
    var i = 0;
    while(i<len){
        if(books[i].id == id){
            book = books[i]
            break
        }
        i++
    }
    if(book){
        res.send(book).status(200);
    }else{
        res.send({
            message:"No Book Found for the given id"
        }).status(404)
    }
})

app.post('/books',(req,res)=>{
    const body = req.body;
    const id = createId()
    db.books.push({
        id:id,
        ...body
    })
    console.log(db.books)
    res.json({
        "message":"Book Added Successfully",
        "books":{
            id:id,
            ...body,
        }
    })
})
app.put('/books/:id',(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const books = db.books;
    const len = books.length;
    var updatedBook;
    var i = 0;
    while(i<len){
        if(books[i].id == id){
            updatedBook = {...books[i],...body}
            books[i] = updatedBook
            break
        }
        i++
    }
    console.log(db)
    return res.send({
        message:"Book Updated Successfully",
        book:updatedBook
    })
})
app.delete('/books/:id',(req,res)=>{
    const id = req.params.id;
    const books = db.books;
    const len = books.length;
    const newBooks = books.filter(prop=>prop.id!=id)
    db.books = newBooks
    console.log(newBooks)
    return res.json({
        message:"Book Deleted Successfully",
    })
})
app.listen(3000,()=>{
    console.log("running")
})