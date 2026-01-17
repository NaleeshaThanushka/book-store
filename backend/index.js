import express, { request, response } from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import bookRoute from './routes/bookRoutes.js'
import cors from "cors"

const app = express();
app.use('/books', bookRoute);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('Hii..Naleesha')
})
//Route for save a new Book

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