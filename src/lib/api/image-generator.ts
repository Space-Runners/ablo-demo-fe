import axios from 'axios';

import { ImageToImageRequest, Style, TextToImageRequest, FontToImageRequest } from '@/lib/types';

export const generateImageFromText = (params: TextToImageRequest) => {
  return axios.post('/generate/text-to-image', params).then(({ data }) => {
    return data.images;
  });
};

export const generateImageFromImage = (params: ImageToImageRequest) =>
  axios
    .post(`/generate/image-file-to-image`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({ data }) => data.map(({ url }) => url));

export const generateImageFromFont = (params: FontToImageRequest) =>
  axios.post(`/generate/fontmaker`, params).then(({ data }) => data.images);

export const getStyles = (type: string) =>
  axios.get<Style[]>('/styles').then(({ data }) => data.filter((item) => item.type === type));

export const removeBackground = (imageUrl) =>
  axios
    .post('/generate/remove-background', {
      imageUrl,
    })
    .then(({ data }) => {
      return data.image;
    });
