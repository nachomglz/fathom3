import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContainer, WelcomeBanner } from './style'

const Main: React.FC = () => {
  const navigate = useNavigate()

  const [user] = useState<string>("Nacho Martin")
  const [balance] = useState<number>(+100);

  useEffect(() => {
    // check if the user is authenticated
    // get expense lists of the user
  }, [navigate])

  return (
    <MainContainer>
      <WelcomeBanner>
        <h3>Welcome {user},</h3>
        <h4>
          Balance:
          <span style={{
            color: balance === 0 ? "" : balance > 0 ? "#a6c219" : "#c21111",
            marginTop: 1
          }}>
            ${balance}
          </span>
        </h4>
      </WelcomeBanner>

    </MainContainer>
  )
}

export default Main
