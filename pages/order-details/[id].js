import React from 'react'
import { useRouter } from 'next/router'
import OrderDetails from '../components/OrderDetails'
import Head from 'next/head'

function orderDetails() {
    const router =useRouter()
  return (
    <><Head>
          <title>FleeFushion | OrderDetails</title>
      </Head>
      <OrderDetails id={router.query.id} /></>
  )
}
orderDetails.auth =true
export default orderDetails