import axios from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Design } from '@/components/types';

const URL = `/designs`;

const getDesigns = () => axios.get<Design[]>(URL).then(({ data }) => data);

export const useDesigns = () => useQuery(['designs'], () => getDesigns());

const getDesign = (id: string) =>
  axios.get<Design>(`${URL}/${id}`).then(({ data }) => data);

export const useDesign = (id: string) =>
  useQuery(['design', id], () => getDesign(id));

const createDesign = (design: Design): Promise<Design> => {
  return axios.post<Design>(URL, design).then(({ data }) => data);
};

const updateDesign = (design: Design) => {
  return axios
    .put<Design>(`${URL}/${design.id}`, design)
    .then(({ data }) => data);
};

export const saveDesign = (design: Design) => {
  const method = design.id ? updateDesign : createDesign;

  return method(design);
};
