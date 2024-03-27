
const { MongoClient, ServerApiVersion } = require('mongodb');
// import MongoClient from 'mongodb';
// import ServerApiVersion from 'mongodb';
const uri = "mongodb+srv://Shahrzad:ShSnexxt@clusternexxt.yfm6kpi.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNexxt";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {tls: true}, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

exports.handler = async (event) => {
    console.log("Function execution started");
    
    // Parse the stringified body to get the form data
    const formData = JSON.parse(event.body);
    
    console.log("Received form data:", formData);
    
    try {
        await client.connect();
        const collection = client.db("formDataDB").collection("submissions");
        
        // Insert the form data into the MongoDB collection
        const result = await collection.insertOne(formData);
        console.log("Data inserted:", result.insertedId);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data inserted successfully", insertedId: result.insertedId }),
        };
    } catch (error) {
        console.error("Error inserting data:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to insert data", error: error.message }),
        };
    } finally {
        await client.close();
    }
};
