import axios from 'axios';

import { Style, TextToImageRequest } from '@/lib/types';

export const generateImage = (params: TextToImageRequest, baseUrl = '') => {
  return axios.post(`${baseUrl || ''}/generate/text-to-image`, params).then(({ data }) => {
    return data.images;
  });
};

export const getStyles = (baseUrl = '') =>
  axios.get<Style[]>(`${baseUrl || ''}/styles`).then(({ data }) => data);

export const removeBackground = (imageUrl) =>
  axios
    .post('/generate/remove-background', {
      imageUrl,
    })
    .then(({ data }) => {
      return data.image;
    });
