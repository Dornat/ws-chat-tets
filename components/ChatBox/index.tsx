import React, {FC, ReactElement, useEffect, useRef, useState} from 'react'
import {
  Button,
  Card,
  Chip,
  CardActions,
  CardContent,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Icon,
} from '@material-ui/core'
import Message from './Message'
import {getMessages, getUser} from '../../redux/selectors'
import {useSelector} from 'react-redux'
import {Picker, emojiIndex} from 'emoji-mart'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'
import 'emoji-mart/css/emoji-mart.css'

type ChatBoxProps = {
  onClick: (string) => void
}

const ChatBox: FC<ChatBoxProps> = ({onClick}): ReactElement => {
  const messages = useSelector(getMessages)
  const {name} = useSelector(getUser)
  const [messageInput, setMessageInput] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEnd = useRef(null)

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
    setShowEmojiPicker(true)
  }

  const handleSelectEmoji = ({native}) => {
    setMessageInput(`${messageInput}${native}`)
    setShowEmojiPicker(false)
  }

  const handleSendMessage = (event: React.FormEvent) => {
    if (event) {
      event.preventDefault()
    }
    onClick(messageInput)
    setMessageInput('')
    messagesEnd.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
  }

  const figureOutMessageDirection = ({type, user}) => {
    if (type === 'system') {
      return 'center'
    }
    if (user === name) {
      return 'right'
    }
    return 'left'
  }

  return (
    <Card style={{width: 50 + 'vw'}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
          <Typography variant="h6" component="div">
            Chat Room
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent style={{overflowY: 'scroll', height: 500}}>
        {messages.map((message, i) => {
          const direction = figureOutMessageDirection(message)
          return <Message key={i} direction={direction} element={
            direction === 'center'
              ? <Chip variant="outlined" label={message.content}/>
              : direction === 'left'
              ? <TextField
                disabled
                multiline
                label={message.user}
                defaultValue={message.content}
                variant="filled"
                helperText={message.sentAt}
              />
              : <TextField
                disabled
                multiline
                defaultValue={message.content}
                variant="filled"
                helperText={message.sentAt}
              />
          }/>
        })}
        {showEmojiPicker && <Picker set="apple" onSelect={handleSelectEmoji}/>}
        <div ref={messagesEnd}/>
      </CardContent>
      <CardActions>
        <form onSubmit={handleSendMessage} className="message-form">
          <Button onClick={handleEmojiPicker}>=)</Button>
          <ReactTextareaAutocomplete
            className="message-input my-textarea"
            name="messageInput"
            value={messageInput}
            loadingComponent={() => <span>Loading</span>}
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Compose your message and hit ENTER to send"
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
        <Button endIcon={<Icon>send</Icon>} onClick={handleSendMessage}>Send</Button>
      </CardActions>
    </Card>
  )
}

export default ChatBox
