interface UserRole {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
}

export interface User {
  email: string;
  roles: UserRole[];
}

export interface Keyword {
  id: string;
  name: string;
}

export interface Tone {
  id: string;
  imageUrl: string;
  tone?: {
    id: string;
    name: string;
  };
}

export type StyleType = 'text' | 'image';

export interface Style {
  description: string;
  id: string;
  imageUrl: string;
  keywords: Keyword[];
  name: string;
  tones: Tone[];
  type?: StyleType;
}

export interface TextToImageRequest {
  style?: string;
  styleId: string;
  toneId?: string;
  freeText: string;
  subjectSuggestions: string[];
  background: boolean;
}

export interface ImageToImageRequest {
  styleId: string;
  imageFile: BinaryData;
}

export interface ImageToImageRequest {
  style?: string;
  styleId: string;
  toneId?: string;
  image?: string;
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
  templateId: string;
  templateColorId: string;
  sizeId: number;
}

type TemplateColorImage = {
  templateSideId: string;
  url: string;
};

export interface TemplateColor {
  id: string;
  name: string;
  hex: string;
  images: TemplateColorImage[];
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
  colors: TemplateColor[];
  currency: {
    id: number;
    name: string;
  };
  fabric: string;
  id: string;
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

export interface AiImage {
  options: TextToImageRequest | ImageToImageRequest;
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
  canvas?: Canvas;
  templateSideId?: string;
  templateSide?: TemplateSide;
  hasGraphics?: boolean;
  hasText?: boolean;
  canvasState?: string;
  canvasStateUrl?: string;
  designImage?: string;
  previewImage?: string;
  previewUrl?: string;
  imageUrl?: string;
}

export interface Design {
  id?: string;
  name?: string;
  template?: Template;
  templateId: string;
  templateColorId: string;
  sizeId: number;
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
  getAbsoluteCoords: (object: CanvasObject) => { left: number; top: number };
  centerObject: (object: CanvasObject) => void;
  on: (event: string, callback: (e: CanvasEvent) => void) => void;
  sendBackwards: (object: CanvasObject) => void;
  bringForward: (object: CanvasObject) => void;
  width: number;
  height: number;
  _objects: [CanvasObject];
  renderAll: () => void;
  toDataURL: (object: object) => string;
}
