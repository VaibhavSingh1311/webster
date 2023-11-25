import express from "express";
import { MongoClient } from "mongodb"; // Correct import statement

const app = express();
const port = 55000;

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'backend';

// Use connect method to connect to the server
// MongoClient.connect(url,  (err, client) => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//     return;
//   }

//   console.log('Connected to MongoDB');

//   const db = client.db(dbName);

//   // Define your routes and fetch data here

//   // Start the Express server
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// });
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName: "backend",
}).then(() => console.log("Database Connected"))
.catch((e) => console.log(e));

app.get('/fetchData', (req, res) => {
  const collection = db.collection('questions'); // Replace with the actual name of your collection

  // Fetch data and convert it to an array
  collection.find({}).toArray((err, data) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Send the data as a JSON response
    res.json(data);
  });
});
