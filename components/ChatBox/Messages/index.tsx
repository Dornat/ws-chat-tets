import React, {ReactElement, useEffect, useRef} from 'react'
import {MessageType} from '../../../lib/types'
import {getMessages} from '../../../redux/selectors'
import {useSelector} from 'react-redux'
import {CardContent} from "@material-ui/core";
import MessageHandler from './MessageHandler'

const Messages = React.memo((): ReactElement => {
  const messages = useSelector<Array<MessageType>>(getMessages)
  const messagesEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEnd.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
  }, [messages])

  return (
    <CardContent style={{overflowY: 'scroll', height: 500}}>
      {messages.map((message, i) => (
        <MessageHandler key={i} message={message}/>
      ))}
      <div ref={messagesEnd}/>
    </CardContent>
  )
})

export default Messages
