export interface Engine {
  description: string;
  id: string;
  name: string;
  type: string;
}

export interface TextToImageParams {
  engineId: string;

  text: 'A lighthouse on a cliff';
}

export interface TextToImageRequest {
  cfg_scale: number;
  clip_guidance_preset: string;
  engineId: string;
  height: number;
  width: number;
  sampler: string;
  samples: number;
  steps: number;
  text: 'A lighthouse on a cliff';
}

export interface Garment {
  name: string;
  image?: any;
}
