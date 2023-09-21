import axios from 'axios';

import { ImageGenerationOptions, TextToImageRequest } from '@/components/types';
import { useQuery } from '@tanstack/react-query';

export const useOptions = () => useQuery(['image-generation-options'], () => getOptions());

export const generateImage = (params: TextToImageRequest) => {
  return axios.post('/generate/text-to-image', params).then(({ data }) => {
    return data.images;
  });
};

const getOptions = () =>
  axios.get<ImageGenerationOptions>(`generate/options`).then(({ data }) => data);

export const removeBackground = (imageUrl) =>
  axios
    .post('/generate/remove-background', {
      imageUrl,
    })
    .then(({ data }) => {
      return data.image;
    });
