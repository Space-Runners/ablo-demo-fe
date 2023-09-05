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
  templateId: number;
  variantId: string;
  sizeId: number;
}

type ColorVariantImage = {
  templateSideId: string;
  url: string;
};

export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  images: ColorVariantImage[];
}

type TemplateSide = {
  id: string;
  left: number;
  top: number;
  height: number;
  name: string;
  width: number;
};

export interface TemplateSize {
  id: number;
  name: string;
}

export interface Template {
  colors: ColorVariant[];
  currency: {
    id: number;
    name: string;
  };
  fabric: string;
  id: number;
  madeIn: string;
  name: string;
  fit: string;
  price: string;
  urlPrefix: string;
  material: string;
  sides: TemplateSide[];
  sizes: TemplateSize[];
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

export interface DesignSide {
  id?: string;
  templateSideId?: string;
  hasGraphics?: boolean;
  hasText?: boolean;
  canvasState?: string;
  canvasStateUrl?: string;
  designImage?: string;
  previewImage?: string;
  previewUrl?: string;
}

export interface Design {
  id?: string;
  name: string;
  template: Template;
  templateColorId: string;
  sizeId?: number;
  sides: DesignSide[];
  updatedAt?: string;
}

export interface CanvasObject {
  angle: number;
  aiImage?: AiImage;
  clone: (callback: (clone: CanvasObject) => void) => void;
  left: number;
  set: (key: string, property: number | string) => void | ((properties: object) => void);
  top: number;
}

export interface CanvasEvent {
  ctx: object;
  target: CanvasObject;
}

export interface Canvas {
  add: (object: object) => void;
  aiImage: AiImage;
  remove: (object: CanvasObject) => void;
  freeDrawingBrush: {
    width: number;
  };
  isDrawingMode: boolean;
  getActiveObject: () => CanvasObject;
  setActiveObject: (object: CanvasObject) => void;
  centerObject: (object: CanvasObject) => void;
  on: (event: string, callback: (e: CanvasEvent) => void) => void;
  sendBackwards: (object: CanvasObject) => void;
  bringForward: (object: CanvasObject) => void;
  _objects: [CanvasObject];
  renderAll: () => void;
  toDataURL: (object: object) => string;
}
