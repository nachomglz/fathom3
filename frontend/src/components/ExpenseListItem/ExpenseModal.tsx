import React, { useEffect, useState, useContext } from 'react'
import { Expense, ExpenseList } from '../../utils/types/request'
import { CloseModalButton, ExpenseListDetails, ExpenseListModal, ExpenseListModalInfo } from './style'
import AuthContext from '../../context/AuthContext'
import ExpenseListItemDetails from './ExpenseListItemDetails'
import { getExpenseBalance } from '../../utils'
import CrossIcon from '../../assets/icons/cross-svgrepo-com.svg'

interface Props {
    expenseList: ExpenseList
    onClose: () => void
}

const ExpenseModal: React.FC<Props> = ({ expenseList, onClose }) => {
    const {user} = useContext(AuthContext)

    const [userTotal, setUserTotal] = useState<number>(0)

    useEffect(() => {
        expenseList.expenses?.forEach(value => {
            setUserTotal(prev => prev + getExpenseBalance(expenseList, value, user))
        })
    }, [expenseList, user])

    const compareDate = (a: Expense, b: Expense) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(0);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(0);
        return dateB.getTime() - dateA.getTime();
    }

    return (
        <ExpenseListModal>
            <CloseModalButton onClick={onClose}>
                <img src={CrossIcon} alt="Close modal button" />
            </CloseModalButton>
            <ExpenseListModalInfo>
                <h2>{expenseList.participants?.filter(p => p.id !== user?.id)[0].name}</h2>
                <p style={{
                    color: userTotal === 0 ? 'white' : userTotal > 0 ? '#a6c219' :  '#ff0000'
                }}>
                    {userTotal === 0 ? 'you\'re all set ' : userTotal > 0 ? 'you are owed ' :  'you owe '}
                    {Math.abs(parseFloat(userTotal.toFixed(2)))} €
                </p>
            </ExpenseListModalInfo>
            <ExpenseListDetails>
                {expenseList.expenses?.sort(compareDate).map((expense, index) => {
                    const expenseBalance = parseFloat(getExpenseBalance(expenseList, expense, user).toFixed(2));
                    return <ExpenseListItemDetails participants={expenseList.participants ?? []} balance={expenseBalance} expense={expense} key={index} />
                })}
            </ExpenseListDetails>

        </ExpenseListModal>
    )
}

export default ExpenseModal