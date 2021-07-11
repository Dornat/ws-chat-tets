import React, {FC, ReactElement, useEffect, useRef, useState} from 'react'
import {
  Button,
  Card,
  CardActions,
} from '@material-ui/core'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'
import 'emoji-mart/css/emoji-mart.css'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import SendIcon from '@material-ui/icons/Send'
import Header from '../components/ChatBox/Header'
import Messages from '../components/ChatBox/Messages'
import Input from '../components/ChatBox/Input'
import {useSelector, useDispatch} from 'react-redux'
import {sendMessage} from "../redux/actions";
import {getUser} from "../redux/selectors";

type ChatBoxProps = {
  sendMessageClick: (string) => void
}

const ChatContainer: FC<ChatBoxProps> = ({sendMessageClick}): ReactElement => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const [messageInput, setMessageInput] = useState<string>('')
  const dispatch = useDispatch()
  const {name} = useSelector(getUser)

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
    // dispatch(sendMessage(name, messageInput))
    sendMessageClick(messageInput)
    setMessageInput('')
  }

  console.log('ChatContainer');
  return (
    <Card style={{width: 50 + 'vw'}}>
      <Header/>
      <Messages/>
      <Input
        handleEmojiPicker={handleEmojiPicker}
        handleSendMessage={handleSendMessage}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handleSelectEmoji={handleSelectEmoji}
        messageInput={messageInput}
        showEmojiPicker={showEmojiPicker}
      />
    </Card>
  )
}

export default ChatContainer
