import React, { createContext } from 'react'
import { User } from '../utils/types/request'

interface AuthContextValue {
    user: Omit<User, "password"> | null
    mutateUser?: (field: keyof Omit<User, "password">, value: unknown) => void
}

const AuthContext = createContext<AuthContextValue>({ user: null })

export default AuthContext