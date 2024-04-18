import { connectToDatabase } from "../components/utils/mongodb"

export default async function handler (req, res)  {
    try {
        const { db } = await connectToDatabase()
        let dishes = await db.collection('dishes').find({}).toArray()
        dishes = JSON.parse(JSON.stringify(dishes))
        return res.status(200).json(dishes)
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}