const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.sendStatus(200)
    console.log('Bot is online!');
})

app.listen(process.env.PORT)