import "./config/env.js"
import express from 'express';
import serverConfig from "./config/server.config.js";

// express app
const app = express();

// middlewares
// routes
// testing route
app.get("/",(req,res)=>{
    res.status(200).send({
        succes : true,
        message : "Hello world"
    })
})
// global error handler
app.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port : ${serverConfig.PORT}`);
});
