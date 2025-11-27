const express = require("express");
const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// const uri ="" ;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//     try{
//         await client.connect()

//     }
//     finally{

//     }
    
// }

// run().catch(console.dir);

app.get("/",(req,res)=>{
    res.send(" local server")
})

app.listen(port,()=>{
    console.log(`port: ${port}`)
})