import { Expense, ExpenseList, User } from "./types/request"

const getExpenseBalance = (expenseList: ExpenseList, expense: Expense, user: Omit<User, "password"> | null): number => {
    switch(expense.type) {
        case 'SPLIT_EQUALLY': 
            if(expense.payerId === user?.id) {
                return expense.amount / (expenseList.participants?.length ?? 0)
            } else {
                return -(expense.amount / (expenseList.participants?.length ?? 0))
            }
        case 'DEBTOR_OWES': 
            if(expense.payerId === user?.id) {
                return expense.amount
            } else {
                return -(expense.amount)
            }
        case 'PAYER_OWES': 
            if(expense.payerId === user?.id) {
                return -(expense.amount)
            } else {
                return expense.amount
            }
    }
}

export default getExpenseBalance