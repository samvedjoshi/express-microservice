const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./Customer.js");
app.use(bodyParser.json());
const Customer = mongoose.model("Customer");
mongoose.connect('mongodb+srv://samved:samved@cluster0.a52pc.mongodb.net/customerdatabase?retryWrites=true&w=majority')
.then(value=>{
    console.log("The connection has been established with database..");
}).catch(err=>{
    console.log("Connection is unfortunately denied..Error : ",err);
})

app.post('/add-customer',(req,res)=>{
    const newcustomer = {
        name : req.body.name,
        age : req.body.age,
        address : req.body.address
    }
    const customer = new Customer(newcustomer);
    customer.save().then(value=>{
        res.json({"message":"Customer created!!"});
    }).catch(err=>{
        throw err;
    })
})

app.get('/customers',(req,res)=>{
    Customer.find().then(customer=>{
        if(customer){
            res.json(customer);
        }else{
            res.json({"message":"Invalid Id"})
        }
    }).catch(err=>{
        throw err;
    })
})

app.delete('/delete-customer/:id',(req,res)=>{
    Customer.findOneAndRemove(req.params.id).then(customer=>{
        if(customer){
            res.json({"message":"One customer was deleted.."});
        }else{
            res.json({"message":"Invalid Id"});
        }  
    }).catch(err=>{
        throw err;
    })
})


app.get('/customer/:id',(req,res)=>{
    Customer.findById(req.params.id).then(data=>{
        res.json(data);
    }).catch(err=>{
        throw err;
    })
})
 
app.listen(5555,(req,res)=>{
    console.log("The connection has been made...");
})