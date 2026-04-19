import axios, { type AxiosInstance, type AxiosError } from 'axios'
import type { ErrorResponse } from './types'

export class ApiError extends Error {
  public readonly statusCode: number
  public readonly payload: ErrorResponse

  constructor(payload: ErrorResponse) {
    super(payload.message)
    this.name = 'ApiError'
    this.statusCode = payload.status
    this.payload = payload
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear user data from localStorage
      localStorage.removeItem('user')

      // Call logout endpoint without waiting for response
      // Use apiClient directly to avoid potential loops
      apiClient.post('/utente/logout', {}).catch((err) => {
        // Ignore errors from logout call - we're redirecting anyway
        console.error('Logout call failed:', err)
      })

      // Redirect to login page
      window.location.href = '/login'

      // Return a rejected promise to prevent further processing
      return Promise.reject(error)
    }

    if (error.response?.data) {
      throw new ApiError(error.response.data)
    }

    throw new ApiError({
      message: error.message || 'An unexpected error occurred',
      error: 'UNKNOWN_ERROR',
      status: error.response?.status || 500,
      path: error.config?.url || 'unknown',
    })
  }
)

export async function get<T>(url: string): Promise<T> {
  const response = await apiClient.get<T>(url)
  return response.data
}

export async function post<T>(url: string, data: any): Promise<T> {
  const response = await apiClient.post<T>(url, data)
  return response.data
}

export async function put<T>(url: string, data: any): Promise<T> {
  const response = await apiClient.put<T>(url, data)
  return response.data
}

export async function del<T>(url: string): Promise<T> {
  const response = await apiClient.delete<T>(url)
  return response.data
}

export { apiClient }