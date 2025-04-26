const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error("MONGO_URL not defined in environment variables");
    process.exit(1);
}

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB connected successfully....');
    })
    .catch((err) => {
        console.log('Error in MongoDB connection....', err);
        process.exit(1);
    });
    


