import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Template } from '@/components/types';
import { useQueryWithRetry } from './use-query-with-retry.hook';

const entity = 'templates';

const URL = `/${entity}`;

export const getTemplates = () => axios.get<Template[]>(URL).then(({ data }) => data.reverse());

export const useTemplates = () => useQueryWithRetry([entity], () => getTemplates());

export const getTemplate = (id: string) =>
  axios.get<Template>(`${URL}/${id}`).then(({ data }) => data);

export const useTemplate = (id: string) => useQueryWithRetry([entity, id], () => getTemplate(id));

const createTemplate = (template: Template): Promise<Template> => {
  return axios.post<Template>(URL, template).then(({ data }) => data);
};

const updateTemplate = (template: Template) => {
  return axios.put<Template>(`${URL}/${template.id}`, template).then(({ data }) => data);
};

export const saveTemplate = (template: Template) => {
  const method = template.id ? updateTemplate : createTemplate;

  return method(template);
};

export const useDeleteTemplate = () => {
  const client = useQueryClient();

  const { mutate: removeTemplate } = useMutation((id: number) => axios.delete(`${URL}/${id}`), {
    onSuccess: () => client.invalidateQueries([entity]),
  });

  return {
    removeTemplate,
  };
};
