import React, { useState } from 'react'
import { MainContainer, WelcomeBanner } from './style'

const Main: React.FC = () => {

  const [user] = useState<string>("Nacho Martin")
  const [balance] = useState<number>(+100);

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
