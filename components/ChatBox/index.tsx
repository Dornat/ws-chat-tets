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

type ChatBoxProps = {
  onClick: (string) => void
}

const ChatBox: FC<ChatBoxProps> = ({onClick}): ReactElement => {
  const messages = useSelector(getMessages)
  const {name} = useSelector(getUser)
  const [messageInput, setMessageInput] = useState('')
  const messagesEnd = useRef(null)

  const handleInputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMessageInput(event.target.value as string)
  }

  const handleSendClick = () => {
    onClick(messageInput)
    setMessageInput('')
    messagesEnd.current.scrollIntoView({ behavior: 'smooth', block: 'start'})
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

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleSendClick()
      }
    }
    document.addEventListener("keydown", listener)
    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [messageInput])

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
              />
              : <TextField
                disabled
                multiline
                defaultValue={message.content}
                variant="filled"
              />
          }/>
        })}
        <div ref={messagesEnd}/>
      </CardContent>
      <CardActions>
        <TextField
          value={messageInput}
          fullWidth={true}
          id="outlined-required"
          onChange={handleInputChange}
        />
        <Button endIcon={<Icon>send</Icon>} onClick={handleSendClick}>Send</Button>
      </CardActions>
    </Card>
  )
}

export default ChatBox
