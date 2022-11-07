import express from "express";

let router = express.Router();

let initRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send('Hello World from web.js');
    });
    return app.use("/", router);
}


module.exports = initRoutes;