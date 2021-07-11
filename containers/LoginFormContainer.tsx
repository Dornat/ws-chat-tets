import React, {FC, ReactElement, useState} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {createUser} from '../redux/actions'
import LoginForm from '../components/LoginForm'

const LoginFormContainer: FC = (): ReactElement => {
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
    <LoginForm
      userName={userName}
      handleUserNameChange={handleUserNameChange}
      handleChatRoomEnter={handleChatRoomEnter}
    />
  )
}

export default LoginFormContainer
