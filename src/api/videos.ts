import axios from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Video } from '@/components/types';

const collection = 'videos';
const URL = `/${collection}`;

export const postVideo = (video: Video) =>
  axios.post(URL, video).then(({ data }) => data);

export const patchVideo = (video: Video) => {
  const { id, ...rest } = video;

  return axios.patch(`${URL}/${id}`, rest).then(({ data }) => data);
};

export const useVideos = () =>
  useQuery([collection], () => axios.get(URL).then(({ data }) => data));

export const useAddVideo = () => {
  const client = useQueryClient();

  const { mutate: addVideo } = useMutation(postVideo, {
    onSuccess: () => client.invalidateQueries([collection]),
  });

  return {
    addVideo,
  };
};

export const useUpdateVideo = () => {
  const client = useQueryClient();

  const { mutate: updateVideo } = useMutation(patchVideo, {
    onSuccess: () => client.invalidateQueries([collection]),
  });

  return {
    updateVideo,
  };
};

export const useDeleteVideo = () => {
  const client = useQueryClient();

  const { mutate: removeVideo } = useMutation(
    (id: number) => axios.delete(`${URL}/${id}`),
    {
      onSuccess: () => client.invalidateQueries([collection]),
    }
  );

  return {
    removeVideo,
  };
};
