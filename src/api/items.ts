import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ClothingItem } from '@/components/types';

const collection = 'items';
const URL = `/${collection}`;

export const postItem = (item: ClothingItem) => {
  const { price, ...rest } = item;

  return axios.post(URL, rest).then(({ data }) => {
    const { id } = data;

    return postItemDetails({ id, price }).then((result) => ({
      ...data,
      ...result,
    }));
  });
};

export const patchItem = (item: ClothingItem) => {
  const { id, price, ...rest } = item;

  console.log('Patch item', item);

  return axios.patch(`${URL}/${id}`, rest).then(({ data }) => {
    // @ts-ignore
    const method = item.itemId ? patchItemDetails : postItemDetails;

    // @ts-ignore
    return method({ id, price }).then((result) => ({
      ...data,
      ...result,
    }));
  });
};

export const postItemDetails = ({
  id,
  price,
}: {
  id: string;
  price: number;
}) => {
  return axios
    .post(
      `${URL}/${id}/details`,
      { price },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then(({ data }) => data);
};

export const patchItemDetails = ({
  id,
  price,
}: {
  id: string;
  price: number;
}) => {
  return axios
    .patch(
      `${URL}/${id}/details`,
      { price },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then(({ data }) => data);
};

export const useItems = () =>
  useQuery([collection], () => {
    return axios.get(URL).then(({ data }) =>
      Promise.all(
        data.map((item: ClothingItem) =>
          axios.get(`${URL}/${item.id}/details`).then(({ data: details }) => ({
            ...item,
            ...(details[0] || {}),
            id: item.id,
          }))
        )
      )
    );
  });

export const useAddItem = () => {
  const client = useQueryClient();

  const { mutate: addItem } = useMutation(postItem, {
    onSuccess: () => client.invalidateQueries([collection]),
  });

  return {
    addItem,
  };
};

export const useUpdateItem = () => {
  const client = useQueryClient();

  const { mutate: updateItem } = useMutation(patchItem, {
    onSuccess: () => client.invalidateQueries([collection]),
  });

  return {
    updateItem,
  };
};

export const useDeleteItem = () => {
  const client = useQueryClient();

  const { mutate: deleteItem } = useMutation(
    (id) => axios.delete(`${URL}/${id}`),
    {
      onSuccess: () => client.invalidateQueries([collection]),
    }
  );

  return {
    deleteItem,
  };
};
