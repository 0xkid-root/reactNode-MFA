import {connect} from "mongoose"

export const DBConnect = async()=>{
    try{
        // Check if CONNECTION_STRING is defined
        if (!process.env.CONNECTION_STRING) {
            throw new Error('CONNECTION_STRING environment variable is not defined');
        }
        
        const mongoDbConnection = await connect(process.env.CONNECTION_STRING)
        console.log(`MongoDB Connected: ${mongoDbConnection.connection.host}`);
        console.log("Connected successfully");
        return mongoDbConnection;
    }catch(error){
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}