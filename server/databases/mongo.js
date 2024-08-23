const { MongoClient } = require('mongodb');

// Replace these values with your own
const username = encodeURIComponent('root');
const password = encodeURIComponent('root');
// Cluster will be used with a host
// const clusterUrl = 'cluster0';
const dbName = 'main';

const authMechanism = "DEFAULT";

// Connection URI with authentication
const uri = `mongodb://${username}:${password}@localhost:27017/?authMechanism=${authMechanism}`;
// Create a new MongoClient instance
let client;

async function connection() {
  if (!client) {
    client = new MongoClient(uri);

    try {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db(dbName); // Get the specific database instance
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    }
  }
  return db; // Return the database instance
}

module.exports = connection;