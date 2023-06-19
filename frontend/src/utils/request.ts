import axios, { AxiosError } from 'axios'
import { config } from '.'
import { CustomRequest, RequestOptions, Response, RequestError, ResponseData } from './types'

const request: CustomRequest = {
  async send<B, T>(options: RequestOptions<B>): Promise<ResponseData<T>> {
    try {
      const response = await axios<unknown, Response<T>>({
        method: options.method,
        url: options.baseUrl ? options.baseUrl + options.endpoint : config.API_BASE_URL + options.endpoint,
        data: options.body
      })
      return response.data
    } catch (e) {
      const error = e as RequestError<T>
      return error.response?.data as ResponseData<T>
    }
  },
}

export default request;
