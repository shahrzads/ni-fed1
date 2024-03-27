
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    
    try {
        await client.connect();
        const collection = client.db("formDataDB").collection("submissions");
        
        // Get the record ID from the request path parameters
        const recordId = event.pathParameters.id;
        
        // Fetch the single record by its ID
        const record = await collection.findOne({ _id: new ObjectId(recordId) });

        console.log("Fetched record:", record);
        
        if (record) {
            return {
                statusCode: 200,
                body: JSON.stringify(record),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Record not found" }),
            };
        }
    } catch (error) {
        console.error("Error fetching record:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to fetch record", error: error.message }),
        };
    } finally {
        await client.close();
    }
};
