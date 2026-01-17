import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router();

router.post('/', async(request, response)=>{
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
router.get('/', async(request, response)=>{
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
router.get('/:id', async(req, res)=>{
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
//Route for update a book
router.put('/:id', async(request, response)=>{
    try{
        const { title, author, publishYear } = request.body;
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).json({
                message: 'All fields required'
            })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(
            id,
            request.body,
            {new:true}
        )
        if(!result){
            return response.status(500).json({
                message : 'Book not found'
            })
        }else{
            return response.status(200).json({
                message : 'Book updated successfully....🤝'
            })
        }
    }catch(error){
        console.log(error.message)
        return response.status(500).json({
            messgae : error.message
        })
    };
})

router.delete('/:id', async (request, response)=>{
    try{
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).send({
                message : 'Book Not Found 😢'
            })
        }else{
            return response.status(200).send({
                message : 'Book deleted successfully 🤝'
            })
        }
    }catch(error){
        console.log(error.message);
        response.status(500).json({
            message : error.message
        })
    }
})

export default router;