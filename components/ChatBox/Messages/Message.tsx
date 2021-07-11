import React, {FC, ReactElement} from 'react'

type MessageProps = {
  direction: string
}

const Message: FC<MessageProps> = ({direction, children}): ReactElement => {
  return (
    <div className="message">
      <div className={'message-' + direction}>
        {children}
      </div>
    </div>
  )
}

export default Message
