import { getSession } from "next-auth/react";
import { connectToDatabase } from "../components/utils/mongodb";
export default async (req, res) => {
    try {
        const session = await getSession({ req })
        if (session) {
            const { db } = await connectToDatabase()
            let orders = await db
            .collection('orders')
            .find({ user: session.user.email, payment_status: "paid" })
            .sort({ timestamp: -1 }).toArray()
            orders = JSON.parse(JSON.stringify(orders))
            return res.status(200).json(orders)
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
