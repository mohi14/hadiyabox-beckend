const express = require('express')
const cors = require('cors')
const {MongoClient, ServerApiVersion, ObjectId}= require('mongodb')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(cors())

function verifyJWT(req, res, next){
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).send('unauthorized')
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded){
        if(err){
            return res.status(403).send({message: "forbidden access"})
        }
        req.decoded = decoded;
        next()
    })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3dkasq3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        // data collections
        const laptopsCollection = client.db('coomercio').collection('laptops');
        const brandsCollection = client.db('coomercio').collection('brands')
        const usersCollection = client.db('coomercio').collection('users')
        const bookingsCollection = client.db('coomercio').collection('bookings')

        // api
        app.get('/api/laptops', async(req,res)=>{
            const query ={};
            const laptops = await laptopsCollection.find(query).toArray();
            res.send(laptops)
        })

        app.get('/api/brands', async(req, res)=>{
            const query = {}
            const brands = await brandsCollection.find(query).toArray()
            res.send(brands)
        })

        app.get('/api/category/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = {
                category_Id: id,
                paid: false
            }
            const products = await laptopsCollection.find(filter).toArray()
            res.send(products)
        })

        app.get('/api/users', async(req,res)=>{
            const query = {};
            const users = await usersCollection.find(query).toArray()
            res.send(users)
        })

        app.post('/api/users', async(req,res)=>{
            const user = req.body;
            const filter = {
                email: user.email
            }
            const alreadySignup = await usersCollection.find(filter).toArray()
            if(alreadySignup.length){
                const message = "User already sign in"
                return res.send({acknowledged: false, message})
            }
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })

        app.get('/api/sellers', async(req,res)=>{
            const query = {
                role: "Seller"
            }
            const sellers = await usersCollection.find(query).toArray()
            res.send(sellers);
        })

        app.get('/api/sellers/:id', async(req,res)=>{
            const email = req.params.id
            const query ={
                email: email
            }
            const result = await usersCollection.findOne(query)
            res.send(result)
        })

        app.delete('/api/sellers/:id', async(req,res)=>{
            const id = req.params.id
            const filter = {_id: ObjectId(id)}
            const result = await usersCollection.deleteOne(filter)
            res.send(result)
        })

        app.put('/api/sellers/:id', async(req,res)=>{
            const email = req.params.id
            const filter = {email: email}
            const options = {upsert: true};
            const updateDoc = {
                $set:{
                    status: true
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc, options)
            
            const query = {
                seller_email: email
            }
            const update = {
                $set:{
                    sellerVerified: true
                }
            }
            const sellerVerification = await laptopsCollection.updateMany(query, update)

        res.send(result)
        })

        app.get('/api/buyers', async(req,res)=>{
            const query = {
                role: "Buyer"
            }
            const buyers = await usersCollection.find(query).toArray()
            res.send(buyers)
        })

        app.delete('/api/buyers/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)}
            const result = await usersCollection.deleteOne(filter)
            res.send(result)
        })

        app.get('/api/bookings', async(req,res)=>{
            const email = req.query.email
            const query = {
                email: email
            }
            const result = await bookingsCollection.find(query).toArray()
            res.send(result)
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