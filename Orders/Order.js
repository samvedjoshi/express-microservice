const mongoose = require("mongoose");

mongoose.model("Order",{
    customerid : {
        type : mongoose.SchemaTypes.ObjectId,
        require : true
    },
    bookid : {
        type : mongoose.SchemaTypes.ObjectId,
        require : true
    },
    initialdate : {
        type : Date,
        require : true
    },
    deliverydata : {
        type : Date,
        require : true
    }
})