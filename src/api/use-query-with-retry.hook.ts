import { useQuery } from '@tanstack/react-query';

// Custom retry function to handle 500s
const shouldRetry = (error) => {
  if (error.response?.status === 500) {
    return true;
  }
  return false;
};

// Custom retry delay function for exponential backoff
const retryDelay = (retryAttempt) => {
  return Math.min(retryAttempt * 1000, 3000);
};

export const useQueryWithRetry = (queryKey, queryFn, options = {}) => {
  // Merge custom retry logic with user-provided options
  const mergedOptions = {
    ...options,
    retries: 3,
    retry: shouldRetry,
    retryDelay: retryDelay,
  };

  return useQuery(queryKey, queryFn, mergedOptions);
};
