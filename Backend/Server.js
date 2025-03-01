const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {connectDB} = require('./Config/Connection')

connectDB()
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:'*'}))


app.listen(port,(req,res)=>{
    console.log(`Server is running on ${port}`)
})