/**
 * @summary
 * Global type definitions for the application
 */

/**
 * @summary
 * Standard error structure
 */
export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

/**
 * @summary
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * @summary
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
