const express = require('express');
require('dotenv').config()
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000;

// midleware
app.use(express.json());
app.use(cors());

// database user name: siam 
// db password:mFRyZSAFExowx3U6


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdofc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const notesCollection = client.db("notesTaker").collection("notes");
        console.log('connected to db')

        // Get api for read all notes
        // api link: http://localhost:4000/notes
        app.get('/notes', async (req, res) => {
            const q = req.query;
            const cursor = notesCollection.find(q)
            const result = await cursor.toArray();
            res.send(result)
        })

        // Create notesTaker
        // api link: http://localhost:4000/note
        //   body:   {
        //           "name": "Zihan", "age": 28
        //           }
        app.post('/note', async (req, res) => {
            const data = req.body;
            console.log(data);

            const result = await notesCollection.insertOne(data);
            res.send(result);
        })

        // Update notes
        app.put('/note/:id', async (req, rse) => {
            const id = req.params.id;
            console.log('from put', id);
            const result = await notesCollection.updateOne(id)
            res.send(id)
        })

        // Delete notes
    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Hello Example app listening at http://localhost:${port}`)
})