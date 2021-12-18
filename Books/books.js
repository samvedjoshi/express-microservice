const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

require("./Book.js");
const Book = mongoose.model("Book");

mongoose.connect('mongodb+srv://samved:samved@cluster0.htmgc.mongodb.net/msdatabase?retryWrites=true&w=majority').then(value=>{
    console.log("MongoDB connection established!!");
}).catch(err=>{
    console.error(err);
    console.log("Error connecting to mongodb");
});

app.get("/",(req,res)=>{
    const title = req.query.title;
    res.send(`This nothing but represents the books service right here! info : ${title} `);
})

app.post("/create-book",(req,res)=>{
    console.log(req.body);
    let newbook ={
        title : req.body.title,
        author : req.body.author,
        noOfPages : req.body.noOfPages,
        publisher : req.body.publisher
    }
    const book = new Book(newbook);
    book.save().then(()=>{
        console.log("New book has been created!!");
    }).catch(err=>{
        throw err;
    })
    res.send();
})

app.get("/books",(req,res)=>{
    Book.find().then((book)=>{
        res.json(book);
    }).catch((err)=>{
        console.log(err);
    })
})

app.get("/book/:id",(req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        res.json(book);
    }).catch(err=>{
        res.send(err);
    })
})

app.delete("/book-delete/:id",(req,res)=>{
    Book.findOneAndRemove(req.params.id).then((book)=>{
        res.json({'message' : 'One book was deleted!'});
    }).catch((err)=>{
        res.json({'error':err});
    })
})

app.listen(4545, ()=>{
    console.log("Hold on! This is the books service");
}) 