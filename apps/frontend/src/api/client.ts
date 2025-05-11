import { ApiError, handleApiError } from '../utils/apiErrorHandler';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface RequestOptions extends RequestInit {
  retry?: boolean;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url: string,
  options: RequestOptions = {},
  retryCount = 0
): Promise<Response> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new ApiError({
        message: `HTTP error! status: ${response.status}`,
        status: response.status,
      });
    }

    return response;
  } catch (error) {
    if (
      options.retry &&
      retryCount < MAX_RETRIES &&
      (error instanceof TypeError || error instanceof ApiError)
    ) {
      await delay(RETRY_DELAY * Math.pow(2, retryCount));
      return fetchWithRetry(url, options, retryCount + 1);
    }
    throw handleApiError(error);
  }
};

export const apiClient = {
  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const response = await fetchWithRetry(url, {
      ...options,
      method: 'GET',
      retry: true,
    });
    return response.json();
  },

  async post<T>(url: string, data: unknown, options: RequestOptions = {}): Promise<T> {
    const response = await fetchWithRetry(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      retry: true,
    });
    return response.json();
  },

  async put<T>(url: string, data: unknown, options: RequestOptions = {}): Promise<T> {
    const response = await fetchWithRetry(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      retry: true,
    });
    return response.json();
  },

  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const response = await fetchWithRetry(url, {
      ...options,
      method: 'DELETE',
      retry: true,
    });
    return response.json();
  },
}; 