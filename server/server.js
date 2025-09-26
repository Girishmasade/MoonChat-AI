import express from 'express'
import { config } from 'dotenv'
import connectDB from './src/config/database.config.js'

config({
    path: "./.env"
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 8000


connectDB()

app.get("/", (req, res) => {
    res.send("Server is runing")
})

app.listen("8800", () => {
    console.log(`server is successfully runing on the port: http://localhost:${port}/`);
})