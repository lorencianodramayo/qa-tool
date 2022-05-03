const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

const app = express();

//routes
const adlib = require('./routes/api/adlib');
const graham = require('./routes/api/graham');

//connect to mongo
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("mongoose connected")
});

//data parsing & data limit
app.use(express.json({limit: "1000mb"}));
app.use(
    cors({
        allowHeaders: ["sessionId", "Content-Type"],
        exposeHeaders: ["sessionId"],
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
    })
);

app.use(express.urlencoded({
    limit: "1000mb",
    extended: false
}));

//heroku post build
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

//http request logger
app.use(morgan("tiny"));

//api declaration
app.use("/adlib", adlib);
app.use("/graham", graham);

//running on runtime
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
})

//listen to port
app.listen(process.env.PORT || 8080, console.log("Uses port"))