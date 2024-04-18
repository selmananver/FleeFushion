import { MongoClient } from "mongodb";
const url = process.env.DB_URL

export async function connectToDatabase(){

    const client = new MongoClient(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

    try {
    await client.connect()
    console.log('Connected to database')
    return {
        client,
        db:client.db()
    }
}
catch(error){
    console.log('Error connecting to database',error)
}
}