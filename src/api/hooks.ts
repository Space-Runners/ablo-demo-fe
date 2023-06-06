import { useQuery } from '@tanstack/react-query';

import { getMe } from './auth';

export const useMe = () => useQuery(['me'], getMe);
