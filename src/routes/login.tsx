import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../firebase'
import {
  Title,
  Wrapper,
  Form,
  Input,
  Switcher,
} from '../components/AuthComponents'

const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === 'email') return setEmail(value)
    if (name === 'password') return setPassword(value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (isLoading || email === '' || password === '') return

    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Title>Login to App</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name='email'
          value={email}
          placeholder='Email'
          type='email'
          required
        />
        <Input
          onChange={onChange}
          name='password'
          value={password}
          placeholder='Password'
          type='password'
          required
        />
        <Input type='submit' value={isLoading ? 'Loading' : 'Log in'} />
      </Form>
      {error !== '' && <Error>{error}</Error>}
      <Switcher>
        Don't have an account?
        <Link to='/create-account'>Create one &rarr;</Link>
      </Switcher>
    </Wrapper>
  )
}

export default Login
