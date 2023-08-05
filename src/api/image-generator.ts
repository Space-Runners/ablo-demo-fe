import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { ImageGenerationOptions, TextToImageRequest } from '@/components/types';

const URL = `/generate`;

export const useOptions = () =>
  useQuery(['image-generation-options'], () => getOptions());

export const generateImage = (params: TextToImageRequest) => {
  return axios.post('/generate/image', params).then(({ data }) => {
    return data.images;
  });
};

const getOptions = () =>
  axios.get<ImageGenerationOptions>(`${URL}/options`).then(({ data }) => data);

export const saveTemplate = (name, image) =>
  axios.post('/templates', { filename: name, image }).then(({ data }) => data);

export const removeBackground = (imageUrl) =>
  axios
    .post('/generate/remove-background', {
      imageUrl,
    })
    .then(({ data }) => {
      return data.image;
    });
