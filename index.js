const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
        const amountCollection = db.collection("Contribution")

        app.get("/issues",async(req,res)=>{
        const result = await issuesCollection.find().toArray()
        res.send(result)  
        })

        app.get("/issues/:id", async(req,res)=>{
          const {id} = req.params
          const result = await issuesCollection.findOne({_id: new ObjectId(id)})
          res.send(result)
        })

        app.post("/issues", async(req,res)=>{
          const data = req.body
          const result = await issuesCollection.insertOne (data)
           res.send({
            success:true,
            result
           })
        })

        app.get("/contribution",async(req,res)=>{
          const result= await amountCollection.find().toArray();
          res.send(result);
        })

        app.post("/contribution", async(req,res)=>{
          const data = req.body
          const result = await amountCollection.insertOne(data)
          res.send(result);
        })

        app.get("/latest-issues",async(req,res)=>{
          const result = await issuesCollection.find().sort({date:-1}).limit(6).toArray();
          res.send(result);
        })

        app.get("/myIssues",async(req,res)=>{
          const email = req.query.email;
          const result = await issuesCollection.find({email:email}).toArray();
          res.send(result);
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