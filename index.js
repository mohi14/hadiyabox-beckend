const express = require('express')
const cors = require('cors')
const {MongoClient, ServerApiVersion}= require('mongodb')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3dkasq3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const laptopsCollection = client.db('coomercio').collection('laptops');
        const brandsCollection = client.db('coomercio').collection('brands')
const usersCollection = client.db('coomercio').collection('users')



        app.get('/laptops', async(req,res)=>{
            const query ={};
            const laptops = await laptopsCollection.find(query).toArray();
            res.send(laptops)
        })

        app.get('/brands', async(req, res)=>{
            const query = {}
            const brands = await brandsCollection.find(query).toArray()
            res.send(brands)
        })

        app.get('/category/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = {
                category_Id: id,
                paid: false
            }
            const products = await laptopsCollection.find(filter).toArray()
            res.send(products)
        })

        app.get('/users', async(req,res)=>{
            const query = {};
            const users = await usersCollection.find(query).toArray()
            res.send(users)
        })

    }
    finally{

    }
}

run().catch(error=>console.error(error))


app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})