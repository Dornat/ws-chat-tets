import React, {FC, ReactElement} from 'react'
import {Button, TextField, Card, CardContent, CardActions, CardHeader} from '@material-ui/core'

type LoginFormProps = {
  userName: string,
  handleUserNameChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  handleChatRoomEnter: () => void
}

const LoginForm: FC<LoginFormProps> = ({userName, handleUserNameChange, handleChatRoomEnter}): ReactElement => {
  return (
    <Card>
      <CardHeader title="Welcome to WS Chat!"/>
      <CardContent>
        <TextField
          required
          id="outlined-required"
          label="Please Enter Your Name"
          onChange={handleUserNameChange}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" disabled={userName.length <= 0} onClick={handleChatRoomEnter}>
          Enter the Chat
        </Button>
      </CardActions>
    </Card>
  )
}

export default LoginForm
