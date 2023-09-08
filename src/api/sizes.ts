import axios from 'axios';

import { TemplateSize } from '@/components/types';
import { useQueryWithRetry } from './use-query-with-retry.hook';

const entity = `sizes`;

export const getSizes = () => axios.get<TemplateSize[]>(`/${entity}`).then(({ data }) => data);

export const useSizes = () => useQueryWithRetry([entity], () => getSizes());
