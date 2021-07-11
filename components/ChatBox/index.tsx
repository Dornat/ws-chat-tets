import React, {FC, ReactElement, useEffect, useRef, useState} from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core'
import {getMessages} from '../../redux/selectors'
import {useSelector} from 'react-redux'
import {Picker, emojiIndex} from 'emoji-mart'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'
import 'emoji-mart/css/emoji-mart.css'
import {MessageType} from '../../lib/types'
import MessageHandler from './Messages/MessageHandler'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import Header from "./Header";

type ChatBoxProps = {
  sendMessageClick: (string) => void
}

const ChatBox: FC<ChatBoxProps> = ({sendMessageClick}): ReactElement => {
  const messages = useSelector<Array<MessageType>>(getMessages)
  const [messageInput, setMessageInput] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const messagesEnd = useRef<HTMLDivElement>(null)

  const handleInputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMessageInput(event.target.value as string)
  }

  const handleKeyPress = (event: React.KeyboardEvent<{ value: unknown }>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage(null)
    }
  }

  const handleEmojiPicker = (event: React.FormEvent) => {
    event.preventDefault()
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleSelectEmoji = ({native}) => {
    setMessageInput(`${messageInput}${native}`)
    setShowEmojiPicker(false)
  }

  const handleSendMessage = (event: React.FormEvent) => {
    if (event) {
      event.preventDefault()
    }
    sendMessageClick(messageInput)
    setMessageInput('')
  }

  useEffect(() => {
    messagesEnd.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
  }, [messages])

  return (
    <Card style={{width: 50 + 'vw'}}>
      <Header/>
      <CardContent style={{overflowY: 'scroll', height: 500}}>
        {messages.map((message, i) => (
          <MessageHandler key={i} message={message}/>
        ))}
        {showEmojiPicker && <Picker set="apple" onSelect={handleSelectEmoji}/>}
        <div ref={messagesEnd}/>
      </CardContent>
      <CardActions>
        <form onSubmit={handleSendMessage} className="message-form">
          <Button onClick={handleEmojiPicker}><EmojiEmotionsIcon/></Button>
          <ReactTextareaAutocomplete
            className="message-input my-textarea"
            name="messageInput"
            value={messageInput}
            loadingComponent={() => <span>Loading</span>}
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Write something"
            trigger={{
              ':': {
                dataProvider: token =>
                  emojiIndex.search(token).map(o => ({
                    colons: o.colons,
                    native: o.native,
                  })),
                component: ({entity: {native, colons}}) => (
                  <div>{`${colons} ${native}`}</div>
                ),
                output: item => `${item.native}`,
              },
            }}
          />
        </form>
        <Button endIcon={<SendIcon/>} onClick={handleSendMessage}>Send</Button>
      </CardActions>
    </Card>
  )
}

export default ChatBox
