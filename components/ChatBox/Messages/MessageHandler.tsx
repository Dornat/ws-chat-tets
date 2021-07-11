import React, {FC, ReactElement} from 'react'
import {MessageType} from '../../../lib/types'
import {Chip, TextField} from '@material-ui/core'
import {getUser} from '../../../redux/selectors'
import {useSelector} from 'react-redux'
import Message from './Message'
import moment from "moment";

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
        helperText={moment.unix(message.sentAt).format('HH:mm D/MM/YYYY')}
      />
    }

    return <TextField
      disabled
      multiline
      defaultValue={message.content}
      variant="filled"
      helperText={moment.unix(message.sentAt).format('HH:mm D/MM/YYYY')}
    />
  }

  return (
    <Message direction={figureOutMessageDirection(message)}>
      {getProperMessageElement(message)}
    </Message>
  )
}

export default MessageHandler
