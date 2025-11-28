const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const uri ="mongodb+srv://EnvironmentalDB:4PsDeTTgNwZqHufU@cluster0.3xhvrfl.mongodb.net/?appName=Cluster0" ;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try{
        await client.connect();
        const db = client.db("Environment_issues_DB");
        const issuesCollection = db.collection("Issues");

        app.get("/",async(req,res)=>{
        const result = await issuesCollection.find().toArray()

        res.send(result)  
        })

        await client.db("admin").command({ping:1});
        console.log("pinged");

    }
    finally{

    }
    
}

run().catch(console.dir);



app.listen(port,()=>{
    console.log(`port: ${port}`)
})