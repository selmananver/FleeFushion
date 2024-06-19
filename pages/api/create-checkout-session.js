import { connectToDatabase } from "../components/utils/mongodb";
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY)
export default async(req,res)=>{
  const{items,email} =req.body
  try {
  const {db} = await connectToDatabase()
  const result = await db.collection('temp').insertOne({
    user:email,
    items,
    createdAt:new Date()
  })
 const transformeditems =items.map((item)=>({
  quantity:item.qty,
  price_data:{
    currency:'INR',
    unit_amount:item.price*100,
  product_data:{
    name:item.title,
    description:item.description,
  }
}

 }))
 try {
  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    shipping_address_collection:{
      allowed_countries:["GB","US","CA","IN"]
    },
    line_items:transformeditems,
    mode:'payment',
    success_url:`${process.env.HOST}/success`,
    cancel_url:`${process.env.HOST}/cart`,
    metadata:{
      id:JSON.stringify(result.insertedId)
    }
    })
    return res.status(200).json({id:session.id})
}
catch(err){
  console.error(err)
  return res.status(400).json({message:'Bad Request'})
}
}
catch(err){
  console.error(err)
  return res.status(400).json({message:'Bad Request'})
}
}

