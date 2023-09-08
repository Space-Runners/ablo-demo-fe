import axios from 'axios';

import { TemplateSize } from '@/components/types';
import { useQuery } from '@tanstack/react-query';

const entity = `sizes`;

export const getSizes = () => axios.get<TemplateSize[]>(`/${entity}`).then(({ data }) => data);

export const useSizes = () => useQuery([entity], () => getSizes());
