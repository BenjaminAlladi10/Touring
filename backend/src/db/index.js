import mongoose from "mongoose";

async function connectDB()
{
    try
    {
        const connectionInstance=await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,         // Use the new MongoDB connection string parser
            useUnifiedTopology: true,      // Use the new Unified Topology layer
        });

        console.log(connectionInstance.connection.host);
    }
    catch(err)
    {
        console.log("Error connecting to MongoDB: " , err);
        console.log(err.message, err.stack);
        process.exit(1);
    }
};

export {connectDB};