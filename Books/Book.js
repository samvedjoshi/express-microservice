const { MongoTopologyClosedError } = require("mongodb");
const mongoose = require("mongoose");


mongoose.model( "Book",
    {
        author:{
            type : String,
            require: true,
        },
        title:{
            type: String,
            require : true,
        },
        publisher : {
            type: String,
            require : false,
        },
        noOfPages : {
            type : Number,
            require : false,
        }
    }
)