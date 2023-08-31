import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { TemplateSize } from '@/components/types';

const entity = `sizes`;

export const getSizes = () => axios.get<TemplateSize[]>(`/${entity}`).then(({ data }) => data);

export const useSizes = () => useQuery([entity], () => getSizes());
