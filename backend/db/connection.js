const mongoose = require("mongoose");

const connectionOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
};

const connectionString = 'mongodb+srv://nikhilkumarsingh123456:RRU3iA80ZmPQreFm@cluster0.wp72xji.mongodb.net/teacherpoolDB?retryWrites=true&w=majority';

mongoose.connect(connectionString, connectionOptions)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });

