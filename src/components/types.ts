export interface ImageGenerationOptions {
  styles: object;
  tones: {
    string: string[];
  };
  suggestions: object;
}

export interface TextToImageRequest {
  style: string;
  tone?: string;
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

type PrintableAreaDimensions = {
  left: number;
  top: number;
  height: number;
  width: number;
};

export interface Product {
  fabric: string;
  id: number;
  madeIn: string;
  name: string;
  fit: string;
  price: number;
  urlPrefix: string;
  description: string;
  printableAreas: {
    front: {
      base: PrintableAreaDimensions;
      md: PrintableAreaDimensions;
    };
    back: {
      base: PrintableAreaDimensions;
      md: PrintableAreaDimensions;
    };
  };
  variants: Variant[];
  tags: string[];
}

export interface AiImageOptions {
  style: string;
  tone: string;
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

export interface CanvasState {
  canvas?: string;
  canvasUrl?: string;
  previewUrl?: string;
}

export interface EditorState {
  front: CanvasState;
  back: CanvasState;
}

export interface Design {
  id?: string;
  name: string;
  garmentId: number;
  garmentColor: string;
  editorState: EditorState;
  size?: string;
  updatedAt?: string;
}
