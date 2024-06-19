import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/pages/components/utils/mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions)
        if (session && session.admin) {
            const { db } = await connectToDatabase()
            let users = await db.collection('users').find({}).toArray()
            users = JSON.parse(JSON.stringify(users))
            return res.status(200).json(users)
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}