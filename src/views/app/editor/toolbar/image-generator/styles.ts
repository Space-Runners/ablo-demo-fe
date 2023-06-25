export const Styles = {
  'Oil Painting': {
    text: [
      {
        text: 'by conrad roset, greg rutkowski, makoto shinkai, trending on artstation',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-v1-5',
    cfg_scale: 13,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 65,
    style_preset: '',
    sampler: 'K_LMS',
  },
  Kidult: {
    text: [
      {
        text: 'doodles by children, by pencils, ugly drawing, not professional',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-v1-5',
    cfg_scale: 8,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 50,
    style_preset: '',
    sampler: 'K_LMS',
  },
  'Line Art': {
    text: [
      {
        text: 'line art, ink, portrait, stroke only, style moebius',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-v1-5',
    cfg_scale: 8,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 30,
    style_preset: '',
    sampler: 'K_LMS',
  },
  Origami: {
    text: [
      {
        text: 'made of crumbled paper, by Greg Rutkowski, trending on artstation, intricate détails, 8k',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-512-v2-1',
    cfg_scale: 8,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 30,
    style_preset: '',
    sampler: 'K_LMS',
  },
  'Scrap Collage': {
    text: [
      {
        text: 'matisse style, scrap, collage by children, rough, sketch',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-512-v2-1',
    cfg_scale: 8,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 50,
    style_preset: '',
    sampler: 'K_LMS',
  },
  Graffiti: {
    text: [
      {
        text: 'graffiti, street art, bw, tags, logo, print, spray, pattern(1)',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-512-v2-1',
    cfg_scale: 8,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 50,
    style_preset: '',
    sampler: 'K_LMS',
  },
  Collage: {
    text: [
      {
        text: 'paper collage style, modern, clipart, paper collage, rough, sketch  ',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-512-v2-1',
    cfg_scale: 8,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 50,
    style_preset: '',
    sampler: 'K_LMS',
  },
  'Pop Stained Glass': {
    text: [
      {
        text: 'stained glass, isolated, geometric, bright vibrant colorful, poster art',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-v1-5',
    cfg_scale: 19,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 40,
    style_preset: '',
    sampler: 'K_LMS',
  },
  Inflated: {
    text: [
      {
        text: '3d, octane render, inflated shapes, digital, art',
        weight: 1,
      },
    ],
    engineId: 'stable-diffusion-512-v2-1',
    cfg_scale: 8,
    clip_guidance_preset: '',
    height: 512,
    width: 512,
    samples: 3,
    steps: 50,
    style_preset: '',
    sampler: 'K_LMS',
  },
};

export const MOODS = {
  Red: 'red, light red, pale red, hot red, deep red, pastel red',
  Love: 'pink, light pink, pale pink, hot pink, deep pink, pastel pink',
  Doomsday: 'color palette of mad max fury road movie',
  'Juice Lemon': 'the yellow color palette of Wes Anderson movie',
  Flora:
    'lush, flora, tones of green, green palette, vegetation, greenery, leafage',
  Neon: 'neon lights, deep neon, cyan, purple, green, night mood',
  Ocean: 'blue palette, deep blue, pale blue, sky blue, cerulean color',
  Mystery: 'violet palette, purple color, deep violet, pale purple',
  Pastel:
    'pastel colors, calming colors, peaceful, Mint colors, pale colors, grayish',
  Psychedelic: 'sneakers on a psychedelic multicolored kaleidoscopic landscape',
};

export const KEYWORD_SUGGESTIONS = {
  Kidult: [
    {
      name: 'Fish in ocean',
      prompt:
        'Colored fish of different sizes swim in the bright blue transparent water',
    },
    {
      name: 'Birds in the sky',
      prompt:
        'Beautiful silhouette of birds in the distance flying away at sunset',
    },
    {
      name: 'Emoticons',
      prompt:
        'A positive smiley face in a whimsical style with a positive smile is shown on a white background',
    },
    {
      name: 'Collage',
      prompt:
        'A positive smiley face in a whimsical style with a positive smile is shown on a white background',
    },
  ],
  Collage: [
    {
      name: 'Flowers in the garden',
      prompt:
        'Summer day, Bright beautiful flowers in different shades in a cozy garden in a country house',
    },
    {
      name: 'Flora in Brazil',
      prompt:
        'Varied colors and shapes of colorful plants in the rainy jungles of Brazil',
    },
    {
      name: 'Mushrooms in the forest',
      prompt:
        'Different sizes and colors of mushrooms in an evening forest with a setting sun',
    },
  ],
};

export const BACKGROUND_KEYWORD_SUGGESTIONS = {};
