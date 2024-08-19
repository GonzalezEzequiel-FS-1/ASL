const express = require('express');
const app = express()
const dotenv = require('dotenv')
dotenv.config();
app.use(express.json());
const routes = require('./routes')
app.use("/v1", routes);
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})