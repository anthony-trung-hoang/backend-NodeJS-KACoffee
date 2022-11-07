// File: using to run server
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app config
viewEngine(app);
initRoutes(app);

// run app
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Our server is running on port", port);
})

