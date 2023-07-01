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

export const saveTemplate = (name, image) => {
  /*  const formData = new FormData();

  formData.append('filename', name);
  formData.append('image', image);
 */
  return axios
    .post('/templates', { filename: name, image })
    .then(({ data }) => data);
};

export const removeBackground = (imageUrl) => {
  /*  const formData = new FormData();

  formData.append('filename', name);
  formData.append('image', image);
 */
  return axios
    .post('/generate/remove-background', {
      imageUrl,
    })
    .then(({ data }) => {
      return data.image;
    });
};
