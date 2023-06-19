import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginWrapper, LoginForm, FormButtons } from './style'
import { Input, Button } from '../../components'
import { Type as ButtonType } from '../../components/Button'
import { validator } from '../../utils'
import { request } from '../../utils'
import { LoginResponse } from '../../utils/types'
import { toast } from 'react-toastify'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleLogin = async () => {
    try {
      const response = await request.send<{email: string, password: string}, LoginResponse>({
        endpoint: '/auth/login',
        method: "POST",
        navigate: navigate,
        body: {
          email: email??"",
          password: password??""
        }
      })
      console.log('response: ', response)
      if(response.status === 'success' && response.code === 'AUTHORIZED') {
        const refresh_token = response.data?.refresh_token ?? "";
        localStorage.setItem("refresh_token", refresh_token)
        navigate('/')
      } else {
        switch(response.code) {
          case 'UNAUTHORIZED':
            toast.warning('The credentials provided don\'t match with any user')
            break;
          case 'TOKEN_EXPIRED': 
            // refresh token
            break;
          case 'INTERNAL_SERVER_ERROR':
          default:
            toast.error('There was a network error')
            break;
        }
      }
    } catch(e) {
      toast.error('There was an error logging in. Please reload the page')
    }
  }

  const validateData = async () => {
    if(email && password && validator.isEmail(email)) {
      await handleLogin()
    } else {
      toast.warning('The credentials provided are not well formatted')
    }
  }

  return (
    <LoginWrapper>
      <LoginForm onSubmit={(e) => e.preventDefault()}>
        <Input label="Email" placeholder="Introduce tu email" onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" placeholder="Introduce tu password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <FormButtons>
          <Button type={ButtonType.NORMAL} onClick={validateData}>Acceder</Button>
          <Button type={ButtonType.INFO}>Crear cuenta</Button>
        </FormButtons>
      </LoginForm>
    </LoginWrapper>
  )
}

export default Login
