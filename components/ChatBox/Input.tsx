import React, {FC, ReactElement, useState} from 'react'
import {Button, Card, CardActions} from '@material-ui/core'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import SendIcon from '@material-ui/icons/Send'
import {Picker, emojiIndex} from 'emoji-mart'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'

type InputProps = {
  handleSendMessage: (event: React.FormEvent) => void,
  handleEmojiPicker: (event: React.FormEvent) => void,
  handleKeyPress: (event: React.KeyboardEvent<{ value: unknown }>) => void,
  handleInputChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  handleSelectEmoji: any,
  messageInput: string,
  showEmojiPicker: boolean
}

const Input: FC<InputProps> = (
  {
    handleSendMessage,
    handleEmojiPicker,
    handleKeyPress,
    handleSelectEmoji,
    handleInputChange,
    messageInput,
    showEmojiPicker
  }
): ReactElement => {
  return (
    <CardActions className="input-box">
      {showEmojiPicker && <Picker set="apple" onSelect={handleSelectEmoji}/>}
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
  )
}

export default Input
