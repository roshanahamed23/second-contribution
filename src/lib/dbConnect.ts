import mongoose from "mongoose"
type ConnectionObject = { 
    isConnected?:number
}
const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
     if(connection.isConnected){
        console.log("already connected to database")
        return
     }
     try{
      const username = encodeURIComponent(process.env.YOUR_DATABASE_USERNAME as string);
       const  password = encodeURIComponent(process.env.YOUR_DATABASE_PASSWORD as string);
       const db = await mongoose.connect(`mongodb+srv://${username}:${password}${process.env.MONGODB_URI}`, {})
       connection.isConnected=db.connections[0].readyState
       console.log("DB CONNECTED!")
     }catch(error){
         
        console.log("database connection failed!", error)
        process.exit()
     }
}

export default dbConnect