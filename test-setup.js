// test-setup.js
require('dotenv');
const mongoose = require("mongoose");
const mongoDB = require("./config/db.config");
/* global beforeAll beforeEach afterEach afterAll */
const { seedDatabase } = require('./seeds');
// const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.promise = global.Promise

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

async function dropAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
    }
  }
}

module.exports = {
  setupDB (databaseName, runSaveMiddleware = false) {
    // Connect to Mongoose
    beforeAll(async () => {
      // const url = `mongodb://127.0.0.1:27017/${databaseName}`
      const url = mongoDB.testUrl;
      await mongoose.connect(url, {useNewUrlParser: true  })
      // jest.setTimeout(30000);

    })

    // Seeds database before each test
    beforeEach(async () => {
      await seedDatabase(runSaveMiddleware)
    })

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections()
    })

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections()
      await mongoose.connection.close()
    })
  }
}