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
