import Head from 'next/head'
import React from 'react'
import Main from '../components/main/Main'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

const Subscription = () => {
  return (
    <div>
      <Head>
        <title>YouTube - Subscriptions</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/app.ico" />
      </Head>

      <div>
        <Navbar />
        <div className='flex'>
          <Sidebar page='Subscription' />
          <Main type='subscribed' />
        </div>
      </div>

    </div>
  )
}

export default Subscription