const express = require('express')
const mustacheExpress = require('mustache-express')
const { MongoClient } = require('mongodb')

// Instanciate an express.js application
const app = express()
const port = 3000

// Configure mustache as the main views engine
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

// Connection URI
const host = 'mongo'
const username = 'root'
const password = 'verysecret'
const authMechanism = 'DEFAULT'
const uri = `mongodb://${username}:${password}@${host}/?authMechanism=${authMechanism}&w=majority`

// The homepage
app.get('/', async (req, res) => {
  // Create a new MongoClient
  const client = new MongoClient(uri)

  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    const database = client.db('petition')
    const signers = database.collection('signers')
    signers.find({}).toArray(function(err, items) {
      client.close();
      res.render('home.mustache', { signers: items.map(({ name }) => name) } )
    });
  } catch (error) {
    client.close();
    res.send('error')
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

(async () => {
  // Create a new MongoClient
  const client = new MongoClient(uri)

  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    const database = client.db('petition')
    const signers = database.collection('signers')
    const count = await signers.countDocuments()
    if (count > 0) {
      await signers.drop()
    }
    await signers.insertMany([
      { name: 'Marty McFly' },
      { name: 'Dr Brown' },
      { name: 'Luke Skywlaker' }
    ])
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
})().catch(e => {
  console.error(e)
});
