import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Engine } from '@/components/types';

const URL = `/generate`;

export const useEngines = () =>
  useQuery(['engines'], () =>
    axios.get<Engine[]>(`${URL}/engines`).then(({ data }) => data)
  );

export const generateImage = (params: any) => {
  const fixedParams = {
    cfg_scale: 7,
    clip_guidance_preset: 'FAST_BLUE',
    height: 512,
    width: 512,
    sampler: 'K_LMS',
    steps: 75,
  };

  return axios
    .post('/generate/text-to-image', { ...fixedParams, ...params })
    .then(({ data }) => {
      return data.images;
    });
};
