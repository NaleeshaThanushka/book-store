import express, { request, response } from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';

const app = express();

app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('Hii..Naleesha')
})
//Route for save a new Book
app.post('/books', async(request, response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message : 'All fields required....Broooo'
            })
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        }
        const book = await Book.create(newBook);
        return response.status(201).send({
            message : 'Book added succesfully....',
            book
        })
    }catch(error){
        return response.status(500).send({
            message : error.message
        })
    }
})
//get all books from mongoDB
app.get('/books', async(request, response)=>{
    try{
    const books = await Book.find();
    return response.status(200).json({
        count: books.length,
        data : books,
    })
}catch(error){
    return response.status(500).json({
        messgae : error.message
    })
}
})

//Route for the get one book from database by ID
app.get('/books/:id', async(req, res)=>{
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        res.status(200).send(book);
    }catch(error){
        res.status(500).send({
            message : error.message
        })
    }
})


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`App listen to port: ${PORT}`);
        })
        console.log('App is connect to the database 🥵');
    })
    .catch( ()=>{
        console.log('App is not connect to the database 😢', error)
    })