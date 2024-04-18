import { connectToDatabase } from "../components/utils/mongodb";

export default async function handler (req, res)  {
    try {
        const { db } = await connectToDatabase()
        let categories = await db.collection('categories').find({}).toArray()
        categories = JSON.parse(JSON.stringify(categories))
        return res.status(200).json(categories)
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}