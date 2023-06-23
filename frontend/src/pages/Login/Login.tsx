import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginWrapper, LoginForm, FormButtons } from './style'
import { Input, Button } from '../../components'
import { ButtonType } from '../../components/Button'
import { validator } from '../../utils'
import { request } from '../../utils'
import { LoginResponse } from '../../utils/types'
import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthContext'
import { User } from '../../utils/types/request'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [user, setUser] = useState<Omit<User, "password">>();

  useEffect(() => {
    if(user && authContext.mutateUser) {
      authContext.mutateUser('id', user.id)
      authContext.mutateUser('name', user.name)
      authContext.mutateUser('surname', user.surname)
      authContext.mutateUser('email', user.email)
      navigate('/')
    }
  }, [user, authContext, navigate])

  const handleLogin = async () => {
    try {
      const response = await request.send<{email: string, password: string}, LoginResponse>({
        endpoint: '/auth/login',
        method: "POST",
        navigate: navigate,
        body: {
          email: email??"",
          password: password??""
        },
        withCredentials: true
      })
      if(response.status === 'success' && response.code === 'AUTHORIZED' && response.data) {
        const refresh_token = response.data?.refresh_token ?? "";
        localStorage.setItem("refresh_token", refresh_token)
        setUser(response.data.user)

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
