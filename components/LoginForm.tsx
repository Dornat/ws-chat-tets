import React, {FC, ReactElement, useState} from 'react'
import {Button, TextField, Card, CardContent, CardActions, CardHeader} from '@material-ui/core'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {createUser} from '../redux/actions'

const LoginForm: FC = (): ReactElement => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [userName, setUsername] = useState<string>('')

  const handleUserNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUsername(event.target.value as string)
  }

  const handleChatRoomEnter = () => {
    dispatch(createUser(userName.trim()))
    router.push('/chat')
  }

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
