export interface ImageGenerationOptions {
  styles: object;
  tones: {
    string: string[];
  };
  suggestions: object;
}

export interface TextToImageRequest {
  style: string;
  mood?: string;
  freeText: string;
  subjectSuggestions: string[];
  background: boolean;
}

export interface Template {
  name: string;
  img: string;
}

export interface Filters {
  sizes?: string[];
  colors?: string[];
  clothingTypes?: string[];
  fits?: string[];
  productTypes?: string[];
  collections?: string[];
  genders?: string[];
  brands?: string[];
  price?: [number, number];
}

export interface Garment {
  productId: number;
  variant: string;
  size: string;
}

export interface Variant {
  name: string;
  color: string;
}

export interface Product {
  fabric: string;
  id: number;
  madeIn: string;
  name: string;
  fit: string;
  price: number;
  urlPrefix: string;
  description: string;
  variants: Variant[];
  tags: string[];
}

export interface AiImageOptions {
  style: string;
  mood: string;
  keywords?: string[];
  subject?: string;
  background: boolean;
}

export interface AiImage {
  options: AiImageOptions;
  url: string;
  noBackgroundUrl?: string;
  withBackgroundUrl?: string;
}

export interface TemplateDesign {
  canvas: string;
  templateUrl?: string;
}

export interface Design {
  Front: TemplateDesign;
  Back: TemplateDesign;
}
