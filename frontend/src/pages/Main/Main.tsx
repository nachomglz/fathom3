import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContainer, WelcomeBanner, ExpenseListContainer } from './style'
import { request } from '../../utils'
import { ExpenseList, User } from '../../utils/types/request'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { ExpenseListItem } from '../../components/ExpenseListItem'

const Main: React.FC = () => {
  const navigate = useNavigate()
  const { user, mutateUser } = useContext(AuthContext)

  const [balance] = useState<number>(0);
  const [expenseLists, setExpenseLists] = useState<ExpenseList[]>();

  useEffect(() => {
    if(user?.id) {
      request.send<null, ExpenseList[]>({
        endpoint: `/user/${user.id}/expense_list`,
        method: 'GET',
        navigate: navigate
      }).then(response => {
        if(response && response.data && response.status === 'success') {
          console.log('data: ', response.data)
          setExpenseLists(response.data)
        } else {
          navigate('/login')
        }
      })
    }
  }, [navigate, user])

  useEffect(() => {
    // check if user is authenticated
    // eslint-disable-next-line no-constant-condition
    if(!user) {

      request.send<null, Omit<User, "password">>({
        endpoint: '/auth/',
        method: 'POST',
        withCredentials: true
      }).then(response => {
        if (response.status === 'success' && response.data && response.code === 'AUTHORIZED' && mutateUser) {
          mutateUser('id', response.data.id)
          mutateUser('name', response.data.name)
          mutateUser('surname', response.data.surname)
          mutateUser('email', response.data.email)
        } else if(response.code === 'TOKEN_NOT_PROVIDED') {
          navigate('/login')
          toast.error('You are not authenticated')
        }
      })

    }
  }, [mutateUser, navigate, user])

  return (
    <MainContainer>
      {user && expenseLists && (
        <>
          <WelcomeBanner>
            <h3>Welcome {user?.name},</h3>
            <h4>
              Balance:
            <span style={{
            color: balance === 0 ? "" : balance > 0 ? "#a6c219" : "#c21111",
            marginTop: 1
            }}> ${balance} </span>
            </h4>
          </WelcomeBanner>
          <ExpenseListContainer>
            {expenseLists.map((list, index) => (
              <ExpenseListItem key={index} list={list} />
            ))}
          </ExpenseListContainer>
        </>
      )}
    </MainContainer>
  )
}

export default Main
