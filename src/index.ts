import express, {Request, Response } from "express"

const app = express()

app.get("/", (req:Request, res:Response) =>{
    return res.json({
        status:"angela "
    })
})

app.listen(8001, ()=> console.log("listening on port 8001"))