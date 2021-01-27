import React, {FC, ReactElement} from 'react'

type MessageProps = {
  direction: string,
  element: any
}

const Message: FC<MessageProps> = ({direction, element}): ReactElement => {
  return (
    <div className="message">
      <div className={'message-' + direction}>
        {element}
      </div>
    </div>
  )
}

export default Message
