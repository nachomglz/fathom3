import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginWrapper, LoginForm, FormButtons } from './style'
import { Input, Button } from '../../components'
import { Type as ButtonType } from '../../components/Button'
import { validator } from '../../utils'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleLogin = () => {
    // Validate email
    if (email && validator.isEmail(email)) {
      localStorage.setItem('email', email)
      navigate("/")
    }
  }

  return (
    <LoginWrapper>
      <LoginForm onSubmit={(e) => e.preventDefault()}>
        <Input label="Email" placeholder="Introduce tu email" onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" placeholder="Introduce tu password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <FormButtons>
          <Button type={ButtonType.NORMAL} onClick={handleLogin}>Acceder</Button>
          <Button type={ButtonType.INFO}>Crear cuenta</Button>
        </FormButtons>
      </LoginForm>
    </LoginWrapper>
  )
}

export default Login
