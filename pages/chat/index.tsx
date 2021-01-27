import React, {FC, ReactElement, useEffect} from 'react'
import {io} from 'socket.io-client'
import ChatBox from "../../components/ChatBox";
import Head from "next/head";
import {useSelector, useDispatch} from 'react-redux'
import {getUser} from '../../redux/selectors'
import {useRouter} from "next/router";
import {sendMessage, sendSysMessage} from "../../redux/actions";

let socket

const Chat: FC = (): ReactElement => {
  const {name} = useSelector(getUser)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (name === undefined) router.push('/')

    socket = io('http://localhost:6969', {
      transports: ['websocket'],
      rejectUnauthorized: false
    })

    socket.emit('join', {name}, (err) => {
      if (err) {
        console.log(err)
      }
    })

    socket.on('message', ({type, user, content}) => {
      if (type === 'system') {
        dispatch(sendSysMessage(content))
      } else {
        dispatch(sendMessage(user, content))
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleMessageSend = (message: string) => {
    if (message.length > 0) {
      socket.emit('sendMessage', message, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Chat Room</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className="main">
        <ChatBox sendMessageClick={handleMessageSend}/>
      </main>
    </div>
  )
}

export default Chat
