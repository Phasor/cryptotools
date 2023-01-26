require('dotenv').config({path: '.env'});
const http = require('http');
const mongoose = require('mongoose');

const handle = (req, res) => {
    res.write("Server is running");
    res.end();
}

const connectionString = process.env.NODE_ENV == "development" ? process.env.DB_STRING_DEV : process.env.DB_STRING_PROD;

const connectToMongoDB = async () => {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if(err){
            console.error(err)
        } else {
            console.log(`Database connected to ${mongoose.connection.host}`);
        }
    });
};

const server = http.createServer(handle);

connectToMongoDB();

server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
});
