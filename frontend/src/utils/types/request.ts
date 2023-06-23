import { AxiosError, AxiosResponse } from "axios";

export type CustomResponseCodes = 
    "INTERNAL_SERVER_ERROR" |
    "TOKEN_VALID" |
    "TOKEN_INVALID" |
    "TOKEN_EXPIRED" |
    "TOKEN_MALFORMED" |
    "TOKEN_NOT_PROVIDED" |
    "AUTHORIZED" |
    "UNAUTHORIZED" |
    "NOT_FOUND"

export interface RequestOptions<B> {
  method: "POST" | "GET" | "PUT" | "DELETE",
  baseUrl?: string,
  endpoint: string,
  withCredentials?: boolean,
  navigate?: (url: string) => unknown,
  body?: B
}

export interface ResponseData<T = null> {
  status: "success" | "fail"
  code: CustomResponseCodes
  data: T | null
}

export interface Response<T> extends AxiosResponse {
  data: ResponseData<T>
}

export type RequestError<T> = AxiosError<ResponseData<T>>


export interface CustomRequest {
  send: <B, T>(options: RequestOptions<B>) => Promise<ResponseData<T>>
}

/** Login interfaces */
export interface LoginResponse {
  refresh_token: string,
  expiresIn: number,
  user: Omit<User, "password">
}

/** User interface */
export interface User {
  id?: number
  email: string
  name: string
  surname: string
  password: string
  expenseLists?: ExpenseList[]
  createdAt?: Date
  expenses?: Expense[]
}

/** Expense lists */
export interface ExpenseList {
  id?: number
  participants?: User[]
  expenses?: Expense[]
}

/** Expense */
export type ExpenseType = "SPLIT_EQUALLY" | "PAYER_OWES" | "DEBTOR_OWES"
export interface Expense {
  id?: number
  payerId: number
  expenseListId: number
  name: string
  type: ExpenseType
  amount: number
  payer?: User
  createdAt?: Date
  expenseList?: ExpenseList
}
