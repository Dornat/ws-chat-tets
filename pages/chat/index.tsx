import React, {FC, ReactElement, useEffect} from 'react'
import {io} from 'socket.io-client'
import ChatBox from "../../components/ChatBox";
import Head from "next/head";
import {useSelector, useDispatch} from 'react-redux'
import {getUser} from '../../redux/selectors'
import {useRouter} from "next/router";
import {sendMessage, sendSysMessage, updateUserId} from "../../redux/actions";

const Chat: FC = (): ReactElement => {
  const {id, name} = useSelector(getUser)
  const router = useRouter()
  const dispatch = useDispatch()

  const socket = io('http://localhost:6969', {
    transports: ['websocket'],
    rejectUnauthorized: false
  })

  useEffect(() => {
    if (id === undefined) router.push('/')

    socket.on('connect', () => {
      console.log(socket.id)
    })

    // socket.on('joined', ({id})  => {
    //   dispatch(updateUserId(id))
    // })

    socket.emit('join', {id, name}, (err) => {
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


  }, [])

  const handleMessageSend = (message) => {
    socket.emit('sendMessage', id, message, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  return (
    <div className="container">
      <Head>
        <title>Chat Room</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className="main">
        <ChatBox onClick={handleMessageSend}/>
      </main>
    </div>
  )
}

export default Chat
