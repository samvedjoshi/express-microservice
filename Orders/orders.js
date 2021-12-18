const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json());
require("./Order.js");
const Order = mongoose.model('Order');
mongoose.connect('mongodb+srv://samved:samved@cluster0.cdcle.mongodb.net/orderdatabase?retryWrites=true&w=majority').then(value=>{
    console.log("Connected to mongodb atlas succesfully!!");
}).catch(err=>{
    console.log("Error connecting to mongodb atlas");
})

app.post('/order-create',(req,res)=>{
    const neworder = {
        customerid : mongoose.Types.ObjectId(req.body.customerid),
        bookid : mongoose.Types.ObjectId(req.body.bookid),
        initialdate : req.body.initialdate,
        deliverydate : req.body.deliverydate
    }
    const order = new Order(neworder);
    order.save().then(data=>{
        res.json({"message":"New order created"});
    }).catch(err=>{
        throw err;
    })
})

app.get("/orders",(req,res)=>{
    Order.find().then(order=>{
        res.json(order);
    }).catch(err=>{
        throw err;
    })
})

app.get('/order/:id',(req,res)=>{
    Order.findById(req.params.id).then(order=>{
        let customerid = order.customerid;
        let bookid = order.bookid;
    }).catch(err=>{
        throw err;
    })
    if(customerid && orderid){
        booktitle = "";
        customername = "";
        axios.get(`http://localhost:4545/book/${bookid}`).then(response=>{
            booktitle = response.data.title;
        }).catch(err=>{
            throw err;
        })
        axios.get(`http://localhost:5555/customer/${customerid}`).then(response=>{
            customername = response.data.name;
        }).catch(err=>{
            throw err;
        })
        const details = {
            "title" : booktitle,
            "customername" : customername
        }
        res.json(details);
    }else{
        res.json({'message':'Invalid order'})
    }
})

app.connect(7777,(req,res)=>{
    console.log("Connection made with the server..!!");
})