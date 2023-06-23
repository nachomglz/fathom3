import React, {useState, useEffect} from 'react'
import { ExpenseList } from '../../utils/types/request'
import { ExpenseListItemWrapper } from './style'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import ReactModal from 'react-modal'
import ExpenseModal from './ExpenseModal'

interface Props {
    list: ExpenseList
}

const ExpenseListItem: React.FC<Props> = ({ list }) => {
    const { user } = useContext(AuthContext)

    const [userTotal, setUserTotal] = useState<number>(0)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        list.expenses?.forEach(value => {
            console.log('sumando: ', value)
            switch(value.type) {
                case 'SPLIT_EQUALLY': 
                    if(value.payerId === user?.id) {
                        setUserTotal(prev => prev + (value.amount / (list.participants?.length ?? 0)))
                    } else {
                        setUserTotal(prev => prev - (value.amount / (list.participants?.length ?? 0)))
                    }
                    break;
                case 'DEBTOR_OWES': 
                    if(value.payerId === user?.id) {
                        setUserTotal(prev => prev + value.amount)
                    } else {
                        setUserTotal(prev => prev - value.amount)
                    }
                    break;
                case 'PAYER_OWES': 
                    if(value.payerId === user?.id) {
                        setUserTotal(prev => prev - value.amount)
                    } else {
                        setUserTotal(prev => prev + value.amount)
                    }
                    break;
            }
        })
    }, [])

    return (
        <>
            <ExpenseListItemWrapper onClick={() => setIsModalOpen(prev => !prev)} >
                <h3>{list.participants?.filter(v => v.id !== user?.id)[0].name}</h3>
                <p style={{
                    color: userTotal === 0 ? 'white' : userTotal > 0 ? '#a6c219' :  '#ff0000'
                }}>
                    {userTotal === 0 ? 'you\'re all set ' : userTotal > 0 ? 'you are owed ' :  'you owe '}
                    {Math.abs(parseFloat(userTotal.toFixed(2)))} €
                </p>
            </ExpenseListItemWrapper>
            <ReactModal
                isOpen={isModalOpen}
                contentElement={(props, children) => <ExpenseModal onClose={() => setIsModalOpen(false)} expenseList={list} />}
                ariaHideApp={false}
                style={{
                    content: {
                    },
                    overlay: {
                        backgroundColor: '#3b3b3b',
                        height: '90%',
                        maxHeight: '50rem',
                        width: '90%',
                        maxWidth: '60rem',
                        margin: 'auto auto',
                        borderRadius: 20,
                        padding: 40,
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                    }
                }}
                shouldCloseOnEsc={true}
            />
        </>
        
    )
}


export default ExpenseListItem