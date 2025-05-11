import logger from './logger.js';

interface ApiLogData {
  endpoint: string;
  method: string;
  statusCode?: number;
  responseTime?: number;
  error?: any;
}

export const logApiCall = (data: ApiLogData) => {
  const { endpoint, method, statusCode, responseTime, error } = data;
  
  const logData = {
    timestamp: new Date().toISOString(),
    endpoint,
    method,
    statusCode,
    responseTime: responseTime ? `${responseTime}ms` : undefined,
    error: error ? {
      message: error.message,
      code: error.code,
      stack: error.stack
    } : undefined
  };

  if (error) {
    logger.error('API Error', logData);
  } else {
    logger.info('API Call', logData);
  }
};

export const logApiError = (endpoint: string, error: any) => {
  logApiCall({
    endpoint,
    method: 'GET',
    error
  });
}; 