import styled from 'styled-components'

export const ExpenseListItemWrapper = styled.div`
    background-color: #333333;
    width: 100%;
    max-width: 13rem;
    min-height: 6rem;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: box-shadow ease-in-out .2s;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    display: flex;
    flex-direction: column;
    gap: .7rem;
`

export const ExpenseListModal = styled.div`
    height: 90%;
    max-height: 50rem;
    padding: 0 2rem 2rem 2rem;
    position: relative;
`
 
export const ExpenseListModalInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: .6rem;
    font-size: 1.2rem;
`

export const ExpenseListDetails = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #333333;
    padding: 1rem;
    border-radius: 1rem;
    height: 100%;
    overflow: scroll;
`

export const ExpenseDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    padding: 0 2rem;
    height: 4.5rem;
    font-size: 1.3rem;
    background-color: #3b3b3b;
    transition: box-shadow .2s ease-in-out;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }
`

export const ExpenseItemExpenseContainer = styled.div<{ isediting: boolean, ishovered: boolean, balance: number }>`
    font-weight: bold;
    display: ${({ishovered, isediting}) => isediting ? "none" : ishovered ? "none" : "flex"};
    flex-direction: column;
    align-items: flex-end;
    gap: .2rem;
    color: ${({balance}) => balance > 0 ? "#a6c219" : balance < 0 ? "#ff0000" : ""};

    span:nth-child(1) {
        font-size: .8rem;
        font-weight: normal;
        display: ${({ishovered}) => ishovered ? "none" : "block"};
        color: ${({balance}) => balance > 0 ? "#a6c219" : balance < 0 ? "#ff0000" : ""};

    }

    span:nth-child(2) {
        display: ${({ishovered}) => ishovered ? "none" : "block"};
        color: ${({balance}) => balance > 0 ? "#a6c219" : balance < 0 ? "#ff0000" : ""};

    }
`

export const ExpenseItemButtonContainer = styled.div<{ isediting: boolean, ishovered: boolean }>`
    display: ${({ishovered, isediting}) => isediting || ishovered ? "flex" : "none"};
    flex-direction: row;
    align-items: center;
    gap: .7rem;
`

export const ExpenseItemTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: .3rem;

    & > span {
        display: flex;
        align-items: center;
    }

    & > span:nth-child(2) {
        color: grey;
        font-size: 1rem;
    }
`

export const CloseModalButton = styled.button`
    background: transparent;
    height: 2rem;
    width: 2rem;
    border: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: .5rem;
    transition: background-color .2s ease-in-out;

    &:hover {
        background-color: #333333;
    }

    img {
        height: 1.9rem;
        width: 1.9rem;
    }


`

export const EditExpenseMiddleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`
