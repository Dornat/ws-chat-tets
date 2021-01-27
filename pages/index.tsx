import Head from 'next/head'
import React, {FC, ReactElement} from 'react'
import LoginForm from "../components/LoginForm";

const Home: FC = (): ReactElement => {

  return (
    <div className="container">
      <Head>
        <title>Welcome to Ws Chat</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className="main">
        <LoginForm/>
      </main>
    </div>
  )
}

export default Home
