const express = require("express");
const bodyParser = require("body-parser");

module.exports = {
    run: async (client) => {
        const app = express(); // Creates an app for your servers client

        app.use(bodyParser.json()); // Express modules / packages
        app.use(bodyParser.urlencoded({ extended: true })); // Express modules / packages

        app.use(express.static("frontend")); // load the files that are in the frontend directory

        app.get("/", (req, res) => {
            res.sendFile(process.cwd() + "/frontend/index.html"); // 
        });

        app.get("/docs", (req, res) => {
            res.sendFile(process.cwd() + "/frontend/docs/index.html");
        });

        app.get("/invite", (req, res) => {
            res.redirect("https://discord.com/api/oauth2/authorize?client_id=962141600304222268&permissions=8&scope=bot");
        });

        app.get("/error", (req, res) => {
            // When someone tries to visit the '/error' directory
            res.sendStatus(500); // Sends status codes to the client. find them https://www.restapitutorial.com/httpstatuscodes.html here
            res.send("Hello!"); // send html to the client
        });

        app.get("/req", (req, res) => {
            console.log(req.query);
            res.json(req.query); //send json to the client
        });

        app.get("/res", (req, res) => {
            /* Please note that this will error as multiple headers are sent to the client */
            res.send("Hello!");
            // or
            res.send("<p>Hello!</p>");

            res.json('{"hello":"hi","ping":"pong"}');

            res.sendStatus(200);
            //using res.send(200) is deprecated and will terminate the nodejs in future.

            res.sendFile("/home/runner/frontend/index.html");

            res.redirect("https://www.google.com");

            res.download(process.cwd() + "/frontend/index.html");
        });

        app.get("/get", (req, res) => {
            // On get request
        });

        app.post("/post", (req, res) => {
            // On post request
        });

        // and more for most request types

        app.route("/reqtypes")
            .get(function (req, res) {
                res.send("Get");
            })
            .post(function (req, res) {
                res.send("Post");
            })
            .put(function (req, res) {
                res.send("Put");
            });

        app.get("/multiple/paths", (req, res) => {
            // exist
        });

        app.get("/multiple/paths/also/work/*", (req, res) => {
            // used for 404 if no other get functions are triggered in this path
        });

        app.get("/*", (req, res) => {
            // used for 404 if no other get functions are triggered
        });

        app.listen(3000, () => console.log("server started"));
    },
};
