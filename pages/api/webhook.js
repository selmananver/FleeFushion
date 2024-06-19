import { ObjectId } from "bson";
import { buffer } from "micro";
import { connectToDatabase } from "../components/utils/mongodb"; // Adjust path as needed

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  try {
    const { db } = await connectToDatabase();

    // Find the order in the temp collection
    const tempOrder = await db.collection("temp").findOne({ _id: new ObjectId(JSON.parse(session.metadata.id)) });


    if (!tempOrder) {
      throw new Error("Order not found in temp collection");
    }


    // Prepare the order status
    const ord_status = { status: "shipping soon", timestamp: new Date() };

    // Prepare the new order data
    const newOrder = {
      order_status: {
        current: ord_status,
        info: [ord_status],
      },
      ...tempOrder,
      ...session,
      timestamp: new Date(),
    };

    delete newOrder._id; // Remove _id from tempOrder to avoid duplicate key error

    // Insert the new order into the orders collection
    await db.collection("orders").insertOne(newOrder);

    console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
  } catch (err) {
    console.error("Error fulfilling order:", err.message);
    throw err;
  }
};

export default async (req, res) => {
  if (req.method === "POST") {
    let event;

    try {
      // Read the request body as buffer
      const requestBuffer = await buffer(req);
      const payload = requestBuffer.toString();
      const sig = req.headers["stripe-signature"];

      // Verify that the event posted came from Stripe
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).json({ message: `Webhook Error: ${err.message}` });
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        // Fulfill the order
        await fulfillOrder(session);
        res.status(200).json({ message: "success" });
      } catch (err) {
        console.error("Order fulfillment error:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(400).json({ message: "Event type not supported" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};