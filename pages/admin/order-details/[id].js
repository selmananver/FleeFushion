
import React from 'react'
import { useRouter } from 'next/router'
import OrderDetails from '@/pages/components/OrderDetails'
import Head from 'next/head'
import withAdminAuth from '@/pages/components/withAdminAuth'

function orderDetails() {
    const router =useRouter()
  return (
    <><Head>
          <title>FleeFushion | OrderDetails</title>
      </Head>
      <OrderDetails id={router.query.id} admin /></>
  )
}
export default withAdminAuth(orderDetails)
