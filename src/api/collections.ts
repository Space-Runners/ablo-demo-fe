import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Collection } from '@/components/types';

const collection = 'collections';
const URL = `/${collection}`;

export const postCollection = (collection: Collection) =>
  axios.post(URL, collection).then(({ data }) => data);

export const patchCollection = (collection: Collection) => {
  const { id, ...rest } = collection;

  return axios.patch(`${URL}/${id}`, rest).then(({ data }) => data);
};

export const useCollections = () =>
  useQuery([collection], () => axios.get(URL).then(({ data }) => data));

export const useAddCollection = () => {
  const client = useQueryClient();

  const { mutate: addCollection } = useMutation(postCollection, {
    onSuccess: () => client.invalidateQueries([collection]),
  });

  return {
    addCollection,
  };
};

export const useUpdateCollection = () => {
  const client = useQueryClient();

  const { mutate: updateCollection } = useMutation(patchCollection, {
    onSuccess: () => client.invalidateQueries([collection]),
  });

  return {
    updateCollection,
  };
};

export const useDeleteCollection = () => {
  const client = useQueryClient();

  const { mutate: deleteCollection } = useMutation(
    (id) => axios.delete(`${URL}/${id}`),
    {
      onSuccess: () => client.invalidateQueries([collection]),
    }
  );

  return {
    deleteCollection,
  };
};
