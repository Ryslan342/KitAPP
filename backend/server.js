const express = require("express");
const mongoose = require("mongoose");

const { mongodb, server, client } = require("./config.json");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(require("cookie-parser")(server["cookie-secret"]));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", client.host);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, *");

    next();
});

app.use("/sign/", require("./routers/sign.js"));
app.use("/hotels/", require("./routers/hotels.js"));

mongoose.connect(mongodb.url, { useNewUrlParser: true }, function (err) {
    if (err) {
        throw err;
    }

    console.log("Connected to database");

    app.listen(server.port, server.host, function (err) {
        if (err) {
            throw err;
        }

        console.log("Server compiled");
        console.log(`http://${server.host}:${server.port}`);
    });
});