import React, { useContext, useEffect, useState } from 'react'
import { Expense, ExpenseType, User } from '../../utils/types/request';
import {
    ExpenseDetail,
    ExpenseItemButtonContainer,
    ExpenseItemExpenseContainer,
    ExpenseItemTitleContainer,
    EditExpenseMiddleContainer,
} from './style';
import { ActionButton, ActionButtonType } from '../Button';
import AuthContext from '../../context/AuthContext';
import { Input } from '..';
import { Select } from '../Select';

interface Props {
    expense: Expense
    balance: number
    participants: User[]
}


const ExpenseListItemDetails: React.FC<Props> = ({ expense, balance, participants }) => {
    const { user } = useContext(AuthContext)

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isEditing, setIsEdigint] = useState<boolean>(false)
    const [paymentTypeOptions, setPaymentTypeOptions] = useState<{payerId: number, type: ExpenseType, text: string}[]>()

    const [editedExpense, setEditedExpense] = useState<Expense>(expense);

    useEffect(() => {
        // set the options for the payment type on editing
        if(user) {
            const secondUser = participants.find(p => p.id !== user.id)
            setPaymentTypeOptions([
                {
                    payerId: user.id ?? 0,
                    type: 'SPLIT_EQUALLY',
                    text: `You paid, split equally`
                },
                {
                    payerId: user.id ?? 0,
                    type: 'DEBTOR_OWES',
                    text: `You paid, you are owed the full amount`
                },
                {
                    payerId: secondUser?.id ?? 0,
                    type: 'SPLIT_EQUALLY',
                    text: `${secondUser?.name} paid, split equally`
                },
                {
                    payerId: secondUser?.id ?? 0,
                    type: 'DEBTOR_OWES',
                    text: `${secondUser?.name} paid, ${secondUser?.name} is owed the full amount`
                },
            ])
        }
    }, [user])

    useEffect(() => {
        console.log('old expense: ', expense)
        console.log('new expense: ', editedExpense)
    }, [editedExpense, expense])

    const editExpense = () => {
        setIsEdigint(true)
    }

    const removeExpense = () => {
        alert(`removing expense: ${expense.name}`)
    }

    const confirmEdit = () => {
        console.log('old expense: ', expense)
        console.log('new expense: ', editedExpense)
    }

    const cancelEdit = () => {
        setEditedExpense(expense)
        setIsEdigint(false)
    }

    return (
        <ExpenseDetail
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ExpenseItemTitleContainer>
                <span>
                    {isEditing
                        ? <Input value={editedExpense.name} onChange={(e) => setEditedExpense(prev => ({ ...prev, name: e.target.value ?? 0 }))} />
                        : expense.name
                    }
                </span>
                {!isEditing && (
                    <span>
                        {
                            expense.payerId === user?.id
                                ? `You paid ${expense.amount}`
                                :  `${expense.payer?.name} paid ${expense.amount}`
                        }€
                    </span>
                )}
            </ExpenseItemTitleContainer>

            {isEditing && (
                <EditExpenseMiddleContainer>
                    <Select onChange={e=> {
                        const select = parseInt(e.target.value)
                        const selectedOption = paymentTypeOptions?.[select]

                        switch(selectedOption?.type) {
                            case 'SPLIT_EQUALLY':
                                setEditedExpense(prev => ({...prev, payerId: selectedOption?.payerId, type: selectedOption.type}))
                                break;
                            case 'DEBTOR_OWES':
                                setEditedExpense(prev => ({...prev, payerId: selectedOption?.payerId, type: selectedOption?.type}))
                                setEditedExpense(prev => ({...prev, payerId: selectedOption?.payerId, type: selectedOption?.type}))
                                break;
                        }

                        setEditedExpense(prev => ({...prev}))
                    }}>
                        {paymentTypeOptions?.map((option, index) => {
                            return (
                                <option key={index} value={index}>
                                    {option.text}
                                </option>
                            )
                        })}
                    </Select>
                    <Input value={editedExpense.amount} type='number' min={0} onChange={(e) => setEditedExpense(prev => ({...prev, amount: parseInt(e.target.value)}))} style={{
                        width: '7rem'
                    }} />
                </EditExpenseMiddleContainer>
            )}

            <>
                <ExpenseItemExpenseContainer isediting={isEditing} ishovered={isHovered} balance={balance} >
                    <span>
                        {balance > 0 ? `You lent ` : `You borrowed `}
                    </span>
                    <span>
                        {balance > 0 ? `${balance}` : `${Math.abs(balance)}`}€
                    </span>
                </ExpenseItemExpenseContainer>
                <ExpenseItemButtonContainer isediting={isEditing} ishovered={isHovered} >
                    <ActionButton isEditing={isEditing} type={ActionButtonType.AFIRMATIVE} onClick={isEditing ? confirmEdit : editExpense} />
                    <ActionButton isEditing={isEditing} type={ActionButtonType.NEGATIVE} onClick={isEditing ? cancelEdit : removeExpense} />
                </ExpenseItemButtonContainer>
            </>
        </ExpenseDetail>
    )
}

export default ExpenseListItemDetails