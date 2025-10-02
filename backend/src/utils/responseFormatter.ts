/**
 * @summary
 * Formats a successful response
 *
 * @param data - Response data
 * @param metadata - Optional metadata
 * @returns Formatted success response
 */
export function successResponse<T>(data: T, metadata?: any) {
  return {
    success: true,
    data,
    ...(metadata && { metadata: { ...metadata, timestamp: new Date().toISOString() } }),
    ...(!metadata && { timestamp: new Date().toISOString() }),
  };
}

/**
 * @summary
 * Formats an error response
 *
 * @param message - Error message
 * @param details - Optional error details
 * @param code - Optional error code
 * @returns Formatted error response
 */
export function errorResponse(message: string, details?: any, code?: string) {
  return {
    success: false,
    error: {
      message,
      ...(code && { code }),
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
  };
}
