import React, {FC, ReactElement} from 'react'
import {MessageType} from '../../lib/types'
import {Chip, TextField} from '@material-ui/core'
import {getUser} from '../../redux/selectors'
import {useSelector} from 'react-redux'
import Message from './Message'

type MessageHandlerProps = {
  message: MessageType
}

const MessageHandler: FC<MessageHandlerProps> = ({message}): ReactElement => {
  const {name} = useSelector<string>(getUser)

  const figureOutMessageDirection = ({type, user}) => {
    if (type === 'system') {
      return 'center'
    }
    if (user === name) {
      return 'right'
    }
    return 'left'
  }

  const getProperMessageElement = (message) => {
    const direction = figureOutMessageDirection(message)

    if (direction === 'center') {
      return <Chip variant="outlined" label={message.content}/>
    }

    if (direction === 'left') {
      return <TextField
        disabled
        multiline
        label={message.user}
        defaultValue={message.content}
        variant="filled"
        helperText={message.sentAt}
      />
    }

    return <TextField
      disabled
      multiline
      defaultValue={message.content}
      variant="filled"
      helperText={message.sentAt}
    />
  }

  return (
    <Message direction={figureOutMessageDirection(message)} element={getProperMessageElement(message)}/>
  )
}

export default MessageHandler
